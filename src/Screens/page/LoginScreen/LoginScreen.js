import React, { useState, createRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const ref_input2 = createRef();
  const ref_input3 = createRef();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const submitForm = () => {
    keyboardHide();
    setState(initialState);
    console.log(state);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={s.container}
    >
      <View style={s.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            keyboardHide();
          }}
        >
          <ImageBackground
            style={s.image}
            source={require("../../assets/imeges/PhotoBG.jpeg")}
          >
            <View style={s.wrap}>
              <View>
                <Text style={s.title}>Войти</Text>

                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={s.input}
                    placeholder="Адрес электронной почты"
                    selectionColor="#FF6C00"
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prev) => ({ ...prev, email: value }))
                    }
                    onSubmitEditing={() => ref_input3.current.focus()}
                    value={state.email}
                  />
                </View>

                <TextInput
                  style={s.input}
                  placeholder="Пароль"
                  selectionColor="#FF6C00"
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  value={state.password}
                  ref={ref_input3}
                  onSubmitEditing={() => submitForm()}
                />
                <TouchableOpacity
                  style={{
                    ...s.btn,
                    marginTop: isShowKeyboard ? 24 : 44,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    submitForm();
                  }}
                >
                  <Text style={s.btnText}>Войти</Text>
                </TouchableOpacity>

                <Text style={s.linkText}>Нет аккаунта? Зарегистрироваться</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrap: {
    flex: 0.6,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  contentWrap: {},
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginVertical: 32,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginHorizontal: 16,
    padding: 15,
  },
  inputWrap: {
    // marginBottom: 50,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    padding: 15,
    borderRadius: 100,
    height: 50,
    marginHorizontal: 16,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  },
});

export default LoginScreen;
