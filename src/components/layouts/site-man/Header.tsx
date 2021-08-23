import React, {Component} from "react"
import {Link} from 'react-router-dom'

interface Props {
    title: string,
    showButton: boolean,
    buttonTitle?: string,
    buttonIcon?: boolean,
    iconType?: string,
    buttonColor?: string,
    buttonHoverColor?: string,
    buttonLink?: string,
}

class Header extends Component<Props> {
    render() {
        const {title} = this.props
        const {showButton} = this.props
        const {buttonTitle} = this.props
        const {buttonIcon} = this.props
        const {iconType} = this.props
        const {buttonColor} = this.props
        const {buttonHoverColor} = this.props
        const {buttonLink} = this.props

        return (
            <React.Fragment>
                <div className="flex items-center py-4 lg:justify-between w-full">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl leading-7 text-green-500 sm:text-2xl sm: mb-0">
                            {title}
                        </h2>
                    </div>
                    
                    {
                        showButton ? (
                            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                <span className="hidden sm:block">
                                    <Link to={buttonLink} type="button" className={`inline-flex items-center px-4 py-1 border border-${buttonColor}-500 rounded shadow-sm text-sm text-white bg-${buttonColor}-500 hover:bg-${buttonHoverColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${buttonHoverColor}-500`}>
                                        <span className="text-sm">
                                            {buttonTitle}
                                        </span>
                                        {
                                            buttonIcon ? (
                                                <span className={iconType}></span>
                                            ) : (
                                                ''
                                            )
                                        }
                                    </Link>
                                </span>
                            </div>
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