import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StatusBar} from 'react-native'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { plusStyle } from '../globalStyles/plusStyle';
import { titleStyle } from '../globalStyles/titleStyle';
import { CategoriesList } from './components/categoriesList';
import { TodayTasksList } from './components/todayTasksList';
import { CategoryDetails } from './myModals/categoryDetails';
import { getTodayData } from '../redux/reducers/TodayReducer';
import { TaskListOption } from './todayScreenComponents/TaskListOption';
import { connect } from 'react-redux';
import { PlusCircle } from './todayScreenComponents/PlusCircle';


class Today extends Component {
    constructor(props) {
        super(props)
        this.state={
            token: '',
            plusPressed: false,
            today_tasks: [],
            lists: [],
            showModal: false,
            categoryToOpen: null,
            taskSelected: false,
            dotsPressed: false
        }
    }

    dotsPressed = () => {
        this.setState({
            dotsPressed: this.state.dotsPressed ? false : true
        })
    }

    taskSelected = (pressed) => {
        this.setState({
            taskSelected: pressed ? true : false
        })
    }

    plusPressed = () => {
        this.setState({
            plusPressed: this.state.plusPressed ? false : true,
        })
    }

    showModal = (item) => {
        this.setState({
            showModal: true,
            categoryToOpen: item
        })    
    }

    hideModal = () => {
        this.setState({
            showModal: false,
        })
    }

    getToken = async() => {
        let token = await AsyncStorage.getItem('token')
        this.setState({
            token: token
        })
        
        setTimeout(() => {
            this.props.getTodayData(token)
        }, 200);

        let loop = 0
        let i = setInterval(() => {
            loop++
            if(this.props.today_tasks.length > 0 && this.props.lists.length > 0) {
                this.setState({
                    today_tasks: this.props.today_tasks,
                    lists: this.props.lists
                })
                clearInterval(i)
            } else {
                console.log('no data fetched')
            }
            if(loop == 10) {
                clearInterval(i)
            }
        }, 400)
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getToken()
        });
      
        this.getToken()
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    logout = async() => {
        console.log('logout is called')
        console.log(this.state.token)
        await axios.post(
            'https://tasker.zombiesoup.co/api/auth/logout', null, { 
            headers: { 
                'Authorization': 'Bearer '+this.state.token 
            }
        })
        .then(() => this.props.logout())
        .catch(error => {
            console.log(error)
        });
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
                <TouchableOpacity onPress={() => this.dotsPressed()} style={{zIndex: 5, position: 'absolute', width: 30, height: 30, top: 20, right: 10}}>
                    <MaterialCommunityIcons name="dots-horizontal" size={30} color="#1e7fff" />
                </TouchableOpacity>
                {this.state.dotsPressed ? 
                <TouchableOpacity onPress={() => this.logout()} style={plusStyle.logoutOption}>
                    <MaterialCommunityIcons name="logout" size={20} color="#1e7fff" />
                    <Text style={plusStyle.optionsText}>Logout</Text>
                </TouchableOpacity>
                : null}
                
                <PlusCircle 
                    taskSelected={this.state.taskSelected} 
                    plusPressed={this.state.plusPressed} 
                    plusPressed1={() => this.plusPressed()}  />
                <TaskListOption 
                    plusPressed={this.state.plusPressed} 
                    navigation={this.props.navigation} />
                
                <View style={titleStyle.container}>
                    <Text style={titleStyle.text}>Today</Text>
                </View>
                {this.state.today_tasks.length == 0 ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No tasks for today</Text>
                </View>
                :
                <TodayTasksList 
                    taskSelected={this.taskSelected}
                    getAllCategories={() => this.getToken()}
                    todayTasksList={this.state.today_tasks} 
                    categoriesList={this.state.lists} />
                }
                {this.state.lists.length == 0 ? 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>No category created</Text>
                    </View>
                :
                    <CategoriesList 
                        showModal={this.showModal} 
                        categoriesList={this.state.lists} />
                }
                {this.state.showModal ? 
                <CategoryDetails 
                    getAllCategories={this.getToken}
                    navigation={this.props.navigation}
                    token={this.state.token}
                    hideModal={this.hideModal}
                    showModal={this.state.showModal}
                    category={this.state.categoryToOpen} 
                    todayTasksList={this.state.today_tasks} 
                    categoriesList={this.state.lists} />
                : null}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        today_tasks: state.todayReducer.today_tasks,
        lists: state.todayReducer.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodayData: (token) => dispatch(getTodayData(token))
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps
)(Today)