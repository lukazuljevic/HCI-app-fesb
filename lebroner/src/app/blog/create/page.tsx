"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/use-mutations";
import styles from "./create.module.css";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("News");
  const router = useRouter();
  const { trigger: createPost, isMutating } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await createPost({ title, content, category, authorId: "", imageUrl: "" }); 
        
        router.push("/blog");
        router.refresh();
    } catch(err) {
        console.error(err);
        alert("Error creating post");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
            <label className={styles.label}>Title</label>
            <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                className={styles.input}
            />
        </div>
        <div>
            <label className={styles.label}>Category</label>
            <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className={styles.select}
            >
                {["News", "Game Recap", "Opinion", "Lifestyle"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
        <div>
            <label className={styles.label}>Content</label>
            <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                required 
                rows={10}
                className={styles.textarea}
            />
        </div>
        <button 
            type="submit" 
            disabled={isMutating}
            className={styles.button}
        >
            {isMutating ? "Creating..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
