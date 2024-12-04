import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchProductList} from '../redux/product/productSlice';
import {Product} from '../../type';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabStackParameterList} from 'navigation/BottomTabStack';
import {AppStackParameterList} from 'navigation/AppStack';
import {StackScreenProps} from '@react-navigation/stack';
import ProductItem from '@components/cards/ProductItem';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStackParameterList, 'Discover'>,
  StackScreenProps<AppStackParameterList>
>;

const ProductsScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const {products} = useSelector((state: RootState) => state.product);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  // fetch product list on component mount
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  /**
   * item renderer for product list
   * @param item
   */
  const renderItem = ({item}: {item: Product}) => (
    <ProductItem
      item={item}
      onPress={() => {
        navigation.navigate('ProductDetails', {
          product: item,
        });
      }}
    />
  );

  /**
   * item separator component
   * @returns {React.ReactNode}
   */
  const ItemSeparatorComponent = () => <View className="h-5 bg-transparent" />;

  /**
   * List footer component
   * @returns {React.ReactNode}
   */
  const ListFooterComponent = () => <View className="h-20 bg-transparent" />;

  const onPullRefresh = () => {
    setIsPullRefreshing(true);
    dispatch(fetchProductList());
    setIsPullRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-[#FFF] flex items-center">
      <Text className="mt-2 mb-4 text-2xl text-black self-center ">
        Discover our product here
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        numColumns={2}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl
            refreshing={isPullRefreshing}
            onRefresh={onPullRefresh}
          />
        }
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;
