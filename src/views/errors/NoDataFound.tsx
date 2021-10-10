import React, {Component} from 'react'

import errorImage from '../../assets/images/empty_box.png'

class NoDataFound extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="w-full mb-4">
                    <img src={errorImage} alt="broken_robot" width="150px" className="block text-center m-auto" />
                </div>

                <div className="w-6/12 m-auto">
                    <p className="text-sm text-center mb-2 text-gray-600">
                        We've searched far & wide but it seems like the item you're looking for does not exist.
                    </p>
                </div>
            </React.Fragment>
        )
    }
}

export default NoDataFound