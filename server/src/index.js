import express from "express";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/api/series", async (req, res) => {
  try {
    const dataPath = join(__dirname, "..", "data", "series.json");
    const rawData = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (error) {
    console.error("Error reading series data:", error);
    res.status(500).json({ error: "Failed to retrieve series data" });
  }
});

app.get("/api/series/:seasonId", async (req, res) => {
  try {
    const { seasonId } = req.params;
    const dataPath = join(__dirname, "..", "data", "series.json");
    const rawData = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(rawData);

    const season = data.series.find((s) => s.id === seasonId);
    if (!season) {
      return res.status(404).json({ error: "Season not found" });
    }

    res.json(season);
  } catch (error) {
    console.error("Error reading season data:", error);
    res.status(500).json({ error: "Failed to retrieve season data" });
  }
});

app.get("/api/series/:seasonId/episodes/:episodeId", async (req, res) => {
  try {
    const { seasonId, episodeId } = req.params;
    const dataPath = join(__dirname, "..", "data", "series.json");
    const rawData = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(rawData);

    const season = data.series.find((s) => s.id === seasonId);
    if (!season) {
      return res.status(404).json({ error: "Season not found" });
    }

    const episode = season.episodes.find((e) => e.id === episodeId);
    if (!episode) {
      return res.status(404).json({ error: "Episode not found" });
    }

    res.json(episode);
  } catch (error) {
    console.error("Error reading episode data:", error);
    res.status(500).json({ error: "Failed to retrieve episode data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
