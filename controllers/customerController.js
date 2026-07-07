const asyncHandler = require('express-async-handler');
const Customer = require('../models/customerModel');

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, complaint, priority, status } = req.body;
  if (!name ||!email) {
    res.status(400);
    throw new Error('Name and Email are required');
  }
  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    res.status(400);
    throw new Error('Customer with this email already exists');
  }
  const customer = await Customer.create({ name, email, phone, complaint, priority, status });
  res.status(201).json(customer);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedCustomer);
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  await customer.deleteOne();
  res.status(200).json({ id: req.params.id, message: 'Customer deleted' });
});

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer };