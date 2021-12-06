import express from "express";
import cors from 'cors'
import mongoDb from 'mongodb'
import bodyParser from 'body-parser';
import * as db from './db.js'
const mongoClient = mongoDb.MongoClient

const app = express()
const port = env.process.PORT ||8080

app.use(bodyParser.json())
app.use(cors())
app.listen(port, ()=>{
    console.log(`application listening on port ${port}`)
})

app.get("/challenges", async (req,res) => {
    let challenge = await db.getChallenges(mongoClient)
    console.log(challenge)
    res.send(challenge)
})

app.get("/challenges/:id", async (req,res)=>{
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    let challenges = await db.getChallenge(mongoClient,id)
    console.log(challenges)
    res.send(challenges)
})

app.post("/challenges", async (req,res) =>{
    let challenge = req.body
    console.log(challenge)
    await db.addChallenge(mongoClient,challenge)
    res.send(challenge)
})

app.put("/challenges/:id", async (req,res) =>{
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    let newChallenge = req.body
    await db.updateChallenge(mongoClient,id,newChallenge)
    let challenge = await db.getChallenge(mongoClient,id)
    res.send(challenge)
})

app.delete("/challenges/:id", async (req,res) => {
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    await db.deleteChallenge(mongoClient, id)
    res.send(id)
})


