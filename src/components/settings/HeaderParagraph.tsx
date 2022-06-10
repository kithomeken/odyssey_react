import React from "react"

const HeaderParagraph = ({ title }: { title: string }) => {
    return (
        <React.Fragment>
            <p className="text-sm w-9/12 mb-5 text-gray-600">
                {title}
            </p>
        </React.Fragment>
    )
}

export default HeaderParagraph