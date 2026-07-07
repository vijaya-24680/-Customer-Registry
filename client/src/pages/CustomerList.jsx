import { useState, useEffect } from 'react';
import { getCustomers } from '../services/api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCustomers();
      setCustomers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Customer Registry</h1>
      {customers.map(c => (
        <div key={c._id}>{c.name} - {c.phone}</div>
      ))}
    </div>
  );
};

export default CustomerList;