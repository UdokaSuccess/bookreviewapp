const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/books');
    
app.get('/bookreviews', async (req, res) => {
  try {
    const data = await Bookmodel.find()
    console.log(data)
    res.send(data)  
} catch (error) {
    console.error(500);
    } 
})

//for image parsing 
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

const bookSchema  = new mongoose.Schema({
    src: {
    type: String,
    required: true
  },
   title: {
    type: String,
    required: true
  },
   summary: {
    type: String,
    required: true
  },
   writer: {
    type: String,
    required: true
  }, 
  date: {
    type: String,
  },
})

const Bookmodel = mongoose.model ('Bookmodel', bookSchema)


app.post('/bookreviews', upload.single('src'), async (req, res) => {
  console.log(req.body)
    try {
    const bookData = {
      title: req.body.title,
      summary: req.body.summary,
      writer: req.body.writer,  
      src: req.file.filename,       
      date: new Date().toISOString().split('T')[0]
    }

    const bookprofile =  new Bookmodel(bookData)
    console.log(bookprofile)
    console.log(req.file)

    await bookprofile.save()
 
} catch (error) {
    console.error('server error 500', error)
}
})


app.listen(3000, () => {
    console.log('connected')
})



