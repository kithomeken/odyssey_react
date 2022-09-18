import React from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"

import emptyBox from "../../assets/images/.512023.png"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"
import { specialAccountSignOutAction } from "../../store/auth/accountSignOutActions"
import { useAppSelector } from "../../store/hooks"

export const SuspendedAccount = () => {
    const dispatch = useDispatch()
    const authenticationState = useAppSelector(state => state.auth)

    const accountSignOutHandler = () => {
        dispatch(specialAccountSignOutAction())
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Account Suspended</title>
            </Helmet>

            <div className="wrapper">
                <section className="gx-container">
                    <div className="space-y-3 shadow-none border-0 border-slate-300 px-10 mb-3">
                        <div className="w-12/12 pb-4 pt-10 m-auto">
                            <img src={emptyBox} alt="401_broken_robot" width="300px" className="block text-center m-auto" />
                        </div>

                        <div className="m-auto">
                            <p className="text-center text-lg mb-2 text-red-600">
                                Your account has been suspended.
                            </p>

                            <p className="text-sm text-center form-group mb-0 text-gray-600">
                                Kindly contact your system administrator for assistance.
                            </p>
                        </div>
                    </div>

                    <div className="border-b mx-10 border-slate-300 py-1"></div>

                    <div className="pt-3 px-10 flex flex-row">
                        <div className="w-6/12">
                            <span className="text-sm text-slate-600">
                                {APPLICATION_NAME}
                                <sup className="pl-1">©</sup>
                            </span>
                        </div>

                        <div className="w-6/12">
                            <span className="text-sm float-right text-slate-600">
                            {authenticationState.accountName}
                            </span>

                            <button type="button" onClick={accountSignOutHandler} className="text-sm float-right text-blue-600 hover:text-blue-800">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}