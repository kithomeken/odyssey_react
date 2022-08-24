import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"

export const SettingsDropDown = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
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
                                        open ? 'bg-slate-200 text-slate-700' : null,
                                        "flex justify-center w-auto px-1 rounded py-1 bg-white text-sm font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-0 focus:ring-offset focus:ring-offset-slate-100 focus:ring-emerald-500 align-middle"
                                    )
                                }>
                                <div className='h-7 w-7'>
                                    <svg xmlns="http://www.w3.org/2000/svg" x-description="Heroicon name: outline/cog" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-2">
                                    <p className="m-auto text-lg px-4 py-2 text-emerald-600">
                                        Settings
                                    </p>
                                    
                                    <p className="m-auto text-sm px-4 py-1 text-slate-500">
                                        Administrative
                                    </p>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-user-crown text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        Account Management

                                                        <span className="block truncate text-xs text-slate-400">
                                                            Add users, authorization teams and manage...
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-acorn text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        Escalation Matrices 

                                                        <span className="block truncate text-xs text-slate-400">
                                                            Add users, authorization teams and manage...
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-wallet text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        Billing 

                                                        <span className="block truncate text-xs text-slate-400">
                                                            Add users, authorization teams and manage...
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <div className="px-4 py-2">
                                        {/* <hr /> */}
                                    </div>

                                    <p className="m-auto text-sm px-4 py-1 text-slate-500">
                                        {APPLICATION_NAME} Settings
                                    </p>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-server text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        System 

                                                        <span className="block truncate text-xs text-slate-400">
                                                            General configurations, authorization and permi...
                                                        </span>
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