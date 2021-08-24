import { combineReducers } from "redux"
import userState from "./UserStore"
import activityState from "./ActivtyState"

export default combineReducers({
    userState, activityState
})