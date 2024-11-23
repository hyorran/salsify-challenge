import styles from './page.module.scss'
import datastore from '../public/datastore.json'
import Table from '@/components/Table/Table';
import { formatProductsForTable } from '@/lib/utils';

export default function Home() {
  console.warn(datastore);

  const {headers, data} = formatProductsForTable(datastore.products, datastore.properties)

  return (
    <div className={styles.page}>
      <Table headers={headers} data={data}/>
    </div>
  );
}
