"use client";

import { authenticate } from "@/actions/auth-actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={styles.button}
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        
        <form action={async (formData) => {
            const res = await authenticate(formData);
            if (res === "CredentialSignin") {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        }}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className={styles.input}
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}

          <LoginButton />
          
          <p className={styles.linkText}>
            Don&apos;t have an account? <Link href="/register" className={styles.link}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
