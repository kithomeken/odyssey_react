import React, { useState } from "react"
import PhoneInput from 'react-phone-number-input'
import { COMPANY_GROUP_CONTACT_LIST_API_ROUTE, COMPANY_GROUP_CONTACT_REMOVE_API_ROUTE } from "../../../../api/ApiRoutes"

import Loading from "../../../../components/layouts/Loading"
import HttpServices from "../../../../services/HttpServices"
import EmptyResultsReturnedSFF from "../../../errors/EmptyResultsReturnedSFF"
import AddContact from "./AddContact"

const PointsOfContactTab = ({ data, status, companyId, orgnztn_country, updateTabDataState, updateTabStatus }: { data: any, status: any, companyId: any, orgnztn_country: any, updateTabDataState: any, updateTabStatus: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        requestSucceeded: false,
        show: false,
    })

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    const emptyOnChangeHandler = () => { }

    const reloadContactsPersonsDetailsApiCall = async () => {
        try {
            const response: any = await HttpServices.httpGet(COMPANY_GROUP_CONTACT_LIST_API_ROUTE + '/' + companyId)

            setstate({
                ...state, show: false
            })

            updateTabDataState('contacts', response.data.data)
            updateTabStatus('poc', 'fulfilled')
        } catch (e) {
            console.warn(e);
            updateTabStatus('poc', 'rejected')
        } finally {
            // Do nothing            
        }
    }

    const removeContactPersonHandler = async (contact_uuid: any) => {
        let { requestFailed }: any = state

        try {
            let formData = new FormData()
            formData.append("contact_uuid", contact_uuid)
            formData.append("company_uuid", companyId)
            const response: any = await HttpServices.httpPost(COMPANY_GROUP_CONTACT_REMOVE_API_ROUTE, formData)            
            
            if (response.data.success) {
                reloadContactsPersonsDetailsApiCall()
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        setstate({
            ...state, requestFailed
        })
    }

    return (
        <React.Fragment>
            {
                status === 'rejected' ? (
                    null
                ) : status === 'fulfilled' ? (
                    <>
                        <div className="w-full">
                            <h2 className="text-sm leading-7 text-emerald-600 sm:text-lg">
                                Points Of Contact
                            </h2>

                            <div className="w-12/12">
                                <p className="text-sm text-gray-500">
                                    Focal points of information to be contacted when there's a need be.
                                </p>

                                {
                                    data.length < 3 ? (
                                        <div className="py-2 mb-2">
                                            <span className="text-blue-500 text-sm cursor-pointer flex-row align-middle" onClick={showOrHideModal}>
                                                <span className="fas fa-plus mr-2"></span>
                                                Add point of contact
                                            </span>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div>

                            {
                                data === null || data === undefined ? (
                                    <EmptyResultsReturnedSFF />
                                ) : (
                                    <div className="w-full">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Name</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Email</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Phone</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">-</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {data.map((row: any, index: any) => {
                                                    return (
                                                        <tr key={index} className="border-b text-sm hover:bg-gray-100">
                                                            <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                                                                {row.name}
                                                            </td>
                                                            <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                                                                {row.email}
                                                            </td>
                                                            <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                                                                <PhoneInput
                                                                    international
                                                                    readOnly={true}
                                                                    disabled={true}
                                                                    defaultCountry="KE"
                                                                    onChange={emptyOnChangeHandler}
                                                                    value={row.phone}
                                                                />
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <p className="text-red-500 p-1-5 flex-1 text-xs hover:text-red-700 cursor-pointer mb-0" onClick={() => removeContactPersonHandler(row.uuid)}>
                                                                    Remove
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }

                            {
                                state.show ? (
                                    <AddContact
                                        show={state.show}
                                        companyId={companyId}
                                        showOrHideModal={showOrHideModal}
                                        orgnztn_country={orgnztn_country}
                                        reloadContactsTable={reloadContactsPersonsDetailsApiCall}
                                    />
                                ) : null
                            }
                        </div>
                    </>
                ) : (
                    <Loading />
                )
            }
        </React.Fragment>
    )
}

export default PointsOfContactTab