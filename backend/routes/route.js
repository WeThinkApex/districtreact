const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');


const {
    DistrictRegister,
    DistrictLogIn,
    getDistricts,
    getDistrictDetail
 } = require('../controllers/district_controller.js');

const { saveFormData, getFormDataByDistrict ,getFormDataByFormKey} = require('../controllers/formController.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)
// forms

router.post("/api/forms/:formKey", saveFormData);
router.get("/api/formdata/:district", getFormDataByDistrict);
router.get("/api/formdata/form/:formKey", getFormDataByFormKey);


// District

router.post('/districtReg', DistrictRegister);
router.post('/districtLogin', DistrictLogIn)

router.get("/districts/:id", getDistricts)
router.get("/district/:id", getDistrictDetail)


module.exports = router;