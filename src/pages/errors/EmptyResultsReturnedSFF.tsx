import React from "react"
import emptySearchBox from "../../assets/images/empty_results_returned.png"

const EmptyResultsReturnedSFF = () => {
    /* SFF - Small Form Factor */
    return (
        <React.Fragment>
            <div className="w-6/12 pb-2 m-auto">
                <img src={emptySearchBox} alt="broken_robot" width="135px" className="block text-center m-auto" />
            </div>

            <div className="m-auto w-4/12">
                <p className="text-sm text-center form-group mb-0 text-gray-600">
                    We searched far and wide, but we couldn't find any matches...
                </p>
            </div>
        </React.Fragment>
    )
}

export default EmptyResultsReturnedSFF