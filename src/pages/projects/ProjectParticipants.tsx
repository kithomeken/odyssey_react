import { Dialog } from "@headlessui/react";
import React, { FC, useState } from "react"

import { PROJECTS_LIST_API_ROUTE } from "../../api/v1/api.StandardRoutes";
import Loading from "../../components/layouts/Loading";
import { BespokePanel } from "../../components/lib/BespokePanel";
import { ScrollWithShadow } from "../../lib/hooks/ScrollWithShadow";
import HttpServices from "../../services/HttpServices";
import { CommsBreakdownVert } from "../errors/CommsBreakdownVert";
import parachute from '../../assets/images/parachute.png'
import trashCan from '../../assets/images/trash_can.gif'
import { AddParticipant } from "./AddParticipant";

interface Props {
    data: any,
    show: boolean,
    projectId: any,
    showOrHideModal: any,
}

export const ProjectParticipants: FC<Props> = ({ data, projectId, show, showOrHideModal }) => {
    const [state, setstate] = useState({
        status: "pending",
        participants: null,
        trashCan: {
            show: false,
            index: ''
        },
        show: {
            addParticipants: false,
        }
    })

    const { boxShadow, onScrollHandler } = ScrollWithShadow();

    React.useEffect(() => {
        if (show) {
            fetchProjectParticipantsApiCall()
        }
    }, [show, projectId]);

    async function fetchProjectParticipantsApiCall() {
        try {
            const participantRoute = PROJECTS_LIST_API_ROUTE + '/' + projectId + '/participants'
            const response: any = await HttpServices.httpGet(participantRoute)

            if (response.data.success) {
                let { participants } = state
                participants = response.data.payload.participants

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

    const showOrHideTrashCan = (index: any) => {
        let { trashCan } = state
        trashCan.index = index
        trashCan.show = !state.trashCan.show

        setstate({
            ...state, trashCan
        })
    }

    const showOrHideAddParticipants = () => {
        let { show } = state
        show.addParticipants = !state.show.addParticipants

        setstate({
            ...state, show
        })
    }

    return (
        <React.Fragment>
            <BespokePanel
                show={show}
                showOrHidePanel={showOrHideModal}
                bespokeComponents={
                    <>
                        <div className="py-5 fixed top-0 z-40 bg-white w-screen max-w-sm">
                            <Dialog.Title className="px-6 text-lg text-emerald-700 mb-1">
                                Participants
                            </Dialog.Title>

                            {
                                state.status === 'fulfilled' ? (
                                    <>
                                        <div className="px-6 flex align-middle items-center">
                                            {
                                                state.participants.length > 0 ? (
                                                    <span className="text-slate-600 flex-auto text-sm">
                                                        {state.participants.length} participants present
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 flex-auto text-sm">
                                                        Add a participant
                                                    </span>
                                                )
                                            }

                                            {
                                                data.project.deleted_at === null ? (
                                                    <button type="button" onClick={showOrHideAddParticipants} className="justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                        Add
                                                    </button>
                                                ) : (
                                                    <button type="button" disabled className="justify-center cursor-not-allowed text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-60">
                                                        Add
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </>
                                ) : null
                            }
                        </div>

                        {
                            state.status === 'rejected' ? (
                                <div className="py-2 mt-20">
                                    <CommsBreakdownVert />
                                </div>
                            ) : state.status === 'fulfilled' ? (
                                <>
                                    <div className="text-sm mt-24">
                                        <div className="w-full /* h-[calc(100%_-_0rem)] */ overflow-y-auto">
                                            {
                                                state.participants.length > 0 ? (
                                                    <ul role="list" className="p-6 divide-y divide-slate-200" onScroll={onScrollHandler} style={{ boxShadow }}>
                                                        {
                                                            state.participants.map((participant: any, index: any) => {
                                                                return (
                                                                    <>
                                                                        <li key={index} className="flex items-center flex-row align-middle py-3 first:pt-1 last:pb-0"
                                                                            onMouseEnter={() => showOrHideTrashCan(index)}
                                                                            onMouseLeave={() => showOrHideTrashCan(index)}
                                                                        >
                                                                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=8" alt="" />

                                                                            <div className="ml-3 overflow-hidden flex-auto">
                                                                                <div className="flex flex-row align-middle flex-auto">
                                                                                    <p className="text-sm font-medium text-slate-900">
                                                                                        {participant.account_name}
                                                                                    </p>

                                                                                    {
                                                                                        participant.lead === 'Y' ? (
                                                                                            <span className="text-emerald-600 mb-0 text-xs px-2 ml-1 rounded">
                                                                                                Project Lead
                                                                                            </span>
                                                                                        ) : null
                                                                                    }
                                                                                </div>


                                                                                <p className="text-sm text-slate-500 truncate">
                                                                                    {participant.email}
                                                                                </p>
                                                                            </div>

                                                                            <span className="h-7 w-7 flex items-center">
                                                                                {
                                                                                    state.trashCan.show && state.trashCan.index === index ? (
                                                                                        // <span className="fal cursor-pointer fa-trash-alt text-red-600 block m-auto  fa-beat"></span>
                                                                                        <img key={index} className="cursor-pointer inline-block h-7 w-7 rounded-full ring-2 ring-white" src={trashCan} alt="" />
                                                                                    ) : null
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                ) : (
                                                    <div className="bg-white px-4 pt-6 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center my-3 sm:mx-0 sm:h-auto sm:w-40">
                                                                <img src={parachute} alt="broken_robot" width="auto" className="block text-center m-auto" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="py-2 mt-20">
                                    <Loading />
                                </div>
                            )
                        }
                    </>
                }
            />

            <AddParticipant
                data={data}
                projectId={projectId}
                show={state.show.addParticipants}
                showOrHideModal={showOrHideAddParticipants}
            />
        </React.Fragment>
    )
}