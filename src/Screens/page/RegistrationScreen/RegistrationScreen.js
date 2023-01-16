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
  Image,
  Dimensions,
} from "react-native";
import StyledTextInput from "../../common/form/StyledTextInput";

const initialState = {
  user: "",
  email: "",
  password: "",
};

const windowDimensions = Dimensions.get("window").width / 2 - 60;

function RegistrationScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const ref_input1 = createRef();
  const ref_input2 = createRef();
  const ref_input3 = createRef();

  const switchingStyled = () => {
    setIsShowKeyboard(true);
  };

  const qwerty = () => {
    ref_input2.current.focus();
  };
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
              <View style={s.userWrap}>
                <Image
                  style={s.imegeUser}
                  source={require("../../assets/imeges/mountain.jpg")}
                />
                <TouchableOpacity style={s.btnUser}>
                  <Image
                    style={s.btnUserImg}
                    source={require("../../assets/imeges/Plus.jpeg")}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={s.title}>Регистрация</Text>
                <View style={{ marginBottom: 16 }}>
                  <StyledTextInput
                    placeholder={"Логин"}
                    onFocus={() => switchingStyled()}
                    onChangeText={(value) =>
                      setState((prev) => ({ ...prev, user: value }))
                    }
                    value={state.user}
                    onSubmitEditing={() => qwerty()}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <StyledTextInput
                    placeholder={"Адрес электронной почты"}
                    onFocus={() => switchingStyled()}
                    onChangeText={(value) =>
                      setState((prev) => ({ ...prev, email: value }))
                    }
                    value={state.email}
                    // onSubmitEditing={ref_input3}
                    ref={ref_input2}
                    blurOnSubmit={false}
                  />
                </View>
                <StyledTextInput
                  placeholder={"Пароль"}
                  secureTextEntry={true}
                  onFocus={() => switchingStyled()}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  value={state.password}
                  onSubmitEditing={() => submitForm()}
                  ref={ref_input3}
                />
                <TouchableOpacity
                  style={{
                    ...s.btn,
                    marginTop: isShowKeyboard ? 30 : 44,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    submitForm();
                  }}
                >
                  <Text style={s.btnText}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <Text style={s.linkText}>Уже есть аккаунт? Войти</Text>
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
    flex: 0.675,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: "relative",
  },
  userWrap: {
    position: "absolute",
    top: -60,
    left: windowDimensions,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  imegeUser: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  btnUser: {
    position: "absolute",
    bottom: 10,
    right: -12.5,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF6C00",
  },
  btnUserImg: {
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  contentWrap: {},
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: Platform.OS === "ios" ? 92 : 54,
    marginBottom: 34,
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

export default RegistrationScreen;
