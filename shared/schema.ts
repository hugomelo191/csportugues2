import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Teams
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  ownerId: integer("owner_id").notNull().references(() => users.id),
  members: json("members").$type<number[]>().default([]),
  description: text("description"),
  region: text("region"),
  tier: text("tier"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type Team = typeof teams.$inferSelect;

// Matches
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  teamAId: integer("team_a_id").references(() => teams.id),
  teamBId: integer("team_b_id").references(() => teams.id),
  teamAScore: integer("team_a_score").default(0),
  teamBScore: integer("team_b_score").default(0),
  status: text("status").default("upcoming"), // "upcoming", "live", "completed"
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  map: text("map"),
  tournamentId: integer("tournament_id").references(() => tournaments.id),
  streamUrl: text("stream_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type Match = typeof matches.$inferSelect;

// Tournaments
export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  prize: text("prize"),
  status: text("status").default("upcoming"), // "upcoming", "active", "completed"
  format: text("format"),
  teams: json("teams").$type<number[]>().default([]),
  brackets: json("brackets").default({}),
  organizerId: integer("organizer_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type Tournament = typeof tournaments.$inferSelect;

// News
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  image: text("image"),
  authorId: integer("author_id").references(() => users.id),
  category: text("category").default("general"),
  tags: json("tags").$type<string[]>().default([]),
  publishedAt: timestamp("published_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type News = typeof news.$inferSelect;

// Streamers
export const streamers = pgTable("streamers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id").references(() => users.id),
  platform: text("platform"), // "twitch", "youtube", etc.
  channelUrl: text("channel_url"),
  description: text("description"),
  role: text("role"), // "streamer", "caster", "both"
  socialLinks: json("social_links").default({}),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Streamer = typeof streamers.$inferSelect;

// Players
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  username: text("username").notNull(),
  position: text("position"), // "AWPer", "Rifler", "IGL", etc.
  level: text("level"), // "Beginner", "Amateur", "Pro", etc.
  active: boolean("active").default(true),
  teamId: integer("team_id").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type Player = typeof players.$inferSelect;

// Player Profiles
export const playerProfiles = pgTable("player_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  position: text("position"),
  experience: text("experience"),
  availability: text("availability"),
  skills: json("skills").default([]),
  contact: text("contact"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type PlayerProfile = typeof playerProfiles.$inferSelect;

// User Profiles
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  socialLinks: json("social_links").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type UserProfile = typeof userProfiles.$inferSelect;
