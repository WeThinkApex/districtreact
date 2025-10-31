const mongoose = require('mongoose');

let uuidv4;
(async () => {
  const uuid = await import("uuid");
  uuidv4 = uuid.v4;
})();
const districtSchema = new mongoose.Schema({
  districtId: {
    type: String,
    default: () => uuidv4 && uuidv4(),
    unique: true,
  },
  district: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // sclassName: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'sclass',
  //     required: true,
  // },
  // school: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'admin',
  //     required: true,
  // },
  role: {
    type: String,
    default: "District"
  },
  // examResult: [
  //     {
  //         subName: {
  //             type: mongoose.Schema.Types.ObjectId,
  //             ref: 'subject',
  //         },
  //         marksObtained: {
  //             type: Number,
  //             default: 0
  //         }
  //     }
  // ],
  // attendance: [{
  //     date: {
  //         type: Date,
  //         required: true
  //     },
  //     status: {
  //         type: String,
  //         enum: ['Present', 'Absent'],
  //         required: true
  //     },
  //     subName: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'subject',
  //         required: true
  //     }
  // }]
});

module.exports = mongoose.model("district", districtSchema);