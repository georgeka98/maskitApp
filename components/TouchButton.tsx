import { Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function AppButton({ onPress, title, btnStyle, textStyle }) {

  return(
  <TouchableOpacity
    onPress={onPress}
    style={btnStyle}
  >
    <Text style={textStyle}>
      {title}
    </Text>
  </TouchableOpacity>
  );
};