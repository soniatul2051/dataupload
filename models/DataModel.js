import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    fullName: 
    { 
        type: String, 
        required: false 
    },        
    email: 
    { 
        type: String,
         required: false
    },           
    phone:
    { 
        type: String,
        required: false
  },          
    dateApplied: { type: String, required: false },       
    jobBoard: { type: String, required: false },       
    jobTitle: { type: String, required: false },        
    status: { type: String, required: false },         
    joiningDate: { type: String },                      
    duration: { type: String },                       
    internshipType: { type: String },                 
    timing: { type: String },                         
    offerLetterSent: { type: String,  },
    acceptedOfferLetter: { type: String, }, 
    candidatesEnrolled: { type: String, },  
}, { timestamps: true }); 

export default mongoose.model('Data', dataSchema);
