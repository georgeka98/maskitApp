import { Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function JoinNavLink({ onPress, titleInfo, btnTitle, btnStyle, textStyle }) {

  return(
    <>
      <Text style={textStyle} >{titleInfo}</Text>
      <TouchableOpacity
        onPress={onPress}
      >
        <Text
          style={btnStyle}
        >
          {btnTitle}
        </Text>
      </TouchableOpacity>
    </>
  );
}