import express from "express";
import Answer from "../models/Answer.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const { studentName, studentEmail, examTitle, answers } = req.body;
    if (!studentName || !studentEmail || !examTitle || !answers)
      return res.status(400).json({ message: "All fields are required" });

    const newAnswer = new Answer({ studentName, studentEmail, examTitle, answers });
    await newAnswer.save();
    res.status(201).json({ message: "Answers submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const submissions = await Answer.find();
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
