import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabStackParameterList} from '@navigation/BottomTabStack';
import {AppStackParameterList} from '@navigation/AppStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import { CartItemType } from '../../type';
import CartEmptyCard from '@components/cards/CartEmptyCard';
import CartItemCard from '@components/cards/CartItemCard';
import { StackScreenProps } from '@react-navigation/stack';
import ActionButton from '@components/buttons/ActionButton';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParameterList, 'Cart'>,
  StackScreenProps<AppStackParameterList>
>;

const CartScreen: React.FC<Props> = ({navigation}) => {
  const {items} = useSelector((state: RootState) => state.cart);
  const {products} = useSelector((state: RootState) => state.product);

  /**
   * On press event handler for info button
   * @param id 
   */
  const onPressInfo = (id: string) => {
    const product = products.find(product => product.id === id);
    if (product) {
      navigation.navigate('ProductDetails', {
        product,
      });
    } else {
      Alert.alert('Product not found', 'The product is not available');
    }
  };

  /**
   * Get total amount of the cart items
   * @param cartItems 
   * @returns {{amount: number, currency: string}}
   */
  const getTotalAmount = (cartItems: CartItemType[]) => {
    let total = 0;
    let currency = '';
    cartItems.forEach(item => {
      total += Number.parseFloat(item.price.amount) * item.quantity;
      currency = item.price.currency;
    });
    return {amount: total, currency};
  };

  const memoizedTotalPrice = useMemo(() => getTotalAmount(items), [items]);

  return (
    <SafeAreaView className="pb-[56px] bg-[#FFFFFF]">
      <Text className="ml-6 mt-2 mb-4 text-2xl text-black">Cart Items</Text>
      <FlatList
        data={items}
        className="w-full h-[90%]"
        keyExtractor={item => item.id + item.size}
        ListEmptyComponent={<CartEmptyCard />}
        renderItem={({item}) => (
          <CartItemCard
            item={item}
            onPressInfo={() => {
              onPressInfo(item.id);
            }}
          />
        )}
      />
      <View className="w-full h-[10%] bg-tertiary flex flex-row items-center justify-around">
        <Text className="text-black text-base">
          Total Price: {memoizedTotalPrice.amount.toFixed(2)}{' '}
          {memoizedTotalPrice.currency}
        </Text>
        <ActionButton label="Checkout" />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
