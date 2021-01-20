import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { newTCstyles } from '../../globalStyles/newTaskCategoryStyles'

export class HeaderWithButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={newTCstyles.buttonsContainer}>
                <View style={{flex:1, alignItems: 'flex-start', paddingHorizontal: 10}}>
                    <TouchableOpacity
                        style={newTCstyles.buttons}
                        onPress={() => this.props.navigation.navigate('TodayScreen')} >
                        <Text style={newTCstyles.buttonsText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, alignItems:'flex-end', paddingHorizontal: 10}}>
                    <TouchableOpacity 
                        disabled={this.props.disabledButton} 
                        onPress={() => this.props.submitForm()}
                        style={newTCstyles.buttons}>
                        <Text style={{...newTCstyles.buttonsText, fontWeight: 'bold'}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}