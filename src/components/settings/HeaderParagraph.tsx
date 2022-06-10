import React from "react"

const HeaderParagraph = ({ title }: { title: string }) => {
    return (
        <React.Fragment>
            <p className="text-sm w-9/12 form-group mb-0 text-gray-600">
                {title}
            </p>
        </React.Fragment>
    )
}

export default HeaderParagraph