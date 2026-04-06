import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: false },
});

const RegistrationSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    leadName: { type: String, required: true },
    leadEmail: { type: String, required: true },
    leadPhone: { type: String, required: true },
    leadUSN: { type: String, required: true },
    teamMembers: { type: [TeamMemberSchema], required: true },
  },
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);
