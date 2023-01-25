import React, { useState, useEffect, createRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { tabBarOn, tabBarOf } from "../../../redux/auth/authSlice";
import StyledTextInput from "../../../common/form/StyledTextInput";

const initialState = {
  titlePost: "",
  place: "",
  photo: "",
  location: "",
};

const CreatePostsScreen = () => {
  const [state, setState] = useState(initialState);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [typeSwitch, setTypeSwitch] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const ref_input2 = createRef();
  const ref_input3 = createRef();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
    setTypeSwitch(type);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        No access to camera
      </Text>
    );
  }
  const openCamera = () => {
    setCameraOpen(true);
    dispatch(tabBarOn());
  };

  const switchingStyled = () => {
    setIsShowKeyboard(true);
  };
  const switchToNextRef = (ref) => {
    ref.current.focus();
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
    <>
      {cameraOpen && (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name={
                    typeSwitch === "back"
                      ? "camera-flip"
                      : "camera-flip-outline"
                  }
                  size={35}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    setState((prevState) => ({
                      ...prevState,
                      photo: uri,
                    }));
                    console.log(state.photo);
                    dispatch(tabBarOf());
                    setCameraOpen(false);
                  }
                }}
              >
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
      {!cameraOpen && (
        <View style={styles.containerPhoto}>
          <View style={styles.boxPhoto}>
            <ImageBackground
              source={{ uri: state.photo ? state.photo : null }}
              style={styles.imagePhoto}
            >
              <TouchableOpacity
                style={{
                  ...styles.btnPhoto,
                  backgroundColor: state.photo
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#fff",
                }}
                onPress={() => {
                  openCamera();
                }}
              >
                <MaterialIcons
                  name="camera-alt"
                  size={20}
                  color={state.photo ? "#FFFFFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <StyledTextInput
            style={{ borderWidth: 0 }}
            placeholder={"Название..."}
            onFocus={() => switchingStyled()}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, titlePost: value }))
            }
            value={state.titlePost}
            onSubmitEditing={() => switchToNextRef(ref_input2)}
            blurOnSubmit={false}
          />
          <StyledTextInput
            style={{ borderWidth: 0 }}
            placeholder={"Местность..."}
            onFocus={() => switchingStyled()}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, location: value }))
            }
            value={state.location}
            onSubmitEditing={() => submitForm()}
            blurOnSubmit={false}
            ref={ref_input2}
          />
        </View>
      )}
    </>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPhoto: { flex: 1, alignItems: "center" },
  boxPhoto: {
    width: 344,
    height: 240,
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    // alignItems: "center",
  },
  imagePhoto: {
    // flex: 1,
    resizeMode: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPhoto: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform:
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    // marginTop: 32,
    // marginHorizontal: 16,
    // height: 240,
    // borderRadius: 8,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.2,
    alignSelf: "flex-end",
    marginRight: 5,
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
