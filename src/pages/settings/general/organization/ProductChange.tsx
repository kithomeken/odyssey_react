/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PRODUCT_B4_CHECK_API_ROUTE, PRODUCT_UPDATE_API_ROUTE } from '../../../../api/ApiRoutes';
import ApiServices from '../../../../api/ApiServices';
import HttpServices from '../../../../services/HttpServices';

function ProductEdit({ uuid, show, productProps, hidePanel, fetchFunc }: { uuid: any, show: any, productProps: any, hidePanel: any, fetchFunc: any }) {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            name: productProps.name,
            description: productProps.description,
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

    const onInputBlur = (e: {target: {name: string; value: string}}) => {
        const {isPostingForm} = state

        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state
            let disableSubmitBtn = state.disableSubmitBtn

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
                            checkProductNameBeforeUpdate()
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

            if (input.name === productProps.name && input.description === productProps.description) {
                disableSubmitBtn = true
            } else {
                disableSubmitBtn = false
            }

            setstate({
                ...state, 
                input, 
                errors, 
                disableSubmitBtn
            })
        }
    }

    const checkProductNameBeforeUpdate = async () => {
        let {input}: any = state
        let {errors}: any = state
        let {product}: any = state
        product.checkProduct = true

        const requestData = {
            name: input.name,
            uuid: uuid
        }

        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + PRODUCT_B4_CHECK_API_ROUTE
        const response: any = await HttpServices.httpPost(apiCall, requestData)
        product.checkProduct = false

        if (response.data.success) {
            product.productExists = false
        } else {
            errors.name = "Product name already exists"
            input.name = productProps.name
            product.productExists = true
        }

        setstate({
            ...state, errors, product, input
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
        let {input}: any = state

        if (!product.productExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Check if data is changed
                if (input.name === productProps.name && input.description === productProps.description) {
                    // Do nothing
                } else {
                    // Post form data
                    let {isPostingForm} = state
                    let requestFailed = state.requestFailed
                    isPostingForm = true
                    requestFailed = false
    
                    setstate({
                        ...state, isPostingForm, requestFailed
                    })
    
                    return postFormData()
                }                
            }
        }
    }

    const postFormData = async () => {
        let {requestFailed}: any = state
        let {isPostingForm} = state
        let {input}: any = state

        const requestData = {
            name: input.name,
            description: input.description,
            uuid: uuid,
        }

        try {
            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + PRODUCT_UPDATE_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, requestData)

            if (response.data.success) {
                fetchFunc()
                hidePanel()
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm
        })
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={hidePanel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                                                onClick={hidePanel}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <span className="fas fa-times border-none text-xl text-white"></span>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                                        <div className="px-4 sm:px-6 py-6 bg-green-200">
                                            <Dialog.Title className="text-lg font-medium text-gray-900"> Edit Product Details </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <p className="text-black text-sm form-group">
                                                    Update your product's details 
                                                </p>


                                                <form className="rounded-md shadow-none space-y-px form-group pb-10" onSubmit={onFormSubmitHandler}>
                                                    <div className="w-12/12 rounded-md shadow-none space-y-px mb-5">
                                                        <label htmlFor="name" className="block mb-1 text-sm text-gray-600">Product Name:</label>

                                                        <div className="w-full flex items-center align-middle">
                                                            <div className="w-full">
                                                                <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                                                {
                                                                    state.errors.name.length > 0 &&
                                                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                        {state.errors.name}
                                                                    </span>
                                                                }
                                                            </div>

                                                            <div className="w-5 pl-2">
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
                                                            <label htmlFor="description" className="block mb-1 text-sm text-gray-600">Description:</label>

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

                                                        <div className="w-5"></div>
                                                    </div>

                                                    <div className="flex flex-row w-11/12 pt-2">
                                                        {
                                                            state.isPostingForm ? (
                                                                <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none mb-6 focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                                                    <span>
                                                                        <span className="left-0 inset-y-0 flex items-center pl-3">
                                                                            <span className="pr-2">
                                                                                Updating
                                                                            </span>

                                                                            <span className="w-5 h-5">
                                                                                <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            ) : (
                                                                <button type="submit" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white mb-6 bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                                                    <span className="text-sm">
                                                                        Update
                                                                    </span>
                                                                </button>
                                                            )
                                                        }
                                                    </div>

                                                    {
                                                        state.requestFailed ? (
                                                            <Transition
                                                                show={true}
                                                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                                enterFrom="translate-x-full"
                                                                enterTo="translate-x-0"
                                                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                                leaveFrom="translate-x-0"
                                                                leaveTo="translate-x-full"
                                                            >
                                                                <div className="p-4 border border-red-600 bg-red-100 rounded text-sm">
                                                                    <div className="w-full flex items-center align-middle text-red-600">
                                                                        <div className="w-10 pr-2">
                                                                            <i className="fad fa-2x fa-ban mr-2 text-red-600"></i>
                                                                        </div>

                                                                        <div className="w-full text-xs">
                                                                            <span>
                                                                                Failed to update product details, please try again later...
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Transition>
                                                        ) : null
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ProductEdit