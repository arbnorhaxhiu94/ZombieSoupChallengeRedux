import { applyMiddleware, combineReducers, createStore } from 'redux'
import { GetCategoriesReducer } from '../reducers/CategoriesReducer'
import { LoginReducer } from '../reducers/LoginReducer'
import { NewCategoryReducer } from '../reducers/NewCategoryReducer'
import { NewTaskReducer } from '../reducers/NewTaskReducer'
import { TodayReducer } from '../reducers/TodayReducer'

const thunk = require('redux-thunk').default

const rootReducer = combineReducers({
    loginReducer: LoginReducer,
    newCategoryReducer: NewCategoryReducer,
    newTaskReducer: NewTaskReducer,
    getCategoriesReducer: GetCategoriesReducer,
    todayReducer: TodayReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store