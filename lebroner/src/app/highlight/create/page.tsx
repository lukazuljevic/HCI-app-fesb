"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateHighlightPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await fetch("/api/highlights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, videoUrl })
        });
        
        if (res.ok) {
            router.push("/highlight");
            router.refresh();
        } else {
            alert("Failed to create highlight. Are you admin?");
        }
    } catch(err) {
        console.error(err);
        alert("Error creating highlight");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", paddingTop: "100px", minHeight: "100vh", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem", color: "#FDB927" }}>Add New Highlight</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Title</label>
            <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "white" }}
            />
        </div>
        <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Video URL</label>
            <input 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                required 
                placeholder="https://..."
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "white" }}
            />
        </div>
        <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Description</label>
            <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                required 
                rows={5}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "white" }}
            />
        </div>
        <button 
            type="submit" 
            disabled={loading}
            style={{ 
                padding: "1rem", 
                background: "#FDB927", 
                color: "black", 
                border: "none", 
                fontWeight: "bold", 
                cursor: loading ? "not-allowed" : "pointer",
                borderRadius: "4px"
            }}
        >
            {loading ? "Creating..." : "Add Highlight"}
        </button>
      </form>
    </div>
  );
}
