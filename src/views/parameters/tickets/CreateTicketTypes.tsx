import React, {Component, Fragment} from 'react'
import {Transition} from '@headlessui/react'

// Components
import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import SlideOver from '../../../components/layouts/parameters/SlideOver'

interface Props {
    data: any,
    showPanel: any,
    closePanel: any,
    reloadTable: any,
}

const apiHeader = ApiService.apiDomain()

class CreateTicketTypes extends Component<Props> {
    state = {
        close: this.props.closePanel,
        postingFormData: false,
        input: {
            name: '',
            details: '',
        },
        errors: {
            name: '',
            details: '',
        },
        response: {
            postingSuccessful: false,
            postingFailed: false, 
            errorMessage: 'Something went wrong',
        },
        type: {
            checkType: false,
            typeExists: true,
        },
    }

    render() {
        const panelTitle = "Create Ticket Type"
        const {errors} = this.state
        
        return(
            <React.Fragment>
                <SlideOver
                    showPanel={this.props.showPanel}
                    closePanel={this.props.closePanel}
                    panelTitle={panelTitle}
                >

                    <div className="mt-4 relative flex-1 overflow-y-auto pb-8 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-none" aria-hidden="true">
                                <div className="w-full">
                                    <p className="text-gray-600 text-sm form-group">
                                        Kindly ensure you've captured the correct ticket type data as you'll not be able to make any ammendements later on. You can however, decommission a ticket type to prevent any further usage. 
                                    </p>
                                </div>

                                <form onSubmit={this.onFormSubmit}>
                                    <div className="w-full rounded-md shadow-none space-y-px form-group">
                                        <label htmlFor="type-name" className="block mb-1 text-sm">Ticket Type Name</label>

                                        <div className="w-full flex">
                                            <div className="w-11/12">
                                                <input type="text" 
                                                    name="name" 
                                                    id="type-name" 
                                                    autoComplete="off" 
                                                    onChange={this.onChangeHandler} 
                                                    onBlur={this.onTicketTypeNameBlur} 
                                                    placeholder="Ticket Type Name" 
                                                    value={this.state.input.name}
                                                    className={`focus:ring-1 w-full focus:outline-none ${errors.name.length > 0 ? ('focus:ring-red-500 focus:border-red-500') : ('focus:ring-green-500 focus:border-green-500')} p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border ${errors.name.length > 0 ? ('border-red-400') : ('border-gray-300')} disabled:opacity-50`} 
                                                />

                                                {errors.name.length > 0 &&  
                                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                        {errors.name}
                                                    </span>
                                                }
                                            </div>

                                            <div className="w-1/12">
                                                {
                                                    this.state.type.checkType ? (
                                                        <div className="h-10 pt-2 ml-2">
                                                            <span className="fad text-green-500 fa-spinner-third fa-lg m-auto block fa-spin"></span>
                                                        </div>
                                                    ) : (
                                                        null
                                                    )
                                                }
                                            </div>


                                            
                                        </div>
                                    </div>

                                    <div className="w-full rounded-md shadow-none space-y-px form-group">
                                        <label htmlFor="type-details" className="block mb-1 text-sm">Details</label>

                                        <div className="w-11/12">
                                            <textarea 
                                                name="details" 
                                                id="type-details" 
                                                autoComplete="off" 
                                                rows={2}
                                                onChange={this.onChangeHandler} 
                                                onBlur={this.onInputBlur} 
                                                placeholder="Details" 
                                                value={this.state.input.details}
                                                className={`focus:ring-1 w-full focus:outline-none ${errors.details.length > 0 ? ('focus:ring-red-500 focus:border-red-500') : ('focus:ring-green-500 focus:border-green-500')} p-2 normal-case resize-none flex-1 block text-sm rounded-md sm:text-sm border ${errors.details.length > 0 ? ('border-red-400') : ('border-gray-300')} disabled:opacity-50`}  
                                            ></textarea>

                                            {errors.details.length > 0 &&  
                                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                    {errors.details}
                                                </span>
                                            }
                                        </div>
                                    </div>

                                    <div className="flex flex-row-reverse w-11/12 pt-3 form-group">
                                        {
                                            this.state.postingFormData ? (
                                                <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                                    <span>                                                    
                                                        <span className="left-0 inset-y-0 flex items-center pl-3">
                                                            <span className="pr-2">
                                                                Creating...
                                                            </span>

                                                            <span className="w-5 h-5">
                                                                <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            ) : (
                                                <button type="submit" 
                                                    // disabled={disableButton}
                                                    className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                                    <span className="text-sm">
                                                        Create Ticket Type
                                                    </span>
                                                </button>
                                            )
                                        }
                                    </div>

                                    {
                                        this.state.response.postingSuccessful ? (
                                            <Transition.Child
                                                as={Fragment}
                                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                enterFrom="translate-x-full"
                                                enterTo="translate-x-0"
                                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                leaveFrom="translate-x-0"
                                                leaveTo="translate-x-full"
                                            >
                                                <div className="w-full form-group bg-green-100 py-3 rounded-md">
                                                    <span className="left-0 inset-y-0 flex align-middle text-sm pl-3 text-green-600">
                                                        <span className="w-4 h-4">
                                                            <i className="fas fa-check-circle mr-3"></i>
                                                        </span>

                                                        <span className="pl-2">
                                                            Ticket Type Created
                                                        </span>
                                                    </span>
                                                </div>
                                            </Transition.Child>
                                        ) : (
                                            null
                                        )
                                    }

                                    {
                                        this.state.response.postingFailed ? (
                                            <Transition.Child
                                                as={Fragment}
                                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                enterFrom="translate-x-full"
                                                enterTo="translate-x-0"
                                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                leaveFrom="translate-x-0"
                                                leaveTo="translate-x-full"
                                            >
                                                <div className="w-full form-group bg-red-100 py-3 rounded-md">
                                                    <span className="left-0 inset-y-0 flex align-middle text-sm pl-3 text-red-600">
                                                        <span className="w-4 h-4">
                                                            <i className="fas fa-times-circle mr-3"></i>
                                                        </span>

                                                        <span className="pl-2">
                                                            {this.state.response.errorMessage}
                                                        </span>
                                                    </span>
                                                </div>
                                            </Transition.Child>
                                        ) : (
                                            null
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </SlideOver>
            </React.Fragment>
        )
    }

    onChangeHandler = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let postingFormData = this.state.postingFormData

        if (!postingFormData) {
            input[e.target.name] = e.target.value
            errors[e.target.name] = ''

            let {response} = this.state
            response.postingFailed = false
            response.postingSuccessful = false
    
            this.setState({
                input, errors
            })
        }
    }

    onInputBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        const targetName = e.target.name

        if (!input[e.target.name]) {
            errors[e.target.name] = 'Please set the ticket type ' + targetName
        } else if (input[e.target.name].length < 5) {
            errors[e.target.name] = 'Ticket type '+ targetName +' cannot be less than 5 characters'
        } 
        
        if (input[e.target.name].length > 5) {
            switch (targetName) {
                case 'name':
                    if (input[e.target.name].length > 30) {
                        errors[e.target.name] = 'Ticket type '+ targetName +' cannot be more than 30 characters'
                    }
                break;
                
                case 'details':
                    if (input[e.target.name].length > 100) {
                        errors[e.target.name] = 'Ticket type '+ targetName +' cannot be more than 100 characters'
                    }
                break;
            }
        }

        this.setState({})
    }

    onTicketTypeNameBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let checkType = this.state.type.checkType
        let typeExists = this.state.type.typeExists
        let targetName = e.target.name

        if (!input[e.target.name]) {
            checkType = false
            typeExists = true
            errors[e.target.name] = 'Please set the ticket type ' + targetName
        } else if (input[e.target.name].length < 5) {
            checkType = false
            typeExists = true
            errors[e.target.name] = 'Ticket type ' + targetName + ' cannot be less than 5 characters'
        } else if (input[e.target.name].length > 30) {
            checkType = false
            typeExists = true
            errors[e.target.name] = 'Ticket type ' + targetName + ' cannot be more than 30 characters'
        } else {
            checkType = true
            typeExists = true

            this.checkIfTicketTypeExists(e.target.value)
        }

        this.setState({
            type: {
                checkType, typeExists
            }
        })
    }

    async checkIfTicketTypeExists(targetValue: any) {
        try {
            let input = {
                'name': targetValue
            }

            let apiToBeConsumed = apiHeader + `portal/a/site-master/tickets/types/check`
            const response: any = await HttpService.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                this.setState({
                    type: {
                        checkType: false,
                        typeExists: false,
                    },
                })
            } else {
                let {errors} = this.state
                let {response} = this.state
                errors.name = "This ticket type name already exists"
                response.errorMessage = "This ticket type already exists"

                this.setState({
                    type: {
                        checkType: false,
                        typeExists: true,
                    },
                })
            }
        } catch (error) {
            // show failed toast
            console.log(error)
            let {response} = this.state
            response.errorMessage = "Something went wrong"

            this.setState({
                type: {
                    checkType: false,
                    typeExists: true,
                },
            })
        }
    }

    onFormSubmit = (e: any) => {
        e.preventDefault()
        let {input}: any = this.state
        let {errors}: any = this.state
        let inputArray: any[] = []
        let errorArray: any[] = []

        Object.keys(input).forEach(function(key) {
            if (input[key].length > 0) {
                inputArray.push(input[key])
            }                
        });
        
        Object.keys(errors).forEach(function(key) {
            if (errors[key].length > 0) {
                errorArray.push(errors[key])
            }                
        });

        if (errorArray.length > 0 || inputArray.length < 1) {
            // Show notification for clearing errors
        } else {
            let {type} = this.state

            if (type.typeExists) {
                // Show error notification
            } else {
                let {response} = this.state
                response.postingFailed = false
                response.postingSuccessful = false
    
                this.setState({
                    postingFormData: true
                })
    
                this.createTicketTypeApiCall()
            }
        }
    }

    async createTicketTypeApiCall() {
        try {
            let formData: any = new FormData()
            
            formData.append("name", this.state.input.name)
            formData.append("description", this.state.input.details)

            let apiToBeConsumed = apiHeader + `portal/a/site-master/tickets/types/create`
            const response0: any = await HttpService.httpPost(apiToBeConsumed, formData)
            
            if (response0.data.success) {
                let {response} = this.state
                response.postingSuccessful = true

                let {input}: any = this.state
                Object.keys(input).forEach(function(key) {
                    input[key] = ''
                });

                this.setState({
                    postingFormData: false,
                })

                const reloadTableApiCall = this.props.reloadTable
                reloadTableApiCall()
            } else {
                let {response} = this.state
                response.postingFailed = true

                this.setState({
                    postingFormData: false,
                })
            }
        } catch (error) {
            // show failed toast
            console.log(error)
            let {response} = this.state
            response.postingFailed = true

            this.setState({
                postingFormData: false,
            })
        }
    }
}

export default CreateTicketTypes