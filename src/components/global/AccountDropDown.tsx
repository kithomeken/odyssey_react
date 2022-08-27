import React, { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"

import { useDispatch } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { accountSignOutActions } from "../../store/auth/accountSignOutActions"
import tempararyAvatar from '../../assets/avatars/C6C2E60B0A5CC3A09F638284A21571F3.png'
import { protectedRoutes } from "../../routes/auth/protectedRoutes"
import { Link } from "react-router-dom"

export const AccountDropDown = () => {
    const dispatch = useDispatch()
    const authenticationState = useAppSelector(state => state.auth)
    const accountProfile = (protectedRoutes.find((routeName) => routeName.name === 'PROF_AC'))?.path

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const getFirstLetterFromName = () => {
        return authenticationState.accountName.charAt(0)
    }

    const accountSignOutHandler = () => {
        dispatch(accountSignOutActions())
    }

    return (
        <React.Fragment>
            <Menu as="div" className="relative inline-block text-left float-right">
                {({ open }) => (
                    <>
                        <div className='flex flex-row w-full'>
                            <Menu.Button
                                className={
                                    classNames(
                                        open ? 'text-slate-700' : null,
                                        "flex flex-row items-center w-auto px-3 rounded py-1 bg-white text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-0 focus:ring-offset focus:ring-offset-slate-100 focus:ring-emerald-500 align-middle"
                                    )
                                }>
                                <span className="text-sm mr-2">{authenticationState.accountName}</span>
                                <img className="rounded-full h-10 w-10" src={tempararyAvatar} alt="" />
                            </Menu.Button>
                        </div>

                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-1 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-2">
                                    <p className="m-auto text-sm px-4 py-1 text-slate-500">
                                        Account
                                    </p>

                                    <div className="px-4 py-2 text-sm text-left w-full block text-slate-700">
                                        <div className="w-full flex flex-row items-center align-middle">
                                            <div className="h-8 w-8 flex flex-row align-middle bg-emerald-600 rounded-full">
                                                <p className="m-auto text-xl text-white">
                                                    {getFirstLetterFromName()}
                                                </p>
                                            </div>

                                            <div className="flex-auto ml-2">
                                                <p className="text-xs text-slate-500 mb-0">
                                                    <span className="block text-sm text-slate-700">
                                                        {authenticationState.accountName}
                                                    </span>

                                                    <span className="block">
                                                        {authenticationState.email}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link 
                                                to={accountProfile}
                                                target="_blank"
                                                className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-3 text-sm text-left w-full block mt-2'
                                            )}
                                            >
                                                <span className="flex flex-row align-middle items-center pl-1">
                                                    <span className="w-7">
                                                        <i className="fal m-auto fa-user-crown text-base"></i>
                                                    </span>

                                                    <span className="ml-2 flex-auto">
                                                        Manage Your Account
                                                    </span>
                                                </span>
                                            </Link>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-3 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row align-middle items-center pl-1">
                                                    <span className="w-7">
                                                        <i className="fal m-auto fa-question text-base"></i>
                                                    </span>

                                                    <span className="ml-2 flex-auto">
                                                        Help & Feedback
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button 
                                            onClick={accountSignOutHandler}
                                            className={classNames(
                                                active ? 'bg-red-100 text-red-800' : 'text-red-700',
                                                'px-4 py-3 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row align-middle items-center pl-1">
                                                    <span className="w-7">
                                                        <i className="fal m-auto fa-sign-out text-base"></i>
                                                    </span>

                                                    <span className="ml-2 flex-auto">
                                                        Sign Out
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </React.Fragment>
    )
}