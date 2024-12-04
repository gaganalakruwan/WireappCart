/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsIconMap} from '@components/elements/elementTypes';
import {AppStackParameterList} from './AppStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import BottomTabItem from '@components/elements/BottomTabsOne/BottomTabItem';
import ProductsScreen from '@screens/Products';
import CartScreen from '@screens/Cart';
import { StackScreenProps } from '@react-navigation/stack';

export type BottomTabStackParameterList = {
  Discover: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParameterList>();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

const iconList: BottomTabsIconMap = {
  Discover: {
    name: 'home',
    group: 'MaterialCommunityIcons',
  },
  Cart: {
    name: 'cart',
    group: 'MaterialCommunityIcons',
  },
};

const BottomTabStack: React.FC<
  StackScreenProps<AppStackParameterList, 'BottomTabs'>
> = () => {
  const {items} = useSelector((state: RootState) => state.cart);
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={props => <BottomTabItem icons={iconList} {...props} />}>
      <Tab.Screen name="Discover" component={ProductsScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: items.length,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
