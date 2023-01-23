import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [typeSwitch, setTypeSwitch] = useState("");

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

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCameraRef}>
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={toggleCameraType}
          >
            <MaterialCommunityIcons
              name={
                typeSwitch === "back" ? "camera-flip" : "camera-flip-outline"
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
                // await Camera.createAssetAsync(uri);
                await console.log(uri);
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
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
