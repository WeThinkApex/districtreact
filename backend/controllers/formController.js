const mongoose = require("mongoose");
const dayjs = require("dayjs");

// (your existing allowedForms and getFormModel stay exactly as they are)
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

// ✅ Function to get dynamic model (you already have it)
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
      createdBy: { type: String },
    },
    { timestamps: true, collection: collectionName }
  );

  return mongoose.model(collectionName, dynamicSchema);
}

// ✅ Existing function (unchanged)
const saveFormData = async (req, res) => {
  try {
    const { formKey } = req.params;
    const { districtId, formTitle, formData, createdBy } = req.body;

    if (!allowedForms.includes(formKey)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid form key" });
    }
    if (!districtId || !formData) {
      return res.status(400).json({
        success: false,
        message: "districtId and formData are required",
      });
    }

    const FormModel = getFormModel(formKey);

    const newEntry = new FormModel({
      districtId,
      formKey,
      formTitle: formTitle || formKey,
      formData,
      createdBy: createdBy || null,
    });

    const saved = await newEntry.save();

    return res.status(201).json({
      success: true,
      message: `${formKey} saved successfully`,
      id: saved._id,
    });
  } catch (err) {
    console.error("Error in saveFormData:", err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};



// ✅ NEW FUNCTION: fetch form data by district & date
const getFormDataByDistrict = async (req, res) => {
  try {

    console.log("getform callled",req.params,req.query)
    const { district } = req.params;
    const { date } = req.query;

    if (!district) {
      return res
        .status(400)
        .json({ success: false, message: "District is required" });
    }

    const selectedDate = date ? dayjs(date).startOf("day") : dayjs().startOf("day");
    const nextDate = selectedDate.add(1, "day");

    let allResults = [];

    // Loop through all allowedForms because data can be in any dynamic collection
    for (const formKey of allowedForms) {
      const FormModel = getFormModel(formKey);

      // Check if the collection actually exists in MongoDB
      const collections = await mongoose.connection.db.listCollections({ name: formKey.toLowerCase() }).toArray();
      if (collections.length === 0) continue; // skip if not created yet

      const records = await FormModel.find({
        districtId: district,
        createdAt: { $gte: selectedDate.toDate(), $lt: nextDate.toDate() },
      }).sort({ createdAt: -1 });

      if (records.length > 0) {
        allResults.push({
          formKey,
          total: records.length,
          latestEntry: records[0],
        });
      }
    }

    if (allResults.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }
console.log("Fetching for district:", district, "date:", date);
console.log("Allowed forms:", allowedForms);
console.log("resustss",allResults)
    return res.status(200).json({
      success: true,
      data: allResults.map((r) => ({
        formName: r.latestEntry.formTitle || r.formKey,
        formKey: r.formKey,
        totalEntries: r.total,
        createdAt: r.latestEntry.createdAt,
      })),
      
    });
  } catch (err) {
    console.error("Error in getFormDataByDistrict:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};


module.exports = { saveFormData, getFormDataByDistrict };
