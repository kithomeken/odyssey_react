import React from "react"
import emptyBox from "../../assets/images/empty_box.png"

const Error500 = () => {
    return (
        <React.Fragment>
            <div className="w-full mb-4">
                <img src={emptyBox} alt="broken_robot" width="150px" className="block text-center m-auto" />
            </div>

            <div className="w-6/12 m-auto">
                <p className="text-center text-xl mb-0 text-orange-600">
                    Something went wrong.
                </p>

                <p className="text-sm text-center mb-2 text-gray-600">
                    
                </p>

                <p className="text-sm text-center form-group mb-0 text-gray-600">
                    An unexpected error has occurred. Please try again later. If the error persists, kindly contact the support team.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Error500