function roundOfPrice(price) {
  return (price / 100000).toFixed(2);
}

const getYearArr = () => {
  const currentYear = new Date().getFullYear();
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const yearArr = range(currentYear, currentYear - 40, -1);
  return yearArr;
};

const addRandNum = (strVal) => {
  return (
    strVal.split('.')[0] +
    Math.random() * 100000000 +
    '.' +
    strVal.split('.')[1]
  );
};

const getErrorsAsStr = (errors) => {
  return (
    <>
      {errors.model ? (
        <>
          <strong>Error in Model: </strong>
          {errors.model} <br />
        </>
      ) : (
        ''
      )}
      {errors.make ? (
        <>
          <strong>Error in Make: </strong>
          {errors.make} <br />
        </>
      ) : (
        ''
      )}
      {errors.type ? (
        <>
          <strong>Error in Vehicle Type: </strong>
          {errors.type} <br />
        </>
      ) : (
        ''
      )}
      {errors.year ? (
        <>
          <strong>Error in Year: </strong>
          {errors.year} <br />
        </>
      ) : (
        ''
      )}
      {errors.engine_capacity ? (
        <>
          <strong>Error in Engine Capacity: </strong>
          {errors.engine_capacity} <br />
        </>
      ) : (
        ''
      )}
      {errors.color ? (
        <>
          <strong>Error in Color: </strong>
          {errors.color} <br />
        </>
      ) : (
        ''
      )}
      {errors.transmission ? (
        <>
          <strong>Error in Transmission: </strong>
          {errors.transmission} <br />
        </>
      ) : (
        ''
      )}
      {errors.condition ? (
        <>
          <strong>Error in Condition: </strong>
          {errors.condition} <br />
        </>
      ) : (
        ''
      )}
      {errors.registration_city ? (
        <>
          <strong>Error in Registration City: </strong>
          {errors.registration_city} <br />
        </>
      ) : (
        ''
      )}
      {errors.hybrid ? (
        <>
          <strong>Error in Hybrid: </strong>
          {errors.hybrid} <br />
        </>
      ) : (
        ''
      )}
      {errors.fuel ? (
        <>
          <strong>Error in Fuel: </strong>
          {errors.fuel} <br />
        </>
      ) : (
        ''
      )}
      {errors.distance_covered ? (
        <>
          <strong>Error in Distance Covered: </strong>
          {errors.distance_covered} <br />
        </>
      ) : (
        ''
      )}
      {errors.image ? (
        <>
          <strong>Error in Image: </strong>
          {errors.image} <br />
        </>
      ) : (
        ''
      )}
      {errors.price ? (
        <>
          <strong>Error in Price: </strong>
          {errors.price} <br />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export { roundOfPrice, getYearArr, getErrorsAsStr, addRandNum };
