import {Pressable, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {IBottomTabIconButtonProps} from '../elementTypes';
import VectorIcon from '../VectorIcon/VectorIcon';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedVectorIcon = Animated.createAnimatedComponent(VectorIcon);

const IconButton: React.FC<IBottomTabIconButtonProps> = ({
  icon,
  label,
  isFocused,
  options,
  onPress,
  onLongPress,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = isFocused
      ? withTiming(1.6, {duration: 400})
      : withTiming(1.4, {duration: 400});
  }, [isFocused, scale]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 flex-col items-center justify-start"
      style={[options.tabBarItemStyle]}>
      <AnimatedVectorIcon
        type={icon?.group || 'MaterialIcons'}
        name={icon?.name || 'rocket'}
        className={`text-[24px] text-black`}
        style={[options.tabBarIconStyle, animatedContainerStyle]}
      />
      {!isFocused && (
        <Animated.Text
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(300)}
          className={'text-[10px] mt-1 text-black'}
          style={[options.tabBarLabelStyle]}>
          {label as string}
        </Animated.Text>
      )}
      {!isFocused && (
        <Animated.View
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(300)}
          className={`absolute top-[-16px] w-full flex items-center justify-center ${
            !options.tabBarBadge && 'hidden'
          }`}>
          <View className="bg-septenary w-4 h-4 rounded-full  flex items-center justify-center ml-8">
            <Text className="text-white text-xs text-center">
              {options.tabBarBadge}
            </Text>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
};

export default IconButton;
