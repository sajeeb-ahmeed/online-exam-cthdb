// src/controllers/answerController.js
import Answer from "../models/Answer.js";

export const submitAnswers = async (req, res) => {
  try {
    const { studentName, studentEmail, examTitle, answers } = req.body;

    if (!studentName || !studentEmail || !examTitle || !answers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAnswer = new Answer({
      studentName,
      studentEmail,
      examTitle,
      answers,
    });

    await newAnswer.save();

    res.json({ message: "Answers submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving answers:", error);
    res.status(500).json({ message: "Server error while saving answers" });
  }
};
