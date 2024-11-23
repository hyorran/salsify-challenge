import styles from './page.module.css'
import datastore from '../public/datastore.json'

export default function Home() {
  console.warn(datastore.products);
  return (
    <div className={styles.page}>
    </div>
  );
}
