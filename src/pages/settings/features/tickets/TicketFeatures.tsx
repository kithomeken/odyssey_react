import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"

import { TICKET_FEATURES_CONFIGURE_API_ROUTE, TICKET_FEATURES_LIST_API_ROUTE } from "../../../../api/ApiRoutes"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraphLarge from "../../../../components/settings/HeaderParagraphLarge"
import { APPLICATION_NAME, HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import { featuresRoutes } from "../../../../routes/settings/featuresRoutes"
import HttpServices from "../../../../services/HttpServices"
import ComplementaryTicketFeatures from "./ComplementaryTicketFeatures"
import MainTicketFeatures from "./MainTicketFeatures"

const TicketFeatures = () => {
    const [state, setstate] = useState({
        activeTab: 'main',
        isLoading: true,
        requestFailed: false,
        statusMain: 'Pending',
        statusComp: 'Pending',
        features: {
            configure_types: '',
            configure_regions: '',
            schedule_tickets: '',
            configure_templates: '',
            link_similar_tickets: '',
            share_ticket_ownership: '',
            parent_child_ticketing: '',
            capture_root_cause: '',
            capture_solution_deployed: '',
        },
    })

    const showButton = false
    const pageTitle = "Ticket Features"
    const thisPageRoutes = featuresRoutes[3].path
    const applicationName = APPLICATION_NAME

    const breadCrumb = [
        { linkItem: true, title: "Features", url: thisPageRoutes },
        { linkItem: false, title: pageTitle },
    ]

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
    }

    const loadRespectiveTab = (tabName = 'agents') => {
        switch (tabName) {
            case 'main':
                return <MainTicketFeatures
                    onChangeToggleHandler={onChangeToggleHandler}
                    state={state}
                />

            case 'complementary':
                return <ComplementaryTicketFeatures
                    onChangeToggleHandler={onChangeToggleHandler}
                    state={state}
                />

            default:
                return null
        }
    }

    function setStatusMainAsPending() {
        setstate({
            ...state,
            statusMain: 'Pending'
        })
    }

    async function fetchTicketFeaturesListApiCall() {
        setStatusMainAsPending()

        try {
            const response: any = await HttpServices.httpGet(TICKET_FEATURES_LIST_API_ROUTE)

            let { features }: any = state
            let statusMain = state.statusMain

            features = (response.data.data === null) ? features : response.data.data
            statusMain = 'fulfilled'

            setstate({
                ...state, features, statusMain,
            })
        } catch (e) {
            console.warn(e);
            let statusMain = state.statusMain
            statusMain = 'rejected'

            setstate({
                ...state, statusMain,
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchTicketFeaturesListApiCall();
    }, []);

    const onChangeToggleHandler = (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'

        console.log(e.target.name);
        console.log(toggleStatus);

        postTicketFeatureStatusApiCall(e.target.name, toggleStatus)
    }

    const postTicketFeatureStatusApiCall = async (featureName: any, value: any) => {
        try {
            let input = {
                input_name: featureName,
                input_value: value,
            }

            const response: any = await HttpServices.httpPost(TICKET_FEATURES_CONFIGURE_API_ROUTE, input)

            if (response.data.success) {
                if (value === 'Y') {
                    let toastText = 'Feature has been activated'

                    toast.success(toastText, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    let toastText = 'Feature has been deactivated'

                    toast.warn(toastText, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('Something went wrong with your request', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong with your request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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

                <HeaderParagraphLarge
                    title={`We have a tonne of support features available on ${applicationName} that help us tailor the system to your exact needs. As per usual, not all may be applicable to you or your users. And as such, to best suit your workflow experience and performance, select all support features that may apply to your business flow.`}
                />
            </div>

            <div className="w-full form-group px-12">
                <div className="w-full flex flex-row">
                    <div className="w-auto cursor-pointer" onClick={() => activateTab('main')}>
                        <button className={classNames(
                            state.activeTab === 'main' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Main Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => activateTab('complementary')}>
                        <button className={classNames(
                            state.activeTab === 'complementary' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Complementary Features</span>
                        </button>
                    </div>

                    <div className="flex-grow border-b-2">

                    </div>
                </div>

                <div className="w-full px-3">
                    {loadRespectiveTab(state.activeTab)}
                </div>
            </div>
        </React.Fragment>
    )
}

export default TicketFeatures