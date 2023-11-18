const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const  cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())
// server   Toyserver
// pss BHS5nPttGmF3gyEh
//  Toysevers
// cartoys 






const uri = "mongodb+srv://Toyserver:BHS5nPttGmF3gyEh@cluster0.v8fkcik.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("Toys");
    const foods = database.collection("toyy");
    const confarm = client.db("orders");
    const food = confarm.collection("newcar");

    app.get('/user',async(req,res)=>{
      const cursor=foods.find()
      const result= await cursor.toArray()
      res.send(result)
        
    })

    app.get('/user/:id',async(req,res)=>{
      const id=req.params.id 
      const querye={_id:new ObjectId(id)}
      const result=await foods.findOne(querye)
      res.send(result)
    })


    app.post('/order',async(req,res)=>{
      const  total=req.body 
      console.log(total);
      const result=await food.insertOne(total)
      res.send(result)
       
    })
    app.get('/order',async (req,res)=>{
      // console.log(req.query.email);
      let query={}
      if(req.query?.email){
        query={email:req.query.email}
      }
      const queryss=food.find(query)
      const result=await queryss.toArray()
      
     
     
      res.send(result)
    })
    app.delete('/order/:id',async(req,res)=>{
      const id=req.params.id
      const oreds={_id:new ObjectId(id)}
      const result=await food.deleteOne(oreds)
      res.send(result)
    })

    app.patch('/order/:id',async(req,res)=>{
      const id=req.params.id 
      const filter={_id:new ObjectId(id)}
      
      const updating=req.body
      const updateDoc = {
        $set: {
          status: updating.status
        },
      };
      const result=await food.updateOne(filter,updateDoc)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})