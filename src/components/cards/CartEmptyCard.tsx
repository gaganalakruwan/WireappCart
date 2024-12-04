import {View, Text} from 'react-native';
import React from 'react';

const CartEmptyCard: React.FC = () => {
  return (
    <View
      testID="cart-empty-card"
      className=" h-[200px] mx-5 px-5 flex items-center justify-center bg-secondary rounded-2xl shadow-md">
      <Text className="text-black text-2xl text-center">
        Your cart is empty, add some items to get started!
      </Text>
    </View>
  );
};

export default CartEmptyCard;
