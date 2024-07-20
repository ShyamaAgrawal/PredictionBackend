const mongoose=require('mongoose');
const medicalReportSchema = new mongoose.Schema({
    name:{type:String},
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    age:{type:Number},
    smoking:{type:String , enum:["Yes","No"]},
    yellow_fingers:{type:String , enum:["Yes","No"]},
    anxiety:{type:String , enum:["Yes","No"]},
    peer_pressure:{type:String , enum:["Yes","No"]},
    chronic_diseases:{type:String , enum:["Yes","No"]},
    fatigue:{type:String , enum:["Yes","No"]},
    allergy:{type:String , enum:["Yes","No"]},
    wheezing:{type:String , enum:["Yes","No"]},
    alcohol_consuming:{type:String , enum:["Yes","No"]},
    coughing:{type:String , enum:["Yes","No"]},
    shortness_of_breath:{type:String , enum:["Yes","No"]},
    swallowing_difficulty:{type:String , enum:["Yes","No"]},
    chest_pain:{type:String , enum:["Yes","No"]},
    lung_cancer:{type:String , enum:["Yes","No"]}
})

const MedicalReport = mongoose.model("MedicalReport", medicalReportSchema);
module.exports = MedicalReport;