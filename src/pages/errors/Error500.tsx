import React from "react"
import emptyBox from "../../assets/images/error_500.png"

const Error500 = () => {
    return (
        <React.Fragment>
            <div className="w-6/12 pb-4 pt-10 m-auto">
                <img src={emptyBox} alt="broken_robot" width="300px" className="block text-center m-auto" />
            </div>

            <div className="w-6/12 m-auto">
                <p className="text-center text-xl mb-0 text-red-600">
                    Something went wrong.
                </p>

                <p className="text-sm text-center mb-2 text-gray-600">
                    
                </p>

                <p className="text-sm text-center form-group mb-0 text-gray-600">
                    An unexpected error occurred while trying to perform this action. Please try again later...
                </p>
            </div>
        </React.Fragment>
    )
}

export default Error500