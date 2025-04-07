import React, { useEffect, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEvent } from "expo";

export default function PlayerScreen() {
  const { videoUrl, title } = useLocalSearchParams();
  const videoRef = useRef(null);
  const player = useVideoPlayer(
    "https://cdn10.urduflix.pk:8443/NiaziPlay/Salahuddin-Ayyubi/English/S2/Episode-50.mp4/tracks-v1a1/mono.ts.m3u8?token=54SIzlWiSIletcvqJot0IausLtogDuM6OciZSB9EH92U2_fdBbY7YNpSfGinC1fR",
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });
  console.log("Player is playing:", isPlaying, videoUrl);

  console.log("Player status:", status);
  console.log("Player error:", error);

  useEffect(() => {
    if (videoRef.current) {
      //   videoRef.current.playAsync();
    }
  }, []);

  const handleBackPress = () => {
    if (videoRef.current) {
      //   videoRef.current.stopAsync();
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <View style={styles.backIcon}>
          <Text style={styles.backIconText}>←</Text>
        </View>
      </Pressable>
      <VideoView
        style={styles.video}
        player={player}
        //size={ResizeMode.CONTAIN}
        allowsFullscreen
        allowsPictureInPicture
      />
      {/* <Video
        ref={videoRef}
        source={{ uri: videoUrl as string }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
      /> */}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,

    width,
    height: width * (9 / 16), // 16:9 aspect ratio
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIconText: {
    color: "#ffffff",
    fontSize: 24,
  },
});
