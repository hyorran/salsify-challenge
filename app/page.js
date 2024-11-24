'use client';

import styles from './page.module.scss';
import datastore from '../public/datastore.json';
import Table from '@/components/Table/Table';
import { compareValues, debounce, formatProductsForTable } from '@/lib/utils';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';

export default function Home() {
  const [dataset, setDataset] = useState(datastore);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setSelectedFilter] = useState({
    properties: -1,
    operator: '',
    customInput: ''
  });

  useEffect(() => {
    const result = formatProductsForTable(dataset.products, dataset.properties);
    setData(result.data);
    setHeaders(result.headers);
  }, []);

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
            options={prop.values.map((item) => ({ id: item, name: item }))}
            onChange={handleOnChangeFilter}
          />
        );
      default:
        break;
    }
  };

  const getFilteredOperators = (property) => {
    if (property < 0) {
      return [];
    }

    const prop = datastore.properties.find(prop => prop.id.toString() === property);

    const validOperators = {
      string: ['equals', 'any', 'none', 'in', 'contains'],
      number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
      enumerated: ['equals', 'any', 'none', 'in']
    };

    return datastore.operators.filter(operator => validOperators[prop?.type]?.includes(operator.id));
  };

  useEffect(() => {
    if (filter.properties > -1 && filter.customInput !== '') {

      const newData = datastore.products.filter(item => {
        const propFound = item.property_values.find(prop => prop.property_id.toString() === filter.properties);

        const filterType = datastore.properties[filter.properties].type;

        if (compareValues(filter.operator, propFound?.value.toString(), filter.customInput, filterType)) {
          return item;
        }
      });

      const result = formatProductsForTable(newData, dataset.properties);
      setData(result.data);
    }
  }, [filter]);

  console.warn(filter);

  return (
    <div className={styles.page}>
      <Dropdown
        options={datastore.properties}
        onChange={handleOnChangeFilter}
        name="properties"
      />
      <Dropdown
        options={getFilteredOperators(filter.properties)}
        onChange={handleOnChangeFilter}
        name="operator"
      />
      {filter.properties > -1 && renderCustomInput(filter.properties)}
      <Table headers={headers} data={data} />
    </div>
  );
}
