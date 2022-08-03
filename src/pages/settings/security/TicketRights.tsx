import React, { FC, useState } from "react"
import { AUTH_TEAM_TICKET_RIGHTS_API_ROUTE } from "../../../api/ApiRoutes"
import Loading from "../../../components/layouts/Loading"
import HttpServices from "../../../services/HttpServices"
import EmptyResultsReturned from "../../errors/EmptyResultsReturned"

interface Props {
    data: any,
    status: any,
    authTeamId: any,
    disableCheckbox: any,
    updateTabStatus: any,
    rightsFromParent: any,
    onCheckboxHandler: any,
    featuresFromParent: any,
    updateRightsTabState: any,
    updateFeaturesState: any
}

export const TicketsRights: FC<Props> = ({ data, status, authTeamId, updateTabStatus, updateRightsTabState, rightsFromParent, onCheckboxHandler, disableCheckbox, updateFeaturesState, featuresFromParent }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        requestSucceeded: false,
    })

    const fetchTicketRightsApiCall = async () => {
        try {
            const response: any = await HttpServices.httpGet(AUTH_TEAM_TICKET_RIGHTS_API_ROUTE + '/' + authTeamId)

            updateRightsTabState('tickets', response.data.data)
            updateFeaturesState('tickets', response.data.data_)
            updateTabStatus('tickets', 'fulfilled')
        } catch (e) {
            updateTabStatus('tickets', 'rejected')
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        if (data === null || data === undefined) {
            fetchTicketRightsApiCall();
        }
    }, []);

    return (
        <React.Fragment>
            {
                status === 'rejected' ? (
                    <EmptyResultsReturned />
                ) : status === 'fulfilled' ? (
                    <div className="w-full py-1">
                        <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                            Set the ticket priviledges and functionalities that users in this Auth Team can perform.
                        </h2>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="create_tickets"
                                        name="create_tickets"
                                        type="checkbox"
                                        disabled={disableCheckbox('create_tickets')}
                                        onChange={(e) => onCheckboxHandler(e, 'create_tickets')}
                                        checked={rightsFromParent.create_tickets === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="create_tickets" className="ml-4 block text-sm text-gray-800">
                                        Create tickets

                                        <span className="block text-xs text-gray-500">
                                            Can create new tickets in the system
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="assign_tickets"
                                        name="assign_tickets"
                                        type="checkbox"
                                        disabled={disableCheckbox('assign_tickets')}
                                        onChange={(e) => onCheckboxHandler(e, 'assign_tickets')}
                                        checked={rightsFromParent.assign_tickets === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="assign_tickets" className="ml-4 block text-sm text-gray-800">
                                        Assign tickets to agents

                                        <span className="block text-xs text-gray-500">
                                            Can assign/reassign open tickets to the different agents/technicians available
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="edit_properties"
                                        name="edit_properties"
                                        type="checkbox"
                                        disabled={disableCheckbox('edit_properties')}
                                        onChange={(e) => onCheckboxHandler(e, 'edit_properties')}
                                        checked={rightsFromParent.edit_properties === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="edit_properties" className="ml-4 block text-sm text-gray-800">
                                        Edit ticket properties

                                        <span className="block text-xs text-gray-500">
                                            Can edit the ticket details and properties, e.g. the type of ticket
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="add_comments"
                                        name="add_comments"
                                        type="checkbox"
                                        disabled={disableCheckbox('add_comments')}
                                        onChange={(e) => onCheckboxHandler(e, 'add_comments')}
                                        checked={rightsFromParent.add_comments === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="add_comments" className="ml-4 block text-sm text-gray-800">
                                        Add notes to tickets

                                        <span className="block text-xs text-gray-500">
                                            Can add comments in the various tickets they have visibility to.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="delete_comments"
                                        name="delete_comments"
                                        type="checkbox"
                                        disabled={disableCheckbox('delete_comments')}
                                        onChange={(e) => onCheckboxHandler(e, 'delete_comments')}
                                        checked={rightsFromParent.delete_comments === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="delete_comments" className="ml-4 block text-sm text-gray-800">
                                        Delete notes from tickets

                                        <span className="block text-xs text-gray-500">
                                            Can delete notes or comments from raised tickets/escalations
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-16">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="any_comment"
                                        name="any_comment"
                                        type="checkbox"
                                        disabled={disableCheckbox('any_comment')}
                                        onChange={(e) => onCheckboxHandler(e, 'any_comment')}
                                        checked={rightsFromParent.any_comment === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="any_comment" className="ml-4 block text-sm text-gray-800">
                                        Anyone's notes

                                        <span className="block text-xs text-gray-500">
                                            Can delete anyone's notes. If left unchecked, they can only delete their own notes
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {
                            featuresFromParent.link_similar_tickets === 'Y' ? (
                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="merge_tickets"
                                                name="merge_tickets"
                                                type="checkbox"
                                                disabled={disableCheckbox('merge_tickets')}
                                                onChange={(e) => onCheckboxHandler(e, 'merge_tickets')}
                                                checked={rightsFromParent.merge_tickets === 'Y' ? true : false}
                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="merge_tickets" className="ml-4 block text-sm text-gray-800">
                                                Link/merge tickets with similar issues raised

                                                <span className="block text-xs text-gray-500">
                                                    Can merge two or more tickets with similar issues raised, i.e. killing two birds with one stone
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            featuresFromParent.parent_child_ticketing === 'Y' ? (
                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="parent_child_ticketing"
                                                name="parent_child_ticketing"
                                                type="checkbox"
                                                disabled={disableCheckbox('parent_child_ticketing')}
                                                onChange={(e) => onCheckboxHandler(e, 'parent_child_ticketing')}
                                                checked={rightsFromParent.parent_child_ticketing === 'Y' ? true : false}
                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="parent_child_ticketing" className="ml-4 block text-sm text-gray-800">
                                                Parent-child ticketing

                                                <span className="block text-xs text-gray-500">
                                                    Can break-down a complex ticket into smaller tickets to facilitate fast issue resolution.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="archive_tickets"
                                        name="archive_tickets"
                                        type="checkbox"
                                        disabled={disableCheckbox('archive_tickets')}
                                        onChange={(e) => onCheckboxHandler(e, 'archive_tickets')}
                                        checked={rightsFromParent.archive_tickets === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="archive_tickets" className="ml-4 block text-sm text-gray-800">
                                        Archive resolved tickets

                                        <span className="block text-xs text-gray-500">
                                            Can archive tickets that have been marked as resolved or completed
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex">
                                    <input
                                        id="suspend_tickets"
                                        name="suspend_tickets"
                                        type="checkbox"
                                        disabled={disableCheckbox('suspend_tickets')}
                                        onChange={(e) => onCheckboxHandler(e, 'suspend_tickets')}
                                        checked={rightsFromParent.suspend_tickets === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="suspend_tickets" className="ml-4 block text-sm text-gray-800">
                                        Suspend tickets

                                        <span className="block text-xs text-gray-500">
                                            Can suspend tickets that have been opened for long without any feedback from the client
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )
            }
        </React.Fragment>
    )
}