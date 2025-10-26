import axios from "axios";
import {
  authRequest,
  doneSuccess,
  authError,
} from "./userSlice"; // ✅ or replace with your actual slice

// ✅ Save form data (POST)
export const saveFormData = (fields, formId, districtInfo) => async (dispatch) => {
  dispatch(authRequest());
  try {
    console.log("district info",districtInfo)
    const payload = {
      districtId: districtInfo?.districtId || "default-id",
      formTitle: formId, // or keep formTitle: formId
      formData: fields,
      createdBy: districtInfo?.district || "Unknown District",
    };

    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/forms/${formId}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Form saved:", result.data);
    dispatch(doneSuccess(result.data));
  } catch (error) {
    console.error("❌ Error saving form:", error);
    dispatch(authError(error.message || "Save failed"));
  }
};



// ✅ Fetch saved forms for a district
export const getFormsByDistrict = (districtId) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/forms/${districtId}`
    );

    dispatch(doneSuccess(result.data));
  } catch (error) {
    dispatch(authError(error));
  }
};
