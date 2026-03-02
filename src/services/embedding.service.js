const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-embedding-001",
    });

    const result = await model.embedContent({
      content: { parts: [{ text }] },
      outputDimensionality: 768
    });

    return result.embedding.values;
  } catch (error) {
    console.error("Embedding error:", error);
    throw error;
  }
}

module.exports = { generateEmbedding };