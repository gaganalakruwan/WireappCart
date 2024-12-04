import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';

interface SizeSelectorProps {
  /**
   * Available sizes
   */
  sizes: string[];
  /**
   * Selected size
   */
  selectedSize: string;
  /**
   * Size selection event handler
   */
  onSelectSize: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <View className="flex flex-row items-center w-fit gap-2 my-2">
      <Text className="text-lg mt-2 text-black">Size: </Text>
      <FlatList
        data={sizes}
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <View className="w-3 bg-transparent" />}
        ListEmptyComponent={() => <Text className="text-lg">Unavailable</Text>}
        renderItem={({item}) => (
          <TouchableOpacity
            testID="size-option"
            className={`w-8 h-8 items-center justify-center rounded-sm ${
              selectedSize === item ? 'bg-[#2246e7]' : 'bg-secondary'
            }`}
            onPress={() => onSelectSize(item)}>
            <Text
              className={`${
                selectedSize === item ? 'text-white' : 'text-black'
              }`}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        contentContainerStyle={{marginTop: 2, marginBottom: 2}}
      />
    </View>
  );
};

export default SizeSelector;
