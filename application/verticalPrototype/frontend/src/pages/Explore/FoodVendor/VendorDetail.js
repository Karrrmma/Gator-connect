import React from 'react';
import { useParams } from 'react-router-dom';

function VendorDetail() {
  let { name } = useParams();
  name = decodeURIComponent(name.replace(/-/g, ' ')); // Convert URL formatted name back to regular

  return (
    <div>
      <h1> {name} </h1>
    </div>
  );
}

export default VendorDetail;
