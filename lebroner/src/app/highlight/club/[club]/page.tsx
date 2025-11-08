import styles from "../../highlight.module.css";

type Props = { params: { club: string } | Promise<{ club: string }> };

export default async function ClubPage({ params }: Props) {
  const { club } = (await params) as { club: string };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Club: {club}</h1>
    </div>
  );
}
