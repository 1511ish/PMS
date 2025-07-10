import React from "react";

const Thead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
