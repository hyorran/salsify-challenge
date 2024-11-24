'use client';

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.scss';
import datastore from '../public/datastore.json';
import Table from '@/components/Table/Table';
import Dropdown from '@/components/Dropdown/Dropdown';
import Input from '@/components/Input/Input';
import { compareValues, debounce, formatProductsForTable } from '@/lib/utils';

export default function Home() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filter, setFilter] = useState({
    properties: -1,
    operator: '',
    customInput: ''
  });

  useEffect(() => {
    const result = formatProductsForTable(datastore.products, datastore.properties);
    setData(result.data);
    setHeaders(result.headers);
  }, []);

  const handleOnChangeFilter = debounce(({ value, name }) => {
    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, 300);

  const getFilteredOperators = useMemo(() => {
    if (filter.properties < 0) return [];

    const prop = datastore.properties.find(({ id }) => id.toString() === filter.properties);
    const validOperators = {
      string: ['equals', 'any', 'none', 'in', 'contains'],
      number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
      enumerated: ['equals', 'any', 'none', 'in']
    };

    return datastore.operators.filter(operator => validOperators[prop?.type]?.includes(operator.id));
  }, [filter.properties]);

  const renderCustomInput = useMemo(() => {
    const prop = datastore.properties.find(({ id }) => id.toString() === filter.properties);

    if (!prop) {
      return null;
    }

    const inputComponents = {
      string: (
        <Input
          name="customInput"
          type="text"
          onChange={handleOnChangeFilter}
          label="Value"
        />
      ),
      number: (
        <Input
          name="customInput"
          type="number"
          onChange={handleOnChangeFilter}
          label="Value"
        />
      ),
      enumerated: (
        <Dropdown
          name="customInput"
          options={prop.values?.map(value => ({ id: value, name: value }))}
          onChange={handleOnChangeFilter}
          label="Value"
        />
      )
    };

    return inputComponents[prop.type] || null;
  }, [filter.properties]);

  useEffect(() => {
    if (filter.properties > -1 && filter.customInput !== '') {
      const filteredData = datastore.products.filter(product => {
        const propValue = product.property_values.find(({ property_id }) => property_id.toString() === filter.properties);
        const filterType = datastore.properties[filter.properties]?.type;

        return compareValues(filter.operator, propValue?.value?.toString(), filter.customInput, filterType);
      });

      const result = formatProductsForTable(filteredData, datastore.properties);
      setData(result.data);
    } else {
      const result = formatProductsForTable(datastore.products, datastore.properties);
      setData(result.data);
    }
  }, [filter]);

  return (
    <div className={styles.page}>
      <div className={styles.filtersWrapper}>
        <Dropdown
          options={datastore.properties}
          onChange={handleOnChangeFilter}
          name="properties"
          label="Property"
        />
        <Dropdown
          options={getFilteredOperators}
          onChange={handleOnChangeFilter}
          name="operator"
          label="Operator"
        />
        {filter.properties > -1 && renderCustomInput}
      </div>
      <Table headers={headers} data={data} />
    </div>
  );
}
