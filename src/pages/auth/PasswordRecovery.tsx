import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"

class PasswordRecovery extends Component {
    render() {
        const projectApplicationName = APPLICATION_NAME

        return(
            <React.Fragment>
                <Helmet>
                    <title>Account Recovery</title>
                </Helmet>

                <div className="wrapper">
                    <div className="gx-container">
                        <header className="landing-header">
                            <div className="landing-header__left mb-0">
                                <h2 className="odyssey text-green-500 nunito">{projectApplicationName}</h2>
                                <span className="pui-pill selected mt-0 mb-3">Account Recover</span>
                            </div>
                        </header>

                        <form className="space-y-3 shadow-none px-2 mb-3">
                            <div className="w-full mb-3 text-center text-gray-700">
                                <p style={{lineHeight: '1.7', fontSize: '13px', letterSpacing: '.7px'}}>
                                    Set a new password to recover your account.
                                </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="auth-password-input" placeholder="Password"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                                <input id="confirm_password" name="confirm_password" type="password" autoComplete="current-password" required className="auth-password-input" placeholder="Confirm Password"/>
                            </div>

                            <div className="mb-3 pt-3 px-10 w-4/5 m-auto">
                                <button type="button" role="presentation" className="auth-submit-button">
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
                                </button>
                            </div>
                        </form>

                        <div className="mb-3 pt-3 px-10 w-full">
                            <a href="/auth/sign-in" className="font-medium block m-auto text-center text-gray-500 hover:text-gray-900">
                                <span className="font-small">
                                    Back to Sign In
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PasswordRecovery