import { z } from "zod/v4";
import { DisciplineType, UserRole } from "./constants";

export const DogSchema = z.object({
  dogName: z.string(),
  dogId: z.string().optional(),
  ownerFirstName: z.string(),
  ownerLastName: z.string(),
  gender: z.string(),
  weight: z.number(),
  ageInMonths: z.number()
});

export const ShowSchema = z.object({
  hostId: z.string(),
  address: z.string(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime()
});

export const MarkSchema = z.object({
  mark: z.number(),
  attempts: z.number(),
  success: z.boolean()
});

export const DisciplineSchema = z.object({
  disciplineId: z.string(),
  disciplineType: z.enum(DisciplineType),
  dogId: z.string(),
  showId: z.string(),
  duration: z.number(),
  marks: z.array(MarkSchema)
});

export const PaginationSchema = z.object({
  limit: z.number(),
  offset: z.number(),
  createdAt: z.iso.datetime().optional()
});

export const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(UserRole),
  userId: z.string().optional(),
  password: z.string(),
  email: z.email()
});

export const DogRegistrationSchema = z.object({
  dogId: z.string(),
  showId: z.string(),
  registerUnregister: z.boolean()
});
