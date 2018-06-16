import React from 'react';
import TreadingTableRowData from './TreadingTableRowData.jsx';

const TreadingTableRowHead = (props) => {
  return (
    <th>
      {props.header}
    </th>
  )
}

export default TreadingTableRowHead;