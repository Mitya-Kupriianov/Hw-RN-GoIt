import React, { useState } from "react";

import { StyleSheet, TextInput } from "react-native";

const StyledTextInput = React.forwardRef(
  (
    {
      placeholder,
      value,
      onSubmitEditing,
      onFocus,
      onChangeText,
      secureTextEntry,
      blurOnSubmit,
    },
    ref,
    refNew,
  ) => {
    const [inputBackgroundColor, setInputBackgroundColor] = useState(false);

    console.log(ref);
    const switchingStyled = () => {
      onFocus();
      setInputBackgroundColor(true);
    };
    return (
      <TextInput
        style={{
          ...s.input,
          backgroundColor: inputBackgroundColor ? "#fff" : "#F6F6F6",
          borderColor: inputBackgroundColor ? "#FF6C00" : "#E8E8E8",
        }}
        placeholder={placeholder}
        selectionColor="#FF6C00"
        onFocus={() => switchingStyled()}
        onBlur={() => setInputBackgroundColor(false)}
        onChangeText={onChangeText}
        value={value}
        // onSubmitEditing={() => onSubmitEditing.focus()}
        blurOnSubmit={blurOnSubmit}
        ref={ref}
        secureTextEntry={secureTextEntry}
      />
    );
  },
);

export default StyledTextInput;

const s = StyleSheet.create({
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginHorizontal: 16,
    padding: 15,
  },
});
