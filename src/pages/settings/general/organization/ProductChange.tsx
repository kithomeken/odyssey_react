import { toast } from "react-toastify"
import React, { useEffect, useState } from 'react';

import HttpServices from '../../../../services/HttpServices';
import { DynamicModal } from '../../../../components/lib/DynamicModal';
import { PRODUCT_B4_CHECK_API_ROUTE, PRODUCT_UPDATE_API_ROUTE } from "../../../../api/v1/api.GeneralRoutes";

function ProductEdit({ uuid, show, productProps, hideModal, fetchFunc }: { uuid: any, show: any, productProps: any, hideModal: any, fetchFunc: any }) {
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

    useEffect(() => {
        setstate({
            ...state, input: {
                name: productProps.name,
                description: productProps.description,
            },
        })

    }, [productProps])

    const onInputBlur = (e: { target: { name: string; value: string } }) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state
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
        let { input }: any = state
        let { errors }: any = state
        let { product }: any = state
        product.checkProduct = true

        const requestData = {
            name: input.name,
            uuid: uuid
        }

        try {
            const response: any = await HttpServices.httpPost(PRODUCT_B4_CHECK_API_ROUTE, requestData)
            product.checkProduct = false

            if (response.data.success) {
                product.productExists = false

                // Update the product details
                postFormData()
            } else {
                errors.name = "Product name already exists"
                input.name = productProps.name
                product.productExists = true
            }
        } catch (error) {
            input.name = productProps.name

            toast.error("Failed to update product details, please try again later", {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setstate({
            ...state, errors, product, input
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
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { errors }: any = state
            let { input }: any = state

            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                if (input.name !== productProps.name) {
                    // Post form data
                    let { isPostingForm } = state
                    let requestFailed = state.requestFailed
                    isPostingForm = true
                    requestFailed = false

                    setstate({
                        ...state, isPostingForm, requestFailed
                    })

                    // Since product name as been updated
                    // Check if it exists in database
                    // If does not exist proceed and update 
                    checkProductNameBeforeUpdate()
                } else if (input.description !== productProps.description) {
                    // Post form data
                    let { isPostingForm } = state
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
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        const requestData = {
            name: input.name,
            description: input.description,
            uuid: uuid,
        }

        try {
            const response: any = await HttpServices.httpPost(PRODUCT_UPDATE_API_ROUTE, requestData)

            if (response.data.success) {
                fetchFunc()
                hideModal()
            } else {
                requestFailed = true
                toast.error("Failed to update product details, please try again later", {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            requestFailed = true
            toast.error("Failed to update product details, please try again later", {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm
        })
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={'sm'}
                title="Edit Product"
                show={show}
                showOrHideModal={hideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                actionButton={{
                    before: "Update",
                    after: "Updating"
                }}
                formComponents={
                    <>
                        <p className="text-black text-sm form-group">
                            Update your product's details
                        </p>

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
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}

export default ProductEdit