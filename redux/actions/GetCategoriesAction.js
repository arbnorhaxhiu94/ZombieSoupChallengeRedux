export const getCategoriesRequestAction = () => {
    return {
        type: 'GET_CATEGORIES_REQUEST'
    }
}

export const getCategoriesSuccessAction = (categories) => {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        payload: categories
    }
}

export const getCategoriesErrorAction = (error) => {
    return {
        type: 'GET_CATEGORIES_ERROR',
        payload: error
    }
}