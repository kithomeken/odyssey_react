import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { COMPANY_GROUP_LOGO_APPEND_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import HttpServices from "../../../../services/HttpServices"

const UploadLogoModal = ({ show, showOrHideModal, companyId, updateCompanyLogoState }: { show: any, showOrHideModal: any, companyId: any, updateCompanyLogoState: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            logo: null,
            file_name: null,
        },
        errors: {
            logo: '',
        },
    })

    const onFileChangeHandler = (e: any) => {
        let { input } = state
        let { errors } = state
        let fileSize = (e.target.files[0].size / 1024) / 1024
        let fileType = e.target.files[0].type

        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/svg+xml') {
            errors[e.target.name] = 'Allowed file types are: png, jpg, jpeg and svg files'
            input.logo = null
            input.file_name = null

            setstate({
                ...state
            })

            return
        } else if (fileSize > 1) {
            errors[e.target.name] = 'Maximum file upload size is 1MB'
            input.logo = null
            input.file_name = null

            setstate({
                ...state
            })

            return
        }

        input[e.target.name] = e.target.files[0]
        input.file_name = e.target.files[0].name
        errors[e.target.name] = ''

        setstate({
            ...state, input, errors
        })
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { input } = state
            let { errors } = state

            console.log(e.target)

            if (input.logo === null || input.logo === undefined) {
                errors.logo = 'Kindly select an image to upload'

                setstate({
                    ...state, errors
                })

                return
            } else {
                const imageDetails = input.logo
                let fileSize = (imageDetails.size / 1024) / 1024
                let fileType = imageDetails.type

                if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/svg+xml') {
                    errors.logo = 'Allowed file types are: png, jpg, jpeg and svg files'
                    input.logo = null
                    input.file_name = null

                    setstate({
                        ...state
                    })

                    return
                } else if (fileSize > 1) {
                    errors.logo = 'Maximum file upload size is 1MB'
                    input.logo = null
                    input.file_name = null

                    setstate({
                        ...state
                    })

                    return
                }

                setstate({
                    ...state, isPostingForm: true
                })

                uploadCompanyLogoApiCall()
            }
        }
    }

    const uploadCompanyLogoApiCall = async () => {
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { errors }: any = state
        let { input }: any = state

        try {
            let formData = new FormData()
            formData.append("company_logo", input.logo)
            formData.append("company_uuid", companyId)

            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + COMPANY_GROUP_LOGO_APPEND_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, formData)

            if (response.data.success) {
                input.logo = null
                updateCompanyLogoState(response.data.data.logo, 'Y')
            } else {
                requestFailed = true
                errors.logo = response.data.message
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
                                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-xl md:px-4 md:my-8 lg:max-w-md">
                                    <div className="w-full rounded bg-white relative flex items-center px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div className="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                            <div className="w-full">
                                                <div className="sm:col-span-8 lg:col-span-7 mb-3">
                                                    <h2 className="text-xl text-emerald-500 sm:pr-12">Upload Company Logo</h2>
                                                </div>

                                                <p className="text-sm mb-3 text-gray-500">
                                                    Drag and drop your new company logo
                                                </p>

                                                <form className="rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                                    <div className="h-44 border-2 mb-3 border-slate-400 border-dashed rounded-md flex flex-col justify-center">
                                                        <div className="space-y-1 text-center flex-col align-middle">
                                                            <svg
                                                                className="mx-auto h-14 w-14 text-emerald-400"
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

                                                            <div className="text-sm w-full text-gray-600">
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="relative cursor-pointer bg-white rounded-md text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus:ring focus-within:ring-offset focus-within:ring-indigo-500"
                                                                >
                                                                    <span>Upload company logo,</span>
                                                                    <input id="file-upload" name="logo" type="file" onChange={onFileChangeHandler} className="sr-only" />
                                                                </label>
                                                                <p className="text-xs mt-1 text-gray-500">Formats: png, jpg, jpeg, svg up to 1MB</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        state.input.logo !== null && state.input.logo !== undefined ? (
                                                            <div className="w-full">
                                                                <span className="text-gray-500 block mb-1 text-xs w-full">
                                                                    File Name:
                                                                </span>

                                                                <span className="text-slate-600 block text-xs w-full">
                                                                    <span className="fad fa-file mr-2"></span>
                                                                    {state.input.file_name}
                                                                </span>
                                                            </div>
                                                        ) : null
                                                    }

                                                    {state.errors.logo.length > 0 &&
                                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                            {state.errors.logo}
                                                        </span>
                                                    }

                                                    <div className="w-12/12 rounded-md shadow-none space-y-px pt-5">
                                                        <div className="flex flex-row-reverse pt-3 items-center align-middle">
                                                            <p className="text-blue-500 text-sm text-right mr-3 ml-5 hover:underline hover:cursor-pointer" onClick={showOrHideModal}>Cancel</p>

                                                            {
                                                                state.isPostingForm ? (
                                                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                                                        <span>
                                                                            <span className="left-0 inset-y-0 flex items-center pl-3">
                                                                                <span className="pr-2">
                                                                                    Uploading
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
                                                                            Upload Image
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

export default UploadLogoModal