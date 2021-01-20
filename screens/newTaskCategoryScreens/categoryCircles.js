import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import { newTCstyles } from '../../globalStyles/newTaskCategoryStyles'

export class CategoryCircle extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity 
                onPress={() => this.props.chooseColor()} 
                style={{
                    ...newTCstyles.colorCircles, 
                    backgroundColor: this.props.color,
                    borderWidth: this.props.color1 == this.props.color ? 2 : 0,
                    borderColor: '#fff'
                    }}>
            </TouchableOpacity>
        )
    }
}