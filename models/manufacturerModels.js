//modules
const mongoose = require('mongoose');

// SCHEMA MONGOOSE
const manufacturerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'manufacturer must have a name'],
      trim: true,
    },
    cif:{
        type: String,
        required:[true, 'manufacturer must have a cif'],
        trim: true,
    },
    addres:{
        type: String,
        required:[true, 'manufacturer must have a addres'],
        trim: true,
    },

});

//mongoose model
const Manufacturer = mongoose.model('Manufacturer',manufacturerSchema);

//export model
module.exports = Manufacturer;