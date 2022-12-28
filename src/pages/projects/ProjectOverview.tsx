import React, { FC, useState } from "react"
import DateFormating from "../../lib/hooks/DateFormating"

interface Props {
    data: any,
    status: any,
    projectId: any,
}

export const ProjectOverview: FC<Props> = ({ data, status, projectId }) => {
    const [state, setstate] = useState({
        isPostingForm: false,
        input: {
            name: data.project.name,
            description: data.project.description
        },
        errors: {
            name: '',
            description: ''
        },
        change: {
            name: false,
            description: false
        },
    })

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

    return (
        <React.Fragment>
            {
                status === 'rejected' ? (
                    null
                ) : status === 'fulfilled' ? (
                    <>
                        <div className="w-full mb-3">
                            <h2 className="text-lg mb-2 leading-7 text-emerald-600 sm:text-lg">
                                Overview
                            </h2>

                            <p className="text-sm text-gray-500">
                                Focal point of information about your project.
                            </p>
                        </div>

                        <div className="w-full flex flex-row">
                            <div className="w-8/12 pb-3 pr-3 border-r">
                                <div className="w-full">
                                    <div className="w-9/12 flex items-center align-middle">
                                        <div className="w-full">
                                            <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-2 capitalize flex-1 block text-lg hover:bg-gray-100 focus:bg-inherit rounded-md border-0" placeholder="Project Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />
                                        </div>

                                        <div className="w-12 pl-3">
                                            {
                                                state.change.name ? (
                                                    <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                                ) : (
                                                    null
                                                )
                                            }
                                        </div>
                                    </div>

                                    {
                                        state.errors.name.length > 0 &&
                                        <span className='invalid-feedback text-xs text-red-600 pl-0 mb-1'>
                                            {state.errors.name}
                                        </span>
                                    }
                                </div>

                                <div className="w-full pr-4 pb-3">
                                    <div className="flex items-center align-middle">
                                        <div className="w-full">
                                            <textarea id="description" name="description" rows={1} className="focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-700 mt-1 block w-full sm:text-sm border-0 hover:bg-gray-100 focus:bg-inherit rounded-md resize-none p-2" required onChange={onChangeHandler} placeholder="Description" onBlur={onInputBlur} value={state.input.description}></textarea>
                                        </div>

                                        <div className="w-12 pl-3">
                                            {
                                                state.change.name ? (
                                                    <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                                ) : (
                                                    null
                                                )
                                            }
                                        </div>
                                    </div>

                                    {
                                        state.errors.description.length > 0 &&
                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                            {state.errors.description}
                                        </span>
                                    }
                                </div>

                                <div className="w-full">
                                    {/* <hr /> */}

                                    <h2 className="text-lg my-3 leading-7 text-emerald-600 sm:text-lg">
                                        Activity
                                    </h2>
                                </div>




                            </div>

                            <div className="w-4/12 pb-3 pl-5">
                                <ProjectAbout
                                    data={data}
                                    state={state}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}


const ProjectAbout = ({ data, state }) => {
    return (
        <React.Fragment>
            <div className="w-full">
                <h2 className="text mb-2 leading-7 text-emerald-600 sm:text-lg">
                    About
                </h2>

                <div className="w-full">
                    {
                        data.project.lead !== null && data.project.lead !== undefined ? (
                            <>
                                <div className="flex items-center align-middle text-sm mb-2 text-gray-500">
                                    <span className="ml-2">
                                        <span className="mr-1">Project Lead: </span>
                                    </span>
                                </div>

                                <div className="w-full mb-4">
                                    <div className="pb-2 mb-2">
                                        <span className="text-blue-500 text-sm cursor-pointer flex-row align-middle">
                                            <span className="fas fa-plus mr-2"></span>
                                            Set Project Lead
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center align-middle text-sm mb-2 text-gray-500">
                                    <span className="">
                                        <span className="mr-1">Project Lead: </span>
                                    </span>
                                </div>

                                <div className="w-full pb-4 text-sm">
                                    <div className="flex items-center align-middle text-blue-600">
                                        <span className="fal mr-2 fa-user-crown"></span>

                                        <span className="ml-2">
                                            <span className="mr-1">
                                                {data.project.created_by}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <hr />
                            </>
                        )
                    }

                    <div className="w-full text-xs pt-3 mb-2 text-slate-500">
                        <div className="flex items-center align-middle text- mb-2 text-gray-500">
                            <span className="">
                                <span className="mr-1 text-slate-700">Created By: </span>
                            </span>
                        </div>

                        <div className="flex items-center text-sm align-middle mb-1 text-gray-500">
                            <span className="fal mr-2 fa-clipboard-user fa-lg"></span>

                            <span className="ml-2">
                                <span className="mr-1">
                                    {data.project.created_by}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="w-full flex flex-row align-middle text-xs py-3 text-slate-500">
                        <div className="w-7 text-slate-700">
                            <span className="fal fa-clock"></span>
                        </div>

                        <div className="w-4/12 text-slate-700">
                            <span className="mr-1">Created on: </span>
                        </div>

                        <div className="w-8/12">
                            <DateFormating dateString={data.project.created_at} />
                        </div>
                    </div>

                    <div className="w-full flex flex-row align-middle text-xs py-3 text-slate-500">
                        <div className="w-7 text-slate-700">
                            <span className="fal fa-users"></span>
                        </div>

                        <div className="w-4/12 text-slate-700">
                            <span className="mr-1">Participants: </span>
                        </div>

                        <div className="w-8/12">
                            71
                        </div>
                    </div>

                    <div className="w-full">
                        <hr />

                        <div className="py-3">
                            <button type="button" className="text-sm rounded-md text-left border border-transparent px-3 py-1 bg-inherit text-red-600 hover:bg-red-600 hover:text-white hover:shadow-sm w-auto focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-red-600">
                                Decommission Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}