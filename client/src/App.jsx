import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import Modal from './components/Modal';
import { getCustomers, deleteCustomer } from './services/api';

function App() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleEdit = (customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteCustomer(id);
      fetchCustomers();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomerToEdit(null);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 20, background: '#f7fafc', minHeight: '100vh' }}>
      <Dashboard customers={customers} />

      <div style={{ background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px', padding: 8, border: '1px solid #cbd5e0', borderRadius: 4 }}
          />
          <div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: 8, marginRight: 10, border: '1px solid #cbd5e0', borderRadius: 4 }}>
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Inactive</option>
            </select>
            <button onClick={() => setIsModalOpen(true)} style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Add Customer
            </button>
          </div>
        </div>

        <CustomerTable customers={filteredCustomers} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CustomerForm onClose={handleCloseModal} onCustomerAdded={fetchCustomers} customerToEdit={customerToEdit} />
      </Modal>
    </div>
  );
}

export default App;