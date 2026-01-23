"use client";

import { register } from "@/actions/auth-actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

import { useRouter } from "next/navigation";

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={styles.button}
    >
      {pending ? "Creating Account..." : "Create Account"}
    </button>
  );
}

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Register</h1>
        
        <form action={async () => {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("password", formData.password);
            submitData.append("confirmPassword", formData.confirmPassword);

            const res = await register(submitData);
            if (res.success) {
                router.push(ROUTES.LOGIN);
            } else if (res.message) {
                setErrorMessage(res.message);
            }
        }}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className={styles.input}
              minLength={6}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              required 
              className={styles.input}
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )}

          <RegisterButton />

          <p className={styles.linkText}>
            Already have an account? <Link href={ROUTES.LOGIN} className={styles.link}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
