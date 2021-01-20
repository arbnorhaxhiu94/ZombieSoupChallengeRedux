import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { plusStyle } from '../../globalStyles/plusStyle'

export class TaskListOption extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return this.props.plusPressed ? (
            <View style={{...plusStyle.options, zIndex: 3}}>
                <TouchableOpacity style={{zIndex: 3, flexDirection:'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('NewTaskScreen')}>
                    <Feather name="check-circle" color="#1e7fff" size={20} style={{flex: 1}} />
                    <Text style={{...plusStyle.optionsText, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{zIndex: 4, flexDirection: 'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('NewCategoryScreen')}>
                    <FontAwesome name="reorder" color="#1e7fff" size={20} style={{flex:1}} />
                    <Text style={{...plusStyle.optionsText, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>List</Text>
                </TouchableOpacity>
            </View>
        ) : (null)
    }
}