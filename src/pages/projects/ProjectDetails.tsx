import { Helmet } from "react-helmet"
import React, { useState } from "react"
import { useParams } from "react-router"

import Error500 from "../errors/Error500"
import Loading from "../../components/layouts/Loading"
import HttpServices from "../../services/HttpServices"
import BreadCrumbs from "../../components/settings/BreadCrumbs"
import { Routes_Project } from "../../routes/standard/routes.Projects"
import HeaderParagraph from "../../components/settings/HeaderParagraph"
import { PROJECTS_LIST_API_ROUTE } from "../../api/v1/api.StandardRoutes"
import { ProjectOverview } from "./ProjectOverview"
import { stat } from "fs"
import EmptyResultsReturned from "../errors/EmptyResultsReturned"
import { ProjectParticipants } from "./ProjectParticipants"
import { ProjectDocumentation } from "./ProjectDocumentation"

export const ProjectDetails = () => {
    const [state, setstate] = useState({
        data: null,
        status: 'pending',
        activeTab: 'overview',
        tabStatus: {
            participants: 'fulfilled',
            documentation: 'fulfilled',
        }
    })

    const buttonIcon = false
    const buttonTitle = "View Board"
    const iconType = "fas fa-plus-circle"

    const params = useParams();
    const pageTitle = "Project Details"
    const projectListRoute: any = (Routes_Project.find((routeName) => routeName.name === 'PROJECTS_'))?.path

    const breadCrumb = [
        { linkItem: true, title: "Projects", url: projectListRoute },
        { linkItem: false, title: "Project Details" },
    ]

    React.useEffect(() => {
        fetchProjectDetailsApiCall();
    }, []);

    const fetchProjectDetailsApiCall = async () => {
        try {
            const projectId = params.uuid
            const response: any = await HttpServices.httpGet(PROJECTS_LIST_API_ROUTE + '/' + projectId)
            let { data } = state
            let status = state.status

            data = response.data.payload
            status = 'fulfilled'

            setstate({
                ...state, data, status,
            })
        } catch (e) {
            console.warn(e);
            let status = state.status
            status = 'rejected'

            setstate({
                ...state, status,
            })
        } finally {
            // Do nothing            
        }
    }

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
    }

    const updateTabDataState = (tabName: any, dataFromTab: any) => {
        let { data } = state
        data[tabName] = dataFromTab

        setstate({
            ...state, data
        })
    }

    const updateTabStatus = (tabName: any, status: any) => {
        let { tabStatus } = state
        tabStatus[tabName] = status

        setstate({
            ...state, tabStatus
        })
    }

    const loadRespectiveTab = (tabName = 'poc') => {
        switch (tabName) {
            case 'overview':
                return <ProjectOverview
                    data={state.data}
                    status={state.status}
                    projectId={params.uuid}
                />

            case 'participants':
                return <ProjectParticipants
                    updateTabDataState={updateTabDataState}
                    updateTabStatus={updateTabStatus}
                    status={state.tabStatus.participants}
                    data={state.data.participants}
                    projectId={params.uuid}
                />

            case 'documentation':
                return <ProjectDocumentation
                    updateTabDataState={updateTabDataState}
                    updateTabStatus={updateTabStatus}
                    status={state.tabStatus.documentation}
                    data={state.data.documentation}
                    projectId={params.uuid}
                />

            default:
                return null
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>
                    {
                        state.data ? (
                            state.data.project.name
                        ) : pageTitle
                    }
                </title>
            </Helmet>

            {
                state.status === 'rejected' ? (
                    <Error500 />
                ) : state.status === 'fulfilled' ? (
                    <>
                        {
                            (state.data === undefined || state.data === null) ? (
                                <EmptyResultsReturned />
                            ) : (
                                <>
                                    <div className="w-full form-group">
                                        <div className="mb-5">
                                            <div className={`px-12 py-1 w-full bg-green-50`}>
                                                <BreadCrumbs breadCrumbDetails={breadCrumb} />
                                            </div>

                                            <div className={`px-12 pb-2 w-full bg-green-50`}>
                                                <div className="flex items-center pb-2 pt-2 lg:justify-between w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <h2 className="text-2xl leading-7 text-green-600 sm: mb-0">
                                                            {state.data.project.name}
                                                        </h2>
                                                    </div>

                                                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                                        <span className="hidden sm:block">
                                                            <button type="button" className={`inline-flex items-center px-4 py-1-5 border border-green-600 rounded shadow-sm text-sm text-green-700 hover:border-green-800 hover:text-green-800 focus:outline-none focus:ring -0 focus:ring-offset-0 focus:ring-green-400`}>
                                                                {
                                                                    buttonIcon ? (
                                                                        <span className={`mr-2 ${iconType}`}></span>
                                                                    ) : (
                                                                        ''
                                                                    )
                                                                }

                                                                <span className="text-sm">
                                                                    {buttonTitle}
                                                                </span>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>

                                                <HeaderParagraph title={state.data.project.description} />
                                            </div>

                                            <div className="px-12 py-3">
                                                <div className="w-12/12 pb-3 flex flex-row">
                                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('overview')}>
                                                        <button className={classNames(
                                                            state.activeTab === 'overview' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                        )}>
                                                            <span className="lolrtn robot">Project Overview</span>
                                                        </button>
                                                    </div>

                                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('participants')}>
                                                        <button className={classNames(
                                                            state.activeTab === 'participants' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                        )}>
                                                            <span className="lolrtn robot">Participants/Members</span>
                                                        </button>
                                                    </div>

                                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('documentation')}>
                                                        <button className={classNames(
                                                            state.activeTab === 'documentation' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                        )}>
                                                            <span className="lolrtn robot">Project Documents</span>
                                                        </button>
                                                    </div>

                                                    <div className="flex-grow border-b-2">

                                                    </div>
                                                </div>

                                                <div className="w-10/12 pb-6 px-3">
                                                    {loadRespectiveTab(state.activeTab)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                ) : (
                    <div className="w-full form-group px-12 mb-14">
                        <div className="w-full">
                            <div className="pt-10">
                                <Loading />
                            </div>
                        </div>
                    </div>
                )
            }





        </React.Fragment>
    )
}