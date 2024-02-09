import Link from "next/link";
import styles from "../../styles/ResearchCard.module.css";

export default function ResearchCard(props: any) {
  return (
    <div className={styles.main}>
      <div className={styles.researches}>
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 300)}...</p>
        <Link href={`/research/${props.id}`}>
          <button className={styles.button}>Read Research</button>
        </Link>
      </div>
    </div>
  );
}
