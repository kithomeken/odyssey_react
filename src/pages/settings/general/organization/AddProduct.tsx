import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";

import HttpServices from "../../../../services/HttpServices"
import { PRODUCT_ADD_API_ROUTE, PRODUCT_CHECK_API_ROUTE } from "../../../../api/ApiRoutes"
import { Transition, Dialog } from "@headlessui/react";
import ErrorBanner from "../../../../components/layouts/ErrorBanner";
import SuccessBanner from "../../../../components/layouts/SuccessBanner";

const AddProduct = ({ show, showOrHideModal, reloadReactTable }: { show: any, showOrHideModal: any, reloadReactTable: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        requestSucceeded: false,
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

    let navigate = useNavigate();

    const onInputBlur = (e: { target: { name: string; value: string } }) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

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
        let { input }: any = state
        let { errors }: any = state
        let { product }: any = state

        product.checkProduct = true
        const response: any = await HttpServices.httpPost(PRODUCT_CHECK_API_ROUTE, input)
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
        const { isPostingForm } = state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

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
        let { product }: any = state
        let { errors }: any = state

        if (!product.productExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Post form data
                let { isPostingForm } = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return addProductApiCall()
            }
        }
    }

    const addProductApiCall = async () => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        try {
            const response: any = await HttpServices.httpPost(PRODUCT_ADD_API_ROUTE, input)
            
            if (response.data.success) {
                input.name = ''
                input.description = ''

                if (state.input.another === 'Y') {
                    requestSucceeded = true
                    input.another = 'N'
                    
                    setstate({
                        ...state, input, requestSucceeded
                    })

                    reloadReactTable('N')
                } else {
                    reloadReactTable()
                }
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm, requestSucceeded
        })
    }

    return (
        <React.Fragment>
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={showOrHideModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed z-20 inset-0 overflow-y-auto">
                        <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-xl md:px-4 md:my-8 lg:max-w-md">
                                    <div className="w-full rounded relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div className="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                            <div className="sm:col-span-8 lg:col-span-7 mb-3">
                                                <h2 className="text-xl text-emerald-500 sm:pr-12">Add Product</h2>
                                            </div>

                                            <div className="w-full">
                                                <p className="text-sm mb-3 text-gray-500">Add a new product into your workstream.</p>

                                                <form className="rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                                    {
                                                        state.requestFailed ? (
                                                            <div className="form-group">
                                                                <ErrorBanner message="Failed to add product." />
                                                            </div>
                                                        ) : null
                                                    }
                                                    
                                                    {
                                                        state.requestSucceeded ? (
                                                            <div className="form-group">
                                                                <SuccessBanner message="Successfully added product." />
                                                            </div>
                                                        ) : null
                                                    }
                                                    
                                                    <div className="w-12/12 rounded-md shadow-none space-y-px mb-4">
                                                        <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                                        <div className="w-9/12 flex items-center align-middle">
                                                            <div className="w-full">
                                                                <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" placeholder="Product Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />
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

                                                        {
                                                            state.errors.name.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.name}
                                                            </span>
                                                        }
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center pb-4">
                                                        <div className="w-full">
                                                            <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description:</label>

                                                            <div className="w-full">
                                                                <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-700 mt-1 block w-full sm:text-sm border border-gray-400 rounded-md resize-none p-2" required onChange={onChangeHandler} placeholder="Description" onBlur={onInputBlur} value={state.input.description}></textarea>

                                                                {
                                                                    state.errors.description.length > 0 &&
                                                                    <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                        {state.errors.description}
                                                                    </span>
                                                                }
                                                            </div>

                                                            <sub className="text-slate-500 text-xs">
                                                                A brief description of the product. This will also appear in tooltips
                                                            </sub>
                                                        </div>
                                                    </div>

                                                    <div className="w-full rounded-md shadow-none space-y-px flex items-center">
                                                        <div className="flex items-center justify-between mb-5">
                                                            <div className="flex items-center">
                                                                <input id="add-another" name="another" type="checkbox" onChange={onChangeHandler}
                                                                    checked={
                                                                        state.input.another === 'Y' ? true : false
                                                                    }
                                                                    className="h-5 w-5 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 form-tick appearance-none border border-gray-300 rounded-md checked:border-transparent focus:outline-none" />
                                                                <label htmlFor="add-another" className="ml-2 block text-sm text-gray-500">Add another product</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        state.requestFailed &&
                                                        <div className="pt-5">
                                                            <span className='invalid-feedback font-small text-red-600 pt-5'>
                                                                {state.requestFailed}
                                                            </span>
                                                        </div>
                                                    }

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px">
                                                        <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                            <p className="text-blue-500 text-sm text-right mr-3 ml-5 hover:underline" onClick={showOrHideModal}>Cancel</p>

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
                                                                    <button type="submit" disabled={state.product.productExists} className={`inline-flex items-center px-4 py-1 border border-emerald-500 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50`}>
                                                                        <span className="text-sm">
                                                                            Add Product
                                                                        </span>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </React.Fragment>
    )
}

export default AddProduct