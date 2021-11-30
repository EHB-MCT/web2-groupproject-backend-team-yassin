import express from "express";
import cors from 'cors'
import mongoDb from 'mongodb'
import bodyParser from 'body-parser';
import * as db from './db.js'
const mongoClient = mongoDb.MongoClient

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(cors())
app.listen(process.env.PORT || port, ()=>{
    console.log(`application listening on port ${port}`)
})

app.get("/api/challenges", async (req,res) => {
    let challenge = await db.getChallenges(mongoClient)
    console.log(challenge)
    res.send(challenge)
})

app.get("/api/challenge/:id", async (req,res)=>{
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    let challenges = await db.getChallenge(mongoClient,id)
    console.log(challenges)
    res.send(challenges)
})

app.post("/api/insert", async (req,res) =>{
    let challenge = req.body
    console.log(challenge)
    await db.addChallenge(mongoClient,challenge)
    res.send(challenge)
})


