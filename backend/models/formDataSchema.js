const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema(
  {
    districtId: {
      type: String,
      required: true,
    },
    formKey: {
      type: String,
      required: true,
    },
    formTitle: {
      type: String,
    },
    formData: {
      type: Object, // flexible: can hold any fields from your form
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("FormData", formDataSchema);
