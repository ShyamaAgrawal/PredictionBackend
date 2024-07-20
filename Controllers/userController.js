const User = require('../models/User.js');
const Booking = require('../models/Booking.js');
const MedicalReport = require('../models/medicalReport.js');



exports.getUserDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const userDetails = await User.findById(id).select("-password");
        if (!userDetails) {
            return res.status(200).json({ success: true, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User details fetched successfully",data:userDetails });
    } catch (error) {
        console.log('Error fetching user details:', error)
        res.status(500).json({ success: false, message: "Failed to fetch user details" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(200).json({ success: true, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "Details updated successfully", data: updatedUser });
    } catch (error) {
        console.log('Error updating user details:', error)
        res.status(500).json({success:false,message:"Failed to update user details"})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            return res.status(200).json({ success: true, message: "User not found" });
        }
        console.log(data)
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log('Error deleting user details:', error)
        res.status(500).json({ success: false, message: "Failed to delete user details" })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: "All users fetched successfully", data: users });
    } catch (error) {
        console.log('Error fetching all users detail:', error)
        res.status(500).json({ success: false, message: "Failed to fetch all users detail" })
    }
}

exports.getUserProfile = async (req,res)=>{
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if(!user){
        res.status(404).json({ success: false, message: "User not found" })
        }
        const {password,...rest} = user._doc;
        res.status(200).json({success:true,message:"Getting user details",data:{...rest}})
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch user profile" })
    }
}

app.post('/analyze', async (req, res) => {
    try {
        const reportData = new MedicalReport(req.body);
        await reportData.save();

        const inputData = [
          req.body.name,
          req.body.gender === "female" ? 1 : 0,
          req.body.age,
          req.body.smoking === "Yes" ? 1 : 0,
          req.body.yellow_fingers === "Yes" ? 1 : 0,
          req.body.peer_pressure === "Yes" ? 1 : 0,
          req.body.chronic_diseases === "Yes" ? 1 : 0,
          req.body.fatigue === "Yes" ? 1 : 0,
          req.body.allergy === "Yes" ? 1 : 0,
          req.body.wheezing === "Yes" ? 1 : 0,
          req.body.alcohol_consuming === "Yes" ? 1 : 0,
          req.body.coughing === "Yes" ? 1 : 0,
          req.body.shortness_of_breath === "Yes" ? 1 : 0,
          req.body.swallowing_difficulty === "Yes" ? 1 : 0,
          req.body.chest_pain === "Yes" ? 1 : 0,
        ];

        const result = await callMLModel(inputData); 

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
