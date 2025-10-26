// routes/answerRoutes.js
import express from "express";
import Answer from "../models/Answer.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { studentName, studentEmail, examTitle, answers } = req.body;

    if (!studentName || !studentEmail || !examTitle || !answers) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate submissions
    const existing = await Answer.findOne({ studentEmail, examTitle });
    if (existing) {
      return res.status(400).json({
        message: "You have already submitted this exam.",
        redirectUrl: "https://studentspher.onrender.com",
      });
    }

    // Save answers
    const newAnswer = new Answer({ studentName, studentEmail, examTitle, answers });
    await newAnswer.save();

    // ✅ Send redirect URL
    res.status(201).json({
      message: "Answers submitted successfully!",
      redirectUrl: "https://studentspher.onrender.com",
    });
  } catch (err) {
    console.error("❌ Error submitting answers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
