import React from "react"

export const RecentActivity = () => {
    return (
        <React.Fragment>
            <>
                <div className="w-full pb-5">
                    <div className="flex-auto">
                        <p className="text-lg text-emerald-600">
                            Recent Activity
                        </p>

                        <p className="text-sm text-slate-500 mb-3">
                            Your activity for the last 90 days...
                        </p>

                        <div className="w-full rounded mb-3 p-3 h-44">

                        </div>
                    </div>
                </div>

                <div className="w-full mb-4">
                    <div className="flex-auto">
                        <p className="text-lg text-emerald-600">
                            Team Collaborations
                        </p>

                        <p className="text-sm text-slate-500 mb-3">
                            Teams' you've created or are enlisted in
                        </p>

                        <div className="w-full rounded mb-3 p-3 h-44">

                        </div>
                    </div>
                </div>

                <div className="w-full mb-4">
                    <div className="flex-auto">
                        <p className="text-lg text-emerald-600">
                            Projects
                        </p>

                        <p className="text-sm text-slate-500 mb-3">
                            List of projects you've participated in
                        </p>

                        <div className="w-full rounded mb-3 p-3 h-44">

                        </div>
                    </div>
                </div>
            </>
        </React.Fragment>
    )
}