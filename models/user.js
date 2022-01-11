import mongoose from "mongoose"
const Schema = mongoose.Schema

const User = new Schema(
  {
    about: {type: String, required: true, maxlength: 300},
    email: {type: String, required: true, unique: [true, "E-mail already exists."]},
    password_digest: {type: String, required: true, select: false},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    role: {type: String, enum: ["Engineer", "Designer"]},
    portfolio: {type: String},
    interested_projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
    rejected_projects: [{type: Schema.Types.ObjectId, ref: "Project"}],
    member_of_projects: [{type: Schema.Types.ObjectId, ref: "Project"}]

  },
  { timestamps: true }
)

export default mongoose.model('users', User)