import { pgTable, serial, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoryEnum = pgEnum("category", ["News", "Game Recap", "Opinion", "Lifestyle"]);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: categoryEnum("category").default("News").notNull(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const highlights = pgTable("highlights", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Highlight = typeof highlights.$inferSelect;
export type NewHighlight = typeof highlights.$inferInsert;
