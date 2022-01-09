//modules
const mongoose = require('mongoose');

// ESQUEMA MONGOOSE
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

//mongoose modelo
const Manufacturer = mongoose.model('Manufacturer',manufacturerSchema);

//export modelo
module.exports = Manufacturer;