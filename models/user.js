import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    about: { type: String, required: true, maxlength: 300 },
    email: {
      type: String,
      required: true,
      unique: [true, "E-mail already exists."],
    },
    first_name: { type: String, required: true },
    interested_projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    last_name: { type: String, required: true },
    member_of_projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    password_digest: { type: String, required: true, select: false },
    portfolio: { type: String },
    rejected_projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    role: { type: String, enum: ["Engineer", "Designer"] },
  },
  { timestamps: true }
);

export default mongoose.model("users", User);
