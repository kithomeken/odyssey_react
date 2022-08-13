import { Listbox } from "@headlessui/react"
import React, { useState } from "react"
import { useCountries } from 'use-react-countries'
import { toast } from "react-toastify"

import {ListBoxZero} from "../../../../lib/hooks/ListBoxZero"
import HttpServices from "../../../../services/HttpServices"
import ErrorBanner from "../../../../components/layouts/ErrorBanner"
import { COMPANY_GROUP_CHECK_B4_API_ROUTE, COMPANY_GROUP_UPDATE_API_ROUTE } from "../../../../api/ApiRoutes"
import { DynamicModal } from "../../../../components/lib/DynamicModal"

const EditCompanyGroup = ({ show, showOrHideModal, stateFromParent, companyId, reloadFetchData }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        company: {
            checkCompany: false,
            companyExists: true,
        },
        input: {
            name: '',
            description: '',
            country: '',
            domain: '',
        },
        errors: {
            name: '',
            description: '',
            country: '',
            domain: '',
        },
    })

    const { countries } = useCountries()

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    function updateModalStateWithStateFromParent() {
        let { input } = state

        input.name = stateFromParent.name
        input.country = stateFromParent.country
        input.domain = stateFromParent.domain
        input.description = stateFromParent.description        

        setstate({
            ...state, input
        })
    }

    React.useEffect(() => {
        updateModalStateWithStateFromParent()
    }, []);

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
            let { input }: any = state
            let { errors }: any = state

            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Company ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Company ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 30) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Company ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                        break;

                    case 'description':
                        if (targetValue.length > 100) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Company ' + e.target.name + ' cannot be more than 100 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                        break;

                    default:
                        if (targetValue.length > 100) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Company ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                        break
                }
            }

            setstate({
                ...state, input, errors,
            })
        }
    }

    const checkCompanyNameBeforeUpdate = async () => {
        let { input }: any = state
        let { errors }: any = state
        let { company }: any = state

        const requestData = {
            name: input.name,
            uuid: companyId
        }

        try {
            const response: any = await HttpServices.httpPost(COMPANY_GROUP_CHECK_B4_API_ROUTE, requestData)
            company.checkCompany = false

            if (response.data.success) {
                company.companyExists = false

                // Update the company group details
                updateCompanyGroupDetailsApiPositing()
            } else {
                errors.name = "Company name " + input.name + " already exists"
                company.companyExists = true

                // Return input to the original before check
                input.name = stateFromParent.name
            }

            setstate({
                ...state, errors, company, input
            })
        } catch (error) {
            errors.name = "Could not update company group details. Try again later"
            company.companyExists = true
            company.checkCompany = false

            setstate({
                ...state, errors, company
            })
        }
    }

    const onChangeListBoxHandler = (e: any) => {
        let { input }: any = state
        console.log(e)

        input.country = e
        setstate({
            ...state, input
        })
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { company }: any = state
            let { errors }: any = state
            let { input }: any = state

            if (errors.name.length > 0 || errors.description.length > 0) {
                // Show error notification
                let toastText = 'Kindly all clear errors before submiting form data'

                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                let { isPostingForm } = state
                let requestFailed = state.requestFailed

                isPostingForm = true
                requestFailed = false

                setstate({
                    ...state, isPostingForm, requestFailed
                })

                // Check if company name exists in database
                // If does not exist proceed and update
                checkCompanyNameBeforeUpdate()
            }
        }
    }

    const updateCompanyGroupDetailsApiPositing = async () => {
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        try {
            const requestData = {
                name: input.name,
                uuid: companyId,
                description: input.description,
                domain: input.domain,
                country: input.country,
            }

            const response: any = await HttpServices.httpPost(COMPANY_GROUP_UPDATE_API_ROUTE, requestData)

            if (response.data.success) {
                reloadFetchData()
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
            <DynamicModal
                size="sm"
                show={show}
                actionButton={{
                    before: "Update Details",
                    after: "Updating..."
                }}
                title="Update Company Details"
                showOrHideModal={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                description="Update company group's details"
                formComponents={
                    <>
                        <div className="w-full">
                            {
                                state.requestFailed ? (
                                    <div className="mb-3">
                                        <ErrorBanner message="Failed to amend company group details, please try again later..." />
                                    </div>
                                ) : null
                            }

                            <div className="w-full mb-5">
                                <div className="w-10/12 rounded-md shadow-none space-y-px">
                                    <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                    <div className="w-full flex items-center align-middle">
                                        <div className="w-full">
                                            <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Company Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />
                                        </div>

                                        <div className="w-12 pl-2">
                                            {
                                                state.company.checkCompany ? (
                                                    <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
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

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center">
                                <div className="w-full">
                                    <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description:</label>

                                    <div className="w-full">
                                        <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-500 mt-1 block w-full text-sm border border-gray-300 rounded-md resize-none p-2" placeholder="Company Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                        {
                                            state.errors.description.length > 0 &&
                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                {state.errors.description}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center">
                                <div className="w-full">
                                    <ListBoxZero
                                        onChangeListBoxHandler={onChangeListBoxHandler}
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
                            </div>

                            <div className="rounded-md shadow-none space-y-px mb-6 text-gray-600">
                                <label htmlFor="company-name" className="block mb-1 text-sm">
                                    Company Domain:
                                    <sup className="text-gray-500 ml-2">(Optional)</sup>
                                </label>

                                <div className="w-full form-group">
                                    <div className="w-12/12">
                                        <input type="url" name="domain" id="company-domain" autoComplete="off" onChange={onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" placeholder="https://company-domain.com" value={state.input.domain} />

                                        {state.errors.domain.length > 0 &&
                                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                {state.errors.domain}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}

export default EditCompanyGroup