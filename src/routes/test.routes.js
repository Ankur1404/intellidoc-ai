const express = require("express");
const router = express.Router();
const { generateEmbedding } = require("../services/embedding.service");

router.post("/embed", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const embedding = await generateEmbedding(text);

    res.json({
      message: "Embedding generated successfully",
      length: embedding.length,
      sample: embedding.slice(0, 5) // show first 5 numbers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;