import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React from 'react';
import useOrientation from '../../hooks/useOrientation';

interface ActionButtonProps extends TouchableOpacityProps {
  /**
   * Button label
   */
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  className,
  ...restProps
}) => {
  const orientation = useOrientation();
  return (
    <TouchableOpacity
      className={`w-fit bg-quinary rounded-xl flex items-center justify-center px-5 ${className} ${
        orientation === 'landscape' ? 'h-fit' : 'h-10'
      }`}
      {...restProps}>
      <Text className="text-white text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
