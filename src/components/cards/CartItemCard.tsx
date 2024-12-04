import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {CartItemType} from '../../../type';
import QuentitySelector from '../inputs/QuentitySelector';
import VectorIcon from '../elements/VectorIcon/VectorIcon';
import {useDispatch} from 'react-redux';
import {removeItem} from '../../redux/cart/cartSlice';

interface CartItemCardProps {
  /**
   * Cart item to display
   */
  item: CartItemType;
  /**
   * On press event handler for info button
   * @returns 
   */
  onPressInfo: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({item, onPressInfo}) => {
  const dispatch = useDispatch();

  /**
   * On delete button press event handler
   */
  const onDeletePress = () => {
    Alert.alert('Delete Item...', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(removeItem(item));
        },
      },
    ]);
  };

  return (
    <View className="my-1 p-2 mx-2 flex flex-col items-start justify-start rounded-lg bg-[#e9e399] ">
      <View className="flex flex-row items-center justify-start">
        <Image
          source={{uri: item.mainImage}}
          className="flex w-20 h-20 mr-4 rounded-md border border-black"
        />
        <View className="flex flex-col flex-1">
          <Text className="text-black text-md" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="text-black text-md">Size: {item.size}</Text>
          <Text testID='cart-item-unit-price' className="text-black text-md">
            Unit Price: {item.price.amount} <Text>{item.price.currency}</Text>
          </Text>
        </View>
        <View className="flex flex-col w-10 h-full items-center gap-2">
          <TouchableOpacity
            onPress={onDeletePress}
            className="w-7 h-7 bg-quinary items-center justify-center rounded-md">
            <VectorIcon
              className="text-septenary"
              name="trash"
              type="Feather"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressInfo}
            className="w-7 h-7 bg-quinary items-center justify-center rounded-md">
            <VectorIcon
              className="text-white"
              name="info"
              type="Feather"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between w-full pt-2">
        <QuentitySelector item={item} />
        <Text className="text-black text-md">
          Subtotal:{' '}
          {(Number.parseFloat(item.price.amount) * item.quantity).toFixed(2)}{' '}
          <Text>{item.price.currency}</Text>
        </Text>
      </View>
    </View>
  );
};

export default CartItemCard;
