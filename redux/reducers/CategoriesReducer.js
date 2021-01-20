import axios from 'react-native-axios'
import { getCategoriesRequestAction, getCategoriesSuccessAction, getCategoriesErrorAction } from '../actions/GetCategoriesAction'

const initialState = {
    categories: [],
    error: ''
}

export const GetCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_REQUEST':
            return {
                ...state,
            }
        case 'GET_CATEGORIES_SUCCESS':
            console.log('success action')
            return {
                ...state,
                categories: action.payload
            }
        case 'GET_CATEGORIES_ERROR':
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

export const getCategories = (token) => {
    return async function(dispatch) {
        dispatch(getCategoriesRequestAction())
        console.log('getting categories: '+ token)
        await axios.get('https://tasker.zombiesoup.co/api/lists', {
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        .then((response) => {
            let categoriesList = response.data.data
            for(let i=0; i<categoriesList.length; i++) {
                if(categoriesList[i].color == '#FFE761' || categoriesList[i].color == '#BCD2F3' ) {
                    categoriesList[i].textColor = '#444'
                } else {
                    categoriesList[i].textColor = '#fff'
                }
                let id_str = categoriesList[i].id.toString()
                categoriesList[i].id = id_str
                categoriesList[i].selected = false
            }
            dispatch(getCategoriesSuccessAction(categoriesList))
            // this.setState({
            //     categoriesList: categoriesList,
            //     category_id: categoriesList[0].id,
            //     categoryName: categoriesList[0].name,
            //     categoryColor: categoriesList[0].color
            // })
        })
        .catch((error) => {
            dispatch(getCategoriesErrorAction(error.response.data))
            console.log('error occurred')
            console.log(error.response.data.error)
        })
    }
}