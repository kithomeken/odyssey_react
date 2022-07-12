import React, { useState } from "react"
import { Helmet } from "react-helmet"
import swal from 'sweetalert';

import { UUID_COOKIE_NAME } from "../../../global/CookieNames";
import { MASTER_ACCOUNTS_LIST_API_ROUTE } from "../../../api/ApiRoutes";
import { APPLICATION_NAME, HEADER_SECTION_BG } from "../../../global/ConstantsRegistry"

import Crypto from "../../../encryption/Crypto"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import DateFormating from "../../../lib/hooks/DateFormating"
import NoDataReactTable from "../../../lib/hooks/NoDataReactTable";
import ReactTable from "../../../lib/hooks/ReactTable";
import CookieServices from "../../../services/CookieServices";
import HttpServices from "../../../services/HttpServices";
import Error500 from "../../errors/Error500";

const MasterAccounts = () => {
    const [state, setstate] = useState({
        data: null,
        status: 'pending',
        requestFailed: false,
        requestSucceeded: false,
    })

    // Header button
    const showButton = false
    const pageTitle = "Master Accounts"

    const breadCrumb = [
        { linkItem: true, title: "User Settings", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const columns = React.useMemo(
        () => [
            {
                Header: 'Account Holder',
                accessor: (data: { first_name: any, last_name: any }) => (
                    <span className="block text-black text-sm">
                        {data.first_name} {data.last_name}
                    </span>
                ),
            },
            {
                Header: 'Email',
                accessor: (data: { email: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        {data.email}
                    </span>
                ),
            },
            {
                Header: 'Added On',
                accessor: (data: { created_at: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        <DateFormating dateString={data.created_at} />
                    </span>
                )
            },
            {
                Header: '-',
                accessor: (data: { uuid: any }) => (
                    <button type="button" className="text-red-600 m-auto text-right float-right cursor-pointer hover:text-red-800 text-sm px-2 rounded" onClick={() => onClickRevokePriviledges(data.uuid)}>
                        Revoke Priviledges
                    </button>
                )
            },
        ],
        []
    )

    function setStatusAsPending() {
        setstate({
            ...state,
            status: 'pending'
        })
    }

    async function fetchMasterAccountsListApiCall() {
        setStatusAsPending()

        try {
            const response: any = await HttpServices.httpGet(MASTER_ACCOUNTS_LIST_API_ROUTE)
            let { data }: any = state
            let status = state.status

            data = response.data.data
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

    React.useEffect(() => {
        fetchMasterAccountsListApiCall();
    }, []);

    const onClickRevokePriviledges = (uuid: any) => {
        const encryptedCookieValue = CookieServices.get(UUID_COOKIE_NAME)
        const uuidCookieValue = Crypto.decryptDataUsingAES256(encryptedCookieValue)      

        if (encryptedCookieValue === uuid) {
            swal({
                title: "Action Denied!",
                text: "You cannot revoke your own master account priviledges...",
                dangerMode: false,
            })
        } else {
            swal({
                title: "Are you sure?",
                text: "Once you revoke all priviledges, this account will be assigned default rights.",
                dangerMode: true,
                buttons: ["Cancel", "Proceed"],
            })
            .then((willDelete) => {
                if (willDelete) {
                    revokeMasterAccountPriviledgesApiCall(uuid)
                }
            });
        }
    }

    const revokeMasterAccountPriviledgesApiCall = async (uuid: any) => {

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

                <HeaderParagraph title={`Master accounts control the administrative aspects of ${APPLICATION_NAME}, like account management, authorizations, helpdesk features among others, and furthermore help pay the bills at the end of the month (someone's got to do it).`} />
            </div>

            <div className="w-full px-12 form-group">
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
                            <div className="flex align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default MasterAccounts