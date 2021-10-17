import React, {Component, Fragment} from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'

import Error500 from '../../../errors/500'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

interface Props {
    data: any,
    showPanel: any,
    closePanel: any,
    reloadTable: any,
}

const apiHeader = ApiService.apiDomain()

class AnnouncementPanel extends Component<Props> {
    state = {
        close: this.props.closePanel,
        postingFormData: false,
        disableButton: true,
        errorMode: false,
        loading: true,
        teams: [],
        input: {
            title: '',
            details: '',
            selected: {
                id: '0',
                uuid: '0',
                name: 'All Auth Teams',
            }
        },
        errors: {
            title: '',
            details: '',
            selected: '',
        },
        response: {
            postingSuccessful: false,
            postingFailed: false, 
        },
    }

    render() {
        const open = this.props.showPanel
        const close = this.props.closePanel
        const errors = this.state.errors
        const teams = this.state.teams
        const loading = this.state.loading
        const errorMode = this.state.errorMode
        const disableButton = this.state.disableButton
        
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
                                                    Send Announcements
                                                </Dialog.Title>
                                            </div>

                                            {
                                                loading ? (
                                                    <div className="flex flex-col align-middle mt-4 w-full h-16">
                                                        <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                                    </div>
                                                ) : (
                                                    errorMode ? (
                                                        <div className="w-full form-group pt-8">
                                                            <Error500 />
                                                        </div>
                                                    ) : (
                                                        <div className="mt-4 relative flex-1 overflow-y-auto pb-8 px-4 sm:px-6">
                                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                                <div className="h-full border-none" aria-hidden="true">
                                                                    <div className="w-full">
                                                                        <p className="text-gray-500 text-sm form-group">
                                                                            Send a broadcast announcement to your users
                                                                        </p>
                                                                    </div>
            
                                                                    <form onSubmit={this.onFormSubmit}>
                                                                        <div className="w-full rounded-md shadow-none space-y-px form-group">
                                                                            <label htmlFor="announcement-title" className="block mb-1 text-sm">Title</label>
            
                                                                            <div className="w-full">
                                                                                <input type="text" 
                                                                                    name="title" 
                                                                                    id="announcement-title" 
                                                                                    autoComplete="off" 
                                                                                    onChange={this.onChangeHandler} 
                                                                                    onBlur={this.onInputBlur} 
                                                                                    placeholder="Title" 
                                                                                    value={this.state.input.title}
                                                                                    className={`focus:ring-1 w-full focus:outline-none ${errors.title.length > 0 ? ('focus:ring-red-500 focus:border-red-500') : ('focus:ring-green-500 focus:border-green-500')} p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border ${errors.title.length > 0 ? ('border-red-400') : ('border-gray-300')} disabled:opacity-50`} 
                                                                                />
            
                                                                                {errors.title.length > 0 &&  
                                                                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                                        {errors.title}
                                                                                    </span>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="w-full rounded-md shadow-none space-y-px form-group">
                                                                            <label htmlFor="announcement-details" className="block mb-1 text-sm">Details</label>
            
                                                                            <div className="w-full">
                                                                                <textarea 
                                                                                    name="details" 
                                                                                    id="announcement-details" 
                                                                                    autoComplete="off" 
                                                                                    rows={2}
                                                                                    onChange={this.onChangeHandler} 
                                                                                    onBlur={this.onInputBlur} 
                                                                                    placeholder="Details" 
                                                                                    value={this.state.input.details}
                                                                                    className={`focus:ring-1 w-full focus:outline-none ${errors.details.length > 0 ? ('focus:ring-red-500 focus:border-red-500') : ('focus:ring-green-500 focus:border-green-500')} p-2 normal-case flex-1 block text-sm rounded-md sm:text-sm border ${errors.details.length > 0 ? ('border-red-400') : ('border-gray-300')} disabled:opacity-50`}  
                                                                                ></textarea>
            
                                                                                {errors.details.length > 0 &&  
                                                                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                                        {errors.details}
                                                                                    </span>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="w-full rounded-md shadow-none space-y-px form-group">
                                                                            <Listbox value={this.state.input.selected} onChange={(value) => this.onListBoxChange(value)}>
                                                                                <Listbox.Label className="block text-sm mb-1">Announce to</Listbox.Label>

                                                                                <div className="mt-1 relative">
                                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                                                                        <span className="flex items-center">
                                                                                            <span className="ml-3 block truncate">{this.state.input.selected.name}</span>
                                                                                        </span>
                                                                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                            {/* <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                                                                        </span>
                                                                                    </Listbox.Button>

                                                                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">                                                                                            
                                                                                            {teams.map((team: {uuid: any, name: any, id: any}) => (
                                                                                                <Listbox.Option
                                                                                                    key={team.id}
                                                                                                    className={({ active }) =>
                                                                                                        this.classNames(
                                                                                                            active ? 'text-white bg-green-600' : 'text-gray-900',
                                                                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                                        )
                                                                                                    }
                                                                                                    value={team}
                                                                                                >
                                                                                                    {({ selected, active }) => (
                                                                                                        <>
                                                                                                            <div className="flex items-center">
                                                                                                                <span className={this.classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                                                    {team.name}
                                                                                                                </span>
                                                                                                            </div>

                                                                                                            {selected ? (
                                                                                                                <span
                                                                                                                    className={this.classNames(
                                                                                                                        active ? 'text-white' : 'text-green-600',
                                                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                                    )}
                                                                                                                >
                                                                                                                    <span className="h-5 w-5 fal check-circle" aria-hidden="true" />
                                                                                                                </span>
                                                                                                            ) : null}
                                                                                                        </>
                                                                                                    )}
                                                                                                </Listbox.Option>
                                                                                            ))}
                                                                                        </Listbox.Options>
                                                                                    </Transition>
                                                                                </div>
                                                                            </Listbox>

                                                                            {errors.selected.length > 0 &&  
                                                                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                                                    {errors.selected}
                                                                                </span>
                                                                            }
                                                                        </div>

                                                                        <div className="flex flex-row-reverse w-full pt-3 form-group">
                                                                            {
                                                                                this.state.postingFormData ? (
                                                                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                                                                        <span>                                                    
                                                                                            <span className="left-0 inset-y-0 flex items-center pl-3">
                                                                                                <span className="pr-2">
                                                                                                    Sending...
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
                                                                                            Send Announcement
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
                                                                                                Announcement successfully sent
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
                                                                                                Something went wrong while sending announcement
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
                                                    )
                                                )
                                            }
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

    componentDidMount() {
        this.fetchAuthTeamsApiCall()
    }

    classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    onListBoxChange (value: any) {
        let {input}: any = this.state
        let {selected} = input
        console.log(input['selected'])

        selected['id'] = value.id
        selected['name'] = value.name
        selected['uuid'] = value.uuid
        
        this.setState({
            input
        })
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
        let disableButton = this.state.disableButton
        const targetName = e.target.name

        if (!input[e.target.name]) {
            errors[e.target.name] = 'Please set the ' + targetName + ' of the announcement'
        } else if (input[e.target.name].length < 5) {
            errors[e.target.name] = 'Announcement '+ targetName +' cannot be less than 5 characters'
        } 
        
        if (input[e.target.name].length > 5) {
            switch (targetName) {
                case 'title':
                    if (input[e.target.name].length > 30) {
                        errors[e.target.name] = 'Announcement '+ targetName +' cannot be more than 30 characters'
                    }
                break;
                
                case 'details':
                    if (input[e.target.name].length > 250) {
                        errors[e.target.name] = 'Announcement '+ targetName +' cannot be more than 250 characters'
                    }
                break;
            }
        }

        this.setState({
            disableButton
        })
    }

    async fetchAuthTeamsApiCall() {
        try {
            const apiToBeConsumed = apiHeader + `portal/a/site-master/general/announcements/auth-teams`
            const response: any = await HttpService.httpGet(apiToBeConsumed)
            console.log(response);
            
            if (response.status === 200) {                
                this.setState({
                    loading: false,
                    teams: response.data,
                })
            } else {
                this.setState({
                    loading: false,
                    errorMode: true,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                errorMode: true,
            })
        }
    }

    onFormSubmit = (e: any) => {
        e.preventDefault()
        let {errors}: any = this.state
        let errorArray: any[] = []

        if (!this.state.input.selected.uuid) {
            errors.selected = 'Please select a team to send the announcement to'
            this.setState({})
        }

        Object.keys(errors).forEach(function(key) {
            if (errors[key].length > 0) {
                errorArray.push(errors[key])
            }                
        });

        if (errorArray.length > 0) {
            // Show notification for clearing errors
        } else {
            let {response} = this.state
            response.postingFailed = false
            response.postingSuccessful = false

            this.setState({
                postingFormData: true
            })

            this.postAnnouncementApiCall()
        }
    }

    async postAnnouncementApiCall() {
        try {
            let formData: any = new FormData()
            
            formData.append("title", this.state.input.title)
            formData.append("description", this.state.input.details)
            formData.append("auth_team", this.state.input.selected.uuid)            

            let apiToBeConsumed = apiHeader + `portal/a/site-master/general/announcements/send`
            const response0: any = await HttpService.httpPost(apiToBeConsumed, formData)

            if (response0.data.success) {
                let {response} = this.state
                response.postingSuccessful = true

                let {input}: any = this.state
                input.title = ''
                input.details = ''

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

export default AnnouncementPanel