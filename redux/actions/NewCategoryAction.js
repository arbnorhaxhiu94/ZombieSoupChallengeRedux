export const newCategoryRequestAction = () => {
    return {
        type: 'NEW_CATEGORY_REQUEST'
    }
}

export const newCategorySuccessAction = (data) => {
    return {
        type: 'NEW_CATEGORY_SUCCESS',
        payload: data
    }
}

export const newCategoryErrorAction = (error) => {
    return {
        type: 'NEW_CATEGORY_ERROR',
        payload: error
    }
}