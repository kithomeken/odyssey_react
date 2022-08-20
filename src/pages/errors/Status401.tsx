import React, { FC } from "react"
import emptyBox from "../../assets/images/.512023.png"

interface Props {
    title: string,
    description: string,
}

export const Status401: FC<Props> = ({title, description}) => {
    return (
        <React.Fragment>
            <div className="w-12/12 pb-4 pt-10 m-auto">
                <img src={emptyBox} alt="401_broken_robot" width="300px" className="block text-center m-auto" />
            </div>

            <div className=" m-auto">
                <p className="text-center text-2xl mb-0 text-teal-600">
                    {title}
                </p>

                <p className="text-sm text-center mb-2 text-gray-600">
                    
                </p>

                <p className="text-sm text-center form-group mb-0 text-gray-600">
                    {description}
                </p>
            </div>
        </React.Fragment>
    )
}