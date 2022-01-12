import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Project = new Schema(
  {
    description: { type: String, required: true, maxlength: 300 },
    interested_applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seeking: { type: Boolean, required: true },
    team_members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true, maxlength: 45 },
  },
  { timestamps: true }
);

export default mongoose.model("projects", Project);
