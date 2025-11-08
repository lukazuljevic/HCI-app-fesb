import styles from "../highlight.module.css";

type Props = { club: string };

const ClubPage: React.FC<Props> = ({ club }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Club: {club}</h1>
      <p>Details about the {club} club.</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { club } = context.params ?? { club: null };
  return { props: { club: club ?? null } };
}

export default ClubPage;
