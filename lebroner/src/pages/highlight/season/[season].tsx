import styles from "../highlight.module.css";

type Props = { season: string };

const SeasonPage: React.FC<Props> = ({ season }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Season: {season}</h1>
      <p>Overview of the {season} season.</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { season } = context.params ?? { season: null };
  return { props: { season: season ?? null } };
}

export default SeasonPage;
