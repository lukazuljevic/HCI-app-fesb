"use client";

import { authenticate } from "@/actions/auth-actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      style={{
        width: "100%",
        padding: "0.75rem",
        background: "#FDB927",
        border: "none",
        color: "#121212",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.7 : 1
      }}
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#121212",
      color: "white"
    }}>
      <div style={{ 
        background: "#1e1e1e", 
        padding: "2rem", 
        borderRadius: "12px", 
        width: "100%", 
        maxWidth: "400px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <h1 style={{ marginBottom: "2rem", textAlign: "center", color: "#FDB927" }}>Admin Login</h1>
        
        <form action={async (formData) => {
            const res = await authenticate(formData);
            if (res === "CredentialSignin") {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#aaa" }}>Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#2a2a2a",
                color: "white",
                outline: "none"
              }}
            />
          </div>
          
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#aaa" }}>Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#2a2a2a",
                color: "white",
                 outline: "none"
              }}
            />
          </div>

          {errorMessage && (
            <p style={{ color: "#ef4444", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
              {errorMessage}
            </p>
          )}

          <LoginButton />
        </form>
      </div>
    </div>
  );
}
