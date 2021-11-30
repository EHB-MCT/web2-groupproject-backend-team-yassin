const uri = "mongodb+srv://yassin:yassin123@cluster0.1ttwg.mongodb.net/web?retryWrites=true&w=majority";
const dbName = "web"
const collectionName = "challenges"

async function getChallenges(mongodb){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection(collectionName)
    const tasks = await db.find({}).toArray()
    client.close()
    return tasks
}

async function addChallenge(mongodb,task){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection(collectionName)
    const addedTask = await db.insertOne(task)
    client.close()
    return addedTask
}

async function getChallenge(mongodb,id){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection(collectionName)
    let task = await db.findOne({_id: id})
    client.close()
    return task
}

async function deleteChallenge(mongodb,id){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection(collectionName)
    await db.deleteOne({_id: id})
    client.close()
}

async function updateChallenge(mongodb,id,newTask){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection(collectionName)
    await db.updateOne({_id: id},{$set: newTask})
    client.close()
}

export{
    getChallenge,
    getChallenges,
    addChallenge,
    deleteChallenge,
    updateChallenge
}