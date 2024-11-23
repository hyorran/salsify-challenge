'use client';

import styles from './page.module.scss';
import datastore from '../public/datastore.json';
import Table from '@/components/Table/Table';
import { debounce, formatProductsForTable } from '@/lib/utils';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';

export default function Home() {
  const [dataset, setDataset] = useState(datastore);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setSelectedFilter] = useState({
    properties: -1,
    operators: '',
    customInput: ''
  });

  useEffect(() => {
    const result = formatProductsForTable(dataset.products, dataset.properties);
    setData(result.data)
    setHeaders(result.headers)
  }, [])

  const handleOnChangeFilter = debounce(({ value, name }) => {
    setSelectedFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, 300);

  const renderCustomInput = (property) => {
    const prop = datastore.properties.find(prop => prop.id.toString() === property);

    switch (prop?.type) {
      case 'string':
        return <Input name="customInput" type="text" onChange={handleOnChangeFilter} />;
      case 'number':
        return <Input name="customInput" type="number" onChange={handleOnChangeFilter} />;
      case 'enumerated':
        return (
          <Dropdown
            name="customInput"
            options={prop.values.map((item, index) => ({ id: index, name: item }))}
            onChange={handleOnChangeFilter}
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if((filter.properties > -1) && (filter.customInput !== '')) {
      const newData = datastore.products.filter(item => {

        const propFound = item.property_values.find(prop => prop.property_id.toString() === filter.properties)

        if(propFound?.value.toString() === filter.customInput) {
          return item
        }
      })

      const result = formatProductsForTable(newData, dataset.properties);
      setData(result.data);
    }
  }, [filter])

  return (
    <div className={styles.page}>
      <Dropdown options={datastore.properties} onChange={handleOnChangeFilter} name="properties" />
      <Dropdown options={datastore.operators} onChange={handleOnChangeFilter} name="operators" />
      {filter.properties && renderCustomInput(filter.properties)}
      <Table headers={headers} data={data} />
    </div>
  );
}
