import { Transition, Dialog } from "@headlessui/react"
import React, { FC, Fragment } from "react"
import { toast } from "react-toastify"
import state from "sweetalert/typings/modules/state"
import Loading from "../layouts/Loading"

interface Props {
    title: any,
    show: boolean,
    description: any,
    preLoadStatus?: any,
    formComponents: any,
    showOrHidePanel: any,
    preLoadsData?: boolean,
    isPostingForm: boolean,
    onFormSubmitHandler: any,
    actionButton: {
        before: any,
        after: any
    }
}

export const SideBarPanel: FC<Props> = ({ show, showOrHidePanel, title, description, onFormSubmitHandler, isPostingForm, formComponents, actionButton, preLoadsData, preLoadStatus }) => {
    const checkIfFormIsPostingData = () => {
        if (!isPostingForm) {
            showOrHidePanel()
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

    function renderPanelComponents() {
        return (
            <div className="relative flex-1 mt-20 h-full">
                <div className="absolute inset-0 pt-3">
                    <div className="w-full px-4 sm:px-6">
                        <p className="text-gray-700 text-sm form-group">
                            {description}
                        </p>
                    </div>


                    <form className="rounded-md shadow-none space-y-px form-group pb-10" onSubmit={onFormSubmitHandler}>
                        <div className="w-full px-4 sm:px-6 overflow-scroll">
                            {
                                formComponents
                            }
                        </div>

                        <div className="bg-gray-100 px-4 w-full py-4 bottom-0 fixed sm:px-6 sm:flex sm:flex-row-reverse">
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
                                                        <span className="pr-2">
                                                            {actionButton.after}
                                                        </span>

                                                        <span className="w-5 h-5">
                                                            <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        ) : (
                                            <button type="submit" className="w-full inline-flex justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                {actionButton.before}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={showOrHidePanel}>
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
                                                    onClick={showOrHidePanel}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <span className="fas fa-times border-none text-xl text-white"></span>
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                                            <div className="px-4 shadow sm:px-6 py-6 bg-emerald-200 fixed top-0 w-full z-40">
                                                <Dialog.Title className="text-lg text-emerald-700">
                                                    {title}
                                                </Dialog.Title>
                                            </div>

                                            {
                                                preLoadsData ? (
                                                    // For items that pre load data
                                                    preLoadStatus === 'rejected' ? (
                                                        null
                                                    ) : preLoadStatus === 'fulfilled' ? (
                                                        renderPanelComponents()
                                                    ) : (
                                                        <div className="py-2">
                                                            <Loading />
                                                        </div>
                                                    )
                                                ) : (
                                                    // For items that do not pre load data
                                                    renderPanelComponents()
                                                )
                                            }
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </React.Fragment>
    )
}
