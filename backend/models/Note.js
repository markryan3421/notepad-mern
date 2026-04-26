import mongoose from "mongoose";

// 1. Create a schema for note (migration)
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  },
);

// 2. Model for that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;