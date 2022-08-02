import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { AUTH_TEAM_CONFIGURE_ADMIN_RIGHTS_API_ROUTE, AUTH_TEAM_CONFIGURE_TICKETS_RIGHTS_API_ROUTE, AUTH_TEAM_DETAILS_API_ROUTE } from "../../../api/ApiRoutes"
import Loading from "../../../components/layouts/Loading"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../global/ConstantsRegistry"
import DateFormating from "../../../lib/hooks/DateFormating"
import HttpServices from "../../../services/HttpServices"
import EmptyResultsReturned from "../../errors/EmptyResultsReturned"
import { AdministativeRights } from "./AdministrativeRights"
import { EscalationRights } from "./EscalationRights"
import { TicketsRights } from "./TicketRights"

const EditAuthorizations = () => {
    const [state, setstate] = useState({
        data: {
            name: '',
            description: '',
            default: '',
            account_type: '',
            access_type: '',
            ticket_access: '',
            created_at: '',
            adminRights: '',
        },
        rights: {
            admin: '',
            tickets: null,
        },
        features: {
            support: '',
            tickets: '',
        },
        tabStatus: {
            admin: 'pending',
            tickets: 'pending',
        },
        show: {
            amendDetails: false
        },
        activeTab: 'admin',
        status: 'fulfilled',
        requestFailed: false,
    })

    const params = useParams();
    const showButton = false
    const pageTitle = "Auth Team Details"
    let validate = require('uuid-validate');
    // let isValidUuid = validate(params.uuid)    

    const breadCrumb = [
        { linkItem: true, title: "Security", url: "" },
        { linkItem: true, title: "Auth Team", url: "" },
        { linkItem: false, title: "Edit" },
    ]

    function fetchAuthorizationDetailsWithStatus() {
        setstate({
            ...state,
            status: 'pending'
        })

        fetchAuthorizationDetailsWithoutStatus()
    }

    async function fetchAuthorizationDetailsWithoutStatus() {
        try {
            // if (isValidUuid) {
            const authTeamApiPoint = AUTH_TEAM_DETAILS_API_ROUTE + '/' + params.uuid
            const response: any = await HttpServices.httpGet(authTeamApiPoint)

            let { data } = state
            let { features } = state
            let status = state.status

            status = 'fulfilled'
            data = response.data.data
            features.support = response.data.data_2.support

            setstate({
                ...state, data, status, features
            })
            // } else {
            //     let status = state.status
            //     status = 'rejected'

            //     setstate({
            //         ...state, status
            //     })
            // }
        } catch (e) {
            let status = state.status
            status = 'rejected'

            setstate({
                ...state, status
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchAuthorizationDetailsWithStatus();
    }, []);

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
    }

    function disableAdministrativeRights() {
        const accessType = state.data.access_type
        const ticketAccess = state.data.ticket_access

        return accessType === 'LTD' ? (
            true
        ) : (
            ticketAccess === 'RST' ? true : false
        )
    }

    const onAdminRightsChangeHandler = (e: any) => {
        const denyActionRequest = disableAdministrativeRights()

        if (!denyActionRequest) {
            let { data }: any = state
            let checked = e.target.checked;
            let toggleStatus = checked ? 'Y' : 'N'
            data.adminRights[e.target.name] = toggleStatus

            setstate({
                ...state, data
            })

            configureAdminRightsApiEndPoint(e.target.name, toggleStatus)
        }
    }

    const configureAdminRightsApiEndPoint = async (featureName: any, value: any) => {
        try {
            let input = {
                uuid: params.uuid,
                input_key: featureName,
                input_value: value,
            }

            const response: any = await HttpServices.httpPost(AUTH_TEAM_CONFIGURE_ADMIN_RIGHTS_API_ROUTE, input)

            if (response.data.success) {
                // Do nothing on success
            } else {
                toast.error('Something went wrong with your request. Try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error('Something went wrong with your request. Try again later', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function disableTicketRights(item: any) {
        const ticketAccess = state.data.ticket_access
        const specialRights = [
            'edit_properties',
            'any_comment',
            'merge_tickets',
            'archive_tickets',
            'suspend_tickets',
            'parent_child_ticketing',
        ]

        if (ticketAccess === 'GLB') {
            return false
        } else {
            return specialRights.includes(item)
        }
    }

    const onTicketRightsChangeHandler = (e: any, right: any) => {
        const denyActionRequest = disableTicketRights(right)

        if (!denyActionRequest) {
            let { rights }: any = state
            let checked = e.target.checked;

            let toggleStatus = checked ? 'Y' : 'N'
            rights.tickets[e.target.name] = toggleStatus

            setstate({
                ...state, rights
            })

            configureTicketRightsApiEndPoint(e.target.name, toggleStatus)
        }
    }

    const configureTicketRightsApiEndPoint = async (inputKey: any, inputValue: any) => {
        try {
            let input = {
                uuid: params.uuid,
                input_key: inputKey,
                input_value: inputValue,
            }

            const response: any = await HttpServices.httpPost(AUTH_TEAM_CONFIGURE_TICKETS_RIGHTS_API_ROUTE, input)

            if (response.data.success) {
                // Do nothing on success
            } else {
                // Rever the checkbox value
                let { rights } = state
                rights.tickets[inputKey] = inputValue === 'Y' ? 'N' : 'Y'

                setstate({
                    ...state, rights
                })

                toast.error('Something went wrong with your request. Try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            // Rever the checkbox value
            let { rights } = state
            rights.tickets[inputKey] = inputValue === 'Y' ? 'N' : 'Y'

            setstate({
                ...state, rights
            })

            toast.error('Something went wrong with your request. Try again later', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const updateRightsTabState = (tabName: any, dataFromTab: any) => {
        let { rights } = state
        rights[tabName] = dataFromTab

        setstate({
            ...state, rights
        })
    }

    const updateTabStatus = (tabName: any, status: any) => {
        let { tabStatus } = state
        tabStatus[tabName] = status

        setstate({
            ...state, tabStatus
        })
    }

    const updateFeaturesState = (feature: any, dataFromTab) => {
        let {features} = state
        features[feature] = dataFromTab

        setstate({
            ...state, features
        })
    }

    const loadRespectiveTab = (tabName = 'admin') => {
        switch (tabName) {
            case 'admin':
                return <AdministativeRights
                    disableCheckbox={disableAdministrativeRights()}
                    onCheckboxHandler={onAdminRightsChangeHandler}
                    support={state.features.support}
                    stateFromParent={state.data}
                />

            case 'tickets':
                return <TicketsRights
                    authTeamId={params.uuid}
                    data={state.rights.tickets}
                    status={state.tabStatus.tickets}
                    updateTabStatus={updateTabStatus}
                    disableCheckbox={disableTicketRights}
                    rightsFromParent={state.rights.tickets}
                    updateFeaturesState={updateFeaturesState}
                    featuresFromParent={state.features.tickets}
                    updateRightsTabState={updateRightsTabState}
                    onCheckboxHandler={onTicketRightsChangeHandler}
                />

            case 'escalations':
                return <EscalationRights

                />

            default:
                return null
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                />

                <HeaderParagraph title="Issue grants and access rights for various functionalities" />
            </div>

            <div className="w-full px-12 mb-3">
                <div className="w-12/12 mb-5">
                    {
                        state.status === 'rejected' ? (
                            <EmptyResultsReturned />
                        ) : state.status === 'fulfilled' ? (
                            <>
                                {
                                    (state.data === undefined || state.data === null) ? (
                                        <EmptyResultsReturned />
                                    ) : (
                                        <>
                                            <div className="w-full mb-4 px-4">
                                                <div className="w-7/12 mb-3">
                                                    <div className="w-full mb-3 flex flex-row align-middle">
                                                        <p className="text-3xl flex-grow">
                                                            {/* Excepteur sint occaecat */}
                                                            {state.data.name}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm mb-3 text-slate-600">
                                                        {state.data.description}
                                                        {/* Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
                                                    </p>

                                                    <div className="w-full py-4 flex align-middle mb-5">
                                                        <div className="flex-grow flex flex-row align-middle">
                                                            {
                                                                state.data.default !== 'Y' ? (
                                                                    <p className="mr-4 mb-0">
                                                                        <span className="text-slate-600 mb-0 text-xs py-1 rounded flex flex-row align-middle">
                                                                            <i className="far fa-server mr-2 fa-lg"></i>

                                                                            <span>System</span>
                                                                        </span>
                                                                    </p>
                                                                ) : null
                                                            }

                                                            <p className="mr-4 mb-0">
                                                                {
                                                                    state.data.access_type === 'ALL' ? (
                                                                        <span className="text-purple-800 mb-0 text-xs py-1 flex flex-row align-middle">
                                                                            <i className="far fa-unlock mr-2 fa-lg"></i>

                                                                            <span>All Time Access</span>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-amber-500 mb-0 text-xs py-1 rounded flex flex-row align-middle">
                                                                            <i className="far fa-lock mr-2 fa-lg"></i>

                                                                            <span>Limited Time Access</span>
                                                                        </span>
                                                                    )
                                                                }
                                                            </p>

                                                            <p className="mr-4 mb-0">
                                                                {
                                                                    state.data.ticket_access === 'GLB' ? (
                                                                        <span className="text-sky-800 mb-0 text-xs py-1 rounded">
                                                                            <i className="far fa-universal-access mr-2 fa-lg"></i>

                                                                            <span>Global Ticket Access</span>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-rose-500 mb-0 text-xs py-1 rounded flex flex-row align-middle">
                                                                            <i className="far fa-flag mr-2 fa-lg"></i>

                                                                            <span>Restricted Ticket Access</span>
                                                                        </span>
                                                                    )
                                                                }
                                                            </p>
                                                        </div>

                                                        <p className="text-xs mb-2 text-slate-500">
                                                            <i className="fal fa-business-time fa-lg"></i>
                                                            <span className="ml-2">
                                                                <DateFormating dateString={state.data.created_at} />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-10/12 pb-3 flex flex-row">
                                                <div className="w-auto cursor-pointer" onClick={() => activateTab('admin')}>
                                                    <button className={classNames(
                                                        state.activeTab === 'admin' ? 'text-emerald-700 border-b-2 bg-emerald-50 border-emerald-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                        "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                    )}>
                                                        <span className="lolrtn robot">Administrative Rights</span>
                                                    </button>
                                                </div>

                                                <div className="w-auto cursor-pointer" onClick={() => activateTab('tickets')}>
                                                    <button className={classNames(
                                                        state.activeTab === 'tickets' ? 'text-emerald-700 border-b-2 bg-emerald-50 border-emerald-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                        "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                    )}>
                                                        <span className="lolrtn robot">Ticket Rights</span>
                                                    </button>
                                                </div>

                                                <div className="w-auto cursor-pointer" onClick={() => activateTab('escalations')}>
                                                    <button className={classNames(
                                                        state.activeTab === 'escalations' ? 'text-emerald-700 border-b-2 bg-emerald-50 border-emerald-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                                        "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                                    )}>
                                                        <span className="lolrtn robot">Escalation Rights</span>
                                                    </button>
                                                </div>

                                                <div className="flex-grow border-b-2">

                                                </div>
                                            </div>

                                            <div className="w-10/12 pb-6 px-3">
                                                {loadRespectiveTab(state.activeTab)}
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <Loading />
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default EditAuthorizations