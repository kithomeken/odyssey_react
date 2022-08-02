import React from "react"
import emptySearchBox from "../../assets/images/sad_dog_161669_74.png"

const EmptyResultsReturned = () => {
    return (
        <React.Fragment>
            <div className="w-6/12 pb-5 pt-10 m-auto">
                <img src={emptySearchBox} alt="broken_robot" width="400px" className="block text-center m-auto" />
            </div>

            <div className="m-auto">
                <p className="text-lg text-center mb-2 text-amber-600">
                    No Matches Found
                </p>

                <p className="text-sm text-center w-80 m-auto text-gray-600">
                    We searched far and wide, high and low but we couldn't find any matches...
                </p>
            </div>
        </React.Fragment>
    )
}

export default EmptyResultsReturned