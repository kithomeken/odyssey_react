import React, {Component} from "react"
import {Link} from 'react-router-dom'

interface Props {
    breadCrumbDetails: (
        {
            linkItem: boolean,
            title: string,
            url?: any
        }
    )[]
}

class BreadCrumbs extends Component<Props> {
    render() {
        const {breadCrumbDetails} = this.props

        return  (
            <React.Fragment>
                <ul className="w-full flex flex-row items-center mt-2 text-xs text-gray-500">
                    <li>
                        <span className="w-5 h-5">
                            <span className="fal fa-cog"></span>
                        </span>
                    </li>

                    {breadCrumbDetails.map(
                        (crumb, index) => (
                            <li className="ml-3 breadcrumb-item" key={index}>
                                {
                                    crumb.linkItem ? (
                                        <Link to={crumb.url} key={index}>
                                            <span className="lttr-spc">
                                                {crumb.title}
                                            </span>
                                        </Link>
                                    ) : (
                                        <span className="lttr-spc text-gray-700">
                                            {crumb.title}
                                        </span>
                                    )
                                }
                            </li>
                        )
                    )}
                </ul>
            </React.Fragment>
        )
    }
}

export default BreadCrumbs