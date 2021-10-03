import React, {Component} from 'react'
import Helmet from 'react-helmet'

// Components
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import {generalRoutes} from '../../../routes/parameters/generalRoutes'

const apiHeader = ApiService.apiDomain()

class AddProduct extends Component {
    state = {
        postingFormData: false,
        disableButton: true,
        product: {
            checkProduct: false,
            productExists: true
        },
        input: {
            name: '',
            description: ''
        },
        errors: {
            name: '',
            description: ''
        }
    }

    render() {
        const showButton = false
        const pageTitle = "Add Product"
        const productRoute = generalRoutes[0].path
        const errors = this.state.errors
        const disableButton = this.state.disableButton
        const checkProduct = this.state.product.checkProduct

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: productRoute },
            { linkItem: true, title: "Product Management", url: productRoute },
            { linkItem: false, title: pageTitle },
        ]

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle} 
                    showButton={showButton}
                    />

                <div className="w-full form-group">
                    <div className="w-10/12">
                        <p className="text-sm text-gray-500">
                            Add a new product into your tickets workstream
                        </p>
                    </div>
                </div>

                <form className="w-9/12 form-group" onSubmit={this.onFormSubmitHandler}>
                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                        <label htmlFor="team-name" className="block mb-1 text-sm">Product Name</label>

                        <div className="w-full flex">
                            <div className="w-9/12">
                                <input type="text" name="name" id="product-name" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onInputBlur} disabled={this.state.postingFormData} placeholder="Product Name" value={this.state.input.name} />

                                {errors.name.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {errors.name}
                                    </span>
                                }
                            </div>

                            <div className="w-3/12 ml-2">
                                {
                                    checkProduct ? (
                                        <div className="h-10 pt-2">
                                            <span className="fad text-green-500 fa-spinner-third fa-lg m-auto block fa-spin"></span>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-9/12 rounded-md shadow-none space-y-px form-group">
                        <label htmlFor="team-name" className="block mb-1 text-sm">Description</label>
                        <textarea name="description" id="product-name" rows={2} autoComplete="off" onChange={this.onChangeHandler} className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onInputBlur} disabled={this.state.postingFormData} placeholder="Description" value={this.state.input.description} ></textarea>

                        {errors.description.length > 0 && 
                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                {errors.description}
                            </span>
                        }
                    </div>

                    <div className="flex flex-row-reverse w-9/12 pt-3">
                        {
                            this.state.postingFormData ? (
                                <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                    <span>                                                    
                                        <span className="left-0 inset-y-0 flex items-center pl-3">
                                            <span className="pr-2">
                                                Adding Product
                                            </span>

                                            <span className="w-5 h-5">
                                                <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            ) : (
                                <button type="submit" 
                                    disabled={disableButton}
                                    className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                    <span className="text-sm">
                                        Add Product
                                    </span>
                                </button>
                            )
                        }
                    </div>


                </form>

            </React.Fragment>
        )
    }

    onChangeHandler = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state

        input[e.target.name] = e.target.value
        errors[e.target.name] = ''

        this.setState({
            input, errors
        })
    }

    onInputBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let disableButton = this.state.disableButton
        let checkProduct = this.state.product.checkProduct
        let productExists = this.state.product.productExists
        const targetName = e.target.name

        if (!input[e.target.name]) {
            checkProduct = false
            productExists = true
            errors[e.target.name] = 'Please set the product ' + targetName
        } else if (input[e.target.name].length < 5) {
            checkProduct = false
            productExists = true
            errors[e.target.name] = 'Product '+ targetName +' cannot be less than 5 characters'
        } else {
            errors[e.target.name] = ''

            if (targetName === 'name') {
                checkProduct = true
                productExists = true
                this.setState({
                    product: {
                        checkProduct,
                        productExists
                    }
                })
                this.checkIfProductNameExists(e.target.value)
            }
        }

        disableButton = this.formValidationOnBlur()

        this.setState({
            disableButton
        })
    }

    formValidationOnBlur = () => {
        let {input} = this.state
        let disableButton = this.state.disableButton

        if (!input['name']) {
            disableButton = true
        } else if (input['name'].length < 5) {
            disableButton = true
        } else {
            disableButton = false
        }
        
        if (!input['description']) {
            disableButton = true
        } else if (input['description'].length < 5) {
            disableButton = true
        } else {
            disableButton = false
        }

        return disableButton
    }

    onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let productExists = this.state.product.productExists

        if (!productExists) {
            if (!this.formValidationOnBlur()) {
                this.setState({
                    postingFormData: true
                })

                this.postFormData()
            } else {
                this.setState({
                    postingFormData: false
                })
            }
        } else {
            this.setState({
                postingFormData: false
            })
        }
    }

    async checkIfProductNameExists(targetValue: any) {
        try {
            let input = {
                'name': targetValue
            }

            let apiToBeConsumed = apiHeader + `portal/a/site-master/general/products/check`
            const response: any = await HttpService.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                this.setState({
                    product: {
                        checkProduct: false,
                        productExists: false
                    }
                })
            } else {
                let {errors} = this.state
                errors.name = "This product name already exists"

                this.setState({
                    product: {
                        checkProduct: false,
                        productExists: true
                    }
                })
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }

    async postFormData() {
        try {
            const input = this.state.input
            const apiToBeConsumed = apiHeader + `portal/a/site-master/general/products/create`
            const response: any = await HttpService.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                const {input} = this.state
                input.name = ''
                input.description = ''

                this.setState({
                    input,
                    postingFormData: false,
                })
            } else {
                let {errors} = this.state
                errors.description = "Failed to add product"

                this.setState({
                    postingFormData: false
                })  
            }
        } catch (error) {
            console.log()
        }
    }
}

export default AddProduct