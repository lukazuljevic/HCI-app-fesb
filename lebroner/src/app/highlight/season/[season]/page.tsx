import styles from "../../highlight.module.css";

type Props = { params: { season: string } | Promise<{ season: string }> };

export default async function SeasonPage({ params }: Props) {
  const { season } = (await params) as { season: string };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Season: {season}</h1>
    </div>
  );
}
