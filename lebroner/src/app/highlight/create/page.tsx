"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateHighlight } from "@/hooks/use-mutations";
import styles from "./create.module.css";

export default function CreateHighlightPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [team, setTeam] = useState("Lakers");
  const [year, setYear] = useState("2024");
  const router = useRouter();
  const { trigger: createHighlight, isMutating } = useCreateHighlight();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await createHighlight({ title, description, videoUrl, team, year });
        
        router.push("/highlight");
        router.refresh();
    } catch(err) {
        console.error(err);
        alert("Error creating highlight");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Highlight</h1>
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
            <div className={styles.row}>
                <div className={styles.col}>
                     <label className={styles.label}>Team</label>
                     <select 
                        value={team} 
                        onChange={e => setTeam(e.target.value)}
                        className={styles.select}
                     >
                        {["Lakers", "Cavaliers", "Heat", "USA"].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                     </select>
                </div>
                <div className={styles.col}>
                    <label className={styles.label}>Year</label>
                    <input 
                        value={year} 
                        onChange={e => setYear(e.target.value)} 
                        required 
                        placeholder="e.g. 2024"
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
        <div>
            <label className={styles.label}>Video URL</label>
            <input 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                required 
                placeholder="https://example.com/video.mp4"
                className={styles.input}
            />
        </div>
        <div>
            <label className={styles.label}>Description</label>
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                required 
                rows={5}
                className={styles.textarea}
            />
        </div>
        <button 
            type="submit" 
            disabled={isMutating}
            className={styles.button}
        >
            {isMutating ? "Creating..." : "Add Highlight"}
        </button>
      </form>
    </div>
  );
}
