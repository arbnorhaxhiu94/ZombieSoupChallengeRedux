import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { formStyles } from '../../globalStyles/formStyles'

import { connect } from 'react-redux'
import { tryToLogin } from '../../redux/reducers/LoginReducer'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            email: '',
            email_error: '',
            password: '',
            password_error: '',
        }
    }


    handleChange = (input, field) => {
        if(field == 'email') {
            this.setState({
                email: input
            })
        } else if(field == 'password') {
            this.setState({
                password: input
            })
        }
    }

    render() {

        return (
            <View>
                <View style={formStyles.formContainer}>
                    <Text style={formStyles.inputLabel}>Email</Text>
                    <TextInput
                        style={formStyles.textinput}
                        onChangeText={(input) => this.handleChange(input, 'email')}
                        value={this.state.email}
                    />
                    {this.props.email_error.length > 0 ? 
                        <Text>{this.props.email_error}</Text>
                        :
                        null
                    }
                    <Text style={{...formStyles.inputLabel, marginTop: 15}}>Password</Text>
                    <TextInput 
                        secureTextEntry={true}
                        style={formStyles.textinput}
                        onChangeText={(input) => this.handleChange(input, 'password')}
                        value={this.state.password} 
                    />
                    {this.props.password_error.length > 0 ? 
                        <Text>{this.props.password_error}</Text>
                        :
                        null
                    }
                </View>
                <View style={formStyles.buttonsContainer}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.tryToLogin(this.state.email, this.state.password);
                            setTimeout(() => {
                                this.props.tryToAuthenticate();
                            }, 1000);
                        }}
                        style={{...formStyles.button, backgroundColor: '#61DEA4'}}>
                        <Text style={formStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.props.changeForm()}
                        style={{...formStyles.button, backgroundColor: '#006CFF'}}>
                        <Text style={formStyles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.loginReducer.user,
        email_error: state.loginReducer.email_error,
        password_error: state.loginReducer.password_error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryToLogin: (email, password) => dispatch(tryToLogin(email, password))
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps
)(LoginForm)