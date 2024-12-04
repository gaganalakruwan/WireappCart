import React from 'react';
import {View, Text, ScrollView, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CartItemType} from '../../type';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../redux/cart/cartSlice';
import {RootState} from '../redux/store';
import { AppStackParameterList } from 'navigation/AppStack';
import SizeSelector from '@components/inputs/SizeSelector';
import QuentitySetter from '@components/inputs/QuentitySetter';
import FloatingButton from '@components/buttons/FloatingButton';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<
  AppStackParameterList,
  'ProductDetails'
>;

const ProductDetailsScreen: React.FC<Props> = ({route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState<string>(
    product.sizes[0] || 'unavailable',
  );
  const {items} = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = React.useState<number>(1);

  /**
   * Add to cart event handler
   */
  const addToCart = () => {
    const item: CartItemType = {
      id: product.id,
      SKU: product.SKU,
      name: product.name,
      brandName: product.brandName,
      mainImage: product.mainImage,
      price: product.price,
      size: selectedSize,
      colour: product.colour,
      quantity: quantity,
    };
    if (product.stockStatus === 'IN STOCK') {
      if (items.find(i => i.id === item.id && i.size === item.size)) {
        Alert.alert(
          'Item already in cart',
          'Do you want to increase the quantity of the item in the cart?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                dispatch(add(item));
              },
            },
          ],
        );
      } else {
        dispatch(add(item));
        Alert.alert('Item added to cart', 'Item added to cart successfully');
      }
    }
  };

  return (
    <SafeAreaView className='bg-[#FFF]'>
      <ScrollView className="h-full p-2" horizontal={false}>
        <Text className="text-2xl text-black font-semibold">{product.name}</Text>
        <Image
          source={{uri: product.mainImage}}
          resizeMode="contain"
          className="h-80"
        />
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
        <QuentitySetter
          quentity={quantity}
          setQuentity={setQuantity}
          stockStatus={product.stockStatus}
        />
        <Text className="text-lg mt-2 text-black">
          Brand: {product.brandName}
        </Text>
        <Text className="text-lg mt-2 text-black">
          Price: {product.price.amount} {product.price.currency}
        </Text>
        <Text className="text-lg mt-2 text-black">
          Stock Status:{' '}
          <Text
            className={`font-bold ${
              product.stockStatus === 'IN STOCK'
                ? 'text-quatanary'
                : 'text-senary'
            }`}>
            {product.stockStatus}
          </Text>
        </Text>
        <Text className="text-lg mt-2 text-black">
          Color: <Text className={`font-bold`}>{product.colour}</Text>
        </Text>
        <Text className="text-lg mt-2 text-black">SKU: {product.SKU}</Text>
        <Text className="text-lg mt-2 text-black">
          Description: {product.description}
        </Text>
        <View className="h-28" />
      </ScrollView>
      <FloatingButton
        hidden={product.stockStatus !== 'IN STOCK'}
        onPress={addToCart}
        icon={{group: 'MaterialCommunityIcons', name: 'cart-plus'}}
      />
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
