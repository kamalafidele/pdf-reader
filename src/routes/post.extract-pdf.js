const express = require('express');
const { PythonShell } = require('python-shell');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'saved_file.pdf')
    }
})

const upload = multer({ storage });
const router = express.Router();

router.post(
  '/extract-pdf',
  upload.single('file'),
  async (req, res, next) => {

    const { file } = req;

    try {        
        if (!file.originalname.includes('.pdf')) {
            fs.unlinkSync(file.path);
            return res.status(400).json({ error: 'The file must be pdf' });
        }

        let dataBuffer = fs.readFileSync('./uploads/saved_file.pdf');
        const { metadata, text: extractedText } = await pdf(dataBuffer);

        const text = await PythonShell.run('app.py', null);
        fs.unlinkSync(file.path);

        return res.status(200).json({ text: `${extractedText}` });
    } catch (e) {
        return res.status(500).json(e);
    }
  }
);

module.exports = router;
