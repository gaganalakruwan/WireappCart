import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CartItemType} from '../../../type';
import {useDispatch} from 'react-redux';
import {minus, plus} from '../../redux/cart/cartSlice';

interface QuentitySelectorProps {
  /**
   * Cart item to set quentity
   */
  item: CartItemType;
}

const QuentitySelector: React.FC<QuentitySelectorProps> = ({item}) => {
  const dispatch = useDispatch();

  /**
   * on plus button press event handler
   * @param item
   */
  const onPressPlus = (item: CartItemType) => {
    dispatch(plus(item));
  };

  /**
   * on minus button press event handler
   * @param item
   */
  const onPressMinus = (item: CartItemType) => {
    dispatch(minus(item));
  };

  return (
    <View className="flex flex-row items-center justify-center">
      <Text className="text-black text-md">Quantity: </Text>
      <View className="flex flex-row items-center justify-center gap-2">
        <TouchableOpacity
          className={`w-5 h-5 items-center justify-center rounded-sm ${'bg-[#2246e7]'}`}
          onPress={() => onPressMinus(item)}>
          <Text className={`${'text-white'}`}>-</Text>
        </TouchableOpacity>
        <Text className="text-black text-md">{item.quantity}</Text>
        <TouchableOpacity
          className={`w-5 h-5 items-center justify-center rounded-sm ${'bg-[#2246e7]'}`}
          onPress={() => onPressPlus(item)}>
          <Text className={`${'text-white'}`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuentitySelector;
