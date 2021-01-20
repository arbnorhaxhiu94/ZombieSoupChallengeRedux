export const loginRequestAction = () => {
    return {
        type: 'LOGIN_REQUEST'
    }
}

export const loginSuccessAction = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
}

export const loginErrorAction = (error) => {
    return {
        type: 'LOGIN_ERROR',
        payload: error
    }
}