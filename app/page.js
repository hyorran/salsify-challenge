'use client'

import styles from './page.module.scss'
import datastore from '../public/datastore.json'
import Table from '@/components/Table/Table';
import { formatProductsForTable } from '@/lib/utils';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';

export default function Home() {
  const [filter, setSelectedFilter] = useState({
    properties: -1,
    operators: ''
  })

  const {headers, data} = formatProductsForTable(datastore.products, datastore.properties)

  const handleOnChangeFilter = ({value, name}) => {
    setSelectedFilter(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const renderCustomInput = (type) => {
    const inputs = {
      string: <div>string</div>,
      number: <div>number</div>,
      enumerated: <div>enumerated</div>
    }
    return inputs[type]
  }

  return (
    <div className={styles.page}>
      <Dropdown options={datastore.properties} onChange={handleOnChangeFilter} name="properties"/>
      <Dropdown options={datastore.operators} onChange={handleOnChangeFilter} name="operators"/>
      {filter.properties && renderCustomInput(datastore.properties.find(prop => prop.id.toString() === filter.properties)?.type)}
      <Table headers={headers} data={data}/>
    </div>
  );
}
