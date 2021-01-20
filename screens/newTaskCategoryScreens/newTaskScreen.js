import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, StatusBar, FlatList, Keyboard, KeyboardAvoidingView } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { formStyles } from '../../globalStyles/formStyles'
import { newTCstyles } from '../../globalStyles/newTaskCategoryStyles'
import { categoriesStyles } from '../../globalStyles/categoriesStyles'
import { dateTimeFormater } from '../../random/formatDateTime'
import { CategoriesListForTask } from './categoriesList'
import { HeaderWithButtons } from './headerWithButtons'
import { Belt } from './Belt'
import { connect } from 'react-redux'
import { submitTask } from '../../redux/reducers/NewTaskReducer'
import { getCategories } from '../../redux/reducers/CategoriesReducer'

class NewTask extends Component {
    constructor(props) {
        super(props)
        this.state={
            task: '',
            category_id: null, categoryName: '', categoryColor: '',
            categoriesList: [],
            token: '',
            disabledButton: true,
            keyboardOpen: false,
            showDateTime: false,
            mode: '',
            date: new Date(Date.now()),
            date_str: '',
            params: false
        }
    }

    onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({
            date: currentDate,
            mode: '',
            showDateTime: false
        })
        
        console.log(selectedDate)
        let unformatedDate = (this.state.date).toString()
        let formated_date = dateTimeFormater(unformatedDate)
        this.setState({
            date_str: formated_date
        })
    };

    showDateTimePicker = (mode) => {
        this.setState({
            mode: mode,  // calendar or clock
            showDateTime: true,
        })
    }

    handleChange = (field, input) => {
        let categoriesList = this.state.categoriesList
        for(let i=0; i<categoriesList.length; i++) {
            if(categoriesList[i].id == input.id) {
                categoriesList[i].selected = true
            } else {
                categoriesList[i].selected = false
            }
        }
        if(field == 'category') {
            this.setState({
                category_id: input.id,
                categoryName: input.name,
                categoryColor: input.color,
                categoriesList: categoriesList
            })
        } else if(field == 'task'){
            this.setState({
                task: input,
                disabledButton: input.length > 0 ? false : true
            })
        }
    }

    getToken = async() => {
        let token = await AsyncStorage.getItem('token')
        this.setState({
            token: token
        })
        
        if(this.props.route.params !== undefined) {
            this.setState({
                category_id: this.props.route.params.category.id,
                categoryName: this.props.route.params.category.name,
                categoryColor: this.props.route.params.category.color,
                params: true
            })
        } else {
            setTimeout(() => {
                this.props.getCategories(token)
            }, 100)

            let i = setInterval(() => {
                if(this.props.categories.length > 0) {
                    console.log('categories are loaded')
                    this.setState({
                        categoriesList: this.props.categories,
                        category_id: this.props.categories[0].id,
                        categoryName: this.props.categories[0].name,
                        categoryColor: this.props.categories[0].color
                    })
                    clearInterval(i)
                } else {
                    console.log('categories are not loaded')
                }
            }, 200)
        }
    }

    componentDidMount() {
        var date = this.state.date
        date.setDate(date.getDate()+1)
        var date_str = date.toString()
        setTimeout(() => {
            this.setState({
                date_str: dateTimeFormater(date_str) // create a default date if user does not select one
            })
        }, 500);
        
        this.getToken()
    }

    showKeyboard = () => {
        this.setState({
            keyboardOpen: true
        })
    }
    hideKeyboard = () => {
        this.setState({
            keyboardOpen: false
        })
    }

    render() {
        return (
            <KeyboardAvoidingView  behavior="padding" style={{flex: 1, backgroundColor: '#fff'}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); this.hideKeyboard();}} style={newTCstyles.buttonsContainer}>
                    <HeaderWithButtons
                        disabledButton={this.state.disabledButton}
                        navigation={this.props.navigation}
                        submitForm={() => 
                            this.props.submitTask(this.state.category_id, this.state.task, this.state.date_str, this.state.token, this.props.navigation)}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); this.hideKeyboard();}} style={{...formStyles.formContainer, marginTop: 20}}>
                    <TextInput 
                        multiline={true}
                        numberOfLines={3}
                        placeholder="What do you want to do ?"
                        value={this.state.task}
                        onFocus={() => this.showKeyboard()}
                        onChangeText={(input) => this.handleChange('task', input)} />
                </TouchableWithoutFeedback>
                <View style={newTCstyles.belt}>
                    <Belt 
                        showDateTimePicker={this.showDateTimePicker}
                        mode={this.state.mode}
                        category_id={this.state.category_id}
                        categoryName={this.state.categoryName}
                        categoryColor={this.state.categoryColor}
                        hideKeyboard={this.hideKeyboard}
                    />
                    {this.state.showDateTime ? 
                        <DateTimePicker
                            minimumDate={new Date(Date.now())}
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onDateChange}
                        />
                        : null
                    }
                    {this.state.keyboardOpen || this.state.params ? 
                        null
                    :
                        <View style={{...categoriesStyles.categoryContainer, height: 250}}>
                            <FlatList
                                style={{width: '90%'}}
                                showsVerticalScrollIndicator={false}
                                data={this.state.categoriesList}
                                renderItem={({item}) => (
                                    <CategoriesListForTask
                                        handleChange={() => this.handleChange('category', item)}
                                        item={item}
                                    />
                                )}
                            />
                        </View>
                    }
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.getCategoriesReducer.categories,
        error: state.newTaskReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: (token) => dispatch(getCategories(token)),
        submitTask: (category_id, taskName, date_str, token, navigation) => dispatch(submitTask(category_id, taskName, date_str, token, navigation))
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps
)(NewTask)
