import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'

import { plusStyle } from '../../globalStyles/plusStyle'

export class PlusCircle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return !this.props.taskSelected ? (
            this.props.plusPressed ? 
                <TouchableOpacity onPress={() => this.props.plusPressed1()} style={{...plusStyle.container, zIndex:2, transform: [{ rotate: '45deg'}], backgroundColor: '#1e7fff'}}>
                    <Text style={{...plusStyle.plus, color: '#f2f2f2'}}>+</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={() => this.props.plusPressed1()} style={{...plusStyle.container, zIndex:2, backgroundColor: '#f2f2f2'}}>
                    <Text style={{...plusStyle.plus, color: '#1e7fff'}}>+</Text>
                </TouchableOpacity>
        ) : (null)
    }
}