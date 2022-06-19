import React, { useState } from 'react'
import { Transition } from '@headlessui/react'

export default function SuccessBanner({ message }: { message: any }) {
    const [state, setstate] = useState({
        show: true
    })

    const dismissBanner = () => {
        setstate({
            show: false
        })
    }

    return (
        <React.Fragment>
            <Transition
                show={state.show}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="bg-green-100 rounded drop-shadow">
                    <div className="mx-auto py-2 px-2 sm:px-6 lg:px-4">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-0 flex-1 flex items-center">
                                <span className="flex items-center align-middle">
                                    <i className="fad fa-lg fa-check-circle text-green-500"></i>
                                </span>

                                <p className="ml-3 text-green-500 text-sm truncate">
                                    <span className="md:hidden"> {message} </span>
                                    <span className="hidden md:inline"> {message} </span>
                                </p>
                            </div>

                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                <button type="button" className="-mr-1 flex p-1 rounded-md text-green-400 hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2" onClick={dismissBanner}>
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </React.Fragment>
    )
}