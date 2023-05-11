import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import StackHeader from '../components/headers/StackHeader';
import ROUTES from "../constants/NavigationRoutes"
import CurrencyConverter from '../screens/CurrencyConverter';
import ConversionResult from '../screens/ConversionResult';
import OfflineResult from '../screens/OfflineResult';
import PinnedSearchList from '../screens/PinnedSearchList';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      // initialRouteName={ROUTES.CurrencyConverter}
    >
      <Stack.Screen
        options={{
          header : () => <StackHeader label={"Home"} title={ROUTES.Home} />,
          presentation:'modal'
        }}
        name={ROUTES.Home}
        component={Home}
      />
      <Stack.Screen
        options={{
          header : () => <StackHeader label={"Convert Currency"} title={ROUTES.CurrencyConverter} />,
          presentation:'modal'

        }}
        name={ROUTES.CurrencyConverter}
        component={CurrencyConverter}
      />
      <Stack.Screen
        options={{
          header : () => <StackHeader label={"Conversion Result"} title={ROUTES.ConversionResult} />,
          presentation:'modal'

        }}
        name={ROUTES.ConversionResult}
        component={ConversionResult}
      />
      <Stack.Screen
        options={{
          header : () => <StackHeader label={"Offline Result"} title={ROUTES.OfflineResult} />,
          presentation:'modal'

        }}
        name={ROUTES.OfflineResult}
        component={OfflineResult}
      />
      <Stack.Screen
        options={{
          header : () => <StackHeader label={"Pinned Search"} title={ROUTES.PinnedSearch} />,
          presentation:'modal'

        }}
        name={ROUTES.PinnedSearch}
        component={PinnedSearchList}
      />
    </Stack.Navigator>
  );
}