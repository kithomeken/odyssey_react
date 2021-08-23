import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

export default class ForgotPassword extends Component {
    state = {
        input: {
            email: ''
        },
        error: {
            email: ''
        },
        recoverFormSubmitted: false
    }

    submitAccountRecoveryForm = () => {
        this.setState({
            recoverFormSubmitted: true
        })
    }

    render() {
        const error = this.state.error
        const recoverFormSubmitted = this.state.recoverFormSubmitted

        return (
            <React.Fragment>
                <Helmet>
                    <title>Password Recovery</title>
                </Helmet>

                <div className="wrapper">
                    <div className="gx-container">
                        <header className="landing-header">
                            <div className="landing-header__left mb-0">
                                <h2 className="odyssey text-success">Odyssey</h2>
                                <span className="pui-pill selected mt-0 mb-3">Password Recovery</span>
                            </div>
                        </header>

                        <form className="space-y-3 shadow-none px-2 form-group">
                            <div className="w-full form-group text-center">
                                <p style={{lineHeight: '1.7', fontSize: '13px', letterSpacing: '.7px'}}>
                                    To reset your password, kindly enter your the e-mail address associated with your account and we'll send a password reset link to your email. 
                                </p>
                            </div>

                            <div className="form-group pt-3 px-10">
                                <input id="email-address" name="email" type="email" autoComplete="off" required className="auth-email-input" placeholder="myemail@domain.com" 
                                value={this.state.input.email} 
                                onChange={(event) => this.setState({ 
                                    input: {
                                        email: event.target.value,
                                    },
                                    errors: {
                                        email: '',
                                    }
                                })}/>

                                {error.email.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 font-bold pl-3'>
                                        {error.email}
                                    </span>
                                }
                            </div>

                            <div className="form-group pt-3 px-10 w-4/5 m-auto">
                                <button type="button" role="presentation" className="auth-submit-button btn-success hover:btn-success" onClick={this.submitAccountRecoveryForm}>
                                    {
                                        recoverFormSubmitted ? (
                                            <span className="flex items-center">
                                                <span className="absolute flex-none left-0 inset-y-0 flex items-center px-3">
                                                    <span className="w-5 h-5">
                                                        <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                    </span>
                                                </span>
                                                
                                                <span className="flex-1 text-center pl-3">
                                                    Recovering Account
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <span className="absolute flex-none left-0 inset-y-0 flex items-center px-3">
                                                    <span className="w-5 h-5 text-white group-hover:text-white">
                                                        <span className="fas fa-paper-plane"></span>
                                                    </span>
                                                </span>
                                                
                                                <span className="flex-1 text-center pl-3">
                                                    Recover Account
                                                </span>
                                            </span>
                                        )
                                    }
                                </button>
                            </div>

                            <div className="form-group pt-3 px-10 w-full">
                                <Link to="/auth/sign-in" className="font-medium block m-auto text-center text-gray-500 hover:text-gray-900">
                                    <span className="font-small">
                                        Back to Sign In
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}