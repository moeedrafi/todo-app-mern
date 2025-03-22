import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, required: true, enum: ["High", "Medium", "Low"] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
