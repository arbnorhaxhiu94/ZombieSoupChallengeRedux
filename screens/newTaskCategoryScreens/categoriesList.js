import React, {Component} from 'react'
import { Text, View, TouchableOpacity, FlatList} from 'react-native'
import { categoriesStyles } from '../../globalStyles/categoriesStyles'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export class CategoriesListForTask extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.handleChange('category', this.props.item)}
                key={this.props.item.id} 
                style={{...categoriesStyles.categoryElement, paddingHorizontal: 10, backgroundColor: this.props.item.color}}>
                <View style={{flex:5}}>
                    <Text style={{...categoriesStyles.categoryTitle, color: this.props.item.textColor}}>{this.props.item.name}</Text>
                    {this.props.item.task_count == 1 ?
                    <Text style={{...categoriesStyles.categoryTaskCount, color: this.props.item.textColor}}>{this.props.item.task_count} task</Text>
                    :
                    <Text style={{...categoriesStyles.categoryTaskCount, color: this.props.item.textColor}}>{this.props.item.task_count} tasks</Text>
                    }
                </View>
                {this.props.item.selected ? 
                <View style={{flex:1, justifyContent: 'center'}}>
                    <View style={categoriesStyles.checkedCircle}>
                        <MaterialCommunityIcons name="check" color="#0f87ff" size={20} />
                    </View>
                </View>
                : null
                }
            </TouchableOpacity>
        )
    }
}