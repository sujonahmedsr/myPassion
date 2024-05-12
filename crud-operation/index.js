const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors({
  origin: [
    'http://localhost:5175',
    'http://localhost:5174',
    'http://localhost:5173',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}))
app.use(express.json())
app.use(cookieParser())

const logger = (req, res, next)=>{
  next()
}

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token
  if (!token) return res.status(401).send({ message: 'unathorized access' })
  if (token) {
    jwt.verify(token, process.env.DB_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'unatuthorized access' })
      }
      req.user = decoded
      next()
    })
  }

}





const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.kmaa4nd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();


    const jobsCollection = client.db('passion').collection('jobs')
    const bidsCollection = client.db('passion').collection('bids')


    // json token 
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.DB_ACCESS_TOKEN, { expiresIn: '7d' })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .send({ success: true })
    })

    app.post('/logOut', async (req, res) => {
      res
        .clearCookie('token', { maxAge: 0 })
        .send({ success: true })
    })

    // for jobsCollection
    app.get('/jobs', async (req, res) => {
      
      let query = {}
      if (req.query?.email) {
        query = { ownerEmail: req.query.email }
        
      }
      // if(req.user.email !== req.query.email){
      //   return res.status(403).send({message: 'forbideen access'})
      // }
      const cursor = jobsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/job', async (req, res) =>{
      const page = parseInt(req.query.pages) - 1
      const size = parseInt(req.query.size)
      const filter = req.query.filter
      const sort = req.query.sort
      // const search = req.query.search
      // console.log(search);
      let query = {
        // job_title : { $regex : search, $options : 'i'},
      }
      console.log(query);
      let option = {}
      if(sort){
        option = { sort : {deadline : sort === 'asc' ? 1 : -1} }
      }
      if (filter) query.category = filter
      const cursor = jobsCollection
      .find(query, option)
      .skip(page * size)
      .limit(size)
      const result = await cursor.toArray()
      res.send(result)
    })


    app.get('/jobsCount', async(req, res)=>{
      const count = await jobsCollection.estimatedDocumentCount()
      res.send({count})
    })

    app.get('/job/:email', verifyToken, async(req, res)=>{
      const email = req.params.email
      const query = { ownerEmail : email }
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
      console.log(result);
    })

    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    app.post('/jobs', async (req, res) => {
      const bids = req.body
      const result = await jobsCollection.insertOne(bids)
      res.send(result)
    })


    app.put('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const updatePost = req.body;
      const options = { upsert: true }
      const query = { _id: new ObjectId(id) }
      const updateBid = {
        $set: {
          ...updatePost,
        },
      }
      const result = await jobsCollection.updateOne(query, updateBid, options)
      res.send(result)
    })


    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await jobsCollection.deleteOne(query)
      res.send(result)
    })

    // for bidsCollection
    app.get('/bids', verifyToken, async (req, res) => {
      let query = {}
      if (req.query?.email) {
        query = { userEmail: req.query.email }
      }
      const cursor = bidsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/bid_Request', verifyToken, async (req, res) => {
      let query = {}
      if (req.query?.email) {
        query = { Buyer_email: req.query.email }
      }
      const cursor = bidsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/bids/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await bidsCollection.findOne(query)
      res.send(result)
    })

    app.post('/bids', async (req, res) => {
      const bids = req.body
      const result = await bidsCollection.insertOne(bids)
      res.send(result)
    })

    app.patch('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) }
      const updateStatus = {
        $set: status
      }
      const result = await bidsCollection.updateOne(query, updateStatus)
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
  res.send(`it's working`)
})
app.listen(port, () => {
  console.log('ok', port);
})