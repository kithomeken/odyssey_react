import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import errorImage from '../../assets/images/not_found.svg'

class Error400 extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="w-full mb-4">
                    <img src={errorImage} alt="broken_robot" width="150px" className="block text-center m-auto" />
                </div>

                <div className="w-6/12 m-auto">
                    <p className="text-center text-2xl mb-0 text-green-500">
                        Page Not Found
                    </p>

                    <p className="text-sm text-center mb-2 text-gray-600">
                        Seemd like you're lost. Let's take you somewhere more familiar
                    </p>

                    <Link to="home" className="inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"> 
                        <span className="text-sm">
                            Take Me Home
                        </span>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default Error400