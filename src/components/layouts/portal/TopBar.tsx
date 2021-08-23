import React, {Component} from "react"
import {Link} from 'react-router-dom'

import ProfileHeader from "./ProfileHeader"

class TopBar extends Component {
    state = {

    }

    render() {
        return (
            <React.Fragment>
                <nav className="bg-white w-full z-10">
                    <div className="max-w-full bg-white mx-auto px-3">
                        <div className="relative flex bg-white border-b-2 items-center justify-between h-16">
                            <div className="flex-initial">
                                <Link to="/home" target="_blank" className="flex flex-row text-sm items-center p-2 ml-5 text-gray-500 rounded hover:text-green-700 hover:bg-green-100">
                                    <i className="fal fa-arrow-circle-left mr-2 lolrtn"></i>
                                    <span className="lolrtn robot">Back to portal</span>
                                </Link>
                            </div>
                            
                            <div className="flex-initial">
                                <ProfileHeader />
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default TopBar