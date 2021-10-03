import React,  {Component} from 'react'

// Components
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import Error500 from '../../../errors/500'

const apiHeader = ApiService.apiDomain()

interface Props {
    loading: boolean,
    errorMode: boolean,
    features: any,
}

class MainTicketFeatures extends Component<Props> {
    state = {
        loading: true,
        errorMode: false,
        features: this.props.features
    }

    render() {
        return(
            <React.Fragment>
                {
                    this.state.loading ? (
                        <div className="flex flex-col align-middle mt-6 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        this.state.errorMode ? (
                            <div className="flex flex-col align-middle mt-4 w-9/12">
                                <Error500 />
                            </div>
                        ) : (
                            <div className="w-full py-3">
                                <h2 className="text-lg leading-7 text-green-500 sm:text-lg sm: mb-2">
                                    Main Ticket Features
                                </h2>
            
                                <div className="w-12/12">
                                    <p className="text-sm form-group text-gray-500">
                                        Ticket features that offer state-of-the art support functionalities 
                                    </p>
                                </div>

                                <div className="w-full">
                                    <div className="w-full ml-5 mb-3">
                                        <div className="flex flex-row items-center">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onChangeToggleHandler}>
                                                <input type="checkbox" 
                                                    id="configure_types" 
                                                    defaultChecked={this.state.features.configure_types === 'Y' ? true : false} 
                                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                                                    name="configure_types"/>
                                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                            </div>
                
                                            <label htmlFor="configure_types" className="ml-6 block text-sm mb-1 text-gray-900">
                                                Configure Your Own Ticket Types
                                            </label>
                                        </div>
                
                                        <div className="flex flex-row">
                                            <div className="w-10 mr-2"></div>
                
                                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                                Link similar tickets raised and share updates on progress/comments on one ticket for easy communication. Works great when different clients report the same issue.
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full ml-5 mb-3">
                                        <div className="flex flex-row items-center">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onChangeToggleHandler}>
                                                <input type="checkbox" id="configure_regions" defaultChecked={this.state.features.configure_regions === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="configure_regions"/>
                                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                            </div>
                
                                            <label htmlFor="configure_regions" className="ml-6 block text-sm mb-1 text-gray-900">
                                                Include Ticket Regions
                                            </label>
                                        </div>
                
                                        <div className="flex flex-row">
                                            <div className="w-10 mr-2"></div>
                
                                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                                Allow your support agents to collaborate with each other to resolve issues by sharing ownership. Works seamlessly when the issue raised needs more hands on deck. 
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full ml-5 mb-3">
                                        <div className="flex flex-row items-center">
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onChangeToggleHandler}>
                                                <input type="checkbox" id="schedule_tickets" defaultChecked={this.state.features.schedule_tickets === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="schedule_tickets"/>
                                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                            </div>
                
                                            <label htmlFor="schedule_tickets" className="ml-6 block text-sm mb-1 text-gray-900">
                                                Ticket Scheduling
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
                                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onChangeToggleHandler}>
                                                <input type="checkbox" id="configure_templates" defaultChecked={this.state.features.configure_templates === 'Y' ? true : false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" name="configure_templates"/>
                                                <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                            </div>
                
                                            <label htmlFor="configure_templates" className="ml-6 block text-sm mb-1 text-gray-900">
                                                Configure Ticket Templates
                                            </label>
                                        </div>
                
                                        <div className="flex flex-row">
                                            <div className="w-10 mr-2"></div>
                
                                            <span className="text-gray-500 text-sm ml-6 w-9/12">
                                                Capture the root cause of the issue to prevent any future re-occurrence from happening. Once activated this feature will be mandatory for all tickets when resolved.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.fetchTicketFeaturesApiCall()
    }
    
    async fetchTicketFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/tickets/all`
            const response: any = await HttpService.httpGet(apiConsumed)

            if (response.data.success) {
                let features = response.data.data

                this.setState({
                    loading: false,
                    features: features
                })
            } else {
                this.setState({
                    loading: false,
                    // errorMode: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onChangeToggleHandler = (event: any) => {
        let checked = event.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'

        this.postTicketFeaturesApiCall(event.target.name, toggleStatus)
    }

    async postTicketFeaturesApiCall(targetName: any, value: any) {
        try {
            let input = {
                input_name: targetName,
                input_value: value,
            }

            let apiConsumed = apiHeader + `portal/a/site-master/features/tickets/configure`
            const response: any = await HttpService.httpPost(apiConsumed, input)

            if (response.data.success) {
                // show success toast
            } else {
                // show failed toast
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }
}

export default MainTicketFeatures