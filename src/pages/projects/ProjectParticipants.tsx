import { Dialog } from "@headlessui/react";
import React, { FC, useState } from "react"

import { PROJECTS_LIST_API_ROUTE } from "../../api/v1/api.StandardRoutes";
import Loading from "../../components/layouts/Loading";
import { BespokePanel } from "../../components/lib/BespokePanel";
import { ScrollWithShadow } from "../../lib/hooks/ScrollWithShadow";
import HttpServices from "../../services/HttpServices";
import { CommsBreakdownVert } from "../errors/CommsBreakdownVert";

interface Props {
    data: any,
    show: boolean,
    projectId: any,
    showOrHideModal: any,
}

export const ProjectParticipants: FC<Props> = ({ data, projectId, show, showOrHideModal }) => {
    const [state, setstate] = useState({
        participants: null,
        status: "pending"
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

    console.log(state.status);
    console.log(state.participants);

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
                                                    <span className="text-slate-600 text-sm">
                                                        Add a participant
                                                    </span>
                                                )
                                            }

                                            <button type="submit" className="justify-center text-sm rounded-md border border-transparent shadow-sm px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                Add
                                            </button>
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
                                    <div className="text-sm mt-20">
                                        <div className="w-full /* h-[calc(100%_-_0rem)] */ overflow-y-auto">
                                            <ul role="list" className="p-6 divide-y divide-slate-200" onScroll={onScrollHandler} style={{ boxShadow }}>
                                                {
                                                    state.participants.map((participant: any, index: any) => {
                                                        return (
                                                            <>
                                                                <li key={index} className="flex items-center flex-row align-middle py-3 first:pt-1 last:pb-0">
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
                                                                        <span className="fal cursor-pointer fa-times-circle text-red-600 block m-auto"></span>
                                                                    </span>
                                                                </li>

                                                                {/* <div className="flex flex-row align-middle items-center px-4 py-2 hover:bg-gray-200">
                                                            <img key={index} className="inline-block ml-1 h-7 w-7 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />

                                                            <div className="flex-auto ml-2">
                                                                <div className="flex flex-row align-middle">
                                                                    <span className="text-gray-800 block sm:text-sm border-0 ml-2 mb-0">
                                                                        {participant.account_name}
                                                                    </span>

                                                                    {
                                                                        participant.lead === 'Y' ? (
                                                                            <span className="text-emerald-600 mb-0 text-xs px-2 ml-1 rounded">
                                                                                Project Lead
                                                                            </span>
                                                                        ) : null
                                                                    }
                                                                </div>


                                                                <span className="text-sm text-slate-500 block ml-2">
                                                                    {participant.email}
                                                                </span>
                                                            </div>



                                                            <span className="fal cursor-pointer fa-times-circle text-red-600 block"></span>
                                                        </div> */}
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ul>
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
        </React.Fragment>
    )
}