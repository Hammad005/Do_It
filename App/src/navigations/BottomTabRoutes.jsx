import HomeScreen from '../screens/Home/HomeScreen';
import Settings from "../screens/Settings/Settings"
import { BottomTabIcons } from '../utils/bottomTabIcons';

const BottomTabRoutes = [
    {
        name: 'Home',
        component: HomeScreen,
        icon: BottomTabIcons.HOME,
        activeIcon: BottomTabIcons.ACTIVE_HOME
    },
    {
        name: 'Todos',
        component: HomeScreen,
        icon: BottomTabIcons.TODOS,
        activeIcon: BottomTabIcons.ACTIVE_TODOS
        
    },
    {
        name: 'Calendar',
        component: HomeScreen,
        icon: BottomTabIcons.CALENDAR,
        activeIcon: BottomTabIcons.ACTIVE_CALENDAR
    },
    {
        name: 'Settings',
        component: Settings,
        icon: BottomTabIcons.SETTINGS,
        activeIcon: BottomTabIcons.SETTINGS
    }
]

export default BottomTabRoutes