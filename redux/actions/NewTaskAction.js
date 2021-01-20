export const newTaskRequestAction = () => {
    return {
        type: 'NEW_TASK_REQUEST'
    }
}

export const newTaskSuccessAction = () => {
    return {
        type: 'NEW_TASK_SUCCESS',
    }
}

export const newTaskErrorAction = (error) => {
    return {
        type: 'NEW_TASK_ERROR',
        payload: error
    }
}