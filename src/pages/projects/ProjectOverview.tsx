import React, { FC, useState } from "react"
import { toast } from "react-toastify"
import { PROJECTS_DECOMMISSION_API_ROUTE, PROJECTS_REINSTATE_API_ROUTE } from "../../api/v1/api.StandardRoutes"
import { ActionModal } from "../../components/lib/ActionModal"
import { WarningActionModal } from "../../components/lib/WarningActionModal"
import DateFormating from "../../lib/hooks/DateFormating"
import HttpServices from "../../services/HttpServices"
import { EditProject } from "./EditProject"
import { ProjectParticipants } from "./ProjectParticipants"

interface Props {
    data: any,
    status: any,
    projectId: any,
    dataReload: any
}

export const ProjectOverview: FC<Props> = ({ data, status, projectId, dataReload }) => {
    const [state, setstate] = useState({
        show: false,
        modals: {
            showDecommission: false,
            showReinstatement: false,
            showParticipants: true,
        },
        postingForm: {
            decommissionProj: false,
            reinstateProj: false,
        }
    })

    const showOrHideEditProject = () => {
        if (data.project.deleted_at === null) {
            setstate({
                ...state, show: !state.show
            })
        }
    }

    const showOrHideDecommissionModal = () => {
        let { modals } = state
        modals.showDecommission = !state.modals.showDecommission

        setstate({
            ...state, modals
        })
    }

    const showOrHideReinstatementModal = () => {
        let { modals } = state
        modals.showReinstatement = !state.modals.showReinstatement

        setstate({
            ...state, modals
        })
    }

    const decommissionProjectApiCall = async () => {
        let { postingForm } = state

        if (data.project.deleted_at === null && !postingForm.decommissionProj) {
            try {
                let formData = new FormData
                formData.append('uuid', projectId)

                postingForm.decommissionProj = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(PROJECTS_DECOMMISSION_API_ROUTE, formData)
                const dataResponse = response.data

                if (response.data.success) {
                    dataReload()
                } else {
                    let toastText = dataResponse.message

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

                showOrHideDecommissionModal()
            } catch (error) {
                let toastText = 'Something went wrong. Could not complete action'

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

            postingForm.decommissionProj = false
            setstate({
                ...state, postingForm
            })
        }
    }

    const reinstateProjectApiCall = async () => {
        let { postingForm } = state

        if (data.project.deleted_at !== null && !postingForm.reinstateProj) {
            try {
                let formData = new FormData
                formData.append('uuid', projectId)

                postingForm.reinstateProj = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(PROJECTS_REINSTATE_API_ROUTE, formData)
                const dataResponse = response.data

                if (response.data.success) {
                    dataReload()
                } else {
                    let toastText = dataResponse.message

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

                showOrHideReinstatementModal()
            } catch (error) {
                let toastText = 'Something went wrong. Could not complete action'

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

            postingForm.reinstateProj = false
            setstate({
                ...state, postingForm
            })
        }
    }

    function participantsArray() {
        let participants = data.project.participants > 4 ? 4 : data.project.participants
        let participantsArray = [];

        console.log(participants);
        

        for (var i = 0; i < participants; i++) {
            participantsArray.push(arguments[i]);
        }

        return participantsArray
    }

    const showOrHideProjectParticipants = () => {
        let { modals } = state
        modals.showParticipants = !state.modals.showParticipants

        setstate({
            ...state, modals
        })
    }

    return (
        <React.Fragment>
            {
                status === 'rejected' ? (
                    null
                ) : status === 'fulfilled' ? (
                    <>
                        <div className="w-full flex flex-row">
                            <div className="w-5/12 pb-3 pr-3 border-r">
                                <div className="w-full mb-2 flex flex-row align-middle items-center">
                                    <h2 className="text-lg flex-auto leading-7 mb-0 text-emerald-600 sm:text-lg">
                                        Overview
                                    </h2>

                                    {
                                        data.project.deleted_at === null ? (
                                            <span className="fal cursor-pointer fa-cog fa-lg text-green-600 block" onClick={showOrHideEditProject}></span>
                                        ) : (
                                            <span className="fal cursor-not-allowed fa-cog fa-lg text-green-400 block"></span>
                                        )
                                    }
                                </div>

                                <div className="w-full pr-4 pb-3">
                                    <p className="w-full text-gray-700 block sm:text-sm border-0 mb-2">
                                        {data.project.description}
                                    </p>
                                </div>

                                <div className="w-full">
                                    {/* <hr /> */}
                                    <ProjectAbout
                                        data={data}
                                        state={state}
                                        participantsArray={participantsArray}
                                        showOrHideEditProject={showOrHideEditProject}
                                        showOrHideDecommissionModal={showOrHideDecommissionModal}
                                        showOrHideReinstatementModal={showOrHideReinstatementModal}
                                        showOrHideProjectParticipants={showOrHideProjectParticipants}
                                    />
                                </div>
                            </div>

                            <div className="w-7/12 pb-3 pl-5">
                                <h2 className="text-lg mb-3 leading-7 text-emerald-600 sm:text-lg">
                                    Activity
                                </h2>
                            </div>
                        </div>

                        <EditProject
                            data={data}
                            show={state.show}
                            projectId={projectId}
                            dataReload={dataReload}
                            showOrHideModal={showOrHideEditProject}
                        />

                        <ActionModal
                            iconClass="fad fa-trash-alt fa-lg"
                            title="Decommission Project"
                            show={state.modals.showDecommission}
                            details="Once you decommission this project you'll not be to raise any changes or support requests"
                            showOrHide={showOrHideDecommissionModal}
                            actionEvent={decommissionProjectApiCall}
                            isPostingForm={state.postingForm.decommissionProj}
                            actionButton={{
                                before: "Decommission",
                                after: "Decommissioning"
                            }}
                        />

                        <WarningActionModal
                            show={state.modals.showReinstatement}
                            title={"Reinstate Project"}
                            details={"Reinstate this project to it's former glory"}
                            iconClass="fad fa-trash-undo-alt fa-lg"
                            showOrHide={showOrHideReinstatementModal}
                            actionEvent={reinstateProjectApiCall}
                            isPostingForm={state.postingForm.reinstateProj}
                            actionButton={{
                                before: "Reinstate",
                                after: "Reinstating..."
                            }}
                        />

                        <ProjectParticipants
                            data={data}
                            projectId={projectId}
                            show={state.modals.showParticipants}
                            showOrHideModal={showOrHideProjectParticipants}
                        />
                    </>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}

const ProjectAbout = ({ data, state, showOrHideEditProject, showOrHideDecommissionModal, showOrHideReinstatementModal, participantsArray, showOrHideProjectParticipants }) => {
    return (
        <React.Fragment>
            <div className="w-full">
                <div className="w-full">
                    <div className="flex flex-row align-middle">
                        <div className="w-6/12">
                            {
                                data.project.project_lead === null || data.project.project_lead === undefined ? (
                                    <>
                                        <div className="flex items-center align-middle text-sm mb-2 text-emerald-600">
                                            <span className="ml-0">
                                                <span className="mr-1">Project Lead: </span>
                                            </span>
                                        </div>

                                        <div className="w-full mb-4">
                                            <div className="">
                                                {
                                                    data.project.deleted_at === null ? (
                                                        <span className="text-blue-500 text-sm cursor-pointer flex-row align-middle" onClick={showOrHideEditProject}>
                                                            <span className="fas fa-plus mr-2"></span>
                                                            Set Project Lead
                                                        </span>
                                                    ) : (
                                                        <span className="text-blue-400 text-sm cursor-not-allowed flex-row align-middle">
                                                            <span className="fas fa-plus mr-2"></span>
                                                            Set Project Lead
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center align-middle text-sm mb-2 text-emerald-600">
                                            <span className="">
                                                <span className="mr-1">Project Lead: </span>
                                            </span>
                                        </div>

                                        <div className="w-full pb-4 text-sm">
                                            <div className="flex items-center align-middle text-blue-600">
                                                <span className="fal mr-2 fa-user-crown"></span>

                                                <span className="ml-2">
                                                    <span className="mr-1">
                                                        {data.project.project_lead_name}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="w-6/12">
                            <div className="text-sm mb-2 text-emerald-600">
                                <span className="ml-0">
                                    <span className="mr-1">Participants: </span>
                                </span>
                            </div>

                            <div className="flex items-center align-middle text-sm">
                                <span className="ml-0">
                                    <div key={1233} className="w-full flex flex-row">
                                        <div className="flex -space-x-2 overflow-hidden flex-auto">
                                            {
                                                participantsArray().map((index: React.Key) => {
                                                    return (
                                                        <img key={index} className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    )
                                                })
                                            }
                                        </div>

                                        {
                                            data.project.deleted_at === null ? (
                                                <div className="ml-3">
                                                    {
                                                        data.project.participants > 1 ? (
                                                            <span className="text-blue-600 text-sm cursor-pointer flex-row align-middle" onClick={showOrHideProjectParticipants}>
                                                                View Participants
                                                            </span>
                                                        ) : (
                                                            <span className="text-blue-600 text-sm cursor-pointer flex-row align-middle" onClick={showOrHideProjectParticipants}>
                                                                <span className="fas fa-plus mr-2"></span>
                                                                Add Participants
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            ) : (
                                                <div className="ml-3">
                                                    {
                                                        data.project.participants > 1 ? (
                                                            <span className="text-blue-400 text-sm cursor-not-allowed flex-row align-middle" onClick={showOrHideProjectParticipants}>
                                                                View Participants
                                                            </span>
                                                        ) : (
                                                            <span className="text-blue-400 text-sm cursor-not-allowed flex-row align-middle" onClick={showOrHideProjectParticipants}>
                                                                <span className="fas fa-plus mr-2"></span>
                                                                Add Participants
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                    <hr />

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
                            {data.project.participants}
                        </div>
                    </div>

                    <div className="w-full">
                        <hr />

                        {
                            data.project.deleted_at === null ? (
                                <div className="py-3">
                                    <button type="button" onClick={showOrHideDecommissionModal} className="text-sm rounded-md text-left border border-transparent px-3 py-1 bg-inherit text-red-600 hover:bg-red-600 hover:text-white hover:shadow-sm w-auto focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-red-600">
                                        Decommission Project
                                    </button>
                                </div>
                            ) : (
                                <div className="py-3">
                                    <button type="button" onClick={showOrHideReinstatementModal} className="text-sm rounded-md text-left border border-transparent px-3 py-1 bg-inherit text-orange-600 hover:bg-amber-600 hover:text-white hover:shadow-sm w-auto focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-amber-600">
                                        Reinstate Project
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}