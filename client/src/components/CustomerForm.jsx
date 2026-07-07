import { useState, useEffect } from 'react';
import { addCustomer, updateCustomer } from '../services/api';

const CustomerForm = ({ onClose, onCustomerAdded, customerToEdit }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', complaint: '', priority: 'Low', status: 'Active'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerToEdit) setFormData(customerToEdit);
    else setFormData({ name: '', email: '', phone: '', complaint: '', priority: 'Low', status: 'Active' });
  }, [customerToEdit]);

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (customerToEdit) {
        await updateCustomer(customerToEdit._id, formData);
      } else {
        await addCustomer(formData);
      }
      onCustomerAdded();
      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>{customerToEdit? 'Edit Customer' : 'Add Customer'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="name" value={formData.name} onChange={onChange} placeholder="Name" required style={inputStyle} />
      <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" required style={inputStyle} />
      <input name="phone" value={formData.phone} onChange={onChange} placeholder="Phone" style={inputStyle} />
      <input name="complaint" value={formData.complaint} onChange={onChange} placeholder="Complaint" style={inputStyle} />
      <select name="priority" value={formData.priority} onChange={onChange} style={inputStyle}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select name="status" value={formData.status} onChange={onChange} style={inputStyle}>
        <option>Active</option><option>Pending</option><option>Resolved</option><option>Inactive</option>
      </select>
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

const inputStyle = { display: 'block', width: '100%', margin: '10px 0', padding: 8, border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: 10, background: '#3182ce', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' };

export default CustomerForm;