const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  complaint: { type: String },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending', 'Resolved'],
    default: 'Active'
  }
}, { timestamps: true });


customerSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastCustomer = await this.constructor.findOne().sort({ createdAt: -1 });
    let nextId = 1;
    if (lastCustomer && lastCustomer.customerId) {
      nextId = parseInt(lastCustomer.customerId.replace('CUST', '')) + 1;
    }
    this.customerId = 'CUST' + String(nextId).padStart(3, '0');
  }
});

module.exports = mongoose.model('Customer', customerSchema);