import { z } from "zod";

export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  usn: z.string().optional(),
});

export const RegistrationSchema = z.object({
  teamName: z.string().min(1, "Team Name is required"),
  leadName: z.string().min(1, "Lead Name is required"),
  leadEmail: z.string().email("Invalid email address"),
  leadPhone: z.string().min(10, "Phone number is too short"),
  leadUSN: z.string().min(1, "Lead USN is required"),
  teamMembers: z.array(TeamMemberSchema).min(1, "At least one team member is required"),
});

export type RegistrationFormValues = z.infer<typeof RegistrationSchema>;
