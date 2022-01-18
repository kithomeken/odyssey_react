import React, {Component} from "react"

class Loading extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="flex flex-col align-middle mt-6 h-16">
                    <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                </div>
            </React.Fragment>
        )
    }
}

export default Loading