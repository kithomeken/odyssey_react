import React from "react"
import Error500 from "../../../errors/Error500"

const MainTicketFeatures = ({ state, onChangeToggleHandler }: { state: any, onChangeToggleHandler: any }) => {
    return (
        <React.Fragment>
            {
                state.statusMain === 'rejected' ? (
                    <Error500 />
                ): state.statusMain === 'fulfilled' ? (
                    <div className="w-full py-3">
                        <h2 className="text-lg leading-7 text-gray-700 sm:text-lg sm: mb-2">
                            Main Ticket Features
                        </h2>

                        <div className="w-12/12">
                            <p className="text-sm form-group text-gray-500">
                                Ticket features that offer state-of-the art ticket functionalities
                            </p>
                        </div>

                        <div className="w-full">
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                        <input type="checkbox"
                                            id="configure_types"
                                            defaultChecked={state.features.configure_types === 'Y' ? true : false}
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                            name="configure_types" />
                                        <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="configure_types" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Configure Your Own Ticket Types
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Create your own ticket types to suit your business workflows and needs. This gives you a better analysis of which type of tickets to focus more on.
                                    </span>
                                </div>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                        <input type="checkbox" id="configure_regions" defaultChecked={state.features.configure_regions === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="configure_regions" />
                                        <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="configure_regions" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Include Ticket Territories
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Group your tickets and/or clients into the various territories under your wings to learn where to allocate your resources to achieve maximum efficiency.
                                    </span>
                                </div>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                        <input type="checkbox" id="schedule_tickets" defaultChecked={state.features.schedule_tickets === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="schedule_tickets" />
                                        <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="schedule_tickets" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Ticket Scheduling
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Post-pone tickets that need further intervention or are beyond your control to later days to prevent a negative impact on your SLA (Service Level Agreement).
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex align-middle mt-6 h-16">
                        <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default MainTicketFeatures