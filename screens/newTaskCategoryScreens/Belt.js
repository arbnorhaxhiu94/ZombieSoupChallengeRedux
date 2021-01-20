import React, {Component} from 'react'
import {View, Text, Keyboard, TouchableOpacity} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { newTCstyles } from '../../globalStyles/newTaskCategoryStyles';


export class Belt extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={newTCstyles.inputsBelt}>
                <View style={{...newTCstyles.beltElements}}>
                    <TouchableOpacity onPress={() => {Keyboard.dismiss(); this.props.showDateTimePicker('date');}} style={{marginRight: 15}}>
                        <FontAwesome name="calendar-o" size={25} color={this.props.mode == 'date' ? '#0f87ff' : '#aaa'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {Keyboard.dismiss(); this.props.showDateTimePicker('time')}}>
                        <MaterialCommunityIcons name="clock-outline" size={25} color={this.props.mode == 'time' ? '#0f87ff' : '#aaa'} />
                    </TouchableOpacity>
                </View>
                <View style={{...newTCstyles.beltElements}}>
                    {this.props.category_id == null ? 
                    <TouchableOpacity onPress={() => {Keyboard.dismiss(); this.props.hideKeyboard();}} style={{...newTCstyles.beltElements, justifyContent: 'flex-end'}}>
                        <Text style={{marginHorizontal: 10, color: '#aaa', fontSize: 14}}>Select a category</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {Keyboard.dismiss(); this.props.hideKeyboard();}} style={{...newTCstyles.beltElements, justifyContent: 'flex-end'}}>
                        <Text style={{marginHorizontal: 10, color: '#aaa', fontSize: 14}}>{this.props.categoryName}</Text>
                        <View style={{width: 16, height: 16, borderRadius: 8, backgroundColor: this.props.categoryColor}}></View>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}