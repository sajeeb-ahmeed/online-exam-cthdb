import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  examTitle: { type: String, required: true },
  answers: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Answer", answerSchema);
