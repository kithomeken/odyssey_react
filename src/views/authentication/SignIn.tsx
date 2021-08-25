import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import {RouteComponentProps, Link} from 'react-router-dom'
import axios from 'axios'

import ConstantsRegistry from '../../global/ConstantsRegistry'
import ApiServices from '../../services/ApiServices'
import AuthenticationServices from '../../services/AuthenticationServices'

const projectApplicationName = ConstantsRegistry.projectApplicationName()

class SignIn extends Component<RouteComponentProps> {
    state = {
        input: {
            email: '',
            password: '',
        },
        errors: {
            email: '',
            password: '',
        },
        authFormSubmitted: false
    }

    authenticationFormValidation = () => {
        let input = this.state.input
        let errors =  this.state.errors
        let isAuthFormValid = true

        if (!input['email']) {
            isAuthFormValid = false
            errors.email = 'Please enter a valid email address'
        } else {
            errors.email = ''
        }

        if (typeof input['email'] !== 'undefined') {
            let lastAtPos = input["email"].lastIndexOf('@')
            let lastDotPos = input["email"].lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input["email"].indexOf('@@') === -1 && lastDotPos > 2 && (input["email"].length - lastDotPos) > 2)) {
                isAuthFormValid = false;
                errors.email = 'Please enter a valid email address'
            } else {
                errors.email = ''
            }
        }

        if (!input['password']) {
            isAuthFormValid = false
            errors.password = 'Password cannot be empty'
        } else {
            errors.password = ''
        }

        this.setState({
            errors: errors
        })

        return isAuthFormValid
    }

    authFormDataSubmit = () => {
        if (this.authenticationFormValidation()) {
            this.setState({
                authFormSubmitted: true
            })

            // Sanctum laravel cookies
            this.sanctumCookies()

            // Sign in and get access token
            this.sanctumAuthentication()
        } else {
            this.setState({
                authFormSubmitted: false
            })
        }
    }

    async sanctumCookies () {
        const domain = ApiServices.FQDN()

        const sanctumCookie = domain + `/sanctum/csrf-cookie`
        axios.defaults.withCredentials = true;

        axios.get(sanctumCookie)
        .then(function() {
            
        })
        .catch(function (error: any) {
            console.log('sanctum-error', error);
        });
    }

    async sanctumAuthentication() {
        const postData = {
            email: this.state.input.email,
            password: this.state.input.password
        }

        const postResponse = await AuthenticationServices.authenticateAgentAccount(postData)
        console.log(postResponse)

        if (postResponse.success) {
            AuthenticationServices.createAccessTokenCookie(postResponse)
            this.props.history.push('/home')
        } else {
            let errors = {...this.state.errors}
            errors.email = postResponse.message

            this.setState({
                errors,
                authFormSubmitted: false
            })
        }
    }

    onChangeHandler = (e: { target: { name: string; value: string } }) => {
        const {input}: any = this.state;
        input[e.target.name] = e.target.value;
        
        this.setState({
            input,
        });
    };

    render() {
        const authFormSubmitted = this.state.authFormSubmitted
        const {errors} = this.state;
        const {input} = this.state;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Sign In</title>
                </Helmet>

                <div className="wrapper">
                    <section className="gx-container">
                        <header className="landing-header">
                            <div className="landing-header__left mb-0">
                                <h2 className="odyssey text-success">{projectApplicationName}</h2>
                                <span className="pui-pill selected mt-0 mb-3">Account Sign In</span>
                            </div>
                        </header>

                        <form className="space-y-3 shadow-none px-10 form-group">
                            <div className="rounded-md shadow-none space-y-px">
                                <div className="form-group">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="off" required className="auth-email-input" placeholder="Email address" 
                                    value={this.state.input.email} 
                                    onChange={(event) => this.setState({ 
                                        input: {
                                            email: event.target.value,
                                            password: input.password
                                        },
                                        errors: {
                                            email: '',
                                            password: ''
                                        }
                                    })}/>

                                    {errors.email.length > 0 && 
                                        <span className='invalid-feedback font-small text-red-600 pl-3'>
                                            {errors.email}
                                        </span>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="auth-password-input" placeholder="********" value={this.state.input.password} 
                                    onChange={(event) => this.setState({ 
                                        input: {
                                            password: event.target.value,
                                            email: input.email
                                        },
                                        errors: {
                                            email: '',
                                            password: ''
                                        }
                                    })}/>

                                    {errors.password.length > 0 && 
                                        <span className='invalid-feedback font-small text-red-600 pl-3'>
                                            {errors.password}
                                        </span>
                                    }
                                </div>
                            </div>

                            <div className="form-group pt-3 px-10">
                                <button type="button" role="presentation" className="auth-submit-button btn-success hover:btn-success" onClick={this.authFormDataSubmit}>
                                    {
                                        authFormSubmitted ? (
                                            <span>
                                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    <span className="w-5 h-5">
                                                        <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                    </span>
                                                </span>
                                                
                                                Signing you in
                                            </span>
                                        ) : (
                                            <span>
                                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                
                                                Sign In
                                            </span>
                                        )
                                    }
                                </button>
                            </div>
                        </form>

                        <div className="space-y-3 pt-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link to="/auth/password-recovery" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                        <span className="font-small">
                                            Forgot your password?
                                        </span>
                                    </Link>
                                </div>

                                <div className="text-sm">
                                    <a href="/" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                        <span className="font-small">
                                            About Odyssey
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default SignIn