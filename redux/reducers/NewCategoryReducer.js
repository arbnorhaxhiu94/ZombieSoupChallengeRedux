import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import axios from 'react-native-axios'
import { newCategoryRequestAction, newCategorySuccessAction, newCategoryErrorAction } from '../actions/NewCategoryAction'

const initialState = {
    data: [],
    error: '',
}

export const NewCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_CATEGORY_REQUEST':
            return {
                ...state,
            }
        case 'NEW_CATEGORY_SUCCESS':
            console.log('success action')
            return {
                ...state,
                data: action.payload
            }
        case 'NEW_CATEGORY_ERROR':
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

export const submitCategory = (categoryName, categoryColor, token, navigation) => {
    return function(dispatch) {
        dispatch(newCategoryRequestAction())
        var color = categoryColor == '' ? '#252A31' : categoryColor
        axios
            .post(
                'https://tasker.zombiesoup.co/api/lists', 
                {
                    name : categoryName,
                    color : color
                },
                {
                headers: { 
                    'Authorization': 'Bearer '+token 
                }
            })
            .then((response) => {
                dispatch(newCategorySuccessAction(response))
                console.log('new list inserted')
                Alert.alert('Success', 'New category got inserted', [
                    {text:'OK', onPress: () => navigation.navigate('TodayScreen')}
                ])
            })
            .catch((error) => {
                console.log('error: '+ error.response)
                dispatch(newCategoryErrorAction(error))
            })
    }
}