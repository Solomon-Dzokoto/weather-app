import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

const PORT = 8000;

const app=express() 

app.get('/',(req,res)=>{
    res.json('hi')
})


app.listen(8000,()=> console.log(`Backend is running on port ${PORT}`))