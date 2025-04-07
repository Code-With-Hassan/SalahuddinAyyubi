export interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  episodeNumber: number;
  description: string;
  videoUrl: string;
}

export interface Season {
  id: string;
  seasonNumber: number;
  episodes: Episode[];
}

export const seriesData: Season[] = [
  {
    id: "s1",
    seasonNumber: 1,
    episodes: [
      {
        id: "e1",
        title: "The Beginning of a Legend",
        thumbnail: "https://placeholder.com/episode1.jpg",
        duration: "45:00",
        episodeNumber: 1,
        description:
          "The early life of Salahuddin Ayyubi and his initial steps into leadership.",
        videoUrl: "https://example.com/episode1.mp4",
      },
      {
        id: "e2",
        title: "Rise to Power",
        thumbnail: "https://placeholder.com/episode2.jpg",
        duration: "42:00",
        episodeNumber: 2,
        description:
          "Salahuddin becomes the vizier of Egypt and begins his journey to unite the Muslim world.",
        videoUrl: "https://example.com/episode2.mp4",
      },
    ],
  },
  {
    id: "s2",
    seasonNumber: 2,
    episodes: [
      {
        id: "e3",
        title: "The Battle Begins",
        thumbnail: "https://placeholder.com/episode3.jpg",
        duration: "44:00",
        episodeNumber: 1,
        description:
          "Salahuddin prepares for the decisive battle against the Crusaders.",
        videoUrl: "https://example.com/episode3.mp4",
      },
    ],
  },
];
