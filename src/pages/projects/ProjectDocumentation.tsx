import React, { FC } from "react"

interface Props {
    data: any,
    status: any,
    projectId: any,
    updateTabStatus: any,
    updateTabDataState: any,
}

export const ProjectDocumentation: FC<Props> = ({ data, status, projectId, updateTabStatus, updateTabDataState }) => {

    React.useEffect(() => {
        if (data === null || data === undefined) {

        }
    }, []);

    return (
        <React.Fragment>
            <React.Fragment>
            {
                status === 'rejected' ? (
                    null
                ) : status === 'fulfilled' ? (
                    <>
                        <div className="w-full">
                            <h2 className="text-lg mb-2 leading-7 text-emerald-600 sm:text-lg">
                                Project Documentation
                            </h2>

                            <div className="w-12/12">
                                <p className="text-sm text-gray-500">
                                    All your project's documentation in one single place.
                                </p>

                                {/* {
                                    data.length < 3 ? (
                                        <div className="py-2 mb-2">
                                            <span className="text-blue-500 text-sm cursor-pointer flex-row align-middle">
                                                <span className="fas fa-plus mr-2"></span>
                                                Upload Documentation
                                            </span>
                                        </div>
                                    ) : (
                                        null
                                    )
                                } */}
                            </div>
                        </div>
                    </>
                ) : (
                    null
                )
            }
        </React.Fragment>
        </React.Fragment>
    )
}