import { Season, Episode } from "../constants/series";

const API_URL = "http:/salahuddinapi.hayaworld.org/api";

export async function getAllSeries(): Promise<{ series: Season[] }> {
  console.log("getAllSeries");
  const response = await fetch(`${API_URL}/series`);
  if (!response.ok) {
    throw new Error("Failed to fetch series data");
  }
  return response.json();
}

export async function getSeason(seasonId: string): Promise<Season> {
  console.log("getSeason", seasonId);
  const response = await fetch(`${API_URL}/series/${seasonId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch season data");
  }
  return response.json();
}

export async function getEpisode(
  seasonId: string,
  episodeId: string
): Promise<Episode> {
  console.log("getEpisode", seasonId, episodeId);
  const response = await fetch(
    `${API_URL}/series/${seasonId}/episodes/${episodeId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch episode data");
  }
  return response.json();
}
