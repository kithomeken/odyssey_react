import { Helmet } from "react-helmet"
import React, { useState } from "react"

import { RecentActivity } from "./RecentActivity"
import { useAppSelector } from "../../store/hooks"
import { HEADER_SECTION_BG } from "../../global/ConstantsRegistry"
import { ChangeEmail } from "./ChangeEmail"
import { AccountSecurity } from "./AccountSecurity"
import { Preferences } from "./Preferences"

export const AccountProfile = () => {
    const [state, setstate] = useState({
        data: {
            email: null
        },
        activeTab: 'recent',
        tabStatus: {
            email: 'pending'
        }
    })

    const authenticationState = useAppSelector(state => state.auth)

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
    }

    // Header button
    const pageTitle = authenticationState.accountName + " - Account Profile"
    const maxWidth = { maxWidth: '1024px' }

    function menuListAndAccountName() {
        return (
            <>    
                <div className="w-full">
                    <button type="button" onClick={() => activateTab('recent')} className={classNames(
                        state.activeTab === 'recent' ? 'text-green-700' : 'text-slate-700 hover:bg-slate-100',
                        "text-sm items-center w-full text-left py-2 px-4 rounded"
                    )}>
                        <span className="flex flex-row align-middle items-center">
                            <span className="ml-2 flex-auto">
                                Account Profile
                            </span>
                        </span>
                    </button>

                    <button type="button" onClick={() => activateTab('email')} className={classNames(
                        state.activeTab === 'email' ? 'text-green-700' : 'text-slate-700 hover:bg-slate-100',
                        "text-sm items-center w-full text-left py-2 px-4 rounded mt-2"
                    )}>
                        <span className="flex flex-row align-middle items-center">
                            <span className="ml-2 flex-auto">
                                Change E-mail
                            </span>
                        </span>
                    </button>

                    <button type="button" onClick={() => activateTab('security')} className={classNames(
                        state.activeTab === 'security' ? 'text-green-700' : 'text-slate-700 hover:bg-slate-100',
                        "text-sm items-center w-full text-left py-2 px-4 rounded mt-2"
                    )}>
                        <span className="flex flex-row align-middle items-center">
                            <span className="ml-2 flex-auto">
                                Security
                            </span>
                        </span>
                    </button>

                    <button type="button" onClick={() => activateTab('preferences')} className={classNames(
                        state.activeTab === 'preferences' ? 'text-green-700' : 'text-slate-700 hover:bg-slate-100',
                        "text-sm items-center w-full text-left py-2 px-4 rounded mb-4 mt-2"
                    )}>
                        <span className="flex flex-row align-middle items-center">
                            <span className="ml-2 flex-auto">
                                Preferences
                            </span>
                        </span>
                    </button>

                    <hr />
                </div>

                <div className="w-full pt-3 pl-5">
                    <div className="h-16 w-16 flex flex-row align-middle bg-emerald-600 mb-4 rounded-full">
                        <p className="m-auto text-3xl text-white">
                            {authenticationState.accountName.charAt(0)}
                        </p>
                    </div>
    
                    <div className="mb-4">
                        <p className="text-sm text-slate-500 mb-0">
                            Account Name
                        </p>
    
                        <p className="text-sm text-slate-700 mb-0 flex fle-row align-middle">
                            {authenticationState.accountName}
                        </p>
                    </div>
    
                    <div className="mb-4">
                        <p className="text-sm text-slate-500 mb-0">
                            E-mail Address
                        </p>
    
                        <p className="text-sm text-slate-700">
                            {authenticationState.email}
                        </p>
                    </div>
                </div>
            </>
        )
    }

    const loadRespectiveTab = (tabName = 'poc') => {
        switch (tabName) {
            case 'recent':
                return <RecentActivity />
            
            case 'security':
                return <AccountSecurity />
            
            case 'preferences':
                return <Preferences />
            
            case 'email':
                return <ChangeEmail 
                data={state.data.email} 
                status={state.tabStatus.email} 
                updateTabStatus={updateTabStatus} 
                updateTabDataState={updateTabDataState} />

            default:
                return null
        }
    }

    const updateTabStatus = (tabName: any, status: any) => {
        let { tabStatus } = state
        tabStatus[tabName] = status

        setstate({
            ...state, tabStatus
        })
    }

    const updateTabDataState = (tabName: any, dataFromTab: any) => {
        let { data } = state
        data[tabName] = dataFromTab

        setstate({
            ...state, data
        })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 w-full ${HEADER_SECTION_BG} form-group mb-3 sttng_strp h-24`}>
                <div className="kiOAkj" style={maxWidth}>
                    <div className="flex items-center pb-3 pt-3 lg:justify-between w-full">
                        <div className="flex-1 min-w-0">

                        </div>
                    </div>
                </div>
            </div>

            <div className={`px-12 w-full form-group mb-3/`}>
                <div className="kiOAkj" style={maxWidth}>
                    <div className="flex flex-row mb-4 w-full">
                        <div className="w-60 pr-4 pt-4 pb-4">

                            {menuListAndAccountName()}

                        </div>

                        <div className="flex-auto rounded pl-4 pt-4 pb-4">
                            {loadRespectiveTab(state.activeTab)}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}