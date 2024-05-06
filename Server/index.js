const express = require("express");
const youtubedl = require("youtube-dl-exec");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Modified endpoint to accept query parameters
app.get("/download", async (req, res) => {
  const { url, format } = req.query; // Extract query parameters
  try {
    let options = {};
    // Check if the requested format is mp3 or mp4
    if (format === "mp3") {
      options = {
        noWarnings: true,
        noCallHome: true,
        extractAudio: true,
        audioFormat: "mp3",
        output: "%(title)s.%(ext)s",
        url: url,
        format: "bestaudio/best",
        dumpJson: true,
      };
    } else if (format === "mp4") {
      options = {
        noWarnings: true,
        noCallHome: true,
        output: "%(title)s.%(ext)s",
        url: url,
        format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        dumpJson: true,
      };
    } else {
      return res.status(400).json({ success: false, error: "Invalid format" });
    }

    const info = await youtubedl(options);
    res.json({ success: true, info });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server Works !!! At port ${port}`);
});
