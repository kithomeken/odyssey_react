import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet"
import {Navigate, useLocation} from "react-router";

import {useAppSelector} from "../../store/hooks";
import { APPLICATION_NAME } from "../../global/ConstantsRegistry";
import {accountAuthentication} from "../../store/auth/authenticationActions";

const SignIn = () => {
    const projectApplicationName = APPLICATION_NAME
    const authState = useAppSelector(state => state.authentication);
    const dispatch = useDispatch();
    const location = useLocation()
    const locationState: any = location.state
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();        
        dispatch(accountAuthentication(credentials.email, credentials.password));
    };

    if (authState.uuid) {
        const from = locationState?.from
        const state = {
            from : from,
            postAuth: true
        }

        return <Navigate 
            replace 
            state={state}
            to={`/ac/post/auth/access/sntm/oen/seal/${authState.uuid}`} 
        />;
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Sign In</title>
            </Helmet>

            <div className="wrapper">
                <section className="gx-container">
                    <header className="landing-header">
                        <div className="landing-header__left mb-0">
                            <h2 className="odyssey text-green-500 nunito">{projectApplicationName}</h2>
                            <span className="pui-pill selected mt-0 mb-3">Account Sign In</span>
                        </div>
                    </header>

                    <form className="space-y-3 shadow-none px-10 mb-3" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-none space-y-px">
                            <div className="form-group">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autoComplete="off" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="myemail@domain.com"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                />

                                {
                                    authState.error.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-3'>
                                        {authState.error}
                                    </span>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
                                placeholder="********"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                            </div>

                            <div className="mb-3 pt-3 px-10">
                                <button className="bg-green-500 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-500 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-600" type="submit">
                                    <span>
                                        {
                                            authState.loading ? (
                                                <>
                                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                        <span className="fad text-white fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                                    </span>

                                                    Signing In
                                                </>
                                            ) : (
                                                <>
                                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                        <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>

                                                    Sign In
                                                </>
                                            )
                                        }
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-3 pt-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="/auth/forgot-password" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                    <span className="font-small">
                                        Forgot your password?
                                    </span>
                                </a>
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


















/* class SignIn extends Component {
    state = {
        input: {
            email: '',
            password: '',
        },
    }

    onChangeHandler = (e: { target: { name: string; value: string } }) => {
        const { input }: any = this.state;
        input[e.target.name] = e.target.value;

        this.setState({
            input,
        });
    };

    handleFormSubmit = (e: any) => {
        e.preventDefault()

    }

    render() {
        const projectApplicationName = ConstantsRegistry.projectApplicationName()
        const { input } = this.state;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Sign In</title>
                </Helmet>

                <div className="wrapper">
                    <section className="gx-container">
                        <header className="landing-header">
                            <div className="landing-header__left mb-0">
                                <h2 className="odyssey text-green-500 nunito">{projectApplicationName}</h2>
                                <span className="pui-pill selected mt-0 mb-3">Account Sign In</span>
                            </div>
                        </header>

                        <form className="space-y-3 shadow-none px-10 mb-3" onSubmit={this.handleFormSubmit}>
                            <div className="rounded-md shadow-none space-y-px">
                                <div className="form-group">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="off" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="myemail@domain.com"
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
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="********"
                                        value={this.state.input.password}
                                        onChange={(event) => this.setState({
                                            input: {
                                                password: event.target.value,
                                                email: input.email
                                            },
                                            errors: {
                                                email: '',
                                                password: ''
                                            }
                                        })} />
                                </div>

                                <div className="mb-3 pt-3 px-10">
                                    <button className="auth-submit-button" type="submit">
                                        <span>
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>

                                            Sign In
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="space-y-3 pt-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="/auth/password-recovery" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                        <span className="font-small">
                                            Forgot your password?
                                        </span>
                                    </a>
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
} */

export default SignIn