import React, { Component } from "react"
import { Link } from "react-router-dom"
import parachute from '../../assets/images/Untitled-3.png'

interface Props {
    link: any,
    linkName: any
}

class ActivateFeature extends Component<Props> {
    render() {
        const link = this.props.link
        const linkName = this.props.linkName

        return (
            <React.Fragment>
                <div className="w-full mt-6 h-72">
                    <div className="w-full mb-4">
                        <img src={parachute} alt="parachute" width="250px" className="block text-center m-auto" />
                    </div>

                    <div className="w-6/12 m-auto">
                        <p className="text-sm text-center mb-2 text-gray-600 inline-block">
                            This feature has not been activated. 
                            To activate go to <Link className="text-green-500 inline-block ml-1 hover:underline" to={link}>{linkName}</Link> to activate
                        </p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ActivateFeature