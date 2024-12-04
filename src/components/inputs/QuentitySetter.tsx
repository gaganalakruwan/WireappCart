import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface QuentitySetterProps {
  /**
   * Current quentity
   */
  quentity: number;
  /**
   * Quentity setter
   */
  setQuentity: (quentity: number) => void;
  /**
   * Stock status of the product
   */
  stockStatus: string;
}

const QuentitySetter: React.FC<QuentitySetterProps> = ({
  quentity,
  setQuentity,
  stockStatus,
}) => {
  /**
   * on plus button press event handler
   */
  const onPressPlus = () => {
    setQuentity(quentity + 1);
  };

  /**
   * on minus button press event handler
   */
  const onPressMinus = () => {
    if (quentity === 1) {
      return;
    }
    setQuentity(quentity - 1);
  };

  return (
    <View
      testID="quentity-setter"
      className="flex flex-row items-center justify-start">
      <Text className="text-lg mt-2 text-black">
        Quantity: {stockStatus !== 'IN STOCK' ? 'Unavalable' : ''}
      </Text>
      <View
        className={`flex flex-row items-center justify-center gap-2 ${
          stockStatus !== 'IN STOCK' && 'hidden'
        }`}>
        <TouchableOpacity
          className={`w-8 h-8 items-center justify-center rounded-sm ${'bg-[#2246e7]'}`}
          onPress={onPressMinus}>
          <Text className={`${'text-white text-lg'}`}>-</Text>
        </TouchableOpacity>
        <Text className="text-black text-lg">{quentity.toString()}</Text>
        <TouchableOpacity
          className={`w-8 h-8 items-center justify-center rounded-sm ${'bg-[#2246e7]'}`}
          onPress={onPressPlus}>
          <Text className={`${'text-white text-lg'}`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuentitySetter;
