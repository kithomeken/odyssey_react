import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

import { PROJECTS_LIST_API_ROUTE } from "../../api/v1/api.StandardRoutes"
import Header from "../../components/settings/Header"
import HeaderParagraph from "../../components/settings/HeaderParagraph"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"
import NoDataReactTable from "../../lib/hooks/NoDataReactTable"
import ReactTable from "../../lib/hooks/ReactTable"
import HttpServices from "../../services/HttpServices"
import Error500 from "../errors/Error500"
import { CreateProject } from "./CreateProject"

export const Projects = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        postingForm: {
            createProjects: false
        }
    })

    const showButton = true
    const buttonIcon = false
    const actionButton = true
    const pageTitle = "Project Management"
    const buttonTitle = "Create Project"
    const iconType = "fas fa-plus-circle"

    const showOrHideCreateProjects = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: (data: { name: any }) => (
                    <span className="flex flex-row align-middle items-center">
                        <span className="block text-black text-sm py-1">
                            {data.name}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Lead',
                accessor: (data: { lead: any }) => (
                    <span>
                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.lead}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Pending Items',
                accessor: (data: { pendingItems: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.pendingItems}
                        </span>
                    </span>
                )
            },
            {
                Header: 'Status',
                accessor: (data: { deleted_at: any }) => (
                    data.deleted_at === null || data.deleted_at === undefined ? (
                        <span className="text-red-600 bg-red-100 mb-0 text-xs py-1 px-2 rounded">
                            Suspended
                        </span>
                    ) : (
                        <span className="bg-emerald-100 text-emerald-600 mb-0 text-xs py-1 px-2 rounded">
                            Active
                        </span>
                    )
                )
            },
            {
                Header: 'Created By',
                accessor: (data: { created_by: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.created_by}
                        </span>
                    </span>
                )
            },
            {
                Header: '-',
                accessor: (data: { uuid: any }) => (
                    <Link to={`${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                        Details
                    </Link>
                )
            },
        ],
        []
    )

    React.useEffect(() => {
        fetchProjectListApiCall()
    }, [])

    async function fetchProjectListApiCall(hideModal = 'Y') {
        try {
            const response: any = await HttpServices.httpGet(PROJECTS_LIST_API_ROUTE)
            let { data } = state
            let status = state.status

            data = response.data.payload.projects
            status = 'fulfilled'

            hideModal === 'Y' ? (
                setstate({
                    ...state, data, status, show: false
                })
            ) : (
                setstate({
                    ...state, data, status
                })
            )
        } catch (error) {
            console.warn(error);
            let status = state.status
            let show = state.show

            status = 'rejected'
            show = false

            setstate({
                ...state, status, show
            })
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full bg-green-50 form-group mb-3`}>
                <Header title={pageTitle}
                    showButton={showButton}
                    actionButton={actionButton}
                    actionEvent={showOrHideCreateProjects}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                />

                <HeaderParagraph title={`Keep track of changes performed, either new, old or existing, in your organization's project through ${APPLICATION_NAME}.`} />
            </div>

            <div className="w-full form-group px-12 mb-14">
                <div className="w-full">
                    {
                        state.status === 'rejected' ? (
                            <Error500 />
                        ) : state.status === 'fulfilled' ? (
                            <div>
                                {
                                    state.data === null ? (
                                        <NoDataReactTable columns={columns} />
                                    ) : (
                                        <ReactTable columns={columns} data={state.data} />
                                    )
                                }
                            </div>
                        ) : (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-emerald-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>

            <CreateProject
                show={state.show}
                showOrHideModal={showOrHideCreateProjects}
            />
        </React.Fragment>
    )
}