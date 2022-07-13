import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useCountries } from 'use-react-countries'
import { getCountryByNameOrShortName } from 'node-countries'
import PhoneInput from 'react-phone-number-input'
import swal from 'sweetalert';

import { ORGANIZATION_FETCH_DETAILS_API_ROUTE, ORGANIZATION_LOGO_REMOVAL_API_ROUTE } from "../../../../api/ApiRoutes";
import Loading from "../../../../components/layouts/Loading";
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import EmptyResultsReturned from "../../../errors/EmptyResultsReturned";
import Error500 from "../../../errors/Error500"
import UploadOrganizationLogo from "./UploadOrganizationLogo";
import EditOrganizationDetails from "./EditOrganizationDetails";
import { IMG_API_DOMAIN_PREFIX } from "../../../../api/ApiRegistry"

const OrganizationalDetails = () => {
    const [state, setstate] = useState({
        data: {
            name: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            country_code: '',
            logo_thumbnail: '',
            timezone: 'Pacific/Midway',
        },
        show: {
            uploadLogo: false,
            amendDetails: false
        },
        status: 'pending',
        requestFailed: false,
    })

    const showButton = false
    const { countries } = useCountries()
    const timezones = require('timezones-list')
    const pageTitle = "Organizational Details"
    const ORGANIZATION_DETS = (generalRoutes.find((routeName) => routeName.name === 'ORGNZ'))?.path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: ORGANIZATION_DETS },
        { linkItem: false, title: pageTitle },
    ]

    function fetchOrganizationDetailsWithSetStatus() {
        setstate({
            ...state,
            status: 'pending'
        })

        fetchOrganizationDetailsApiCall()
    }

    async function fetchOrganizationDetailsApiCall() {
        try {
            const response: any = await HttpServices.httpGet(ORGANIZATION_FETCH_DETAILS_API_ROUTE)

            let { data } = state
            let status = state.status

            data = response.data.data
            status = 'fulfilled'

            setstate({
                ...state, data, status
            })
        } catch (e) {
            console.warn(e);
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
        fetchOrganizationDetailsWithSetStatus();
    }, []);

    const emptyOnChangeHandler = () => { }

    const showOrHideRespectiveModal = (aspect: any) => {
        let { show } = state
        show[aspect] = !show[aspect]

        setstate({
            ...state, show
        })
    }

    const updateOrganizationLogoState = (logo: any, _fromModal?: any) => {
        let { data } = state
        data.logo_thumbnail = logo

        if (_fromModal !== null && _fromModal !== undefined) {
            showOrHideRespectiveModal('uploadLogo')
        }

        setstate({
            ...state, data
        })
    }

    const removeCompanyLogoHandler = async () => {
        swal({
            title: "Are you sure?",
            text: "Do you wish to remove the organization's logo?",
            dangerMode: true,
            buttons: ["Cancel", "Proceed"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    removeOrganizationLogoApiCall()
                }
            });
    }

    const removeOrganizationLogoApiCall = async () => {
        let { requestFailed }: any = state

        try {
            let formData = new FormData()
            const response: any = await HttpServices.httpPost(ORGANIZATION_LOGO_REMOVAL_API_ROUTE, formData)

            if (response.data.success) {
                updateOrganizationLogoState(null)
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        setstate({
            ...state, requestFailed,
        })
    }

    function renderAddressInHTML() {
        return <div dangerouslySetInnerHTML={addressInHtml()} />;
    }

    function addressInHtml() {
        return {__html: state.data.address}
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

                <HeaderParagraph title="Your organization's details are appended in report headings and emails sent to managed accounts." />
            </div>

            <div className="w-full px-12 form-group min-h-screen">
                <div className="w-12/12">
                    {
                        state.status === 'rejected' ? (
                            <Error500 />
                        ) : state.status === 'fulfilled' ? (
                            <>
                                {
                                    (state.data === undefined || state.data === null) ? (
                                        <EmptyResultsReturned />
                                    ) : (
                                        <div>
                                            <div className="w-10/12 mb-4 px-4 flex flex-row align-middle">
                                                <p className="text-3xl">
                                                    {state.data.name}
                                                </p>

                                                <div className="w-10 ml-4 flex align-ddle justify-center">
                                                    <button type="button" className={`inline-flex items-center p-1 px-2 ml-3 border-0 rounded text-sm text-blue-500 bg-white hover:bg-gray-50 hover:underline hover:border-0 focus:outline-none`} onClick={() => showOrHideRespectiveModal('amendDetails')}>
                                                        <span className="text-sm">
                                                            Edit
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="w-10/12 pt-2 flex">
                                                {/* Company details half */}
                                                <div className="w-5/12 px-4 border-r">
                                                    <div className="flex flex-row align-middle mb-4">
                                                        <div className="w-3/12">
                                                            <p className="text-sm mb-1 text-gray-500">
                                                                <span className="text-gray-600 mr-3">Email:</span>
                                                            </p>

                                                            <p className="text-sm mb-1 text-gray-500">
                                                                <span className="text-gray-600 mr-3">Phone:</span>
                                                            </p>
                                                        </div>

                                                        <div className="w-9/12">
                                                            <p className="text-sm mb-1 text-gray-500">
                                                                {state.data.email}
                                                            </p>

                                                            <p className="text-sm mb-1 text-gray-500">
                                                                <PhoneInput
                                                                    readOnly={true}
                                                                    disabled={true}
                                                                    className="border-0 rounded"
                                                                    placeholder="Enter phone number"
                                                                    value={state.data.phone}
                                                                    onChange={emptyOnChangeHandler}
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="w-full mb-5">
                                                        <div className="w-full flex flex-row mb-1 align-middle">
                                                            <div className="flex flex-row align-middle">
                                                                <p>
                                                                    <span className="fal text-sm fa-clock mr-1 text-gray-600"></span>
                                                                    <span className="text-sm text-gray-600">Timezone: </span>
                                                                </p>
                                                            </div>

                                                            <div className="ml-2">
                                                                {timezones.default.map((timezone: any, index: any) => (
                                                                    <span key={index}>
                                                                        {
                                                                            state.data.timezone === timezone.tzCode ? (
                                                                                <p>
                                                                                    <span className="flex items-center">
                                                                                        <span className="ml-2 text-sm text-gray-700 truncate">{timezone.label}</span>
                                                                                    </span>
                                                                                </p>
                                                                            ) : null
                                                                        }
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {countries.map((country: any, index: any) => (
                                                            <span key={index}>
                                                                {
                                                                    getCountryByNameOrShortName(state.data.country).name === country.name ? (
                                                                        <span className="flex items-center align-middle mb-2" key={index}>
                                                                            <span className="flex-shrink-0 h-5 w-4 rounded">{country.emoji}</span>
                                                                            <span className="ml-3 h-5 text-gray-700 truncate">{country.name}</span>
                                                                        </span>
                                                                    ) : null
                                                                }
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="w-full mb-3">
                                                        <p className="text-sm mb-1 text-gray-500">
                                                            <span className="text-gray-700 mr-3">Address:</span>
                                                        </p>

                                                        <p className="text-sm mb-1 pl-3 text-gray-500">
                                                            <span className="text-gray-500 mr-3">
                                                                {renderAddressInHTML()}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Company logo half */}
                                                <div className="w-7/12 px-4">
                                                    {
                                                        state.data.logo_thumbnail !== null && state.data.logo_thumbnail !== undefined ? (
                                                            <div className="w-full flex">
                                                                <div className="w-full">
                                                                    <div className="bg-gray-100 rounded mr-4 h-44 mb-3 flex flex-col justify-center">
                                                                        <img src={`${IMG_API_DOMAIN_PREFIX}/organization/${state.data.logo_thumbnail}`} className="form-group h-36 m-auto rounded text-sm" alt={`${state.data.name} Company Logo`} />
                                                                    </div>

                                                                    <p className="text-red-500 text-xs mb-4">
                                                                        <span className="cursor-pointer" onClick={removeCompanyLogoHandler}>
                                                                            Remove Company Logo
                                                                        </span>
                                                                    </p>
                                                                </div>

                                                                <div className="w-60">
                                                                    <div className="h-44 border-2 border-gray-400 border-dashed rounded-md flex flex-col justify-center">
                                                                        <div className="space-y-1 text-center flex-col align-middle">
                                                                            <svg
                                                                                className="mx-auto h-12 w-12 text-slate-400"
                                                                                stroke="currentColor"
                                                                                fill="none"
                                                                                viewBox="0 0 48 48"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <path
                                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                    strokeWidth={2}
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>

                                                                            <span className="text-xs text-gray-500">Change organization's logo</span>
                                                                            <div className="text-xs w-full m-0 text-gray-600">
                                                                                <label
                                                                                    className="relative cursor-pointer bg-white rounded-md text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                                >
                                                                                    <span onClick={() => showOrHideRespectiveModal('uploadLogo')}>Click to Browse</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="w-9/12">
                                                                <div className="h-36 border-2 border-gray-400 border-dashed rounded-md flex flex-col justify-center">
                                                                    <div className="space-y-1 text-center flex-col align-middle">
                                                                        <svg
                                                                            className="mx-auto h-12 w-12 text-slate-400"
                                                                            stroke="currentColor"
                                                                            fill="none"
                                                                            viewBox="0 0 48 48"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path
                                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>

                                                                        <span className="text-xs text-gray-500">Upload Your Organization's Logo,</span>
                                                                        <div className="text-xs w-full m-0 text-gray-600">
                                                                            <label
                                                                                className="relative cursor-pointer bg-white rounded-md text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                            >
                                                                                <span onClick={() => showOrHideRespectiveModal('uploadLogo')}>Click to browse</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            {
                                                state.show.uploadLogo ? (
                                                    <UploadOrganizationLogo
                                                        show={state.show.uploadLogo}
                                                        showOrHideModal={showOrHideRespectiveModal}
                                                        updateCompanyLogoState={updateOrganizationLogoState}
                                                    />
                                                ) : null
                                            }

                                            {
                                                state.show.amendDetails ? (
                                                    <EditOrganizationDetails
                                                        stateFromParent={state.data}
                                                        show={state.show.amendDetails}
                                                        showOrHideModal={showOrHideRespectiveModal}
                                                        reloadPageState={fetchOrganizationDetailsWithSetStatus}
                                                    />
                                                ) : null
                                            }
                                        </div>
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

export default OrganizationalDetails