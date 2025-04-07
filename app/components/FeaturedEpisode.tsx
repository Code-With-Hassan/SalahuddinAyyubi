import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Episode } from "../constants/series";

interface FeaturedEpisodeProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const { width } = Dimensions.get("window");

export default function FeaturedEpisode({
  episode,
  onPlay,
}: FeaturedEpisodeProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPlay(episode)}>
        <Image source={{ uri: episode.thumbnail }} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{episode.title}</Text>
          <Text style={styles.duration}>{episode.duration}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {episode.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
    backgroundColor: "#2c2c2c",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 24,
    marginLeft: 4,
  },
  info: {
    padding: 15,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  duration: {
    color: "#cccccc",
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    color: "#999999",
    fontSize: 14,
    lineHeight: 20,
  },
});
