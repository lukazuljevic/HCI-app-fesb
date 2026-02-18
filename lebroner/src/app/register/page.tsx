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

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validate = (data: typeof formData): FieldErrors => {
    const errors: FieldErrors = {};

    if (data.name.length > 0 && data.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (data.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (data.password.length > 0 && data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (data.confirmPassword.length > 0 && data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setServerError("");

    if (touched[name]) {
      setFieldErrors(validate(updated));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFieldErrors(validate(formData));
  };

  const inputClass = (field: keyof FieldErrors) => {
    if (touched[field] && fieldErrors[field]) return `${styles.input} ${styles.inputError}`;
    return styles.input;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Register</h1>

        <form action={async () => {
            setFieldErrors({});
            setServerError("");

            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("password", formData.password);
            submitData.append("confirmPassword", formData.confirmPassword);

            const res = await register(submitData);
            if (res.success) {
                router.push(ROUTES.LOGIN);
            } else if (res.fieldErrors) {
                setFieldErrors(res.fieldErrors);
                setTouched({ name: true, email: true, password: true, confirmPassword: true });
            } else if (res.message) {
                setServerError(res.message);
            }
        }}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Name</label>
            <input
              name="name"
              type="text"
              required
              className={inputClass("name")}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && fieldErrors.name && (
              <span className={styles.fieldError}>{fieldErrors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              required
              className={inputClass("email")}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && fieldErrors.email && (
              <span className={styles.fieldError}>{fieldErrors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              required
              className={inputClass("password")}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && fieldErrors.password && (
              <span className={styles.fieldError}>{fieldErrors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className={inputClass("confirmPassword")}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && fieldErrors.confirmPassword && (
              <span className={styles.fieldError}>{fieldErrors.confirmPassword}</span>
            )}
          </div>

          {serverError && (
            <p className={styles.errorMessage}>
              {serverError}
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
