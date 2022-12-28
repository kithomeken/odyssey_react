import { Listbox } from "@headlessui/react";
import React, { FC, useState } from "react";
import { toast } from "react-toastify"

import { AGENT_AUTH_TEAM_LIST_API_ROUTE, AGENT_CHANGE_AUTH_TEAM_API_ROUTE } from "../../../api/v1/api.AccountRoutes";
import { DynamicModal } from "../../../components/lib/DynamicModal";
import { ListBoxZero } from "../../../lib/hooks/ListBoxZero";
import HttpServices from "../../../services/HttpServices";

interface Props {
    show: any,
    uuid: any,
    team_name: any,
    team_uuid: any,
    showOrHide: any,
    account_name: any,
    updateAuthorizationTeamState: any
}

export const ChangeAuthTeam: FC<Props> = ({ show, showOrHide, uuid, account_name, team_uuid, team_name, updateAuthorizationTeamState }) => {
    const [state, setstate] = useState({
        data: null,
        status: 'pending',
        isPostingForm: false,
        input: {
            auth_team: team_uuid
        },
        errors: {
            auth_team: ''
        }
    })

    async function authorizationTeamsListApiCall() {
        try {
            let formData = new FormData
            formData.append('uuid', uuid)
            const response: any = await HttpServices.httpGet(AGENT_AUTH_TEAM_LIST_API_ROUTE)

            if (response.data.success) {
                let { data } = state
                data = response.data.payload.authTeams

                setstate({
                    ...state, data, status: 'fulfilled',
                })
            } else {
                setstate({
                    ...state,
                    status: 'rejected',
                })
            }
        } catch (error) {
            setstate({
                ...state,
                status: 'rejected'
            })
        }
    }

    React.useEffect(() => {
        if (show) {
            authorizationTeamsListApiCall()
        }
    }, [show]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const description = () => {
        return (
            <>
                <span className="block mb-4">
                    Auth Team members have the same permissions, grants, restrictions and ticket access.
                </span>

                <span className="block">
                    Assign <span className="text-emerald-600">{account_name}</span> to a new Auth Team:
                </span>
            </>
        )
    }

    const onChangeListBoxHandler = (e: any) => {
        let { input } = state
        let { errors } = state

        input.auth_team = e
        errors.auth_team = ''

        setstate({
            ...state, input, errors
        })
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let {isPostingForm} = state        

        if (!isPostingForm) {
            if (team_uuid === state.input.auth_team) {
                let {errors} = state
                errors.auth_team = 'Kindly select a different Auth Team'
                
                return setstate({
                    ...state, errors
                })
            }

            setstate({
                ...state, isPostingForm: true
            })
            changeAuthorizationTeamApiCall()
        }
    }

    const changeAuthorizationTeamApiCall = async () => {
        let {input} = state
        let {isPostingForm} = state
        
        try {
            let formData = new FormData
            formData.append('team_uuid', input.auth_team)
            formData.append('uuid', uuid)

            const response: any = await HttpServices.httpPost(AGENT_CHANGE_AUTH_TEAM_API_ROUTE, formData)            
            
            if (response.data.success) {
                updateAuthorizationTeamState(response.data.payload.authTeam)
                showOrHide()
            } else {
                const toastText = "Something went wrong. Could not change Authorization Team."

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
            const toastText = "Something went wrong. Could not change Authorization Team."

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

        isPostingForm = false

        setstate({
            ...state, isPostingForm
        })
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={"md"}
                show={show}
                preLoadsData={true}
                description={description()}
                title="Change Authorization"
                preLoadStatus={state.status}
                showOrHideModal={showOrHide}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                dispErrorMessage={false}
                errorTitle="Error"
                errorMessage="An error occurred when fetching the Auth teams"
                actionButton={{
                    before: "Change Auth",
                    after: "Changing"
                }}
                formComponents={
                    <>
                        <div className="w-9/12 m-auto">
                            <div className="w-12/12 rounded-md shadow-none space-y-px pb-5">
                                {
                                    state.data && (
                                        <ListBoxZero
                                            state={state.input.auth_team}
                                            label="Authorization Team"
                                            onChangeListBoxHandler={onChangeListBoxHandler}
                                            listButton={
                                                <>
                                                    {
                                                        state.data.map((team, index) => (
                                                            <span key={index}>
                                                                {
                                                                    state.input.auth_team === team.uuid ? (
                                                                        <span className="flex items-center">
                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{team.name}</span>
                                                                        </span>
                                                                    ) : null
                                                                }
                                                            </span>
                                                        ))
                                                    }

                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <i className="far fa-chevron-down text-emerald-500"></i>
                                                    </span>
                                                </>
                                            }
                                            listOptions={
                                                <>
                                                    {state.data.map((team, index) => (
                                                        <Listbox.Option
                                                            key={index}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={team.uuid}
                                                        >
                                                            {({ selected }) => (
                                                                <div className="flex flex-row align-middle">
                                                                    <span className="flex items-center flex-auto">
                                                                        <span className="ml-2 text-sm text-gray-700 truncate">{team.name}</span>
                                                                    </span>

                                                                    {selected ? (
                                                                        <span className="text-green-600 flex-none absolute inset-y-0 right-0 flex flex-row justify-center align-middle">
                                                                            <i className="fad fa-check h-5 w-5 m-auto"></i>
                                                                        </span>
                                                                    ) : null}
                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </>
                                            }
                                        />
                                    )
                                }

                                {
                                    state.errors.auth_team.length > 0 &&
                                    <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                        {state.errors.auth_team}
                                    </span>
                                }
                            </div>
                        </div>

                        <p className="m-auto text-sm text-white py-2">
                            <span className="text-slate-600">
                                Current Team:
                            </span>

                            <span className="text-emerald-600 ml-2">
                                {team_name}
                            </span>
                        </p>
                    </>
                }
            />
        </React.Fragment>
    )
}