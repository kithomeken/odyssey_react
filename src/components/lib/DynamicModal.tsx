import { toast } from "react-toastify"
import { Transition, Dialog } from "@headlessui/react"
import React, { FC, Fragment, useState } from "react"

import { CommsBreakdown } from "../../pages/errors/CommsBreakdown"
import Loading from "../layouts/Loading"

interface Props {
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl',
    title: any,
    show: boolean,
    errorTitle?: any,
    description?: any,
    errorMessage?: any,
    preLoadStatus?: any,
    formComponents: any,
    showOrHideModal: any,
    preLoadsData?: boolean,
    isPostingForm: boolean,
    onFormSubmitHandler: any,
    dispErrorMessage?: boolean,
    actionButton: {
        before: any,
        after: any
    }
}

export const DynamicModal: FC<Props> = ({ show, size, showOrHideModal, title, description, onFormSubmitHandler, isPostingForm, formComponents, actionButton, preLoadsData, preLoadStatus, dispErrorMessage, errorTitle, errorMessage }) => {
    const [state, setstate] = useState({
        modalSize: size
    })

    const checkIfFormIsPostingData = () => {
        if (!isPostingForm) {
            showOrHideModal()
            return
        }

        // Prevent dismissing if the form is positing data
        let toastText = 'Cannot dismiss as the current operation is still in progress'

        toast.warning(toastText, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const renderModalComponents = () => {
        return (
            <form className="rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                <div className="bg-white pt-5 pb-4 sm:py-6 sm:pb-4">
                    <div className="w-full">
                        <div className="sm:col-span-8 lg:col-span-7 mb-3 px-4 sm:px-6">
                            <h2 className="text-xl text-emerald-600 sm:pr-12">
                                {title}
                            </h2>
                        </div>

                        <div className="w-full max-h-96 overflow-scroll px-4 sm:px-6">
                            {
                                description && (
                                    <p className="text-sm mb-3 text-slate-600">
                                        {description}
                                    </p>
                                )
                            }

                            {
                                formComponents
                            }
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                    <div className="w-12/12 space-y-px">
                        <div className="flex flex-row-reverse items-center align-middle">
                            <button type="button" className="w-full inline-flex justify-center text-sm rounded-md border-0 border-transparent shadow-none px-3 py-1 bg-inherit text-gray-600 hover:bg-gray-200 sm:ml-3 sm:w-auto sm:text-sm" onClick={checkIfFormIsPostingData}>
                                Cancel
                            </button>

                            {
                                isPostingForm ? (
                                    <button type="button" className="w-full inline-flex cursor-not-allowed justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white sm:ml-3 sm:w-auto sm:text-sm disabled:bg-emerald-600" disabled={true}>
                                        <span>
                                            <span className="left-0 inset-y-0 flex items-center">
                                                {
                                                    actionButton.after && (
                                                        <span className="pr-2">
                                                            {actionButton.after}
                                                        </span>
                                                    )
                                                }

                                                <span className="w-5 h-5">
                                                    <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                ) : (
                                    <button type="submit" className="w-full inline-flex justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        {actionButton.before}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={checkIfFormIsPostingData}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={
                                classNames(
                                    state.modalSize === 'sm' ? 'sm:max-w-sm' : null,
                                    state.modalSize === 'md' ? 'sm:max-w-md' : null,
                                    state.modalSize === 'lg' ? 'sm:max-w-lg' : null,
                                    state.modalSize === 'xl' ? 'sm:max-w-xl' : null,
                                    state.modalSize === '2xl' ? 'sm:max-w-2xl' : null,
                                    state.modalSize === '3xl' ? 'sm:max-w-3xl' : null,
                                    state.modalSize === '4xl' ? 'sm:max-w-4xl' : null,
                                    state.modalSize === '5xl' ? 'sm:max-w-5xl' : null,
                                    state.modalSize === '6xl' ? 'sm:max-w-6xl' : null,
                                    'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full'
                                )
                            }>
                            {
                                preLoadsData ? (
                                    // For items that pre load data
                                    preLoadStatus === 'rejected' ? (
                                        <div className="">
                                            {
                                                dispErrorMessage ? (
                                                    <>
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <span className="fal fa-exclamation-circle fa-2x text-red-600"></span>
                                                                </div>
                                                                <div className="mt-3 text-center text-slate-600 sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <span className="text-red-500 mb-4">
                                                                        {errorTitle}
                                                                    </span>

                                                                    <div className="text-sm">
                                                                        {errorMessage}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="button"
                                                                onClick={checkIfFormIsPostingData}
                                                                className="w-full inline-flex justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                                Close
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CommsBreakdown />

                                                        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <div className="w-12/12 space-y-px">
                                                                <div className="flex flex-row-reverse items-center align-middle">
                                                                    <button type="button" className="w-full inline-flex justify-center text-sm rounded-md border-0 border-transparent shadow-none px-3 py-1 bg-inherit text-gray-600 hover:bg-gray-200 sm:ml-3 sm:w-auto sm:text-sm" onClick={checkIfFormIsPostingData}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>
                                    ) : preLoadStatus === 'fulfilled' ? (
                                        renderModalComponents()
                                    ) : (
                                        <div className="py-2">
                                            <Loading />
                                        </div>
                                    )
                                ) : (
                                    // For items that do not pre load data
                                    renderModalComponents()
                                )
                            }
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}