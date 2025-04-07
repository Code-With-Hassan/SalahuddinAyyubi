import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import FeaturedEpisode from "./components/FeaturedEpisode";
import EpisodeList from "./components/EpisodeList";
import { Episode, Season } from "./constants/series";
import { getAllSeries } from "./services/api";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState<Season[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSeriesData();
  }, []);

  const loadSeriesData = async () => {
    try {
      const data = await getAllSeries();
      setSeries(data.series);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    router.push({
      pathname: "/player",
      params: {
        videoUrl: episode.videoUrl,
        title: episode.title,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const latestEpisode = series[0]?.episodes[0];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {latestEpisode && (
          <FeaturedEpisode episode={latestEpisode} onPlay={handlePlayEpisode} />
        )}
        <View style={styles.episodeListContainer}>
          <EpisodeList seasons={series} onSelectEpisode={handlePlayEpisode} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
  },
  episodeListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
