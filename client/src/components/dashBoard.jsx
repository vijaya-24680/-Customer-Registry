const Dashboard = ({ customers }) => {
  const total = customers.length;
  const active = customers.filter(c => c.status === 'Active').length;
  const pending = customers.filter(c => c.status === 'Pending').length;
  const resolved = customers.filter(c => c.status === 'Resolved').length;

  const Card = ({ title, count, color, icon }) => (
    <div style={{ background: 'white', padding: 20, borderRadius: 8, borderLeft: `4px solid ${color}`, flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div>
          <p style={{ margin: 0, color: '#718096' }}>{title}</p>
          <h2 style={{ margin: 0 }}>{count}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
      <Card title="Total Complaints" count={total} color="#3182ce" icon="👥" />
      <Card title="Active" count={active} color="#38a169" icon="❗" />
      <Card title="Pending" count={pending} color="#dd6b20" icon="🕒" />
      <Card title="Resolved" count={resolved} color="#805ad5" icon="✅" />
    </div>
  );
};
export default Dashboard;