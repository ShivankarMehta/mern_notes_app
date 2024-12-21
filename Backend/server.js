const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

const noteRoutes= require('./routes/noteRoute');

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
const port=3001

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>console.log('MongoDB connected'))
        .catch((err)=> console.log(err));

app.get('/', (req,res)=>{
    res.send('Hello world!')
})

app.use('/api',noteRoutes)

app.listen(port,()=>{
    console.log(`App is Listening on port ${port}`)
})