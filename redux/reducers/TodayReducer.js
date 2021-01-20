import { Alert } from 'react-native'
import axios from 'react-native-axios'
import { todayRequestAction, todaySuccessAction, todayErrorAction } from '../actions/TodayAction'

const initialState = {
    error: '',
    today_tasks: [],
    lists: []
}

export const TodayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TODAY_REQUEST':
            return {
                ...state,
            }
        case 'TODAY_SUCCESS':
            console.log('success action')
            return {
                ...state,
                today_tasks: action.today_tasks,
                lists: action.lists
            }
        case 'TODAY_ERROR':
            if(action.payload.error) {
                return {
                    ...state,
                    error: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}

export const getTodayData = (token) => {
    return function(dispatch) {
        dispatch(todayRequestAction())
        console.log('getting tasks')
        axios
            .get('https://tasker.zombiesoup.co/api/dashboard', {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then((response) => {
                console.log('getting tasks')
                // Tasks load
                let today_tasks = response.data.data.today_tasks
                for(let i=0; i<today_tasks.length; i++) {
                    // console.log(i+" -> "+today_tasks[i])
                    let id_str = today_tasks[i].id.toString()
                    today_tasks[i].id = id_str
                }
                console.log('getting lists')
                // Lists load
                let lists = response.data.data.lists
                for(let i=0; i<lists.length; i++) {
                    if(lists[i].color == '#FFE761' || lists[i].color == '#BCD2F3' ) {
                        lists[i].textColor = '#444'
                    } else {
                        lists[i].textColor = '#fff'
                    }
                    let id_str = lists[i].id.toString()
                    lists[i].id = id_str
                }
                console.log('today_tasks:' + today_tasks)
                dispatch(todaySuccessAction(today_tasks, lists))
            })
            .catch((error) => {
                console.log('error occurred')
                console.log(error.response.data.error)
            })
    }
}