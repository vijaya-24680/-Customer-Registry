const CustomerTable = ({ customers, onEdit, onDelete }) => {
  const getPriorityColor = (p) => p === 'High'? '#f56565' : p === 'Medium'? '#ed8936' : '#48bb78';
  const getStatusColor = (s) => s === 'Active'? '#4299e1' : s === 'Pending'? '#ed8936' : s === 'Resolved'? '#805ad5' : '#a0aec0';

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', background: 'white', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f7fafc' }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Complaint</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{c.customerId}</td>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>{c.email}</td>
              <td style={tdStyle}>{c.phone}</td>
              <td style={tdStyle}>{c.complaint}</td>
              <td style={tdStyle}><span style={{ background: getPriorityColor(c.priority), color: 'white', padding: '4px 12px', borderRadius: 12, fontSize: 12 }}>{c.priority}</span></td>
              <td style={tdStyle}><span style={{ background: getStatusColor(c.status), color: 'white', padding: '4px 12px', borderRadius: 12, fontSize: 12 }}>{c.status}</span></td>
              <td style={tdStyle}>
                <button onClick={() => onEdit(c)} style={actionBtn}>✏️</button>
                <button onClick={() => onDelete(c._id)} style={actionBtn}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { padding: 12, textAlign: 'left', color: '#4a5568' };
const tdStyle = { padding: 12 };
const actionBtn = { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16, marginRight: 8 };

export default CustomerTable;