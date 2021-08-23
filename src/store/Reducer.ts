import { combineReducers } from "redux"
import userState from "./UserStore"
import activityState from "./ActivityState"

export default combineReducers({
    userState,
    activityState
})