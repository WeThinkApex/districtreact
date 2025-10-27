const mongoose = require("mongoose");
const dayjs = require("dayjs");

// List of allowed forms
const allowedForms = [
  "crimeData",
  "nonbailableWarrants",
  "actProposals",
  "externmentActions",
  "sensitivePoliticalCases",
  "vcProductions",
  "importantCases",
  "cctvSurveillance",
  "cyberCrimeMonitoring",
  "womensSafety",
  "focusArea",
  "legalMonitoring",
  "dsrSummary",
  "fertilizerMonitoring",
];

// ✅ Dynamic model creation
function getFormModel(formKey) {
  const collectionName = formKey.toLowerCase();
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }

  const dynamicSchema = new mongoose.Schema(
  {
    districtId: { type: String, required: true },
    formKey: { type: String, required: true },
    formTitle: { type: String },
    formData: { type: mongoose.Schema.Types.Mixed, required: true },
    createdBy: { type: String }, // can be user name
    createdDate: { type: String }, // YYYY-MM-DD
  },
  { timestamps: true, collection: collectionName }
)
;

  return mongoose.model(collectionName, dynamicSchema);
}

// ✅ Save form data
const saveFormData = async (req, res) => {
  try {
    const { formKey } = req.params;
    const { districtId, formTitle, formData, createdBy } = req.body;

    if (!allowedForms.includes(formKey)) {
      return res.status(400).json({ success: false, message: "Invalid form key" });
    }
    if (!districtId || !formData) {
      return res.status(400).json({ success: false, message: "districtId and formData are required" });
    }

    const FormModel = getFormModel(formKey);

const newEntry = new FormModel({
  districtId,
  formKey,
  formTitle: formTitle || formKey,
  formData,
  createdBy: createdBy || null,
  createdDate: dayjs().format("YYYY-MM-DD"),
});


    const saved = await newEntry.save();

    return res.status(201).json({
      success: true,
      message: `${formKey} saved successfully`,
      id: saved._id,
    });
  } catch (err) {
    console.error("Error in saveFormData:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

const getFormDataByDistrict = async (req, res) => {
  try {
    const { district } = req.params;
    const { date } = req.query;

    if (!district) {
      return res.status(400).json({ success: false, message: "District is required" });
    }

    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
    let allResults = [];
console.log("form",formattedDate)
    for (const formKey of allowedForms) {
      const FormModel = getFormModel(formKey);

      // ✅ Check if collection exists
      const collections = await mongoose.connection.db
        .listCollections({ name: formKey.toLowerCase() })
        .toArray();
      if (collections.length === 0) continue;

      // ✅ Match string date instead of date object
      const records = await FormModel.find({
          createdBy: district,
        createdDate: formattedDate,
      }).sort({ createdAt: -1 });
console.log("resorndss lease",records);






      if (records.length > 0) {
        allResults.push({
          formKey,
          total: records.length,
          latestEntry: records[0],
        });
      }
    }

    if (allResults.length === 0) {
      return res.status(200).json([]); // empty array if no data
    }

  const responseData = allResults.map((r) => ({
  formName: r.latestEntry.formTitle || r.formKey,
  formKey: r.formKey,
  totalEntries: r.total,
  createdDate: r.latestEntry.createdDate,
  formData: r.latestEntry.formData,  // <—— added
}));


    return res.status(200).json(responseData);
  } catch (err) {
    console.error("Error in getFormDataByDistrict:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};


module.exports = { saveFormData, getFormDataByDistrict };
