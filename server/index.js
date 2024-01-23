import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer';
import fs from 'fs'
import user from './routes/user.js'
import post from './routes/post.js'


dotenv.config()
const app = express();
app.use(cors())
connectDB();

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name);
    }
  });
  
  const upload = multer({ storage: storage });

  app.post('/api/upload',upload.single("file") ,(req, res) => {
    if (req.file) {
        res.status(200).json('File is Uploaded')
    }else{
        res.status(500).json('File is not Uploaded')
    }
  });

  app.use('/images', express.static("images"))


//delete Image
app.delete('/api/delete/:id', (req, res) => {
    try {
        const path = `images/${req.params.id}`
        fs.unlinkSync(path)
        res.status(200).json('File is Deleted')
    }
    catch (err) {
        res.status(500).json('File is not Deleted')
    }
}
)

app.get('/', (req, res) => {
    res.send('Hello welcome to the backend of ConnectIn')
})


app.use('/api/user', user)
app.use('/api/post', post)





const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))