import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'

import { TextInput } from 'react-native-gesture-handler'
import { formStyles } from '../../globalStyles/formStyles'
import { newTCstyles } from '../../globalStyles/newTaskCategoryStyles'
import { CategoryCircle } from './categoryCircles'
import { HeaderWithButtons } from './headerWithButtons'
import { submitCategory } from '../../redux/reducers/NewCategoryReducer'
import { connect } from 'react-redux'

class NewCategory extends Component {
    constructor(props) {
        super(props)
        this.state={
            categoryName: '',
            color: '',
            token: '',
            disabledButton: true,
            success: false,
            borderStyle: []
        }
    }

    handleChange = (input) => {
        this.setState({
            categoryName: input,
            disabledButton: input.length > 0 ? false : true
        })
    }

    chooseColor = (color) => {
        this.setState({
            color: color
        })
    }

    getToken = async() => {
        let token = await AsyncStorage.getItem('token')
        setTimeout(() => {
            this.setState({
                token: token
            })
        }, 300)
    }

    componentDidMount() {
        this.getToken()
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', zIndex: 1}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <HeaderWithButtons
                    disabledButton={this.state.disabledButton}
                    navigation={this.props.navigation}
                    submitForm={() => 
                        this.props.submitCategory(this.state.categoryName, this.state.color, this.state.token, this.props.navigation)}
                />
                <View style={{...formStyles.formContainer, marginTop: 20}}>
                    <Text style={formStyles.inputLabel}>Category name</Text>
                    <TextInput 
                        style={formStyles.textinput}
                        onChangeText={(input) => this.handleChange(input)} />
                    <Text style={{...formStyles.inputLabel, marginTop: 20}}>Category name</Text>
                    <View style={{...newTCstyles.colorCirclesContainer}}>
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#252A31')}
                            color="#252A31"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#006CFF')}
                            color="#006CFF"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#B678FF')}
                            color="#B678FF"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#FFE761')}
                            color="#FFE761"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#F45E6D')}
                            color="#F45E6D"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#61DEA4')}
                            color="#61DEA4"
                            color1={this.state.color}
                        />
                        <CategoryCircle
                            chooseColor={() => this.chooseColor('#BCD2F3')}
                            color="#BCD2F3"
                            color1={this.state.color}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.newCategoryReducer.data,
        error: state.newCategoryReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitCategory: (category, color, token, navigation) => dispatch(submitCategory(category, color, token, navigation))
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps
)(NewCategory)