import HomeScreen from '../screens/Home/HomeScreen';
import TodoStackNavigation from './TodoStackNavigation';
import CalendarMainScreen from '../screens/Calendar/CalendarMainScreen'
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
        component: TodoStackNavigation,
        icon: BottomTabIcons.TODOS,
        activeIcon: BottomTabIcons.ACTIVE_TODOS
        
    },
    {
        name: 'Calendar',
        component: CalendarMainScreen,
        icon: BottomTabIcons.CALENDAR,
        activeIcon: BottomTabIcons.ACTIVE_CALENDAR
    },
]

export default BottomTabRoutes