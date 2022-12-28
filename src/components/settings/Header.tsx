import React, { Component } from "react"
import { Link } from 'react-router-dom'

interface Props {
    title: string,
    showButton: boolean,
    buttonTitle?: string,
    buttonIcon?: boolean,
    iconType?: string,
    buttonLink?: any,
    actionButton?: boolean,
    actionEvent?: any,
}

class Header extends Component<Props> {
    render() {
        const { title } = this.props
        const { showButton } = this.props
        const { buttonTitle } = this.props
        const { buttonIcon } = this.props
        const { iconType } = this.props
        const { buttonLink } = this.props
        const { actionButton } = this.props
        const { actionEvent } = this.props

        return (
            <React.Fragment>
                <div className="flex items-center pb-4 pt-3 lg:justify-between w-full">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl leading-7 text-green-600 sm: mb-0">
                            {title}
                        </h2>
                    </div>

                    {
                        showButton ? (
                            <>
                                {
                                    actionButton ? (
                                        // For header buttons with actions
                                        // E.g. Opening a modal
                                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                            <span className="hidden sm:block">
                                                <button type="button" onClick={actionEvent} className={`inline-flex items-center px-4 py-1-5 border border-green-600 rounded shadow-sm text-sm text-green-700 hover:border-green-800 hover:text-green-800 focus:outline-none focus:ring -0 focus:ring-offset-0 focus:ring-green-400`}>
                                                    {
                                                        buttonIcon ? (
                                                            <span className={`mr-2 ${iconType}`}></span>
                                                        ) : (
                                                            ''
                                                        )
                                                    }

                                                    <span className="text-sm">
                                                        {buttonTitle}
                                                    </span>
                                                </button>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                            <span className="hidden sm:block">
                                                <Link to={buttonLink} type="button" className={`inline-flex items-center px-4 py-1-5 border-2 border-green-600 rounded shadow-sm text-sm text-green-700 hover:border-green-800 hover:text-green-800 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-green-400`}>
                                                    <span className="text-sm">
                                                        {buttonTitle}
                                                    </span>
                                                    {
                                                        buttonIcon ? (
                                                            <span className={`ml-2 ${iconType}`}></span>
                                                        ) : (
                                                            ''
                                                        )
                                                    }
                                                </Link>
                                            </span>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            null
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Header