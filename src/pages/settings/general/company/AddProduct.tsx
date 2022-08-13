import { Transition, Dialog, Listbox } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { useDispatch } from "react-redux"

import { COMPANY_GROUP_ALL_PRODUCTS_API_ROUTE, COMPANY_GROUP_SUBSCRIBE_TO_PRODUCT_API_ROUTE } from "../../../../api/ApiRoutes"
import Loading from "../../../../components/layouts/Loading"
import {ListBoxZero} from "../../../../lib/hooks/ListBoxZero"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"

const AddProduct = ({ show, showOrHideModal, companyId, reloadProductsTable }: { show: any, showOrHideModal: any, companyId: any, reloadProductsTable: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        requestSucceeded: false,
        productsListIsEmpty: false,
        input: {
            name: '',
            uuid: null,
        },
    })

    const dispatch = useDispatch()
    const allProductListApiCall = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(COMPANY_GROUP_ALL_PRODUCTS_API_ROUTE + '/' + companyId)

        if (response.status !== 200) {
            throw new Error("Something went wrong while fecthing data.");
        }

        if (response.data.data.length < 1) {
            // No products are available to be added
            state.productsListIsEmpty = true
        } else {
            state.input.uuid = state.input.uuid === undefined || state.input.uuid === null ? response.data.data[0].uuid : state.input.uuid
        }

        return response.data.data
    }, [dispatch, state])

    const onChangeListBoxHandler = (e: any) => {
        let { input }: any = state
        input.uuid = e

        setstate({
            ...state, input
        })
    }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let { input } = state
        let { isPostingForm } = state

        if (!isPostingForm) {
            isPostingForm = true

            setstate({
                ...state, isPostingForm
            })

            return subscribeToAProductApiCall()
        }
    }

    const subscribeToAProductApiCall = async () => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state
        let { input }: any = state

        try {
            let formData = new FormData()
            formData.append("product_uuid", input.uuid)
            formData.append("company_uuid", companyId)

            const response: any = await HttpServices.httpPost(COMPANY_GROUP_SUBSCRIBE_TO_PRODUCT_API_ROUTE, formData)

            if (response.data.success) {
                input.name = ''
                input.description = ''

                reloadProductsTable()
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        setstate({
            ...state, input, requestFailed, requestSucceeded
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
                                    <div className={classNames(
                                        state.productsListIsEmpty ? 'bg-white' : 'bg-white',
                                        'w-full rounded relative flex items-center px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'
                                    )}>
                                        <div className="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                            {
                                                allProductListApiCall.status === 'rejected' ? (
                                                    <Error500 />
                                                ) : allProductListApiCall.status === 'fulfilled' ? (
                                                    <>
                                                        {
                                                            state.productsListIsEmpty ? (
                                                                <>
                                                                    <div className="w-full flex flex-col text-amber-600 justify-center">
                                                                        <i className="fad fa-exclamation-circle m-auto fa-3x mb-4"></i>

                                                                        <span className="text-xl m-auto mb-2">
                                                                            No products available
                                                                        </span>

                                                                        <span className="text-sm text-center mb-5 text-slate-600">
                                                                            All products have either been subscribed to or no products have been configured into the system
                                                                        </span>

                                                                        <div className="w-12/12 rounded-md shadow-none space-y-px">
                                                                            <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                                                <p className="text-blue-500 text-sm text-right mr-3 ml-5 hover:underline" onClick={showOrHideModal}>Cancel</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="w-full">
                                                                    <div className="sm:col-span-8 lg:col-span-7 mb-3">
                                                                        <h2 className="text-xl text-emerald-500 sm:pr-12">Add Product</h2>
                                                                    </div>

                                                                    <p className="text-sm mb-3 text-gray-500">
                                                                        Adding a product subscription to the company helps your support team know the area of specialization.
                                                                    </p>

                                                                    <form className="rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                                                        <div className="pb-5 w-full">
                                                                            <div className="w-8/12 rounded-md shadow-none space-y-px">
                                                                                <div className="w-full flex items-center align-middle">
                                                                                    <div className="w-full mb-4">
                                                                                        <ListBoxZero
                                                                                            onChangeListBoxHandler={onChangeListBoxHandler}
                                                                                            state={state.input.uuid}
                                                                                            label="Available Products:"
                                                                                            listButton={
                                                                                                <>
                                                                                                    {allProductListApiCall.value.map((product: any, index: any) => (
                                                                                                        <span key={index}>
                                                                                                            {
                                                                                                                state.input.uuid === product.uuid ? (
                                                                                                                    <span className="flex items-center">
                                                                                                                        <span className="ml-2 text-sm text-gray-700 truncate">{product.name}</span>
                                                                                                                    </span>
                                                                                                                ) : null
                                                                                                            }
                                                                                                        </span>
                                                                                                    ))}

                                                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                                        <i className="far fa-chevron-down text-emerald-500"></i>
                                                                                                    </span>
                                                                                                </>
                                                                                            }
                                                                                            listOptions={
                                                                                                <>
                                                                                                    {allProductListApiCall.value.map((product: any, index: any) => (
                                                                                                        <Listbox.Option
                                                                                                            key={product.uuid}
                                                                                                            className={({ active }) =>
                                                                                                                classNames(
                                                                                                                    active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                                                )
                                                                                                            }
                                                                                                            value={product.uuid}
                                                                                                        >
                                                                                                            {({ selected }) => (
                                                                                                                <>
                                                                                                                    <span className="flex items-center">
                                                                                                                        <span className="ml-2 text-sm text-gray-700 truncate">{product.name}</span>
                                                                                                                    </span>

                                                                                                                    {selected ? (
                                                                                                                        <span className="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                                                                            <i className="fad fa-check h-5 w-5"></i>
                                                                                                                        </span>
                                                                                                                    ) : null}
                                                                                                                </>
                                                                                                            )}
                                                                                                        </Listbox.Option>
                                                                                                    ))}
                                                                                                </>
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="w-12"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

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
                                                                                        <button type="submit" className={`inline-flex items-center px-4 py-1 border border-emerald-500 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50`}>
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
                                                            )
                                                        }


                                                    </>
                                                ) : (
                                                    <Loading />
                                                )
                                            }
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