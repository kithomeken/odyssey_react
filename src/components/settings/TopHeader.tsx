import React from "react"
import { Link } from "react-router-dom"

import Crypto from "../../encryption/Crypto"
import CookieServices from "../../services/CookieServices"
import { ACCOUNT_INFO_COOKIE } from "../../global/CookieNames"
import tempararyAvatar from '../../assets/avatars/C6C2E60B0A5CC3A09F638284A21571F3.png'

const TopHeader = () => {
    const enAccountInfo = CookieServices.get(ACCOUNT_INFO_COOKIE)
    const deAccountInfo = Crypto.decryptDataUsingAES256(enAccountInfo)
    const accountInfo = JSON.parse(deAccountInfo)

    const displayNone = {display: 'none'}
    
    return (
        <React.Fragment>
            <nav className="bg-white shadow fixed w-full z-10">
                <div className="max-w-full bg-white mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-6 lg:ml-0">
                                <div className="flex space-x-4">
                                    <Link to="/home" className="text-green-500 mb-0 nunito font-bold px-0 py-2 rounded-md" aria-current="page">
                                        <span className="text-2xl">
                                            Odyssey
                                        </span>

                                        <sup className="text-gray-700 ml-2 text-sm">
                                            Site Manager
                                        </sup>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button className="text-gray-800 p-1 ml-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" x-description="Heroicon name: outline/bell" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>

                            <div className="ml-3 relative">
                                <div>
                                    <button type="button" className="flex text-sm focus:outline-none items-center border-l border-gray-300 pl-3" id="user-menu-button" x-ref="button">
                                        <span className="sr-only">Open user menu</span>
                                        <span className="text-sm mr-2">{accountInfo.account_name}</span>
                                        <img className="rounded-full h-10 w-10" src={tempararyAvatar} alt="" />
                                    </button>
                                </div>
                                
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" style={displayNone}>
                                    <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">
                                        Your Profile
                                    </button>
                                    
                                    <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default TopHeader