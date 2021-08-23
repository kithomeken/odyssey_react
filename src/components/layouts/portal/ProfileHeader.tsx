import React, {Component} from "react"
import {Popover, Transition} from '@headlessui/react'

class ProfileHeader extends Component {
    classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    render() {
        return (
            <Popover className="relative mr-3">
                {({ open }) => (
                    <>
                        <Popover.Button className={
                            this.classNames(
                                open ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
                                'group bg-white rounded-md w-auto px-2 h-9 items-center justify-center inline-flex text-base font-medium hover:text-gray-900 focus:outline-none'
                            )}
                        >
                            <img className="h-8 w-8 rounded-full mr-1" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />
                            <span className="text-sm ml-2">Kennedy Kithome</span>

                        </Popover.Button>

                        <Transition
                            show={open}
                            as={React.Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                static
                                className="absolute left-1/2 z-10 transform -translate-x-1/2 mt-3 px-2 w-48 sm:px-0"
                            >
                                <div className="rounded-md text-left shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-6 bg-white px-2 py-2 mb-0">
                                        <span className="-m-3 p-2 flex items-center rounded-lg hover:bg-gray-200 cursor-pointer">
                                            <div className="ml-3">
                                                <p className="mt-0 text-sm text-gray-500">Activity Logs</p>
                                            </div>
                                        </span>
                                        <span className="-m-3 p-2 flex items-center rounded-lg hover:bg-gray-200 cursor-pointer">
                                            <div className="ml-3">
                                                <p className="mt-0 text-sm text-gray-500">Extend Access</p>
                                            </div>
                                        </span>
                                        <span className="-m-3 p-2 flex items-center rounded-lg hover:bg-gray-200 cursor-pointer">
                                            <div className="ml-3">
                                                <p className="mt-0 text-sm text-gray-500">Lock Account</p>
                                            </div>
                                        </span>
                                        <span className="-m-3 p-2 flex text-red-500 items-center rounded-lg hover:bg-red-500 hover:text-white cursor-pointer">
                                            <div className="ml-3">
                                                <p className="mt-0 text-sm">Sign Out</p>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        )
    }
}

export default ProfileHeader