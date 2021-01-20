import { Alert } from 'react-native'
import axios from 'react-native-axios'
import { newTaskRequestAction, newTaskSuccessAction, newTaskErrorAction } from '../actions/NewTaskAction'

const initialState = {
    error: '',
}

export const NewTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_TASK_REQUEST':
            return {
                ...state,
            }
        case 'NEW_TASK_SUCCESS':
            console.log('success action')
            return {
                ...state,
            }
        case 'NEW_TASK_ERROR':
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

export const submitTask = (category_id, taskName, date_str, token, navigation) => {
    return function(dispatch) {
        dispatch(newTaskRequestAction())
        if(category_id == null) {
            return alert("You must select a category")
        }

        axios
            .post(
                'https://tasker.zombiesoup.co/api/tasks', 
                {
                    name: taskName,
                    task_list_id: category_id,
                    due_date: date_str
                },
                {
                headers: { 
                    'Authorization': 'Bearer '+token 
                }
            })
            .then(() => {
                // Keyboard.dismiss()
                dispatch(newTaskSuccessAction())
                Alert.alert('Success', 'New task got inserted', [
                    {text:'OK', onPress: () => {
                        navigation.navigate('TodayScreen');
                        }
                    }
                ])
            })
            .catch((error) => {
                dispatch(newTaskErrorAction())
                console.log('error occurred')
                alert(error.response.data.error.due_date)
            })
    }
}