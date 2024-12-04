import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import VectorIcon from '../elements/VectorIcon/VectorIcon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabStackParameterList} from '@navigation/BottomTabStack';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const HeaderRightButton: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<BottomTabStackParameterList>>();

  const onPress = () => {
    navigation.navigate('Cart');
  };

  const {items} = useSelector((state: RootState) => state.cart);

  return (
    <TouchableOpacity
      testID="header-right-button"
      onPress={onPress}
      className={`bg-gray w-7 h-7 flex items-center justify-center rounded-md mr-2 ${
        !items?.length && 'hidden'
      }`}>
      <VectorIcon
        className="text-white"
        name="cart"
        type="MaterialCommunityIcons"
        size={20}
      />
      <View
        className={`absolute top-[-8px] right-[-8px] bg-septenary w-4 h-4 rounded-full  flex items-center justify-center ml-8`}>
        <Text className="text-white text-xs text-center">
          {items?.length || '0'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
