import styles from "./blog.module.css";
import { auth } from "@/auth";
import Link from "next/link";

export default async function BlogPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className={styles.title}>Blog</h1>
        {isAdmin && (
            <Link 
                href="/blog/create"
                style={{
                    background: "#FDB927",
                    color: "black",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                }}
            >
                + Add Post
            </Link>
        )}
      </div>
      <p>Posts will appear here. (Integrate with DB later)</p>
    </div>
  );
};
