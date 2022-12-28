import React, { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import HttpServices from "../../services/HttpServices"
import twoFactorImage from '../../assets/images/5064257.png'
import {ACCOUNT_PASSWORD_CHANGE} from "../../api/accountApiRoutes";
import { FloatingLabelInput } from "../../components/lib/FloatingLabelInput"
import { accountSignOutActions } from "../../store/auth/accountSignOutActions"

export const Security = () => {
    const [state, setstate] = useState({
        isPostingForm: false,
        input: {
            current: '',
            new: '',
        },
        errors: {
            current: '',
            new: '',
        }
    })

    const dispatch = useDispatch()

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
                errors[e.target.name] = 'Kindly enter your ' + e.target.name + ' password'
            } else {
                switch (e.target.name) {
                    case 'current':

                        break;

                    case 'new':
                        if (state.input.current === targetValue) {
                            errors[e.target.name] = 'New password cannot be same as current'
                        }
                        break;
                }
            }

            setstate({
                ...state, errors,
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            setstate({
                ...state, isPostingForm: true
            })

            changeAccountPasswordApiCall()
        }
    }

    const changeAccountPasswordApiCall = async () => {
        try {
            let { input } = state
            let formData = new FormData()
            formData.append('current', input.current)
            formData.append('password', input.new)

            const response = await HttpServices.httpPost(ACCOUNT_PASSWORD_CHANGE, formData)

            if (response.data.success) {
                // Dispatch sign out redux action to clear the session
                dispatch(accountSignOutActions())
            } else {
                const errorMsg = response.data.error.message
                const messageKeys = Object.keys(errorMsg)

                messageKeys.map((message) => {
                    const singleErrorMessage = errorMsg[message]
                    let { errors } = state

                    errors[message] = singleErrorMessage
                    setstate({
                        ...state, errors
                    })
                })
            }

            setstate({
                ...state,
                isPostingForm: false
            })
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

            setstate({
                ...state,
                isPostingForm: false
            })
        }
    }

    return (
        <React.Fragment>
            <div className="w-9/12 m-auto">
                <p className="text-xl text-slate-600 mb-3">
                    Security
                </p>

                <div className="w-full pl-1 pt-2 pb-4">
                    <p className="text-sm text-emerald-600 mb-5">
                        Change account password

                        <span className="text-sm text-slate-500 block">
                            Set-up a new password for your account
                        </span>
                    </p>

                    <div className="rounded-md mb-4 border-0 border-orange-400 bg-orange-100 py-3 px-4">
                        <div className="flex flex-row text-orange-700">
                            <i className="fas fa-exclamation-circle fa-lg mt-1 text-orange-500 flex-none"></i>

                            <div className="flex-auto ml-1">
                                <span className="text-sm pl-3 block text-orange-700 mb-1">
                                    By changing your password, you'll be automatically signed out from all your devices and requested to sign in again
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="w-11/12 pl-6 pb-2 shadow-none space-y-px" onSubmit={onFormSubmitHandler}>
                    <div className="pb-1 w-7/12 pr-2">
                        <FloatingLabelInput
                            name="current"
                            type="password"
                            label="Current Password"
                            value={state.input.current}
                            inputError={state.errors.current}
                            onInputBlur={onInputBlur}
                            required={true}
                            onChangeHandler={onChangeHandler}
                            isPostingForm={state.isPostingForm}
                        />
                    </div>

                    <div className="flex flex-row mb-2">
                        <div className="w-7/12 pr-2">
                            <FloatingLabelInput
                                name="new"
                                type="password"
                                label="New Password"
                                value={state.input.new}
                                inputError={state.errors.new}
                                onInputBlur={onInputBlur}
                                required={true}
                                onChangeHandler={onChangeHandler}
                                isPostingForm={state.isPostingForm}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row w-7/12 pr-2 pb-4">
                        {
                            state.isPostingForm ? (
                                <button
                                    type="button"
                                    className={`inline-flex items-center px-4 py-1 border border-emerald-600 rounded shadow-sm text-sm text-white bg-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2  disabled:opacity-50`}>
                                    <span className="left-0 inset-y-0 flex items-center">
                                        <span className="pr-2">
                                            Changing
                                        </span>

                                        <span className="w-5 h-5">
                                            <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                        </span>
                                    </span>
                                </button>
                            ) : (
                                <button type="submit" className={`inline-flex items-center px-4 py-1 border border-emerald-500 rounded shadow-sm text-sm text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50`}>
                                    <span className="text-sm w-16">
                                        Change
                                    </span>
                                </button>
                            )
                        }
                    </div>
                </form>

                <hr />

                <div className="w-full pl-1 pt-3 pb-3">
                    <div className="flex flex-row align-middle">
                        <p className="text-sm text-emerald-600 mb-3 flex-auto">
                            Two-step authentication

                            <span className="text-sm text-slate-500 block">
                                Add an extra layer of security around your account.
                            </span>
                        </p>

                        <span className="text-sm text-blue-600 block mb-3">
                            Setup
                        </span>
                    </div>

                    <div className="m-auto w-56">
                        <div className="pb-4 m-auto">
                            <img src={twoFactorImage} alt="broken_robot" className="block text-center m-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}