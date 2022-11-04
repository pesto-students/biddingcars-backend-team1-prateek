const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { socket } = require('../express/socketIO');

const carSchema = new Schema(
  {
    carCompany: {
      type: String,
      // required: true
    },
    photos: {
      type: Array,
      required: true,
    },
    modelName: {
      type: String,
      // required: true
    },
    modelYear: {
      type: String,
      // required: true
    },
    description: {
      type: String,
      // required: true
    },
    color: {
      type: String,
      // required: true
    },
    kilometersDriven: {
      type: Number,
      // required: true
    },
    condition: {
      type: String,
      // required: true
    },
    basePrice: {
      type: Number,
      // required: true
    },
    fullPrice: {
      type: Number,
      // required: true
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'User', required: true },
    currentBid: {
      type: Number,
      default: 0,
      // required: true
    },
    numberOfBids: {
      type: Number,
      default: 0,
    },
    endTime: {
      type: Date,
      // required: true
    },
    bidTimelineId: {
      type: Number,
      // required: true
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'User' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'sold'],
      required: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

Car.watch([], { fullDocument: 'updateLookup' }).on('change', (data) => {
  console.log(data);
  socket.emit('bid_update', data.fullDocument, (data) => {
    if (data.error) console.log('Something went wrong on the server');

    if (data.ok) console.log('Event was processed successfully');
  });
});

module.exports = Car;
