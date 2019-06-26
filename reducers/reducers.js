import { combineReducers } from 'redux'
import { ADD_Question, Add_Question } from '../actions/actions'

function question(state, action) {
   switch (action.type) {
      case Add_Question:
         return {
            id: action.id,
            text: action.text,
         }
      default:
         return state
   }
}
function questions(state = [], action) {
   switch (action.type) {
      case ADD_Question:
         return [
            ...state,
            question(undefined, action)
         ]
      default:
         return state
   }
}
const gameApp = combineReducers({
   questions
})
export default gameApp