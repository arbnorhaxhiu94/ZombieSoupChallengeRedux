import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios'
import { loginErrorAction, loginRequestAction, loginSuccessAction } from '../actions/LoginAction'

const initialState = {
    user: [],
    email_error: '',
    password_error: '',
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
            }
        case 'LOGIN_SUCCESS':
            console.log('success action')
            return {
                ...state,
                user: action.payload
            }
        case 'LOGIN_ERROR':
            if(action.payload.error) {
                if (action.payload.error.email !== undefined && action.payload.error.password !== undefined) {
                    return  {
                        ...state,
                        email_error: action.payload.error.email[0],
                        password_error: action.payload.error.password[0]
                    }
                } else if(action.payload.error.email !== undefined) {
                    return {
                        ...state,
                        email_error: action.payload.error.email[0],
                    }
                } else if(action.payload.error.password.length !== undefined) {
                    return {
                        ...state,
                        password_error: action.payload.error.password[0]
                    }
                }
            }
            else {
                return {
                    ...state,
                    email_error: action.payload.message
                }
            }
        default:
            return {
                ...state
            }
    }
}

export const tryToLogin = (email, password) => {
    return function(dispatch) {
        dispatch(loginRequestAction())
        axios
            .post('https://tasker.zombiesoup.co/api/auth/login', {
                email : email,
                password : password,
                // email: "test@test.com",
                // password: "password",
            })
            .then(async(response) => {
                let user_data = JSON.stringify(response.data.data.user)
                dispatch(loginSuccessAction(user_data))
                await AsyncStorage.setItem('token', response.data.data.token)
                await AsyncStorage.setItem('user_data', user_data)

            })
            .catch((error) => {
                // if(error.response.data.code == 404 || error.response.data.code == 401) {
                //     dispatch(loginErrorAction(error.response.data))
                // }
                dispatch(loginErrorAction(error.response.data))
            });
    }
}