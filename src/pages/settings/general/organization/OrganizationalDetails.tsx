import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"

const OrganizationalDetails = () => {
    const [state, setstate] = useState({
        data: null,
        requestFailed: false,
        isLoading: true,
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            name: '',
        },
        errors: {
            name: ''
        }
    })

    const showButton = false
    const pageTitle = "Organizational Details"
    const orgDetailsRoute = generalRoutes[0].path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: orgDetailsRoute },
        { linkItem: false, title: pageTitle },
    ]

    const onChangeHandler = (e: {target: {name: string; value: string}}) => {
        const {isPostingForm} = state

        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state
            
            input[e.target.name] = e.target.value
            errors[e.target.name] = ''
    
            setstate({
                ...state, input, errors
            })
        }
    }

    const onInputBlur = (e: {target: {name: string; value: string}}) => {
        const {isPostingForm} = state

        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state
            let organization = e.target.value
            organization = organization.trim()

            if (organization.length < 3) {
                input[e.target.name] = e.target.value.trim()
                errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be less than 3 characters'
            } else if (organization.length > 20) {
                input[e.target.name] = e.target.value.trim()
                errors[e.target.name] = 'Organization ' + e.target.name + ' cannot be more than 20 characters'
            } else {
                input[e.target.name] = e.target.value.trim()
                errors[e.target.name] = ''
            }

            let disableSubmitBtn = formValidation(e)

            setstate({
                ...state,
                input, errors, disableSubmitBtn
            })
        }
    }

    const formValidation = (e: {target: {name: string; value: string}}) => {
        let {input}: any = state
        let {disableSubmitBtn} = state
        console.log(input[e.target.name]);

        if (!input['name']) {
            console.log(1);
            
            disableSubmitBtn = true
        } else if (input['name'].length < 3) {
            console.log(2);

            disableSubmitBtn = true
        } else if (input['name'].length > 20) {
            console.log(3);

            disableSubmitBtn = true
        } else {
            console.log(4);

            disableSubmitBtn = false
        }

        return disableSubmitBtn
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        console.log('form fxs', formValidation(e))

        if (!formValidation(e)) {
            setstate({
                ...state,
                isPostingForm: true
            })

            onPostFormData()
        }
    }

    const onPostFormData = async () => {
        const {input}: any = state
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/general/organizational-details/change`
        const response: any = await HttpServices.httpPost(apiCall, input)

        console.log(response)
        if (response.data.success) {
            toast("Organization name updated...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    } 

    const cancelOrganizationUpdate = () => {
        const {isPostingForm} = state
        
        if (!isPostingForm) {
            let {input}: any = state
            let {errors}: any = state

            Object.keys(input).forEach(function(key) {
                input[key] = ''               
            });
            
            Object.keys(errors).forEach(function(key) {
                errors[key] = ''                              
            });

            setstate({
                ...state, 
                input, 
                errors,
                disableSubmitBtn: true
            })
        }
    }

    const organizationalData = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/general/organizational-details`
        const response: any = await HttpServices.httpGet(apiCall)

        if (!response.data.success) {
            setstate({
                ...state,
                requestFailed: true
            })
            throw new Error("Something went wrong when fetching organizational details.");
        }

        console.log(response);
        setstate({
            ...state,
            requestFailed: true
        })

        console.log(state);

        return {response}
    }, [])

        // setstate({
        //     ...state,
        //     requestFailed: true
        // })
    
    return (
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
                    <p className="text-sm mb-5">
                        Your organization name is displayed in report headings and emails sent to managed accounts.
                    </p>

                    {
                        organizationalData.status === 'rejected' ? (
                            <Error500 />
                        ) : organizationalData.status === 'fulfilled' ? (
                            <form className="lg:w-7/12 w-12/12 form-group" onSubmit={onFormSubmitHandler}>
                                <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                                    <label htmlFor="org-name" className="block mb-1 text-sm text-gray-500">Organization Name</label>

                                    <div className="w-full flex">
                                        <div className="w-9/12">
                                            <div className="w-10/12 mb-1">
                                                <input type="text" name="name" id="org-name" autoComplete="off" onChange={onChangeHandler} onBlur={onInputBlur} className="focus:ring-1 w-full focus:ring-green-500 text-gray-500 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" placeholder="Organization Name" value={state.input.name} />                                        
                                            </div>

                                            {state.errors.name.length > 0 && 
                                                <div className="w-full">
                                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                        {state.errors.name}
                                                    </span>
                                                </div>
                                            }

                                            <div className="w-10/12 my-3">
                                                <div className="flex items-center">
                                                    {
                                                        state.isPostingForm ? (
                                                            <button className="bg-green-500 relative flex justify-center py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-600 mr-2 disabled:opacity-50" type="button" disabled={state.disableSubmitBtn}>
                                                                <span>
                                                                    Changing 
                                                                    <span className="fad text-white fa-spinner-third block fa-spin ml-2"></span>
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            <button className="bg-green-500 relative flex justify-center py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-600 mr-2 disabled:opacity-50" type="submit" disabled={state.disableSubmitBtn}>
                                                                <span>
                                                                    Change
                                                                </span>
                                                            </button>
                                                        )
                                                    }
                                                    
                                                    <button className="bg-gray-300 relative flex justify-center py-1 px-3 border border-transparent text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-600 ml-1" type="button" onClick={cancelOrganizationUpdate}>
                                                        <span>
                                                            Cancel
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>            
        </React.Fragment>
    )
}

export default OrganizationalDetails