import { toast } from "react-toastify"
import { Listbox } from "@headlessui/react"
import React, { FC, useState } from "react"

import { PROJECTS_B4_CHECK_API_ROUTE, PROJECTS_PTNTL_LEADS_API_ROUTE, PROJECTS_UPDATE_API_ROUTE } from "../../api/v1/api.StandardRoutes"
import { DynamicModal } from "../../components/lib/DynamicModal"
import { ListBoxZero } from "../../lib/hooks/ListBoxZero";
import HttpServices from "../../services/HttpServices"

interface Props {
    data: any,
    show: boolean,
    projectId: any,
    dataReload: any,
    showOrHideModal: any,
}

export const EditProject: FC<Props> = ({ data, projectId, show, showOrHideModal, dataReload }) => {
    const [state, setstate] = useState({
        status: 'pending',
        participants: null,
        isPostingForm: false,
        project: {
            checkProject: false,
            projectExists: false,
        },
        input: {
            name: data.project.name,
            description: data.project.description,
            project_lead: data.project.project_lead
        },
        errors: {
            name: '',
            description: ''
        }
    })

    React.useEffect(() => {
        if (show) {
            fetchAllProjectParticipantsApiCall()
        }
    }, [show]);

    async function fetchAllProjectParticipantsApiCall() {
        try {
            const response: any = await HttpServices.httpGet(PROJECTS_PTNTL_LEADS_API_ROUTE)

            if (response.data.success) {
                let { participants } = state
                participants = response.data.payload.potential_leads

                setstate({
                    ...state, participants, status: 'fulfilled',
                })
            } else {
                setstate({
                    ...state, status: 'rejected',
                })
            }
        } catch (error) {
            setstate({
                ...state, status: 'rejected'
            })
        }
    }

    const onChangeListBoxHandler = (e: any) => {
        let { input } = state
        input.project_lead = e

        setstate({
            ...state, input
        })
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onChangeHandler = (e: any) => {
        const { isPostingForm } = state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

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
            let { input }: any = state
            let { errors }: any = state

            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Project ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Project ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 50) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Project ' + e.target.name + ' cannot be more than 50 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                            checkIfprojectNameExists()
                        }
                        break;

                    case 'description':
                        if (targetValue.length > 200) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Project ' + e.target.name + ' cannot be more than 200 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                        break;
                }
            }

            setstate({
                ...state, input, errors,
            })
        }
    }

    const checkIfprojectNameExists = async () => {
        let { input }: any = state
        let { errors }: any = state
        let { project }: any = state

        try {
            project.checkProject = true
            let formData = new FormData
            formData.append('uuid', projectId)
            formData.append('name', input.name)

            const response: any = await HttpServices.httpPost(PROJECTS_B4_CHECK_API_ROUTE, formData)
            project.checkProject = false

            if (response.data.success) {
                project.projectExists = false
            } else {
                errors.name = "Project name already exists"
                project.projectExists = true
            }

            setstate({
                ...state, errors, project
            })
        } catch (error) {
            errors.name = "Kindly check your internet connection"
            project.projectExists = true

            setstate({
                ...state, errors
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let { project }: any = state
        let { errors }: any = state

        if (!project.projectExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Check if data is unchanged
                console.log(data.project);
                console.log(state.input);
                
                if (state.input.name === data.project.name &&
                    state.input.description === data.project.description &&
                    state.input.project_lead === data.project.project_lead) {
                    toast.info('No modifications made on the project details', {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    return
                }

                // Post form data
                let { isPostingForm } = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return updateProjectDetailsApiCall()
            }
        }
    }

    const updateProjectDetailsApiCall = async () => {
        let { isPostingForm } = state
        let { input } = state

        try {
            let request = {
                uuid: projectId,
                name: input.name,
                description: input.description,
                project_lead: input.project_lead
            }

            const response: any = await HttpServices.httpPost(PROJECTS_UPDATE_API_ROUTE, request)

            if (response.data.success) {
                // Reload Project details
                showOrHideModal()
                dataReload()
            } else {
                toast.error("Something went wrong while updating project details", {
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
            toast.error("Something went wrong while updating project details", {
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
                title={"Edit Project"}
                preLoadsData={true}
                preLoadStatus={state.status}
                showOrHideModal={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                actionButton={{
                    before: "Change Details",
                    after: "Changing..."
                }}
                formComponents={
                    <>
                        <div className="w-full">
                            <div className="w-full mb-3">
                                <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                <div className="w-12/12 flex flex-row align-middle">
                                    <div className="w-full">
                                        <input
                                            type="text" name="name" id="name" autoComplete="off" value={state.input.name} disabled={state.isPostingForm} placeholder="Project Name" onBlur={onInputBlur} onChange={onChangeHandler} autoFocus className="focus:ring-1 w-full focus:ring-green-500 p-1-5 capitalize flex-1 block text-sm text-slate-700 rounded-md sm:text-sm border border-gray-400 disabled:opacity-50" />
                                    </div>

                                    <div className="w-12 pl-2">
                                        {
                                            state.project.checkProject ? (
                                                <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                            ) : (
                                                null
                                            )
                                        }
                                    </div>
                                </div>

                                {
                                    state.errors.name.length > 0 &&
                                    <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                        {state.errors.name}
                                    </span>
                                }
                            </div>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center mb-2">
                                <div className="w-full">
                                    <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description:</label>

                                    <div className="w-full">
                                        <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 mt-1 block w-full sm:text-sm border border-gray-400 rounded-md resize-none p-2" required onChange={onChangeHandler} placeholder="Project Description" onBlur={onInputBlur} value={state.input.description}></textarea>

                                        {
                                            state.errors.description.length > 0 &&
                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                {state.errors.description}
                                            </span>
                                        }
                                    </div>

                                    <sub className="text-slate-500 text-xs">
                                        <span className="block mt-1">
                                            A brief description of what the project entails.
                                        </span>
                                        <span className="block">
                                            This will also appear in tooltips
                                        </span>

                                    </sub>
                                </div>
                            </div>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center pb-4">
                                <div className="w-full">
                                    {
                                        state.participants && (
                                            <ListBoxZero
                                                state={state.input.project_lead}
                                                label="Project Lead"
                                                onChangeListBoxHandler={onChangeListBoxHandler}
                                                listButton={
                                                    <>
                                                        {
                                                            state.input.project_lead === null || state.input.project_lead === undefined ? (
                                                                <span className="flex items-center">
                                                                    <span className="ml-2 text-sm text-gray-700 truncate">
                                                                        Select Project Lead
                                                                    </span>
                                                                </span>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        state.participants.map((participant: any, index: React.Key) => (
                                                                            <span key={index}>
                                                                                {
                                                                                    state.input.project_lead === participant.uuid ? (
                                                                                        <span className="flex items-center">
                                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{participant.account_name}</span>
                                                                                        </span>
                                                                                    ) : null
                                                                                }
                                                                            </span>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                        }

                                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <i className="far fa-chevron-down text-emerald-500"></i>
                                                        </span>
                                                    </>
                                                }
                                                listOptions={
                                                    <>
                                                        {state.participants.map((participant: any, index: React.Key) => (
                                                            <Listbox.Option
                                                                key={index}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={participant.uuid}
                                                            >
                                                                {({ selected }) => (
                                                                    <div className="flex flex-row align-middle">
                                                                        <span className="flex items-center flex-auto">
                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{participant.account_name}</span>
                                                                        </span>

                                                                        {selected ? (
                                                                            <span className="text-green-600 absolute inset-y-0 w-10 right-0 flex flex-row items-center justify-center align-middle">
                                                                                <i className="fas fa-check"></i>
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
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}