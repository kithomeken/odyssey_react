import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Transition } from "@headlessui/react"
import { useNavigate } from "react-router-dom"

import { COMPANY_GROUP_CHECK_API_ROUTE, COMPANY_GROUP_CREATE_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import ErrorBanner from "../../../../components/layouts/ErrorBanner"

const CreateCompanyGroup = () => {
    const [state, setstate] = useState({
        isPostingForm: false,
        requestFailed: false,
        company: {
            checkCompany: false,
            companyExists: false,
        },
        input: {
            name: '',
            description: '',
            domain: '',
            logo: null,
            poc1: '',
            poc2: '',
            poc3: '',
        },
        errors: {
            name: '',
            description: '',
            domain: '',
            logo: '',
            poc1: '',
            poc2: '',
            poc3: '',
        },
    })

    const showButton = false
    const navigate = useNavigate();
    const pageTitle = "Create Company"

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: "" },
        { linkItem: true, title: "Company Groups", url: "" },
        { linkItem: false, title: pageTitle },
    ]

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

    const onFileChangeHandler = (e: any) => {
        let { input }: any = state
        let { errors }: any = state
        let fileSize = (e.target.files[0].size / 1024) / 1024
        let fileType = e.target.files[0].type

        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/svg+xml') {
            errors[e.target.name] = 'Allowed file types are png, jpg, jpeg and svg files'
            setstate({
                ...state
            })
            return
        } else if (fileSize > 1) {
            errors[e.target.name] = 'Maximum file upload size is 1MB'
            setstate({
                ...state
            })
            return
        }

        input[e.target.name] = e.target.files[0]
        errors[e.target.name] = ''
        
        setstate({
            ...state, input, errors
        })
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

                            let { company }: any = state
                            company.checkCompany = true
                            checkIfCompanyExists()
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

    const checkIfCompanyExists = async () => {
        let { input }: any = state
        let { errors }: any = state
        let { company }: any = state

        try {
            const requestData = {
                name: input.name
            }

            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + COMPANY_GROUP_CHECK_API_ROUTE
            const response: any = await HttpServices.httpPost(apiCall, requestData)
            company.checkCompany = false

            if (response.data.success) {
                company.companyExists = false
            } else {
                errors.name = "Company name already exists"
                company.companyExists = true
            }

            setstate({
                ...state, errors, company
            })
        } catch (error) {
            errors.name = "Failed to check for company name availability..."
            company.companyExists = true
            company.checkCompany = false

            setstate({
                ...state, errors, company
            })
        }
    }

    const onPointOfContactBlur = (e: any) => {
        let { input }: any = state
        let { errors }: any = state

        if (input[e.target.name]) {
            let lastAtPos = input[e.target.name].lastIndexOf('@')
            let lastDotPos = input[e.target.name].lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input[e.target.name].indexOf('@@') === -1 && lastDotPos > 2 && (input[e.target.name].length - lastDotPos) > 2)) {
                errors[e.target.name] = 'Please enter a valid email address'
            } else {
                errors[e.target.name] = ''
            }
        }

        setstate({
            ...state, errors
        })
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let companyExists = state.company.companyExists

        if (!companyExists) {
            let { input }: any = state
            let { errors }: any = state
            let errorArray: any[] = []

            if (!input['poc1']) {
                errors['poc1'] = 'At least one point of contact is required'
            }

            setstate({
                ...state, errors
            })

            Object.keys(errors).forEach(function (key) {
                if (errors[key].length > 0) {
                    errorArray.push(errors[key])
                }
            });

            if (errorArray.length > 0) {
                // Show notification for clearing errors
            } else {
                let isPostingForm = state.isPostingForm

                if (!isPostingForm) {
                    setstate({
                        ...state, isPostingForm: true
                    })

                    createCompanyApiCall()
                }
            }
        }
    }

    const createCompanyApiCall = async () => {
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state

        try {
            let formData = new FormData()
            formData.append("company_logo", input.logo)
            formData.append("name", input.name)
            formData.append("description", input.description)
            formData.append("domain", input.domain)
            formData.append("poc1", input.poc1)
            formData.append("poc2", input.poc2)
            formData.append("poc3", input.poc3) 

            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + COMPANY_GROUP_CREATE_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, formData)

            if (response.data.success) {
                input.name = ''
                input.description = ''
                input.domain = ''
                input.logo = null
                input.another = 'N'

                // TO DO: Navigate to newly created company and 
                // Add products the company will have visibility to
                const COMPANY_LIST_ROUTE: any = (generalRoutes.find((routeName) => routeName.name === 'CMPNY'))?.path
                const redirectToRoute = COMPANY_LIST_ROUTE + '/' + response.data.data.uuid
                navigate(redirectToRoute, { replace: true });
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
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                />

                <HeaderParagraph title="Create a new company and add contact information" />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-8/12">
                    {
                        state.requestFailed ? (
                            <ErrorBanner message="Failed to add company group, please try again later..." />
                        ) : null
                    }

                    <form className="w-full form-group" onSubmit={onFormSubmitHandler}>
                        <div className="w-full mb-2">
                            <p className="text-sm text-emerald-500">
                                Company Details
                            </p>
                        </div>

                        <div className="w-full flex mb-3">
                            {/* Left Half */}
                            <div className="w-6/12 px-4 border-r">
                                <div className="w-10/12 rounded-md shadow-none space-y-px mb-5">
                                    <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                    <div className="w-full flex items-center align-middle">
                                        <div className="w-full">
                                            <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" placeholder="Company Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                            {
                                                state.errors.name.length > 0 &&
                                                <span className='invalid-feedback text-xs    text-red-600 pl-0'>
                                                    {state.errors.name}
                                                </span>
                                            }
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

                                <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center">
                                    <div className="w-full">
                                        <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description:</label>

                                        <div className="w-full">
                                            <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-500 mt-1 block w-full sm:text-sm border border-gray-400 rounded-md resize-none p-2" placeholder="Company Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                            {
                                                state.errors.description.length > 0 &&
                                                <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                    {state.errors.description}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Half */}
                            <div className="w-6/12 px-4">
                                <div className="w-11/12 rounded-md shadow-none space-y-px form-group text-gray-600">
                                    <label htmlFor="company-name" className="block mb-1 text-sm">
                                        Company Domain
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

                                <div className="w-11/12 form-group">
                                    <label className="block text-sm text-gray-600">
                                        Company Logo
                                        <sup className="text-gray-500 ml-2">(Optional)</sup>
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-4 pb-4 border-2 border-gray-400 border-dashed rounded-md">
                                        <div className="space-y-1 text-center flex align-middle">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="text-sm w-full ml-3 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="logo" type="file" onChange={onFileChangeHandler} className="sr-only" />
                                                </label>
                                                <p className="pl-1"></p>
                                                <p className="text-xs text-gray-500">png, jpg, jpeg, gif up to 1MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    {state.errors.logo.length > 0 &&
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.logo}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-full mb-2">
                            <p className="text-sm text-emerald-500">
                                Piont Of Contact
                            </p>
                        </div>

                        <div className="w-full flex mb-3">
                            <div className="w-6/12 px-4">
                                <div className="w-full form-group">
                                    <input type="email" name="poc1" id="poc-1" autoComplete="off" onChange={onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-400 disabled:opacity-50" onBlur={onPointOfContactBlur} placeholder="contact@email.com" value={state.input.poc1} />

                                    {state.errors.poc1.length > 0 &&
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.poc1}
                                        </span>
                                    }
                                </div>

                                <div className="mb-3" id="poc_extra"></div>

                                <span className="text-blue-500 text-sm cursor-pointer">
                                    Add another
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-row pt-3 px-4">
                            {
                                state.isPostingForm ? (
                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                        <span>
                                            <span className="left-0 inset-y-0 flex items-center pl-3">
                                                <span className="pr-2">
                                                    Creating Company
                                                </span>

                                                <span className="w-5 h-5">
                                                    <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                ) : (
                                    <button type="submit" disabled={state.company.companyExists} className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                        <span className="text-sm">
                                            Create Company
                                        </span>
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateCompanyGroup