import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Navigate, useNavigate } from "react-router-dom";

import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HttpServices from "../../../../services/HttpServices"
import { PRODUCT_ADD_API_ROUTE, PRODUCT_CHECK_API_ROUTE} from "../../../../api/ApiRoutes"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"

const AddProduct = () => {
    const [state, setstate] = useState({
        requestFailed: '',
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            name: '',
            description: '',
            another: 'N',
        },
        errors: {
            name: '',
            description: '',
        },
        product: {
            checkProduct: false,
            productExists: true
        },
    })

    const showButton = false
    const pageTitle = "New Product"
    let navigate = useNavigate();

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: "" },
        { linkItem: true, title: "Product Management", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const onInputBlur = (e: {target: {name: string; value: string}}) => {
        const {isPostingForm} = state

        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state

            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Product ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Product ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 30) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Product ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''            
                            checkIfProductNameExists()
                        }
                    break;
                
                    case 'description':
                        if (targetValue.length > 100) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Product ' + e.target.name + ' cannot be more than 100 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                    break;
                }
            }

            setstate({
                ...state, input, errors,
            })
        }
    }

    const checkIfProductNameExists = async () => {
        let {input}: any = state
        let {errors}: any = state
        let {product}: any = state

        product.checkProduct = true
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + PRODUCT_CHECK_API_ROUTE
        const response: any = await HttpServices.httpPost(apiCall, input)
        product.checkProduct = false

        if (response.data.success) {
            product.productExists = false
        } else {
            errors.name = "Product name already exists"
            product.productExists = true
        }

        setstate({
            ...state, errors, product
        })
    }

    const onChangeHandler = (e: any) => {
        const {isPostingForm} = state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state
            
            input[e.target.name] = e.target.value
            errors[e.target.name] = ''

            if (isCheckbox) {
                if (e.target.checked) {
                    input[e.target.name] = "Y"
                } else {
                    input[e.target.name] = "N"
                }
            }
    
            setstate({
                ...state, input, errors
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let {product}: any = state
        let {errors}: any = state

        if (!product.productExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Post form data
                let {isPostingForm} = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return postFormData()
            }
        }
    }

    const postFormData = async () => {
        let {requestFailed}: any = state
        let {isPostingForm} = state
        let {input}: any = state

        try {
            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + PRODUCT_ADD_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                if (state.input.another === 'Y') {
                    input.name = ''
                    input.description = ''
                    input.another = 'N'
                } else {
                    const productsRoute = generalRoutes[2].path
                    navigate(productsRoute, { replace: true });
                }
            } else {
                requestFailed = "Failed to add product. Kindly contact the system administrator"
            }
        } catch (error) {
            requestFailed = "Failed to add product. Kindly contact the system administrator"
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm
        })
    }
    
    return (
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
                    <p className="text-sm mb-5">Create a new product for your workstream.</p>

                    <form className="w-7/12 rounded-md shadow-none space-y-px form-group" onSubmit={onFormSubmitHandler}>
                        <div className="w-12/12 rounded-md shadow-none space-y-px mb-5">
                            <label htmlFor="name" className="block mb-1 text-sm text-gray-700">Product Name:</label>

                            <div className="w-full flex items-center align-middle">
                                <div className="w-full">
                                    <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required/>

                                    {
                                        state.errors.name.length > 0 &&  
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.name}
                                        </span>
                                    }
                                </div>

                                <div className="w-12 pl-2">
                                    {
                                        state.product.checkProduct ? (
                                            <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center pb-4">
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-1 text-sm text-gray-700">Description:</label>

                                <div className="w-full">
                                    <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-700 mt-1 block w-full sm:text-sm border border-gray-400 rounded-md resize-none p-2" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                    {
                                        state.errors.description.length > 0 &&  
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.description}
                                        </span>
                                    }
                                </div>
                            </div>

                            <div className="w-12"></div>
                        </div>

                        <div className="w-full rounded-md shadow-none space-y-px form-group flex items-center">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="add-another" name="another" type="checkbox" onChange={onChangeHandler} 
                                    checked={
                                        state.input.another === 'Y' ? true : false
                                    }
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 form-tick appearance-none border border-gray-300 rounded-md checked:border-transparent focus:outline-none"/>
                                    <label htmlFor="add-another" className="ml-2 block text-sm text-gray-500">Add another product</label>
                                </div>
                            </div>
                        </div>

                        {
                            state.requestFailed.length > 0 && 
                            <div className="pt-5">
                                <span className='invalid-feedback font-small text-red-600 pt-5'>
                                    {state.requestFailed}
                                </span>
                            </div>
                        }

                        <div className="flex flex-row w-11/12 pt-6">
                            {
                                state.isPostingForm ? (
                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
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
                                    <button type="submit"disabled={state.product.productExists} className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
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
        </React.Fragment>
    )
}

export default AddProduct