import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginFaceNetScreen from '../screens/LoginFaceNetScreen';
import LoginLBPScreen from '../screens/LoginLBPScreen';


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="LoginFaceNet" component={LoginFaceNetScreen} />
                <Stack.Screen name="LoginLBP" component={LoginLBPScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;