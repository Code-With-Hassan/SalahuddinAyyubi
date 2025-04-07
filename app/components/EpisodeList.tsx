import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Episode, Season } from "../constants/series";

interface EpisodeListProps {
  seasons: Season[];
  onSelectEpisode: (episode: Episode) => void;
}

export default function EpisodeList({
  seasons,
  onSelectEpisode,
}: EpisodeListProps) {
  const [expandedSeason, setExpandedSeason] = useState<string | null>(
    seasons[0]?.id || null
  );
  useEffect(() => {
    console.log(expandedSeason);
  }, [expandedSeason]);

  const renderEpisode = ({ item }: { item: Episode }) => (
    <Pressable style={styles.episodeItem} onPress={() => onSelectEpisode(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.episodeThumbnail} />
      <View style={styles.episodeInfo}>
        <Text style={styles.episodeTitle}>
          Episode {item.episodeNumber}: {item.title}
        </Text>
        <Text style={styles.episodeDuration}>{item.duration}</Text>
      </View>
    </Pressable>
  );

  return (
    <FlashList
      data={seasons}
      estimatedItemSize={100}
      renderItem={({ item: season }) => {
        return (
          <View style={styles.seasonContainer}>
            <Pressable
              style={styles.seasonHeader}
              onPress={() => {
                setExpandedSeason(season.id);
              }}
            >
              <Text style={styles.seasonTitle}>
                Season {season.seasonNumber}
              </Text>
              <Text style={styles.expandIcon}>
                {expandedSeason === season.id ? "▼" : "▶"}
              </Text>
            </Pressable>
            {expandedSeason === season.id && (
              <FlashList
                data={season.episodes}
                renderItem={renderEpisode}
                estimatedItemSize={80}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  seasonContainer: {
    marginBottom: 16,
  },
  seasonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2c2c2c",
  },
  seasonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  expandIcon: {
    color: "#ffffff",
    fontSize: 16,
  },
  episodeItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    backgroundColor: "#1a1a1a",
  },
  episodeThumbnail: {
    width: 120,
    height: 68,
    backgroundColor: "#2c2c2c",
    borderRadius: 4,
  },
  episodeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  episodeTitle: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 4,
  },
  episodeDuration: {
    color: "#999999",
    fontSize: 14,
  },
});
