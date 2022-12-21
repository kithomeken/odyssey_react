import swal from 'sweetalert';
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import React, { useState } from "react"
import { Menu } from "@headlessui/react";
import { Link, useParams } from "react-router-dom"

import ProductEdit from "./ProductChange";
import Error500 from "../../../errors/Error500"
import Header from "../../../../components/settings/Header"
import HttpServices from "../../../../services/HttpServices"
import DateFormating from "../../../../lib/hooks/DateFormating"
import { ActionModal } from '../../../../components/lib/ActionModal';
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import { DropDownWithButton } from "../../../../components/lib/DropDownWithButton";
import { PRODUCT_DECOMMISSION_API_ROUTE, PRODUCT_LIST_API_ROUTE, PRODUCT_REINSTATE_API_ROUTE } from "../../../../api/v1/api.GeneralRoutes";
import NoDataReactTable from '../../../../lib/hooks/NoDataReactTable';
import ReactTable from '../../../../lib/hooks/ReactTable';
import { WarningActionModal } from '../../../../components/lib/WarningActionModal';
import { generalRoutes } from '../../../../routes/settings/generalRoutes';

const Productview = () => {
    const [state, setstate] = useState({
        data: null,
        status: 'pending',
        requestFailed: false,
        modals: {
            showEditing: false,
            showReinstatement: false,
            showDecommissioning: false,
        },
        postingForm: {
            decommissioning: false,
            reinstating: false,
        },
    })

    const showButton = false
    const params = useParams();
    const pageTitle = "Product View"
    const companyGroupLink = (generalRoutes.find((routeName) => routeName.name === 'CMPNY'))?.path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: "" },
        { linkItem: true, title: "Product Management", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    async function fetchProductDetailsApiCall() {
        setStatusAsPending()

        try {
            const productId = params.uuid
            const response: any = await HttpServices.httpGet(PRODUCT_LIST_API_ROUTE + '/' + productId)
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
            let requestFailed = state.requestFailed

            requestFailed = true
            status = 'rejected'

            setstate({
                ...state,
                status,
                requestFailed,
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchProductDetailsApiCall();
    }, []);

    function setStatusAsPending() {
        setstate({
            ...state,
            status: 'pending'
        })
    }

    const showOrHideDecommissionProductModal = () => {
        let { modals } = state
        modals.showDecommissioning = !state.modals.showDecommissioning

        setstate({
            ...state, modals
        })
    }

    const decommissionProductApiCall = async () => {
        let { data } = state
        let { postingForm } = state

        if (data.product.deleted_at === null && !postingForm.decommissioning) {
            try {
                postingForm.decommissioning = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(PRODUCT_DECOMMISSION_API_ROUTE, params)

                if (response.data.success) {
                    let { data } = state
                    data.product = response.data.payload.product

                    setstate({
                        ...state, data
                    })

                    showOrHideDecommissionProductModal()
                } else {
                    toast.error('Could not decommission product. Something went wrong', {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                toast.error('Could not decommission product. Something went wrong', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            postingForm.decommissioning = false
            setstate({
                ...state, postingForm
            })
        }
    }

    const showOrHideProductReinstatementModal = () => {
        let { modals } = state
        modals.showReinstatement = !state.modals.showReinstatement

        setstate({
            ...state, modals
        })
    }

    const reinstateProductApiCall = async () => {
        let { data } = state
        let { postingForm } = state

        if (data.product.deleted_at !== null && !postingForm.reinstating) {
            try {
                postingForm.reinstating = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(PRODUCT_REINSTATE_API_ROUTE, params)

                if (response.data.success) {
                    let { data } = state
                    data.product = response.data.payload.product

                    setstate({
                        ...state, data
                    })

                    showOrHideProductReinstatementModal()
                } else {
                    toast.error('Could not reinstate product. Something went wrong', {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                toast.error('Could not reinstate product. Something went wrong', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            postingForm.reinstating = false
            setstate({
                ...state, postingForm
            })
        }
    }

    const showOrHideEditProductModal = () => {
        let { modals } = state
        modals.showEditing = !state.modals.showEditing

        setstate({
            ...state, modals
        })
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const columns = [
        {
            Header: 'Company',
            accessor: (data: { name: any, uuid: any }) => (
                <span>
                    <Link to={`${companyGroupLink}/${data.uuid}`} className="m-auto block py-1 cursor-pointer text-blue-600 hover:text-blue-800 text-sm">
                        {data.name}
                    </Link>
                </span>
            ),
        },
        {
            Header: 'Country',
            accessor: (data: { country: any }) => (
                <span>
                    <span className="block text-black text-sm">
                        {data.country}
                    </span>
                </span>
            ),
        },
        {
            Header: ' ',
            accessor: (data: { created_at: any }) => (
                <span className="block text-gray-500 mb-0 text-sm float-right">
                    <DateFormating dateString={data.created_at} />
                </span>
            )
        },
    ]

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 pt-3 w-full`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-12/12">
                    {
                        state.status === 'rejected' ? (
                            <Error500 />
                        ) : state.status === 'fulfilled' ? (
                            <div>
                                <div className="pt-2 pb-6">
                                    <div className="w-9/12 px-2">
                                        <div className="flex flex-row align-middle">
                                            <div className="w-6/12">
                                                <p className="text-3xl mb-2">
                                                    {state.data.product.name}
                                                </p>
                                            </div>

                                            <div className="w-6/12">
                                                {
                                                    state.data.product.deleted_at === null ? (
                                                        <DropDownWithButton
                                                            danger={false}
                                                            buttonTitle="Edit"
                                                            iconProperty="fas fa-clipboard-user fa-lg"
                                                            onMainActionButton={showOrHideEditProductModal}
                                                            menuItems={
                                                                <>
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                onClick={showOrHideDecommissionProductModal}
                                                                                className={classNames(
                                                                                    active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                                                                    'block px-4 py-2 text-sm text-left w-full'
                                                                                )}
                                                                            >
                                                                                Decommission Product
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </>
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="w-full">
                                                            <button
                                                                type="button"
                                                                onClick={showOrHideProductReinstatementModal}
                                                                className="inline-flex items-center float-right px-3 py-1-5 mr-2 rounded border bg-white border-green-500 shadow-sm text-sm text-green-600 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-300">
                                                                <span className="mr-2 fas fa-paper-plane"></span>

                                                                <span className="text-sm">
                                                                    Reinstate
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )
                                                }


                                            </div>

                                        </div>

                                        <p className="text-sm form-group py-1 text-slate-600">
                                            {state.data.product.description}
                                        </p>

                                        {
                                            state.data.product.deleted_at === null ? (
                                                <div>
                                                    <p className="form-group text-sm text-gray-500 flex items-center align-middle">
                                                        <i className="fal fa-clock text-gray-700"></i>
                                                        <span className="ml-2">
                                                            <span className="text-gray-700">Last Updated: </span>
                                                            <DateFormating dateString={state.data.product.updated_at} />
                                                        </span>
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="form-group rounded border-0 bg-orange-100 py-4 px-4">
                                                        <div className="flex flex-row align-middle text-orange-600">
                                                            <i className="fas fa-exclamation-circle fa-lg mt-1 text-orange-600 flex-none"></i>

                                                            <div className="flex-auto ml-1">
                                                                <span className="text-sm pl-3 text-orange-600 block">
                                                                    This product has been decommissioned. No more tickets will be raised for this product.

                                                                    <span className="block mt-3">
                                                                        <p className="text-sm flex items-center align-middle">
                                                                            <i className="fal fa-clock text-orange-700"></i>
                                                                            <span className="ml-2">
                                                                                <span className="text-orange-700">Decommissioned On: </span>
                                                                                <DateFormating dateString={state.data.product.deleted_at} />
                                                                            </span>
                                                                        </p>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <hr />
                                    </div>

                                    <div className="w-9/12 px-2 py-4">
                                        <p className="text text-slate-700 mb-2">
                                            Companies Subscribed
                                        </p>

                                        <p className="text-sm form-group py-1 text-slate-600">
                                            List of companies subscribed to this product
                                        </p>

                                        <div className="w-full form-group">
                                            {
                                                state.data.subscriptions.length < 1 ? (
                                                    <div className="form-group rounded border-0 bg-sky-100 py-4 px-4">
                                                        <div className="flex flex-row align-middle text-blue-700">
                                                            <i className="fas fa-info-circle fa-lg mt-1 text-blue-700 flex-none"></i>

                                                            <div className="flex-auto ml-1">
                                                                <span className="text-sm pl-3 text-blue-700 block">
                                                                    No companies are subscribed to this product.

                                                                    {
                                                                        state.data.product.deleted_at === null ? (
                                                                            <span className="block mt-2">
                                                                                To enlist a company for subscription, go to

                                                                                <Link to={companyGroupLink} className="ml-1 underline text-blue-800">
                                                                                    Company Groups
                                                                                </Link>

                                                                                , select a company and add this product to their subscription.
                                                                            </span>
                                                                        ) : null
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <ReactTable columns={columns} data={state.data.subscriptions} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <ProductEdit
                                    uuid={params.uuid}
                                    productProps={state.data.product}
                                    show={state.modals.showEditing}
                                    hideModal={showOrHideEditProductModal}
                                    fetchFunc={fetchProductDetailsApiCall}
                                />

                                <ActionModal
                                    title="Decommission Product"
                                    iconClass="fad fa-trash-alt fa-lg"
                                    show={state.modals.showDecommissioning}
                                    actionEvent={decommissionProductApiCall}
                                    showOrHide={showOrHideDecommissionProductModal}
                                    isPostingForm={state.postingForm.decommissioning}
                                    details="No more tickets will be raised for this product. Do you wish to proceed?"
                                    actionButton={{
                                        before: "Decommission",
                                        after: "Decommissioning"
                                    }}
                                />

                                <WarningActionModal
                                    show={state.modals.showReinstatement}
                                    title={"Reinstate Product"}
                                    details={"This action will reinstate this product. Do you wish to proceed?"}
                                    iconClass={"fad fa-cloud-upload fa-lg"}
                                    showOrHide={showOrHideProductReinstatementModal}
                                    actionEvent={reinstateProductApiCall}
                                    isPostingForm={state.postingForm.reinstating}
                                    actionButton={{
                                        before: "Reinstate",
                                        after: "Reinstating"
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Productview