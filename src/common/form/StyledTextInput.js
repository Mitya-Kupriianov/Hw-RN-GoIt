import React, { useState } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const StyledTextInput = React.forwardRef(
  (
    {
      placeholder,
      value,
      onSubmitEditing,
      onFocus,
      onChangeText,
      blurOnSubmit,
      password,
      location,
    },
    ref,
  ) => {
    const [inputBackgroundColor, setInputBackgroundColor] = useState(false);
    const [isPassword, setIsPassword] = useState(true);

    const switchPassword = () => {
      setIsPassword(!isPassword);
    };
    const switchingStyled = () => {
      onFocus();
      setInputBackgroundColor(true);
    };
    return (
      <View
        style={{
          ...s.box,
          backgroundColor: inputBackgroundColor ? "#fff" : "#F6F6F6",
          borderColor: inputBackgroundColor ? "#FF6C00" : "#E8E8E8",
        }}
      >
        <View style={s.boxImput}>
          {location && <EvilIcons name="location" size={24} color="#BDBDBD" />}
          <TextInput
            style={{
              ...s.input,
              width: password ? "80%" : "100%",
              // width: location ? "93%" : "100%",
            }}
            placeholder={placeholder}
            selectionColor="#FF6C00"
            onFocus={() => switchingStyled()}
            onBlur={() => setInputBackgroundColor(false)}
            onChangeText={onChangeText}
            value={value}
            onSubmitEditing={() => onSubmitEditing()}
            blurOnSubmit={blurOnSubmit}
            ref={ref}
            secureTextEntry={password ? isPassword : false}
          />
          {password && (
            <Ionicons
              name={isPassword ? "ios-eye-outline" : "ios-eye-off-outline"}
              size={24}
              color="black"
              onPress={() => switchPassword()}
            />
          )}
        </View>
      </View>
    );
  },
);

StyledTextInput.displayName = "StyledTextInput";

export default StyledTextInput;

const s = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 50,
    justifyContent: "center",
  },
  boxImput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: "100%",
    paddingLeft: 5,
    paddingVertical: 15,
  },
});
