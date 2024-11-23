export function formatProductsForTable(products, properties) {
  const headers = properties.map((property) => property.name);

  const data = products.map((product) => {
    const row = {};

    product.property_values.forEach(({ property_id, value }) => {
      const property = properties.find((prop) => prop.id === property_id);

      if (property) {
        row[property.name] = value;
      }

    });
    return row;
  });

  return { headers, data };
}
