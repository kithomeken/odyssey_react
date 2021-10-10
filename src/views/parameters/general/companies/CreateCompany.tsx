import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import {RouteComponentProps} from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../../components/layouts/parameters/Header'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import {generalRoutes} from '../../../../routes/parameters/generalRoutes'

const apiHeader = ApiService.apiDomain()

class CreateCompany extends Component<RouteComponentProps> {
    state = {
        postingFormData: false,
        company: {
            checkCompany: false,
            companyExists: false,
        },
        input: {
            name: '',
            description: '',
            domain: '',
            logo: null,
            poc1: '',
            poc2: '',
            poc3: '',
            create_another: 'N',
        },
        errors: {
            name: '',
            description: '',
            domain: '',
            logo: '',
            poc1: '',
            poc2: '',
            poc3: '',
        },
    }

    render() {
        const showButton = true
        const pageTitle = "Create Company Group"
        const companyGroupRoute = generalRoutes[3].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: companyGroupRoute },
            { linkItem: true, title: "Company Groups", url: companyGroupRoute },
            { linkItem: false, title: pageTitle },
        ]

        const errors = this.state.errors
        const checkCompany = this.state.company.checkCompany
        
        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                />

                <div className="w-full form-group">
                    <div className="w-10/12">
                        <p className="text-sm text-gray-500">
                            Create a new company and add contact information 
                        </p>
                    </div>
                </div>

                <form className="w-9/12 form-group" onSubmit={this.onFormSubmitHandler}>
                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                        <label htmlFor="company-name" className="block mb-1 text-sm text-gray-600">Company Name</label>

                        <div className="w-full flex">
                            <div className="w-9/12">
                                <input type="text" name="name" id="company-name" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onCompanyNameBlur} placeholder="Company Name" required value={this.state.input.name}/>

                                {errors.name.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {errors.name}
                                    </span>
                                }
                            </div>

                            <div className="w-3/12 ml-2">
                                {
                                    checkCompany ? (
                                        <div className="h-10 pt-2">
                                            <span className="fad text-green-500 fa-spinner-third fa-lg m-auto block fa-spin"></span>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-9/12 rounded-md shadow-none space-y-px form-group">
                        <label htmlFor="company-descr" className="block mb-1 text-sm text-gray-600">Description</label>
                        <textarea name="description" id="company-descr" rows={2} autoComplete="off" onChange={this.onChangeHandler} className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onInputBlur} required placeholder="Description" value={this.state.input.description}></textarea>

                        {errors.description.length > 0 && 
                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                {errors.description}
                            </span>
                        }
                    </div>

                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group text-gray-600">
                        <label htmlFor="company-name" className="block mb-1 text-sm">
                            Company Domain 
                            <sub className="ml-2">(Optional)</sub>
                        </label>

                        <div className="w-full flex form-group">
                            <div className="w-9/12">
                                <input type="url" name="domain" id="company-domain" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" placeholder="https://company-domain.com" value={this.state.input.domain} />

                                {errors.domain.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {errors.domain}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-9/12 form-group">
                        <label className="block text-sm text-gray-600">
                            Company Logo 
                            <sub className="text-gray-500 ml-2">(Optional)</sub>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="logo" type="file" onChange={this.onFileChangeHandler} className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG GIF up to 1MB</p>
                            </div>
                        </div>

                        {errors.logo.length > 0 && 
                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                {errors.logo}
                            </span>
                        }
                    </div>

                    <hr className="mb-3 w-9/12" />

                    <div className="w-full form-group">
                        <p className="text-sm text-gray-600">
                            Piont(s) Of Contacts 
                        </p>
                    </div>

                    <div className="w-full">
                        <div className="w-9/12 form-group">
                            <input type="email" name="poc1" id="poc-1" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onPointOfContactBlur} placeholder="Email Address" value={this.state.input.poc1}/>

                            {errors.poc1.length > 0 && 
                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                    {errors.poc1}
                                </span>
                            }
                        </div>

                        <div className="w-9/12 form-group">
                            <input type="email" name="poc2" id="poc-2" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onPointOfContactBlur} placeholder="Email Address" value={this.state.input.poc2}/>

                            {errors.poc2.length > 0 && 
                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                    {errors.poc2}
                                </span>
                            }
                        </div>

                        <div className="w-9/12 form-group">
                            <input type="email" name="poc3" id="poc-3" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-1 w-full focus:ring-green-500 p-2 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" onBlur={this.onPointOfContactBlur} placeholder="Email Address" value={this.state.input.poc3}/>

                            {errors.poc3.length > 0 && 
                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                    {errors.poc3}
                                </span>
                            }
                        </div>
                    </div>

                    <div className="w-9/12 mt-6 mb-4">
                        <div className="flex items-start">
                            <input
                                id="create-another"
                                name="create_another"
                                type="checkbox"
                                onChange={this.onChangeHandler}
                                checked={
                                    this.state.input.create_another === 'Y' ? true : false
                                }
                                className="h-5 w-5 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 form-tick appearance-none border border-gray-300 rounded-md checked:border-transparent focus:outline-none"
                            />

                            <label htmlFor="create-another" className="ml-2 block text-sm text-gray-600">
                                Create another company group
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse w-9/12 pt-3">
                        {
                            this.state.postingFormData ? (
                                <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`}>
                                    <span>                                                    
                                        <span className="left-0 inset-y-0 flex items-center pl-3">
                                            <span className="pr-2">
                                                Creating Company
                                            </span>

                                            <span className="w-5 h-5">
                                                <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            ) : (
                                <button type="submit"
                                    className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                    <span className="text-sm">
                                        Create Company Group
                                    </span>
                                </button>
                            )
                        }
                    </div>

                </form>

            </React.Fragment>
        )
    }

    onChangeHandler = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

        input[e.target.name] = e.target.value
        errors[e.target.name] = ''

        if (isCheckbox) {
            if (e.target.checked) {
                input[e.target.name] = "Y"
            } else {
                input[e.target.name] = "N"
            }
        }

        this.setState({
            input, errors
        })
    }

    onFileChangeHandler = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let fileSize = (e.target.files[0].size / 1024) / 1024
        let fileType = e.target.files[0].type

        if (fileType !== 'image/png' && fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/svg+xml') {
            errors[e.target.name] = 'Allowed file types are png, jpg, jpeg and svg files'
            this.setState({})
            return
        } else if (fileSize > 1) {
            errors[e.target.name] = 'Maximum file upload size is 1MB'
            this.setState({})
            return
        }

        input[e.target.name] = e.target.files[0]
        errors[e.target.name] = ''

        this.setState({
            input, errors
        })
    }

    onCompanyNameBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let checkCompany = this.state.company.checkCompany
        let companyExists = this.state.company.companyExists
        let targetName = e.target.name

        if (!input[e.target.name]) {
            checkCompany = false
            companyExists = true
            errors[e.target.name] = 'Please set the company ' + targetName
        } else if (input[e.target.name].length < 5) {
            checkCompany = false
            companyExists = true
            errors[e.target.name] = 'Company ' + targetName + ' cannot be less than 5 characters'
        } else if (input[e.target.name].length > 30) {
            checkCompany = false
            companyExists = true
            errors[e.target.name] = 'Company ' + targetName + ' cannot be more than 30 characters'
        } else {
            checkCompany = true
            companyExists = true

            this.checkIfCompanyExists(e.target.value)
        }

        this.setState({
            company: {
                checkCompany, companyExists
            }
        })
    }

    async checkIfCompanyExists(targetValue: any) {
        try {
            let input = {
                'name': targetValue
            }

            let apiToBeConsumed = apiHeader + `portal/a/site-master/general/company-groups/check`
            const response: any = await HttpService.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                this.setState({
                    company: {
                        checkCompany: false,
                        companyExists: false
                    }
                })
            } else {
                let {errors} = this.state
                errors.name = "This company name already exists"

                this.setState({
                    product: {
                        checkCompany: false,
                        companyExists: false
                    }
                })
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }

    onInputBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
        let targetName = e.target.name

        if (!input[e.target.name]) {
            errors[e.target.name] = 'Please set the company ' + targetName
        } else if (input[e.target.name].length < 5) {
            errors[e.target.name] = 'Company ' + targetName + ' cannot be less than 5 characters'
        } else if (input[e.target.name].length > 30) {
            errors[e.target.name] = 'Company ' + targetName + ' cannot be more than 100 characters'
        }

        this.setState({})
    }

    onPointOfContactBlur = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state

        if (input[e.target.name]) {
            let lastAtPos = input[e.target.name].lastIndexOf('@')
            let lastDotPos = input[e.target.name].lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input[e.target.name].indexOf('@@') === -1 && lastDotPos > 2 && (input[e.target.name].length - lastDotPos) > 2)) {
                errors[e.target.name] = 'Please enter a valid email address'
            } else {
                errors[e.target.name] = ''
            }
        }

        this.setState({})
    }

    onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let companyExists = this.state.company.companyExists

        if (!companyExists) {
            let {input}: any = this.state
            let {errors}: any = this.state
            let errorArray: any[] = []

            if (!input['poc1']) {
                errors['poc1'] = 'At least one point of contact is required'
            }

            this.setState({})

            Object.keys(errors).forEach(function(key) {
                if (errors[key].length > 0) {
                    errorArray.push(errors[key])
                }                
            });

            if (errorArray.length > 0) {
                // Show notification for clearing errors
            } else {
                this.setState({
                    postingFormData: true
                })
                this.createCompanyApiCall()
            }
        }
    }

    async createCompanyApiCall() {
        try {
            let file = this.state.input.logo
            let formData: any = new FormData()
            
            formData.append("company_logo", file)
            formData.append("name", this.state.input.name)
            formData.append("description", this.state.input.description)
            formData.append("domain", this.state.input.domain)
            formData.append("poc1", this.state.input.poc1)
            formData.append("poc2", this.state.input.poc2)
            formData.append("poc3", this.state.input.poc3)            

            let apiToBeConsumed = apiHeader + `portal/a/site-master/general/company-groups/create`
            const response: any = await HttpService.httpPost(apiToBeConsumed, formData)

            if (response.data.success) {
                this.setState({
                    postingFormData: false
                })

                if (this.state.input.create_another === 'Y') {
                    let {input}: any = this.state
                    let {errors}: any = this.state

                    Object.keys(input).forEach(function(key) {
                        input[key] = ''
                    });
                    
                    Object.keys(errors).forEach(function(key) {
                        errors[key] = ''
                    });

                    this.setState({})
                } else {
                    this.props.history.push('/a/default/site-manager/general/company-groups')
                }
            } else {
                let {errors} = this.state
                errors.name = "The company name already exists"

                this.setState({
                    postingFormData: false
                })
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }
}

export default CreateCompany