
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const screens = {
    Login:{
        screen:Login,
        navigationOptions: { headerShown: false }
    }, 
    Signup:{
        screen:Signup,
        navigationOptions: { headerShown: false }
    },
    Home:{
        screen:Home,
        navigationOptions: { headerShown: false }
    },
}
const Routes= createStackNavigator(screens);

export default createAppContainer(Routes)
