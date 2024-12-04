import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProductDetailsScreen from '@screens/ProductDetails';
import BottomTabStack from './BottomTabStack';
import {Product} from '../../type';
import HeaderRightButton from '@components/buttons/HeaderRightButton';
import { createStackNavigator } from '@react-navigation/stack';

export type AppStackParameterList = {
  BottomTabs: undefined;
  ProductDetails: {product: Product};
};

const Stack = createStackNavigator<AppStackParameterList>();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="BottomTabs" component={BottomTabStack} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'card'}}>
          <Stack.Screen
            options={{
              headerTitle: 'Product Details',
              headerRight: () => <HeaderRightButton />,
            }}
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
