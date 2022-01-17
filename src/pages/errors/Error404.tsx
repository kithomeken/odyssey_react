import React, { Component } from "react";
import { Helmet } from "react-helmet";

import dribbble_1 from '../../assets/images/tv_1.gif'
import { Link } from "react-router-dom";

class Error404 extends Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Not Found - 404</title>
                </Helmet>

                <div className="bg-white items-center flex justify-content-center h-screen p-6">
                    <section className="page_404 m-auto z-10">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <img className="m-auto p-4 block text-center mb-5 sm:max-w-sm md:max-w-md lg:max-w-lg" src={dribbble_1} alt="404_page_not_found" />
                                </div>

                                <div className="col-sm-12 sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
                                    <div className="col-sm-10 col-sm-offset-1 text-center">
                                        <p className="text-green-500 text-2xl mb-3">404_page_not_found</p>
                                        <p className="text-gray-500 mb-5 text-sm">The page you're looking for might have been removed, had its name changed or is temporarily unavailable...</p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm m-auto ">
                                                    <Link to="/home" className="font-medium text-center text-green-500 hover:text-green-700">
                                                        <span className="font-small flex items-center justify-between">
                                                            <span>
                                                                Back to Homepage
                                                            </span>

                                                            <span className="far fa-long-arrow-right ml-3"></span>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default Error404