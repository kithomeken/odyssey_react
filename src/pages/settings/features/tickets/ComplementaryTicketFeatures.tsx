import React from "react"
import { useState } from "react"

const ComplementaryTicketFeatures = ({ state, onChangeToggleHandler }: { state: any, onChangeToggleHandler: any }) => {
    return (
        <React.Fragment>
            <div className="w-full py-3">
                <h2 className="text-lg leading-7 text-gray-700 sm:text-lg sm: mb-2">
                    Complementary Ticket Features
                </h2>

                <div className="w-12/12">
                    <p className="text-sm form-group text-gray-500">
                        Other ticket features that extend the existing functionalities set in place
                    </p>
                </div>

                <div className="w-full">
                    <div className="w-full ml-5 mb-3">
                        <div className="flex flex-row items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                <input type="checkbox" id="link_similar_tickets" defaultChecked={state.features.link_similar_tickets === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="link_similar_tickets" />
                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>

                            <label htmlFor="link_similar_tickets" className="ml-6 block text-sm mb-1 text-gray-900">
                                Link Similar Tickets
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-10 mr-2"></div>

                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                Link similar tickets raised and share updates on progress/comments on one ticket for easy communication. Works great when the same issue has been reported by multiple people.
                            </span>
                        </div>
                    </div>

                    <div className="w-full ml-5 mb-3">
                        <div className="flex flex-row items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                <input type="checkbox" id="share_ticket_ownership" defaultChecked={state.features.share_ticket_ownership === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="share_ticket_ownership" />
                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>

                            <label htmlFor="share_ticket_ownership" className="ml-6 block text-sm mb-1 text-gray-900">
                                Share Ticket Ownership
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-10 mr-2"></div>

                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                Allow your support agents to collaborate with each other to resolve issues by sharing ownership, when the issue raised needs more hands on deck.
                            </span>
                        </div>
                    </div>

                    <div className="w-full ml-5 mb-3">
                        <div className="flex flex-row items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                <input type="checkbox" id="parent_child_ticketing" defaultChecked={state.features.parent_child_ticketing === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="parent_child_ticketing" />
                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>

                            <label htmlFor="parent_child_ticketing" className="ml-6 block text-sm mb-1 text-gray-900">
                                Parent-Child Ticketing
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-10 mr-2"></div>

                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                Breaks down a complex ticket issue into smaller child tickets for easier tracking and progress update. Works like a charm when paired with shared ticket ownership.
                            </span>
                        </div>
                    </div>

                    <div className="w-full ml-5 mb-3">
                        <div className="flex flex-row items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                <input type="checkbox" id="capture_root_cause" defaultChecked={state.features.capture_root_cause === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="capture_root_cause" />
                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>

                            <label htmlFor="capture_root_cause" className="ml-6 block text-sm mb-1 text-gray-900">
                                Post-Mortems
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-10 mr-2"></div>

                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                Capture the root cause of the issue to prevent any future re-occurrence from happening. Once activated this feature will be mandatory for all tickets when marking them as resolved.
                            </span>
                        </div>
                    </div>

                    <div className="w-full ml-5 mb-3">
                        <div className="flex flex-row items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onChangeToggleHandler}>
                                <input type="checkbox" id="capture_solution_deployed" defaultChecked={state.features.capture_solution_deployed === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="capture_solution_deployed" />
                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>

                            <label htmlFor="capture_solution_deployed" className="ml-6 block text-sm mb-1 text-gray-900">
                                Capture Solution Deployed
                            </label>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-10 mr-2"></div>

                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                Capture solution deployed for each ticket issue, makes it easier to deploy solution in the event of a re-occurence. Once activated this feature will be mandatory for all tickets
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ComplementaryTicketFeatures