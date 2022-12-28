import { toast } from "react-toastify"
import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

import HttpServices from "../../services/HttpServices"
import { DynamicModal } from "../../components/lib/DynamicModal"
import { Routes_Project } from "../../routes/standard/routes.Projects"
import { PROJECTS_CHECK_API_ROUTE } from "../../api/v1/api.StandardRoutes"
import { PROJECTS_CREATE_API_ROUTE } from "../../api/v1/api.StandardRoutes"

interface Props {
    show: boolean,
    showOrHideModal: any,
}

export const CreateProject: FC<Props> = ({ show, showOrHideModal }) => {
    const [state, setstate] = useState({
        isPostingForm: false,
        project: {
            checkProject: false,
            projectExists: false,
        },
        input: {
            name: '',
            description: ''
        },
        errors: {
            name: '',
            description: ''
        }
    })

    const navigate = useNavigate();
    const projectListRoute: any = (Routes_Project.find((routeName) => routeName.name === 'PROJECTS_'))?.path

    React.useEffect(() => {
        /* 
         * TODO: Check if authenticated user has rights to add a new project
        */
    }, [])

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
            const response: any = await HttpServices.httpPost(PROJECTS_CHECK_API_ROUTE, input)
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
                // Post form data
                let { isPostingForm } = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return createProjectApiCall()
            }
        }
    }

    const createProjectApiCall = async () => {
        let { isPostingForm } = state
        let { input }: any = state

        try {
            const response: any = await HttpServices.httpPost(PROJECTS_CREATE_API_ROUTE, input)

            if (response.data.success) {
                input.name = ''
                input.description = ''

                setstate({
                    ...state, input
                })

                const redirectToRoute = projectListRoute + '/' + response.data.payload.projectId
                navigate(redirectToRoute, { replace: true });
            } else {
                toast.error("Something went wrong while creating project", {
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
            toast.error("Something went wrong while creating project", {
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
            ...state, input, isPostingForm
        })
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={"sm"}
                title={"Create Project"}
                show={show}
                showOrHideModal={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                actionButton={{
                    before: "Create",
                    after: "Creating"
                }}
                formComponents={
                    <>
                        <div className="w-full">
                            <p className="text-sm mb-3 text-slate-600">
                                Add a new project into your family of projects.
                            </p>
                        </div>

                        <div className="w-full">
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                <div className="mb-4 w-11/12 flex flex-row align-middle">
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

                                    {
                                        state.errors.name.length > 0 &&
                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                            {state.errors.name}
                                        </span>
                                    }
                                </div>
                            </div>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center pb-4">
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
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}