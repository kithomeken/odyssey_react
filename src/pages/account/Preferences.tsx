import React, { FC, useState } from "react"

import HttpServices from "../../services/HttpServices"
import { ACCOUNT_PREFERENCES_, SET_ACCOUNT_TIMEZONE_ } from "../../api/ApiRegistry"
import Error500 from "../errors/Error500"
import Loading from "../../components/layouts/Loading"
import { Listbox } from "@headlessui/react"
import { ListBoxZero } from "../../lib/hooks/ListBoxZero"
import { toast } from "react-toastify"
import CookieServices from "../../services/CookieServices"
import { TIMEZONE_COOKIE_NAME } from "../../global/CookieNames"
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry"
import Crypto from "../../encryption/Crypto"

interface Props {
    data: any,
    status: any,
    updateTabStatus: any,
    updateTabDataState: any,
}

export const Preferences: FC<Props> = ({ data, status, updateTabStatus, updateTabDataState }) => {
    const [state, setstate] = useState({
        isPostingForm: false,
        input: {
            country: 'Kenya',
            timezone: 'Pacific/Midway',
        },
        errors: {
            country: '',
            timezone: '',
        },
    })

    // const { countries } = useCountries()
    const timezones = require('timezones-list')

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const fetchAccountPreferencesApiCall = async () => {
        try {
            const response = await HttpServices.httpGet(ACCOUNT_PREFERENCES_)

            if (response.data.success) {
                status = 'fulfilled'
                data = response.data.payload
            } else {
                status = 'rejected'
            }

            let {input} = state
            input.country = data.preferences.country
            input.timezone = data.preferences.timezone

            setstate({
                ...state, input
            })

            updateTabDataState('preferences', data)
            updateTabStatus('preferences', status)
        } catch (error) {
            updateTabStatus('preferences', 'rejected')
        }
    }

    const updateComponentState = () => {        
        let {input} = state
        input.country = data.preferences.country
        input.timezone = data.preferences.timezone

        setstate({
            ...state, input
        })
    }

    React.useEffect(() => {
        if (data === null || data === undefined) {
            fetchAccountPreferencesApiCall();
        } else {
            updateComponentState()
        }
    }, [data]);

    const onChangeTimezoneHandler = async (e: any) => {
        const timezoneBeforeUpdate = state.input.timezone
        let { input } = state
        input.timezone = e

        setstate({
            ...state, input
        })

        try {
            let formData = new FormData()
            formData.append('timezone', input.timezone)
            const response = await HttpServices.httpPost(SET_ACCOUNT_TIMEZONE_, formData)

            if (response.status === 200) {
                let selectedTimezone = null
                
                timezones.default.map((timezone) => {
                    if (timezone.tzCode === input.timezone) {
                        selectedTimezone = "(GMT " + timezone.utc + ") - " +timezone.tzCode
                    }
                })
                
                const enTimezone = Crypto.encryptDataUsingAES256(selectedTimezone)
                CookieServices.set(TIMEZONE_COOKIE_NAME, enTimezone, COOKIE_OPTIONS)
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

                input.timezone = timezoneBeforeUpdate
                setstate({
                    ...state, input
                })
            }
        } catch (error) {
            console.log(error);
            
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

            input.timezone = timezoneBeforeUpdate            

            setstate({
                ...state, input
            })
        }        
    }

    return (
        <React.Fragment>
            <div className="w-9/12 m-auto">
                <p className="text-lg text-slate-600 mb-3">
                    Preferences

                    <span className="text-sm text-slate-500 block">
                        Account specific controls
                    </span>
                </p>

                {
                    status === 'rejected' ? (
                        <Error500 />
                    ) : status === 'fulfilled' ? (
                        <div className="w-full pt-2 pb-4">
                            <div className="w-full mb-7">
                                <p className="text-sm text-emerald-600 mb-5">
                                    Local Timezone

                                    <span className="text-sm text-slate-500 block">
                                        Set your local timezone for better dates processing
                                    </span>
                                </p>

                                <div className="w-7/12 rounded-md shadow-none space-y-px">
                                    <ListBoxZero
                                        width="w-40"
                                        state={state.input.timezone}
                                        onChangeListBoxHandler={(e) => onChangeTimezoneHandler(e)}
                                        listButton={
                                            <>
                                                {timezones.default.map((timezone, index) => (
                                                    <span key={index}>
                                                        {
                                                            state.input.timezone === timezone.tzCode ? (
                                                                <p>
                                                                    <span className="flex items-center">
                                                                        <span className="ml-2 text-sm text-green-700 truncate">
                                                                            (GMT {timezone.utc}) - {timezone.tzCode}
                                                                        </span>
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
                                                                    <span className="ml-2 text-sm text-gray-700 truncate">
                                                                        (GMT {timezone.utc}) - {timezone.tzCode}
                                                                    </span>
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
                            <hr />

                            <div className="w-full my-5">
                                <p className="text-sm text-emerald-600 mb-5">
                                    Country/Region

                                    <span className="text-sm text-slate-500 block">
                                        Set your local timezone for better dates processing
                                    </span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-4">
                            <Loading />
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}