import React, {Component} from "react"
import { connect } from "react-redux"

import TopNavbar from "./TopNavbar"
import ASide from "./ASide"

import UserStateInterace from "../../../interfaces/UserStateInterface"
import UserStateService from "../../../services/UserStateService"
import { setUser } from "../../../store/Actions"

interface Props {
    user: UserStateInterace
    setUser: typeof setUser
    children: React.ReactNode
}

class Base extends Component<Props> {
    async componentDidMount() {
        const response = await UserStateService.getCurrentUserProfile()
        this.props.setUser(response)
        // console.log(response)
    }

    render() {
        return (
            <React.Fragment>
                <TopNavbar />

                <div className="flex h-screen">
                    <ASide />

                    <div className="px-4 py-4 flex-auto mb-5 _spco">
                        <div className="kiOAkj mb-2">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {setUser})(Base)