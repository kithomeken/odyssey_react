/*
* Error template to be shown when
* communication breaks-down.
*
* i.e. Error 400, 500 etc.
*
* */

import React from "react"
import emptyBox from "../../assets/images/loser_failure.png"

export const CommsBreakdownVert = () => {
	return (
		<React.Fragment>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="flex flex-col items-center">
					<div className="mx-auto flex-shrink-0 flex items-center justify-center mb-3 sm:mx-0 sm:h-32 sm:w-32">
						<img src={emptyBox} alt="broken_robot" width="auto" className="block text-center m-auto" />
					</div>

					<div className="mt-3 text-center m-auto text-slate-600">
						<span className="text-slate-700 mb-2 block">
							Communication Breakdown
						</span>

						<div className="text-sm">
							Connection failed, kindly check your internet connection and try again later.
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}