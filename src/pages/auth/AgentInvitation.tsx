import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../../components/layouts/Loading";

import { APPLICATION_NAME } from "../../global/ConstantsRegistry"
import { useAppSelector } from "../../store/hooks";
import { checkInvitationsActions } from "../../store/invitations/checkInvitationsActions";
import { Status401 } from "../errors/Status401";

export const AgentInvitation = () => {
    const [state, setstate] = useState({
        input: {
            first_name: '',
            last_name: '',
            password: '',
            confirm_passwd: '',
        },
        errors: {
            first_name: '',
            last_name: '',
            password: '',
            confirm_passwd: '',
        }
    });

    const location = useLocation()
    const dispatch = useDispatch()
    const checkInvitationState = useAppSelector(state => state.checkInvitations);

    let searchParams: any = {};
    let searchKey = location.search?.split("?")[1]?.split("&");

    searchKey?.forEach((el) => {
        let [k, v] = el?.split("=");
        searchParams[k] = v.replaceAll("%20", " ");
    });

    const checkInvitationValidity = () => {
        dispatch(checkInvitationsActions(searchParams.endp))
    }

    React.useEffect(() => {
        checkInvitationValidity()
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onInputChangeHandler = (e: any) => {
        let isPostingForm = false

        if (!isPostingForm) {
            let { input } = state
            let { errors } = state
            let valueArray = e.target.value.split(" ")

            for (let i = 0; i < valueArray.length; i++) {
                valueArray[i] = valueArray[i].charAt(0).toUpperCase() + valueArray[i].slice(1)
            }

            input[e.target.name] = valueArray.join(" ")
            errors[e.target.name] = ''

            setstate({
                ...state, input, errors
            })
        }
    }

    const onInputBlur = (e: any) => {
        let isPostingForm = false

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

            let targetName = e.target.name
            let targetValue = e.target.value

            const targetTitle = targetName.charAt(0).toUpperCase() + targetName.slice(1)
            targetValue = targetValue.trim()

            switch (targetName) {
                case 'first_name':
                case 'last_name':
                    if (targetValue.length < 1) {
                        errors[e.target.name] = targetTitle.replace('_', ' ') + ' cannot be empty'
                    } else if (targetValue.length < 2) {
                        input[e.target.name] = targetValue
                        errors[e.target.name] = 'Please provide a valid ' + targetName.replace('_', ' ')
                    } else if (targetValue.length > 12) {
                        errors[e.target.name] = targetTitle.replace('_', ' ') + ' cannot be more than 12 characters'
                    } else {
                        if (targetValue.match(new RegExp('[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]')) ) {
                            errors[e.target.name] = 'Please provide a vaaaaalid ' + targetName.replace('_', ' ')
                        } else {
                            // Remove allowed special characters then test for numbers
                            targetValue = targetValue.replace("'", '')
                            targetValue = targetValue.replace(" ", '')                            

                            if (targetValue.match(new RegExp('[A-Z]')) && targetValue.match(new RegExp('[a-z]'))) {
                                errors[e.target.name] = 'Please provide a vaeeeeelid ' + targetName.replace('_', ' ')
                            }
                        }
                    }
                break;
            }

            setstate({
                ...state, input, errors
            })
        }
    }

    const onPasswordChangeHandler = (e: any) => {
        let isPostingForm = false

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

    const onPasswordInputBlur = (e: any) => {
        let isPostingForm = false

        if (!isPostingForm) {
            let { errors } = state
            let targetName = e.target.name
            let targetValue = e.target.value
            const pwdPolicy = checkInvitationState.response.payload.policies

            switch (targetName) {
                case 'password':
                    if (targetValue.length < 1) {
                        errors[targetName] = 'Password cannot be empty'
                    } else if (targetValue.length < pwdPolicy.min_length) {
                        errors[targetName] = 'Password cannot be less than ' + pwdPolicy.min_length + ' characters'
                    } else if (targetValue.length > pwdPolicy.max_length) {
                        errors[targetName] = 'Password cannot be more than ' + pwdPolicy.max_length + ' characters'
                    } else {

                    }
                    break;
                
                case 'confirm_passwd':
                    if (targetValue.length < 1) {
                        errors[targetName] = 'Kindly confirm your password'
                    } else {
                        if (targetValue !== state.input.password) {
                            errors[targetName] = 'Passwords provided do not match'
                        }
                    }
                break
            }

            setstate({
                ...state, errors
            })
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    {checkInvitationState.title}
                </title>
            </Helmet>

            <div className="wrapper all-white">
                <section className="gx-container">
                    {
                        checkInvitationState.loading ? (
                            <div className="py-4">
                                <Loading />
                            </div>
                        ) : (
                            checkInvitationState.isInvitationValid ? (
                                <>
                                    <header className="landing-header">
                                        <div className="landing-header__left mb-0">
                                            <h2 className="odyssey text-green-500 nunito">Hi there,</h2>
                                            <span className="selected mt-0 mb-3 text-slate-800 text-xl">Welcome to {APPLICATION_NAME}.</span>
                                        </div>
                                    </header>

                                    <div className="w-full mb-4">
                                        <div className="text-sm text-slate-600">
                                            <span className="mb-2 block">
                                                It's great to have you on board!
                                            </span>

                                            We just need a few details about you and we'll have you up and running in a jiffy.
                                        </div>
                                    </div>

                                    <form className="space-y-3 shadow-none px-0 mb-3 pt-4">
                                        <div className="w-full border-b pb-5">
                                            <div className="flex flex-row align-middle">
                                                <div className="w-6/12 mr-2">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="first_name"
                                                            name="first_name"
                                                            placeholder=" "
                                                            onBlur={onInputBlur}
                                                            onChange={onInputChangeHandler}
                                                            value={state.input.first_name}
                                                            className={
                                                                classNames(
                                                                    state.errors.first_name.length > 0 ? 'text-red-900 border-red-400 focus:border-red-600' : 'text-slate-900 border-gray-300 focus:border-green-500',
                                                                    "block px-2 py-2 w-full text-sm  bg-white bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0  focus:bg-white peer"
                                                                )
                                                            }
                                                        />

                                                        <label htmlFor="first_name"
                                                            className={
                                                                classNames(
                                                                    state.errors.first_name.length > 0 ? 'text-red-700 peer-focus:text-red-600' : 'text-slate-700 peer-focus:text-green-600',
                                                                    "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                                                )
                                                            }>
                                                            First Name
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="w-6/12 ml-2">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="last_name"
                                                            name="last_name"
                                                            placeholder=" "
                                                            onBlur={onInputBlur}
                                                            value={state.input.last_name}
                                                            onChange={onInputChangeHandler}
                                                            className={
                                                                classNames(
                                                                    state.errors.last_name.length > 0 ? 'text-red-900 border-red-400 focus:border-red-600' : 'text-slate-900 border-gray-300 focus:border-green-500',
                                                                    "block px-2 py-2 w-full text-sm  bg-white bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0  focus:bg-white peer"
                                                                )
                                                            } />

                                                        <label htmlFor="last_name"
                                                            className={
                                                                classNames(
                                                                    state.errors.last_name.length > 0 ? 'text-red-700 peer-focus:text-red-600' : 'text-slate-700 peer-focus:text-green-600',
                                                                    "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                                                )
                                                            }>
                                                            Last Name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-1 pl-2">
                                                {
                                                    state.errors.first_name.length > 0 &&
                                                    <span className='invalid-feedback text-xs text-red-600 pl-0 py-1 block'>
                                                        {state.errors.first_name}
                                                    </span>
                                                }

                                                {
                                                    state.errors.last_name.length > 0 &&
                                                    <span className='invalid-feedback text-xs text-red-600 pl-0 pt-1 block'>
                                                        {state.errors.last_name}
                                                    </span>
                                                }
                                            </div>
                                        </div>

                                        <div className="w-full pt-2">
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder=" "
                                                    onBlur={onPasswordInputBlur}
                                                    value={state.input.password}
                                                    onChange={onPasswordChangeHandler}
                                                    className={
                                                        classNames(
                                                            state.errors.password.length > 0 ? 'text-red-900 border-red-400 focus:border-red-600' : 'text-slate-900 border-gray-300 focus:border-green-500',
                                                            "block px-2 py-2 w-full text-sm  bg-white bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0  focus:bg-white peer"
                                                        )
                                                    } />

                                                <label htmlFor="password"
                                                    className={
                                                        classNames(
                                                            state.errors.password.length > 0 ? 'text-red-700 peer-focus:text-red-600' : 'text-slate-700 peer-focus:text-green-600',
                                                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                                        )
                                                    }>
                                                    Password
                                                </label>
                                            </div>

                                            {
                                                state.errors.password.length > 0 &&
                                                <span className='invalid-feedback text-xs text-red-600 pl-2 pt-1 block'>
                                                    {state.errors.password}
                                                </span>
                                            }
                                        </div>

                                        <div className="w-full pt-2">
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    placeholder=" "
                                                    id="confirm_passwd"
                                                    name="confirm_passwd"
                                                    onBlur={onPasswordInputBlur}
                                                    value={state.input.confirm_passwd}
                                                    onChange={onPasswordChangeHandler}
                                                    className={
                                                        classNames(
                                                            state.errors.confirm_passwd.length > 0 ? 'text-red-900 border-red-400 focus:border-red-600' : 'text-slate-900 border-gray-300 focus:border-green-500',
                                                            "block px-2 py-2 w-full text-sm  bg-white bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0  focus:bg-white peer"
                                                        )
                                                    } />

                                                <label htmlFor="confirm_passwd"
                                                    className={
                                                        classNames(
                                                            state.errors.confirm_passwd.length > 0 ? 'text-red-700 peer-focus:text-red-600' : 'text-slate-700 peer-focus:text-green-600',
                                                            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                                        )
                                                    }>
                                                    Confirm Password
                                                </label>
                                            </div>

                                            {
                                                state.errors.confirm_passwd.length > 0 &&
                                                <span className='invalid-feedback text-xs text-red-600 pl-2 pt-1 block'>
                                                    {state.errors.confirm_passwd}
                                                </span>
                                            }
                                        </div>

                                        <div className="mb-3 pt-3 px-0 flex flex-row-reverse">
                                            <button type="button" className="w-full inline-flex justify-center text-sm rounded-md border border-transparent shadow-sm px-6 py-1-5 bg-green-600 hover:bg-green-600 text-white sm:ml-3 sm:w-auto sm:text-sm disabled:bg-green-600">
                                                <span>
                                                    <span className="left-0 inset-y-0 flex items-center align-middle">
                                                        <span className="pr-2">
                                                            Complete
                                                        </span>

                                                        <span className="w-5 h-5">
                                                            {/* <i className="fad fa-spinner-third fa-lg fa-spin"></i> */}
                                                            <i className="fad fa-check-circle fa-lg"></i>
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Status401
                                        title="Unauthorised Access"
                                        description="The invitation link you followed is probably broken or the lifespan has expired. Kindly request for a new invitation link"
                                    />

                                    <hr />

                                    <div className="flex flex-row py-3">
                                        <span className="text-sm m-auto text-gray-600 ">{APPLICATION_NAME}</span>
                                    </div>
                                </>
                            )
                        )
                    }
                </section>
            </div>
        </React.Fragment>
    )
}