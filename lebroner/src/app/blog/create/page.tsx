"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/use-mutations";
import styles from "./create.module.css";

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "News"
  });
  const router = useRouter();
  const { trigger: createPost, isMutating } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await createPost({ 
            title: formData.title, 
            content: formData.content, 
            category: formData.category, 
            authorId: "", 
            imageUrl: formData.imageUrl 
        }); 
        
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
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                required 
                className={styles.input}
            />
        </div>
        <div>
            <label className={styles.label}>Image URL (Optional)</label>
            <input 
                value={formData.imageUrl} 
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} 
                className={styles.input}
                placeholder="https://example.com/image.jpg"
            />
        </div>
        <div>
            <label className={styles.label}>Category</label>
            <select 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                required
                minLength={30}
                rows={10}
                className={styles.textarea}
                placeholder="Minimum 30 characters"
            />
            {formData.content.length > 0 && formData.content.length < 30 && (
              <span className={styles.charCount}>
                {30 - formData.content.length} more characters needed
              </span>
            )}
        </div>
        <button
            type="submit"
            disabled={isMutating || formData.content.length < 30}
            className={styles.button}
        >
            {isMutating ? "Creating..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
