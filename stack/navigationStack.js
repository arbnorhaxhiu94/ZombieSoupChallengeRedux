import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Today from '../screens/today';
import NewCategory from '../screens/newTaskCategoryScreens/newCategoryScreen';
import NewTask from '../screens/newTaskCategoryScreens/newTaskScreen';

const Stack = createStackNavigator();

export function ZombieStack({logout}) {

    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator
                headerMode="screen"
                screenOptions={({navigation}) => ({
                    // headerTitle: () => <Header color='#2d3f89' navigation={navigation} language="Anglisht" />,
                    // headerStyle: {
                    //     height: 65
                    // }
                })}>
                    <Stack.Screen 
                        name="TodayScreen" 
                        options={{headerShown: false}}>
                        {props => <Today {...props} logout={logout} />}
                    </Stack.Screen>
                    <Stack.Screen 
                        name="NewTaskScreen" 
                        options={{headerShown: false}}>
                        {props => <NewTask {...props} />}
                    </Stack.Screen>
                    <Stack.Screen 
                        name="NewCategoryScreen" 
                        options={{headerShown: false}}>
                        {props => <NewCategory {...props} />}
                    </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
        );
  
}
