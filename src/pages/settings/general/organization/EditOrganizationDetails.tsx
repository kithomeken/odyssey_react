import React, { Fragment, useState } from "react"
import { useCountries } from 'use-react-countries'
import { Transition, Dialog, Listbox } from "@headlessui/react"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import {ListBoxZero} from "../../../../lib/hooks/ListBoxZero"
import Editor from "../../../../lib/tiptap/Editor"
import { ORGANIZATION_DETAILS_UPDATE_API_ROUTE } from "../../../../api/ApiRoutes"
import HttpServices from "../../../../services/HttpServices"

const EditOrganizationDetails = ({ show, showOrHideModal, stateFromParent, reloadPageState }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            name: '',
            email: '',
            phone: '',
            address: '',
            country: 'Kenya',
            timezone: 'Pacific/Midway',
        },
        errors: {
            name: '',
            email: '',
            phone: '',
            country: '',
            address: '',
            timezone: '',
        },
    })

    const { countries } = useCountries()
    const timezones = require('timezones-list')

    function updateModalStateWithStateFromParent() {
        let { input } = state

        input.name = stateFromParent.name
        input.email = stateFromParent.email
        input.phone = stateFromParent.phone
        input.address = stateFromParent.address
        input.country = stateFromParent.country
        input.timezone = stateFromParent.timezone

        setstate({
            ...state, input
        })
    }

    React.useEffect(() => {
        updateModalStateWithStateFromParent()
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onTipTapChangeHandler = (content: any) => {
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { input } = state
            input.address = content

            setstate({
                ...state, input
            })
        }
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

    const onInputBlur = (e: any) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { errors }: any = state
            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 30) {
                            errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            errors[e.target.name] = ''
                        }
                        break;

                    case 'email':
                        if (targetValue.length > 100) {
                            errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be more than 100 characters'
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
            let { errors } = state
            let validPhoneNumber = isValidPhoneNumber(state.input.phone)

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

    const onChangeListBoxHandler = (e: any, component: any) => {
        let { input }: any = state
        input[component] = e

        setstate({
            ...state, input
        })
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state
            let errorArray: any[] = []

            if (!input['name']) {
                errors['name'] = 'Organization name cannot be empty'
                errorArray.push(errors['name'])
            }

            if (!input['email']) {
                errors['email'] = 'Organization email cannot be empty'
                errorArray.push(errors['email'])
            } else {
                let lastAtPos = input.email.lastIndexOf('@')
                let lastDotPos = input.email.lastIndexOf('.')

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input.email.indexOf('@@') === -1 && lastDotPos > 2 && (input.email.length - lastDotPos) > 2)) {
                    errors.email = 'Please enter a valid email address'
                    errorArray.push(errors['email'])
                }
            }

            if (errorArray.length > 0) {
                // Show notification for clearing errors
                setstate({
                    ...state, errors
                })
            } else {
                setstate({
                    ...state, isPostingForm: true
                })

                updateOrganizationDetailsApiCall()
            }
        }
    }

    const updateOrganizationDetailsApiCall = async () => {
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        try {
            let formData = new FormData()
            formData.append("name", input.name)
            formData.append("email", input.email)
            formData.append("phone", input.phone)
            formData.append("country", input.country)
            formData.append("address", input.address)
            formData.append("timezone", input.timezone)
            const response: any = await HttpServices.httpPost(ORGANIZATION_DETAILS_UPDATE_API_ROUTE, formData)

            if (response.data.success) {
                showOrHideModal('amendDetails')
                reloadPageState()
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, requestFailed, isPostingForm
        })
    }

    return (
        <React.Fragment>
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={() => showOrHideModal('amendDetails')}>
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
                                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-xl md:px-4 md:my-8 lg:max-w-xl">
                                    <div className="w-full rounded bg-white relative flex items-center px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div className="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                            <div className="w-full">
                                                <div className="sm:col-span-8 lg:col-span-7 mb-2">
                                                    <h2 className="text-xl text-emerald-500 sm:pr-12">Organization Details</h2>
                                                </div>

                                                <p className="text-sm mb-3 text-gray-500">
                                                    Update your organization's details
                                                </p>

                                                <form className="shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                                    <div className="w-full pb-3 flex flex-row align-middle">
                                                        <div className="w-7/12 rounded-md pr-3 shadow-none space-y-px">
                                                            <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Organization:</label>

                                                            <div className="w-full flex items-center align-middle">
                                                                <div className="w-full">
                                                                    <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-emerald-500 text-gray-700 p-1-5 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Organization Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                                                    {
                                                                        state.errors.name.length > 0 &&
                                                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                            {state.errors.name}
                                                                        </span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="w-full pb-3 flex flex-row align-middle">
                                                        <div className="w-7/12 rounded-md pr-3 shadow-none space-y-px">
                                                            <label htmlFor="email" className="block mb-1 text-sm text-gray-500">Email:</label>

                                                            <div className="w-full flex items-center align-middle">
                                                                <div className="w-full">
                                                                    <input type="email" name="email" id="email" autoComplete="off" className="focus:ring-1 w-full focus:ring-emerald-500 text-gray-700 p-1-5 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="email@organization.com" onChange={onChangeHandler} value={state.input.email} onBlur={onInputBlur} required />

                                                                    {
                                                                        state.errors.email.length > 0 &&
                                                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                            {state.errors.email}
                                                                        </span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-5/12 shadow-none space-y-px">
                                                            <label htmlFor="phone" className="block mb-1 text-sm text-gray-500">Telephone:</label>

                                                            <PhoneInput
                                                                international
                                                                defaultCountry="KE"
                                                                className="border px-2 border-gray-300 rounded"
                                                                placeholder="Enter phone number"
                                                                value={state.input.phone}
                                                                onChange={(e) => onPhoneInputChange(e)}
                                                                onBlur={onPhoneInputBlur}
                                                                error={state.input.phone ? (isValidPhoneNumber(state.input.phone) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                                            />

                                                            {
                                                                state.errors.phone.length > 0 &&
                                                                <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                    {state.errors.phone}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="w-full pb-3 flex flex-row align-middle">
                                                        <div className="w-5/12 rounded-md shadow-none space-y-px">
                                                            <ListBoxZero
                                                                onChangeListBoxHandler={(e) => onChangeListBoxHandler(e, 'country')}
                                                                state={state}
                                                                label="Country:"
                                                                listButton={
                                                                    <>
                                                                        {countries.map((country, index) => (
                                                                            <span key={index}>
                                                                                {
                                                                                    state.input.country === country.name ? (
                                                                                        <span className="flex items-center">
                                                                                            <span className="flex-shrink-0 h-5 w-4 rounded">{country.emoji}</span>
                                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{country.name}</span>
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
                                                                        {countries.map((country, index) => (
                                                                            <Listbox.Option
                                                                                key={index}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                    )
                                                                                }
                                                                                value={country.name}
                                                                            >
                                                                                {({ selected }) => (
                                                                                    <>
                                                                                        <span className="flex items-center">
                                                                                            <span className="flex-shrink-0 h-5 w-4 rounded">{country.emoji}</span>
                                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{country.name}</span>
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

                                                        <div className="w-7/12 rounded-md ml-3 shadow-none space-y-px">
                                                            <ListBoxZero
                                                                onChangeListBoxHandler={(e) => onChangeListBoxHandler(e, 'timezone')}
                                                                state={state}
                                                                label="Timezone:"
                                                                listButton={
                                                                    <>
                                                                        {timezones.default.map((timezone, index) => (
                                                                            <span key={index}>
                                                                                {
                                                                                    state.input.timezone === timezone.tzCode ? (
                                                                                        <p>
                                                                                            <span className="flex items-center">
                                                                                                <span className="ml-2 text-sm text-gray-700 truncate">{timezone.label}</span>
                                                                                            </span>
                                                                                        </p>
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
                                                                        {timezones.default.map((timezone, index) => (
                                                                            <Listbox.Option
                                                                                key={index}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                    )
                                                                                }
                                                                                value={timezone.tzCode}
                                                                            >
                                                                                {({ selected }) => (
                                                                                    <>
                                                                                        <span className="flex items-center">
                                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{timezone.label}</span>
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
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px">
                                                        <label htmlFor="address" className="block mb-1 text-sm text-gray-500">Address:</label>

                                                        <div className="w-full flex items-center align-middle">
                                                            <div className="w-full">
                                                                {/* <textarea name="address" id="address" rows={3} autoComplete="off" className="focus:ring-1 w-full focus:ring-emerald-500 text-gray-700 p-1-5 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 resize-none" placeholder="Address" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required /> */}

                                                                <Editor
                                                                    content={stateFromParent.address}
                                                                    placeHolder="Add your organization address"
                                                                    onTipTapChangeHandler={onTipTapChangeHandler}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px pt-5">
                                                        <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                            <button type="button" className={`inline-flex items-center px-4 py-1 ml-3 border-0 rounded text-sm text-blue-500 bg-white hover:bg-gray-50 hover:underline hover:border-0 focus:outline-none`} onClick={() => showOrHideModal('amendDetails')}>
                                                                <span className="text-sm">
                                                                    Cancel
                                                                </span>
                                                            </button>

                                                            {
                                                                state.isPostingForm ? (
                                                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
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
                                                                    <button type="submit" className={`inline-flex items-center px-4 py-1 border border-emerald-500 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50`}>
                                                                        <span className="text-sm">
                                                                            Update
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

export default EditOrganizationDetails