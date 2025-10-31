const bcrypt = require('bcrypt');
const District = require('../models/districtSchema.js');

const DistrictRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingDistrict = await District.findOne({
            district: req.body.district,
            // school: req.body.adminID,
            // sclassName: req.body.sclassName,
        });
console.log("backed cakled",req.body)
        if (existingDistrict) {
            res.send({ message: 'District already exists' });
console.log("in if")

        }
        else {
            const district = new District({
                ...req.body,
                // school: req.body.adminID,
                // password: hashedPass
            });
console.log("in else")
            let result = await district.save();

            result.password = undefined;
            console.log("result",result)
            res.send(result);
        }
    } catch (err) {
          res.status(500).json({ message: err.message, code: err.code, stack: err.stack });

    }
};

const DistrictLogIn = async (req, res) => {
    try {
        console.log("req.body",req.body)
        // Find district by name or adminID (change according to your login field)
        let district = await District.findOne({ district: req.body.district});
        console.log("district",district)
        if (district) {
            // Compare password
            const validated = req.body.password === district.password;

            if (validated) {
                // Optional: remove sensitive data before sending
                district.password = undefined;

                res.send(district);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "District not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


const getDistricts = async (req, res) => {
    try {
        // Fetch districts created by a specific admin
        let districts = await District.find(); 
        if (districts.length > 0) {
            let modifiedDistricts = districts.map((district) => {
                return { ...district._doc, password: undefined }; // hide password if any
            });
            res.send(modifiedDistricts);
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


const getDistrictDetail = async (req, res) => {
    try {
        let district = await District.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (district) {
            district.password = undefined;
            res.send(district);
        }
        else {
            res.send({ message: "No district found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteDistrict = async (req, res) => {
    try {
        const result = await District.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteDistricts = async (req, res) => {
    try {
        const result = await District.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No Districts found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteDistrictsByClass = async (req, res) => {
    try {
        const result = await District.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No Districts found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateDistrict = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await District.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const district = await District.findById(req.params.id);

        if (!district) {
            return res.send({ message: 'District not found' });
        }

        const existingResult = district.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            district.examResult.push({ subName, marksObtained });
        }

        const result = await district.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    DistrictRegister,
    DistrictLogIn,
    getDistricts,
    getDistrictDetail,
    deleteDistricts,
    deleteDistrict,
    updateDistrict,
    deleteDistrictsByClass,
    updateExamResult,

};