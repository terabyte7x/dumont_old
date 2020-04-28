import mongoose from 'mongoose';

const Aircraft = new mongoose.Schema({
  registration: String,
  manufacturer: String,
  model: String,
  serial_number: String,
  icao_type: String,
});
module.exports = mongoose.model('Aerochain', Aircraft);
