/*
* Error template to be shown when
* communication breaks-down.
*
* i.e. Error 400, 500 etc.
*
* */

import React from "react"
import emptyBox from "../../assets/images/loser_failure.png"

export const CommsBreakdown = () => {
	return (
		<React.Fragment>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="sm:flex sm:items-start">
					<div className="mx-auto flex-shrink-0 flex items-center justify-center sm:mx-0 sm:h-24 sm:w-24">
						<img src={emptyBox} alt="broken_robot" width="auto" className="block text-center m-auto" />
					</div>
					<div className="mt-3 text-center text-slate-600 sm:mt-0 sm:ml-4 sm:text-left">
						<span className="text-gray-500 mb-5 block">
							Communication Breakdown
						</span>

						<div className="text-sm">
							Connection failed, kindly check your internet connection.
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}