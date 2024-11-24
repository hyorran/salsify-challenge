export function formatProductsForTable(products, properties) {

  const headers = properties?.map((property) => property.name);

  const data = products?.map((product) => {
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

export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const compareValues = (operatorId, value1, value2, propertyType) => {
  const validOperators = {
    string: ["equals", "any", "none", "in", "contains"],
    number: ["equals", "greater_than", "less_than", "any", "none", "in"],
    enumerated: ["equals", "any", "none", "in"],
  };

  if (!validOperators[propertyType]?.includes(operatorId)) {
    throw new Error(
      `Invalid operator "${operatorId}" for property type "${propertyType}"`
    );
  }

  switch (operatorId) {
    case "equals":
      return value1 === value2;

    case "greater_than":
      if (propertyType === "number") {
        return value1 > value2;
      }
      throw new Error(`"greater_than" is not valid for type "${propertyType}"`);

    case "less_than":
      if (propertyType === "number") {
        return value1 < value2;
      }
      throw new Error(`"less_than" is not valid for type "${propertyType}"`);

    case "any":
      return value1 !== null && value1 !== undefined;

    case "none":
      return value1 === null || value1 === undefined;

    case "in":
      if (Array.isArray(value2)) {
        return value2.includes(value1);
      }
      throw new Error(`"in" operator requires value2 to be an array`);

    case "contains":
      if (propertyType === "string" && typeof value1 === "string") {
        return value1.includes(value2);
      }
      throw new Error(`"contains" operator is only valid for strings`);

    default:
      throw new Error(`Unsupported operator: "${operatorId}"`);
  }
};
