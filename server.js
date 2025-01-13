import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Data from './models/DataModel.js';
import fs, { unlinkSync } from "fs";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });


mongoose.connect(`${process.env.MONGO_URI}/excl`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const maoData = data.map((d)=>{
            return {
                fullName: d['Full Name'],
                email: d['Email'],
                phone: d['Phone'],
                dateApplied: d['Date Applied'],
                jobBoard: d['Job Board'],
                jobTitle: d['Job Title'],
                status: d['Status'],
                joiningDate: d['Joining Date'],
                duration: d['Duration'],
                internshipType: d['Internship Type'],
                timing: d['Timing'],
                offerLetterSent: d['Offer Letter Sent'],
                acceptedOfferLetter: d['Accepted Offer Letter'],
                candidatesEnrolled: d['Candidates Enrolled'],
            }
        })
        const resrr=await Data.insertMany(maoData);
        console.log(resrr);
        
        console.log(maoData);
        fs,unlinkSync(filePath);
        res.status(200).json({ message: 'File uploaded and data saved to MongoDB successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to process the file.' });
    }
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
