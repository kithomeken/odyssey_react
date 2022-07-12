import { Transition, Dialog, Listbox } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"

import ErrorBanner from "../../../../components/layouts/ErrorBanner"
import ListBoxZero from "../../../../lib/hooks/ListBoxZero"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"
import { TICKET_STATUS_CHECK_API_ROUTE, TICKET_STATUS_CREATE_API_ROUTE, TICKET_STATUS_SCRM_CAT_API_ROUTE } from "../../../../api/ApiRoutes"

const CreateTicketStatus = ({ show, showOrHideModal, reloadTicketStatusFunc }: { show: any, showOrHideModal: any, reloadTicketStatusFunc: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        requestSucceeded: false,
        input: {
            name: '',
            description: '',
            category: 1,
        },
        errors: {
            name: '',
            description: '',
            category: '',
        },
        status: {
            checkStatus: false,
            statusExists: true
        },
    })

    const dispatch = useDispatch()
    const scrumCategoriesListApiCall = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(TICKET_STATUS_SCRM_CAT_API_ROUTE)

        if (response.status !== 200) {
            throw new Error("Something went wrong while fecthing data.");
        }

        return response.data.data
    }, [dispatch])

    const onChangeListBoxHandler = (e: any) => {
        let { input }: any = state
        input.category = e
        setstate({
            ...state, input
        })
    }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
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

    const onInputBlur = (e: { target: { name: string; value: string } }) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Status ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 4) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Status ' + e.target.name + ' cannot be less than 4 characters'
            } else if (targetValue.length >= 4) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 20) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Status ' + e.target.name + ' cannot be more than 20 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                            checkIfTicketStatusExists()
                        }
                        break;

                    case 'description':
                        if (targetValue.length > 100) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Status ' + e.target.name + ' cannot be more than 100 characters'
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

    const checkIfTicketStatusExists = async () => {
        let { input }: any = state
        let { errors }: any = state
        let { status }: any = state        

        try {
            status.checkStatus = true
            const response: any = await HttpServices.httpPost(TICKET_STATUS_CHECK_API_ROUTE, input)
            status.checkStatus = false

            if (response.data.success) {
                status.statusExists = false
            } else {
                errors.name = "Status name already exists"
                status.statusExists = true
            }

            setstate({
                ...state, errors, status
            })
        } catch (error) {
            errors.name = "Failed to check for status name availability..."
            status.statusExists = true
            status.checkStatus = false
            
            setstate({
                ...state, errors, status
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let { status }: any = state
        let { errors }: any = state

        if (!status.statusExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Post form data
                let { isPostingForm } = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return createTicketStatusApiCall()
            }
        }
    }

    const createTicketStatusApiCall = async () => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        try {
            const response: any = await HttpServices.httpPost(TICKET_STATUS_CREATE_API_ROUTE, input)

            if (response.data.success) {
                input.name = ''
                input.category = 1
                input.description = ''
                requestSucceeded = true
                reloadTicketStatusFunc()
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
                                        <div className="sm:col-span-8 lg:col-span-7 mb-5">
                                            <h2 className="text-xl text-emerald-500 sm:pr-12">Add Status</h2>
                                        </div>

                                        {
                                            scrumCategoriesListApiCall.status === 'rejected' ? (
                                                <>
                                                    <Error500 />

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px">
                                                        <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                            <p className="text-blue-500 text-sm text-right mr-3 ml-5 hover:underline" onClick={showOrHideModal}>Cancel</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : scrumCategoriesListApiCall.status === 'fulfilled' ? (
                                                <form className="w-full max-w-sm" onSubmit={onFormSubmitHandler}>
                                                    {
                                                        state.requestFailed ? (
                                                            <div className="form-group">
                                                                <ErrorBanner message="Failed to add status" />
                                                            </div>
                                                        ) : null
                                                    }

                                                    <div className="w-full mb-3">
                                                        <div className="w-8/12 rounded-md shadow-none space-y-px">
                                                            <div className="w-full flex items-center align-middle">
                                                                <div className="w-full">
                                                                    <ListBoxZero
                                                                        onChangeListBoxHandler={onChangeListBoxHandler}
                                                                        state={state}
                                                                        label="Stage:"
                                                                        listButton={
                                                                            <>
                                                                                {scrumCategoriesListApiCall.value.map((selectedItem: any, index: any) => (
                                                                                    <span key={index}>
                                                                                        {
                                                                                            state.input.category === selectedItem.id ? (
                                                                                                <span className="flex items-center">
                                                                                                    <span className={`flex-shrink-0 h-5 w-4 rounded ${selectedItem.color_code}`}></span>
                                                                                                    <span className="ml-2 text-sm text-gray-700 truncate">{selectedItem.name}</span>
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
                                                                                {scrumCategoriesListApiCall.value.map((listItem: any, index: any) => (
                                                                                    <Listbox.Option
                                                                                        key={listItem.name}
                                                                                        className={({ active }) =>
                                                                                            classNames(
                                                                                                active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                            )
                                                                                        }
                                                                                        value={listItem.id}
                                                                                    >
                                                                                        {({ selected }) => (
                                                                                            <>
                                                                                                <span className="flex items-center">
                                                                                                    <span className={`flex-shrink-0 h-5 w-4 rounded ${listItem.color_code}`}></span>
                                                                                                    <span className="ml-2 text-sm text-gray-700 truncate">{listItem.name}</span>
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

                                                        <span className="text-slate-400 text-xs leading-3">
                                                            Identifies where an issue is in it's lifecycle. Issue's lifecycles is as shown below
                                                        </span>

                                                        <ul className="steps w-full pt-3 z-50">
                                                            {
                                                                scrumCategoriesListApiCall.value.map((listItem: any, index: any) => (
                                                                    <li className="step relative has-tooltip" key={index}>
                                                                        <div className={`h-4 w-4 ${listItem.color_code} hover:border-4 hover:border-${listItem.color_code}-600 absolute rounded-full grid row-start-1`}></div>
                                                                        <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 text-gray-500 -mt-8 z-50'>{listItem.name}</span>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>

                                                    <div className="w-full mb-3">
                                                        <div className="w-8/12 rounded-md shadow-none space-y-px">
                                                            <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                                            <div className="w-full flex items-center align-middle">
                                                                <div className="w-full">
                                                                    <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-emerald-500 text-gray-700 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Status Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />
                                                                </div>

                                                                <div className="w-12 pl-2">
                                                                    {
                                                                        state.status.checkStatus ? (
                                                                            <span className="fad text-emerald-500 fa-spinner-third fa-lg block fa-spin"></span>
                                                                        ) : (
                                                                            null
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            state.errors.name.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.name}
                                                            </span>
                                                        }
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                                                        <div className="w-full">
                                                            <label htmlFor="description" className="block text-sm text-gray-500">Description:</label>

                                                            <div className="w-full">
                                                                <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700 mt-1 block w-full text-sm border border-gray-300 rounded-md resize-none p-2" placeholder="Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                                                {
                                                                    state.errors.description.length > 0 &&
                                                                    <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                        {state.errors.description}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>

                                                        <sub className="text-slate-500 text-xs">
                                                            The relevance of the issue when moved into this status. This will also appear in tooltips
                                                        </sub>
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px">
                                                        <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                            <p className="text-blue-500 text-sm text-right mr-3 ml-5 hover:underline" onClick={showOrHideModal}>Cancel</p>
                                                            {
                                                                state.isPostingForm ? (
                                                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-emerald-300 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300`} disabled={true}>
                                                                        <span>
                                                                            <span className="left-0 inset-y-0 flex items-center pl-3">
                                                                                <span className="pr-2">
                                                                                    Adding...
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
                                                                            Add Status
                                                                        </span>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex flex-col align-middle mt-6 h-16">
                                                    <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                                </div>
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
    )
}

export default CreateTicketStatus