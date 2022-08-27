import { Transition } from "@headlessui/react"
import React, { FC, useState } from "react"
import { toast } from "react-toastify"
import { AUTHENTICATED_ACCOUNT_EMAIL_HIST, CHANGE_ACCOUNT_EMAIL_ADDR, RESEND_CHANGE_EMAIL_VERIFICATION, UNDO_CHANGE_ACCOUNT_EMAIL_ADDR } from "../../api/ApiRegistry"
import Loading from "../../components/layouts/Loading"
import DateFormating from "../../lib/hooks/DateFormating"
import HttpServices from "../../services/HttpServices"
import { useAppSelector } from "../../store/hooks"
import Error500 from "../errors/Error500"

interface Props {
    data: any,
    status: any,
    updateTabStatus: any,
    updateTabDataState: any,
}

export const ChangeEmail: FC<Props> = ({data, status, updateTabStatus, updateTabDataState}) => {
    const [state, setstate] = useState({
        isPostingForm: false,
        input: {
            email: ''
        },
        errors: {
            email: ''
        },
        process: {
            type: '',
            state: false,
        }
    })

    const authenticationState = useAppSelector(state => state.auth)

    const fetchAccountEmailHistory = async () => {
        try {
            const response = await HttpServices.httpGet(AUTHENTICATED_ACCOUNT_EMAIL_HIST)

            if (response.data.success) {
                status = 'fulfilled'
                data = response.data.payload
            } else {
                status = 'rejected'
            }

            updateTabDataState('email', data)
            updateTabStatus('email', status)
        } catch (error) {
            updateTabStatus('email', 'rejected')
        }
    }

    React.useEffect(() => {
        fetchAccountEmailHistory();
    }, []);

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const onChangeHandler = (e: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { input } = state
            let { errors } = state

            input[e.target.name] = e.target.value
            errors[e.target.name] = ''

            setstate({
                ...state, input, errors
            })
        }
    }

    const onInputBlur = (e: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { errors } = state
            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                errors[e.target.name] = 'Please provide an email address'
            } else if (targetValue.length < 5) {
                errors[e.target.name] = 'Please provide a valide email address'
            } else if (targetValue.length > 50) {
                errors[e.target.name] = 'Email address cannot be more than 50 characters'
            } else {
                let lastAtPos = targetValue.lastIndexOf('@')
                let lastDotPos = targetValue.lastIndexOf('.')

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && targetValue.indexOf('@@') === -1 && lastDotPos > 2 && (targetValue.length - lastDotPos) > 2)) {
                    errors[e.target.name] = 'Please provide a valid email address'
                } else {
                    // Check email address provided
                    errors[e.target.name] = ''

                    if (state.input.email === authenticationState.email) {
                        errors[e.target.name] = 'Please provide another email as this is your current email address'
                    } else {
                        const emailHistory = data.emails
                        Object.keys(emailHistory).forEach(function (key) {
                            if (emailHistory[key].email === state.input.email) {
                                errors[e.target.name] = 'Please provide another email as this is your current email address'
                            }
                        })
                    }
                }
            }

            setstate({
                ...state, errors,
            })
        }
    }

    const formValidationHandler = () => {
        let { errors } = state
        let postForm = true
        let targetValue = state.input.email
        targetValue = targetValue.trim()

        if (targetValue.length < 1) {
            errors['email'] = 'Please provide an email address'
            postForm = false
        } else if (targetValue.length < 5) {
            errors['email'] = 'Please provide a valide email address'
            postForm = false
        } else if (targetValue.length > 50) {
            errors['email'] = 'Email address cannot be more than 50 characters'
            postForm = false
        } else {
            let lastAtPos = targetValue.lastIndexOf('@')
            let lastDotPos = targetValue.lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && targetValue.indexOf('@@') === -1 && lastDotPos > 2 && (targetValue.length - lastDotPos) > 2)) {
                errors['email'] = 'Please provide a valid email address'
                postForm = false
            } else {
                // Check email address provided
                errors['email'] = ''

                if (state.input.email === authenticationState.email) {
                    errors['email'] = 'Please provide another email as this is your current email address'
                    postForm = false
                } else {
                    const emailHistory = data.emails
                    Object.keys(emailHistory).forEach(function (key) {
                        if (emailHistory[key].email === state.input.email) {
                            errors['email'] = 'Please provide another email as this is your current email address'
                            postForm = false
                        }
                    })
                }
            }
        }

        setstate({
            ...state, errors,
        })

        return postForm
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            const postForm = formValidationHandler()

            if (postForm) {
                setstate({
                    ...state, isPostingForm: true
                })

                changeAccountEmailApiCall()
            }
        }
    }

    const changeAccountEmailApiCall = async () => {
        let { input } = state

        try {
            let formData = new FormData()
            formData.append('email', input.email)
            const response = await HttpServices.httpPost(CHANGE_ACCOUNT_EMAIL_ADDR, formData)

            if (response.status === 200) {
                input.email = ''
                setstate({
                    ...state, input
                })

                fetchAccountEmailHistory()
            } else {
                let toastText = "Something went wrong, could not complete request"

                toast.error(toastText, {
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
            let toastText = "Something went wrong, could not complete request"

            toast.error(toastText, {
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
            ...state, isPostingForm: false
        })
    }

    const undoAccountEmailChangeApiCall = async () => {
        let { process } = state

        if (!process.state) {
            try {
                process.state = true
                process.type = 'undo'

                setstate({
                    ...state, process
                })

                const response = await HttpServices.httpPostWithoutData(UNDO_CHANGE_ACCOUNT_EMAIL_ADDR)
                if (response.status === 200) {
                    fetchAccountEmailHistory()
                } else {
                    let toastText = "Something went wrong, could not complete request"

                    toast.error(toastText, {
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
                let toastText = "Something went wrong, could not complete request"

                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            process.state = false
            process.type = ''

            setstate({
                ...state, process
            })
        }
    }

    const resendEmailVerificationApiCall = async () => {
        let { process } = state

        if (!process.state) {
            try {
                process.state = true
                process.type = 'resend'

                setstate({
                    ...state, process
                })

                const response = await HttpServices.httpPostWithoutData(RESEND_CHANGE_EMAIL_VERIFICATION)

                if (response.data.success) {
                    let toastText = "Verification email resent"

                    toast.success(toastText, {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    let toastText = response.data.error.message

                    toast.error(toastText, {
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
                let toastText = "Something went wrong, could not complete request"

                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            process.state = false
            process.type = ''

            setstate({
                ...state, process
            })
        }
    }

    return (
        <React.Fragment>
            <div className="w-full">
                <p className="text-lg text-slate-600 mb-3">
                    Change your e-mail
                </p>

                {
                    status === 'rejected' ? (
                        <Error500 />
                    ) : status === 'fulfilled' ? (
                        <>
                            <p className="text-sm text-slate-500 mb-1">
                                <span className="text-slate-700 mr-2">
                                    Current e-mail address:
                                </span>

                                <span className="text-green-700 mr-2">
                                    {authenticationState.email}
                                </span>
                            </p>

                            {
                                data.verified === null ? (
                                    <div className="w-9/12 pt-3 pb-2">
                                        <div className="rounded-md mb-2 border-0 border-sky-400 bg-sky-100 py-4 px-4">
                                            <div className="flex flex-row text-sky-700">
                                                <i className="fas fa-exclamation-circle fa-lg mt-1 text-blue-700 flex-none"></i>

                                                <div className="flex-auto ml-1">
                                                    <span className="text- pl-3 block text-blue-800 mb-1">
                                                        Verification pending
                                                    </span>

                                                    <span className="text-sm pl-3 block text-blue-800 mb-4">
                                                        A verification email was sent to <span className="text-slate-800">{data.emails[0].email}</span>, kindly check your email to complete the update.
                                                    </span>

                                                    <div className="flex flex-row">
                                                        <button onClick={resendEmailVerificationApiCall} className="text-xs pl-3 text-sky-700 hover:text-sky-800 block hover:underline">
                                                            {
                                                                state.process.type === 'resend' ? 'Resending' : 'Resend email'
                                                            }
                                                        </button>

                                                        <span className="mx-2 text-sm">|</span>

                                                        <button onClick={undoAccountEmailChangeApiCall} className="text-xs text-sky-700 hover:text-sky-900 block hover:underline">
                                                            {
                                                                state.process.type === 'undo' ? 'Undoing' : 'Undo email change'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-9/12 py-3">
                                            <div className="rounded-md mb-2 border-0 border-amber-400 bg-amber-100 py-4 px-4">
                                                <div className="flex flex-row items-center align-middle text-amber-700">
                                                    <i className="fad fa-exclamation-triangle fa-lg mt-1 text-amber-600 flex-none"></i>

                                                    <div className="flex-auto ml-1">
                                                        <span className="text-sm pl-3 block">
                                                            You can only change your email a maximum of 3 times.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="text-xs block text-slate-500 pb-3">
                                                Email changes left - 3
                                            </span>
                                        </div>

                                        <form className=" w-9/12 rounded-md shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                                            <div className="w-full text-sm mb-4">
                                                <div className="relative z-0 w-96">
                                                    {
                                                        state.isPostingForm ? (
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                placeholder=" "
                                                                required
                                                                disabled
                                                                onChange={onChangeHandler}
                                                                value={state.input.email}
                                                                autoComplete="off"
                                                                className="pt-2 pb-2 block w-full text-slate-700 mt-0 bg-transparent border rounded px-4 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 border-gray-300 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        ) : (
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                placeholder=" "
                                                                required
                                                                onBlur={onInputBlur}
                                                                autoComplete="off"
                                                                onChange={onChangeHandler}
                                                                value={state.input.email}
                                                                className={classNames(
                                                                    state.errors.email.length > 0 ? 'text-red-700 border-red-400' : 'text-slate-700 border-gray-300',
                                                                    "pt-2 pb-2 block w-full  mt-0 bg-transparent border rounded px-4 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 text-sm"
                                                                )}
                                                            />
                                                        )
                                                    }

                                                    <label htmlFor="email" className={classNames(
                                                        state.isPostingForm ? 'text-gray-400' : 'text-gray-500',
                                                        state.errors.email.length ? 'text-red-500' : 'text-gray-500',
                                                        "absolute duration-300 bg-white top-2 px-2 ml-2 -z-1 origin-0"
                                                    )}>E-mail Address</label>
                                                </div>

                                                {
                                                    state.errors.email.length > 0 &&
                                                    <span className='invalid-feedback text-xs block text-red-600 pl-0 py-1'>
                                                        {state.errors.email}
                                                    </span>
                                                }
                                            </div>

                                            <div className="w-96 flex flex-row pb-5">
                                                {
                                                    state.isPostingForm ? (
                                                        <button
                                                            type="button"
                                                            className={`inline-flex items-center px-4 py-1 border border-emerald-600 rounded shadow-sm text-sm text-white bg-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2  disabled:opacity-50`}>
                                                            <span className="left-0 inset-y-0 flex items-center">
                                                                <span className="pr-2">
                                                                    Updating
                                                                </span>

                                                                <span className="w-5 h-5">
                                                                    <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                                </span>
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <button type="submit" className={`inline-flex items-center px-4 py-1 border border-emerald-500 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50`}>
                                                            <span className="text-sm w-16">
                                                                Update
                                                            </span>
                                                        </button>
                                                    )
                                                }
                                            </div>

                                            <hr />
                                        </form>
                                    </>
                                )
                            }

                            <div className="w-full pl-1 pt-3">
                                <p className="text-sm text-slate-700 mb-5">
                                    Email address history

                                    <span className="text-sm text-slate-500 block">
                                        Previous e-mail addresses that you've used
                                    </span>
                                </p>

                                <div className="flex flex-row border-b pb-2 align-middle w-9/12">
                                    <div className="flex-auto">
                                        <span className="py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">
                                            E-mail Address
                                        </span>
                                    </div>

                                    <div className="w-32">
                                        <span className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">
                                            Added On
                                        </span>
                                    </div>
                                </div>

                                {
                                    data.emails.map((account: any, index: any) => {
                                        return (
                                            <div key={index} className="flex flex-row border-b w-9/12 divide-gray-200 align-middle">
                                                <div className="flex-auto">
                                                    <div className="py-2 whitespace-wrap">
                                                        <span className="block text-slate-600 mb-1 text-sm">
                                                            {account.email}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="w-auto flex align-middle items-center text-left flex-row">
                                                    <div className="py-2 whitespace-wrap">
                                                        {
                                                            data.verified === null && index === 0 ? (
                                                                <span className="block text-amber-600 mb-1 text-xs">
                                                                    Pending Verification
                                                                </span>
                                                            ) : (
                                                                account.email === authenticationState.email ? (
                                                                    <span className="block text-emerald-700 mb-1 text-xs">
                                                                        Current Email
                                                                    </span>
                                                                ) : (
                                                                    <span className="block text-slate-600 mb-1 text-xs">
                                                                        <DateFormating dateString={account.created_at} />
                                                                    </span>
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    ) : (
                        <div className="py-5">
                            <Loading />
                        </div>
                    )
                }
            </div>
        </React.Fragment >
    )
}