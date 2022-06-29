import { Dialog, Listbox, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { COMPANY_GROUP_CONTACT_ADD_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"

import ErrorBanner from "../../../../components/layouts/ErrorBanner"
import Loading from "../../../../components/layouts/Loading"
import ListBoxZero from "../../../../lib/hooks/ListBoxZero"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"

const AddContact = ({ show, showOrHideModal, companyId, orgnztn_country, reloadContactsTable }: { show: any, showOrHideModal: any, companyId: any, orgnztn_country: any, reloadContactsTable: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        requestSucceeded: false,
        productsListIsEmpty: false,
        input: {
            name: '',
            email: '',
            country: '',
            phone: '',
        },
        errors: {
            name: '',
            email: '',
            country: '',
            phone: '',
        },
    })

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const onChangeHandler = (e: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state
            let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

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
            let { errors }: any = state
            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                errors[e.target.name] = 'Contact ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                errors[e.target.name] = 'Contact ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 30) {
                            errors[e.target.name] = 'Contact ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            errors[e.target.name] = ''
                        }
                        break;

                    case 'email':
                        if (targetValue.length > 100) {
                            errors[e.target.name] = 'Contact ' + e.target.name + ' cannot be more than 100 characters'
                        } else {
                            let lastAtPos = targetValue.lastIndexOf('@')
                            let lastDotPos = targetValue.lastIndexOf('.')

                            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && targetValue.indexOf('@@') === -1 && lastDotPos > 2 && (targetValue.length - lastDotPos) > 2)) {
                                errors[e.target.name] = 'Please enter a valid email address'
                            } else {
                                errors[e.target.name] = ''
                            }
                        }
                        break;
                }
            }

            setstate({
                ...state, errors,
            })
        }
    }

    const onPhoneInputChange = (e: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { input } = state
            input.phone = e

            setstate({
                ...state, input
            })
        }
    }

    const onPhoneInputBlur = () => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input } = state
            let { errors }: any = state

            const validPhoneNumber = isValidPhoneNumber(state.input.phone)
            input.country = parsePhoneNumber(input.phone)?.country

            if (validPhoneNumber) {
                errors['phone'] = ''
            } else {
                errors['phone'] = 'This is not a valid phone number'
            }

            setstate({
                ...state, errors, input
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { errors }: any = state
            let { input }: any = state
            let errorArray: any[] = []

            if (!input['name']) {
                errors['name'] = 'Contact name cannot be empty'
                errorArray.push(errors['name'])
            }

            if (!input['email']) {
                errors['email'] = 'Contact name cannot be empty'
                errorArray.push(errors['email'])
            } else {
                let lastAtPos = input.email.lastIndexOf('@')
                let lastDotPos = input.email.lastIndexOf('.')

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input.email.indexOf('@@') === -1 && lastDotPos > 2 && (input.email.length - lastDotPos) > 2)) {
                    errors.email = 'Please enter a valid email address'
                    errorArray.push(errors['email'])
                }
            }

            if (!input['phone']) {
                errors['phone'] = 'Contact phone cannot be empty'
                errorArray.push(errors['phone'])
            } else {
                if (errors['phone'].length > 0) {
                    errorArray.push(errors['phone'])
                }
            }

            setstate({
                ...state, errors
            })

            if (errorArray.length < 1) {
                setstate({
                    ...state, isPostingForm: true
                })

                addContactDetailsApiCall()
            } else {
                console.log(state);
                console.log(errorArray);
                
                alert('Fill all items before posting the form')
            }
        }
    }

    const addContactDetailsApiCall = async () => {
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { errors }: any = state
        let { input }: any = state

        try {
            let formData = new FormData()
            formData.append("company_uuid", companyId)
            formData.append("name", input.name)
            formData.append("email", input.email)
            formData.append("phone", input.phone)
            formData.append("country", input.country)

            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + COMPANY_GROUP_CONTACT_ADD_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, formData)

            if (response.data.success) {
                input.name = ''
                input.email = ''
                input.phone = ''
                input.country = ''

                reloadContactsTable()
            } else {
                requestFailed = true
                errors.email = response.data.message
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm, errors
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
                                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-xl md:px-4 md:my-8 lg:max-w-sm">
                                    <div className={classNames(
                                        state.productsListIsEmpty ? 'bg-white' : 'bg-white',
                                        'w-full rounded relative flex items-center px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'
                                    )}>
                                        <div className="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                            <div className="w-full">
                                                <div className="sm:col-span-8 lg:col-span-7 mb-3">
                                                    <h2 className="text-xl text-emerald-500 sm:pr-12">Add Point of Contact</h2>
                                                </div>

                                                <p className="text-sm mb-3 text-gray-500">
                                                    Add a focal point of information to be contacted when there's a need be.
                                                </p>

                                                <form className="rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                                    {
                                                        state.requestFailed ? (
                                                            <div className="form-group">
                                                                <ErrorBanner message="Failed to add product." />
                                                            </div>
                                                        ) : null
                                                    }

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px mb-4">
                                                        <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Contact Person:</label>

                                                        <div className="w-9/12 flex items-center align-middle">
                                                            <div className="w-full">
                                                                <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-1-5 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" placeholder="Contact Person" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />
                                                            </div>
                                                        </div>

                                                        {
                                                            state.errors.name.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.name}
                                                            </span>
                                                        }
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px pb-4">
                                                        <label htmlFor="email" className="block mb-1 text-sm text-gray-500">Email:</label>

                                                        <div className="w-9/12 flex items-center align-middle">
                                                            <div className="w-full">
                                                                <input type="text" name="email" id="email" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-1-5 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" placeholder="contact@email-address.com" onChange={onChangeHandler} value={state.input.email} onBlur={onInputBlur} required />
                                                            </div>
                                                        </div>

                                                        {
                                                            state.errors.email.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.email}
                                                            </span>
                                                        }
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px pb-5">
                                                        <label htmlFor="phone" className="block mb-1 text-sm text-gray-500">Phone:</label>

                                                        <div className="w-12/12 flex items-center align-middle">
                                                            <div className="w-full">
                                                                <PhoneInput
                                                                    international
                                                                    defaultCountry={orgnztn_country}
                                                                    placeholder="Enter phone number"
                                                                    value={state.input.phone}
                                                                    onChange={(e) => onPhoneInputChange(e)}
                                                                    onBlur={onPhoneInputBlur}
                                                                    error={state.input.phone ? (isValidPhoneNumber(state.input.phone) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                                                />
                                                            </div>
                                                        </div>

                                                        {
                                                            state.errors.phone.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.phone}
                                                            </span>
                                                        }
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
                                                                                    Adding
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
                                                                            Add Contact
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

export default AddContact