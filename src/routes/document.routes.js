const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { chunkText } = require("../utils/chunkText");
const { generateEmbedding } = require("../services/embedding.service");
const Document = require("../models/document.model");

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk);

      await Document.create({
        text: chunk,
        embedding,
        source: req.file.originalname,
      });
    }

    res.json({
      message: "Document processed successfully",
      totalChunks: chunks.length,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;