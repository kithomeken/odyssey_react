import React, {Component, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    children: React.ReactNode,
    showPanel: any,
    closePanel: any,
    panelTitle: any,
}

class SlideOver extends Component<Props> {
    render() {
        const open = this.props.showPanel
        const close = this.props.closePanel
        const panelTitle = this.props.panelTitle

        return(
            <React.Fragment>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" static className="fixed inset-0 overflow- z-10" open={open} onClose={close}>
                        <div className="absolute inset-0 overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <div className="relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                                <button
                                                    className="rounded-md text-gray-300"
                                                    onClick={close}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <span className="fas fa-times border-none text-xl text-gray-300"></span>
                                                </button>
                                            </div>
                                        </Transition.Child>

                                        <div className="h-full flex flex-col pb-6 bg-white shadow-xl">
                                            <div className="px-4 sm:px-6 py-6 bg-green-200">
                                                <Dialog.Title className="text-lg text-gray-900">
                                                    {panelTitle}
                                                </Dialog.Title>
                                            </div>

                                            {this.props.children}

                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </React.Fragment>
        )
    }
}

export default SlideOver