import React, {useState} from "react"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"

const ForgotPassword = () =>  {
    const projectApplicationName = APPLICATION_NAME
    const location = useLocation()
    const [fromLocation, setFromLocation] = useState({
        from: ''
    })

    // console.log(location/* .pathname */);
    
    // setFromLocation({...fromLocation, from: location})

    return(
        <React.Fragment>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>

            <div className="wrapper">
                <div className="gx-container">
                    <header className="landing-header">
                        <div className="landing-header__left mb-0">
                            <h2 className="odyssey text-green-500 nunito">{projectApplicationName}</h2>
                            <span className="pui-pill selected mt-0 mb-3">Forgot Password</span>
                        </div>
                    </header>

                    <form className="space-y-3 shadow-none px-2 mb-3">
                        <div className="w-full form-group text-center text-gray-700">
                            <p style={{lineHeight: '1.7', fontSize: '13px', letterSpacing: '.7px'}}>
                                To reset your password, kindly enter your the e-mail address associated with your account and we'll send a password reset link to your email. 
                            </p>
                        </div>

                        <div className="form-group pt-3 px-10">
                            <input id="email-address" name="email" type="email" autoComplete="off" required className="auth-email-input" placeholder="myemail@domain.com" 
                            />
                        </div>

                        <div className="form-group pt-3 px-10 w-4/5 m-auto">
                            <button type="button" role="presentation" className="auth-submit-button">
                                <span className="flex items-center">
                                    <span className="absolute flex-none left-0 inset-y-0 flex items-center px-3">
                                        <span className="w-5 h-5 text-white group-hover:text-white">
                                            <span className="fas fa-paper-plane"></span>
                                        </span>
                                    </span>
                                    
                                    <span className="flex-1 text-center pl-3">
                                        Reset Account
                                    </span>
                                </span>
                            </button>
                        </div>
                    </form>

                    <div className="form-group pt-3 px-10 w-full">
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

export default ForgotPassword