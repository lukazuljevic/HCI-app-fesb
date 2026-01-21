"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateHighlight } from "@/hooks/use-mutations";

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
            <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                     <label style={{ display: "block", marginBottom: "0.5rem" }}>Team</label>
                     <select 
                        value={team} 
                        onChange={e => setTeam(e.target.value)}
                        style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "white" }}
                     >
                        {["Lakers", "Cavaliers", "Heat", "USA"].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                     </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Year</label>
                    <input 
                        value={year} 
                        onChange={e => setYear(e.target.value)} 
                        required 
                        placeholder="e.g. 2024"
                        style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "white" }}
                    />
                </div>
            </div>
        </div>
        <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Video URL</label>
            <input 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                required 
                placeholder="https://example.com/video.mp4"
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
            disabled={isMutating}
            style={{ 
                padding: "1rem", 
                background: "#FDB927", 
                color: "black", 
                border: "none", 
                fontWeight: "bold", 
                cursor: isMutating ? "not-allowed" : "pointer",
                borderRadius: "4px"
            }}
        >
            {isMutating ? "Creating..." : "Add Highlight"}
        </button>
      </form>
    </div>
  );
}
