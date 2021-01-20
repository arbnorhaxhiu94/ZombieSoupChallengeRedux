export const todayRequestAction = () => {
    return {
        type: 'TODAY_REQUEST'
    }
}

export const todaySuccessAction = (today_tasks, lists) => {
    return {
        type: 'TODAY_SUCCESS',
        today_tasks: today_tasks,
        lists: lists
    }
}

export const todayErrorAction = (error) => {
    return {
        type: 'TODAY_ERROR',
        payload: error
    }
}