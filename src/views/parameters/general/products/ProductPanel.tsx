import React, {Component, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'

// Components
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

const apiHeader = ApiService.apiDomain()

interface Props {
    data: any,
    showPanel: any,
    
    closePanel: any,
}

class ProductPanel extends Component<Props> {
    state = {
        close: this.props.closePanel,
        postingFormData: false,
        disableButton: true,
        product: {
            checkProduct: false,
            productExists: true
        },
        input: {
            name: this.props.data.name,
            description: this.props.data.description,
        },
        errors: {
            name: '',
            description: ''
        }
    }

    render() {
        const open = this.props.showPanel
        const close = this.props.closePanel
        const errors = this.state.errors
        const disableButton = this.state.disableButton
        const checkProduct = this.state.product.checkProduct

        return(
            <React.Fragment>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" static className="fixed inset-0 overflow- z-10" open={open} onClose={close}>
                        <div className="absolute inset-0 overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <div className="relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                                <button
                                                    className="rounded-md text-gray-300"
                                                    onClick={close}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <span className="fas fa-times border-none text-xl text-gray-300"></span>
                                                </button>
                                            </div>
                                        </Transition.Child>

                                        <div className="h-full flex flex-col pb-6 bg-white shadow-xl">
                                            <div className="px-4 sm:px-6 py-6 bg-green-200">
                                                <Dialog.Title className="text-lg text-gray-900">Edit Product Details</Dialog.Title>
                                            </div>

                                            <div className="mt-4 relative flex-1 overflow-y px-4 sm:px-6">
                                                <div className="absolute inset-0 px-4 sm:px-6">
                                                    <div className="h-full border-none" aria-hidden="true">
                                                        <div className="w-full">
                                                            <p className="text-gray-500 text-sm form-group">
                                                                Update your product's details with latest information
                                                            </p>

                                                            <form action="" method="post">
                                                                <div className="w-full rounded-md shadow-none space-y-px form-group">
                                                                    <label htmlFor="team-name" className="block mb-1 text-sm">Product Name</label>

                                                                    <div className="w-full flex">
                                                                        <div className="w-11/12">
                                                                            <input type="text" name="name" id="product-name" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onInputBlur} disabled={this.state.postingFormData} placeholder="Product Name" value={this.state.input.name} />

                                                                            {errors.name.length > 0 &&  
                                                                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                                    {errors.name}
                                                                                </span>
                                                                            }
                                                                        </div>

                                                                        <div className="w-1/12 ml-2">
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

                                                                <div className="w-11/12 rounded-md shadow-none space-y-px form-group">
                                                                    <label htmlFor="team-name" className="block mb-1 text-sm">Description</label>
                                                                    <textarea name="description" id="product-name" rows={2} autoComplete="off" onChange={this.onChangeHandler} className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onInputBlur} disabled={this.state.postingFormData} placeholder="Description" value={this.state.input.description} ></textarea>

                                                                    {errors.description.length > 0 && 
                                                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                            {errors.description}
                                                                        </span>
                                                                    }
                                                                </div>

                                                                <div className="flex flex-row-reverse w-11/12 pt-3">
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
                                                                                // disabled={disableButton}
                                                                                className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                                                                <span className="text-sm">
                                                                                    Add Product
                                                                                </span>
                                                                            </button>
                                                                        )
                                                                    }
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* /End replace */}
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
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
        } 
        
        if (input[e.target.name].length > 5) {
            switch (targetName) {
                case 'name':
                    if (input[e.target.name].length > 30) {
                        checkProduct = false
                        productExists = true
                        errors[e.target.name] = 'Product '+ targetName +' cannot be more than 30 characters'
                    } else {
                        if (this.props.data.name !== e.target.value) {
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
                break;
                
                case 'description':
                    if (input[e.target.name].length > 100) {
                        checkProduct = false
                        productExists = true
                        errors[e.target.name] = 'Product '+ targetName +' cannot be more than 100 characters'
                    }
                break;
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
        } else if (input['name'].length > 30) {
            disableButton = true
        } else if (input['name'] === this.props.data.name) {
            disableButton = true
        } else {
            disableButton = false
        }
        
        if (!disableButton) {
            if (!input['description']) {
                disableButton = true
            } else if (input['description'].length < 5) {
                disableButton = true
            } else if (input['description'].length > 100) {
                disableButton = true
            } else if (input['description'] === this.props.data.description) {
                disableButton = true
            } else {
                disableButton = false
            }
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

export default ProductPanel