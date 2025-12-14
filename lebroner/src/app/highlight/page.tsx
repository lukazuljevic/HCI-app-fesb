import styles from "./highlight.module.css";
import Link from "next/link";
import { auth } from "@/auth";

export default async function HighlightPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className={styles.title}>Highlights</h1>
        {isAdmin && (
            <Link 
                href="/highlight/create"
                style={{
                    background: "#FDB927",
                    color: "black",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                }}
            >
                + Add Highlight
            </Link>
        )}
      </div>
      <p>
        <Link href="/highlight/club/manchester">CLICK - Club: Manchester</Link>
      </p>
      <p>
        <Link href="/highlight/season/2024">CLICK - Season: 2024</Link>
      </p>
    </div>
  );
};
