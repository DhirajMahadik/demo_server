const express = require('express')
const cors = require('cors')
const Connect = require('./DB/config')
const User = require('./DB/Modals/User')
const app = express()
app.use(express.json())
app.use(cors())

// Route for fetching users details /////////////////////////////////////

app.get('/', (req, res) => {
    User.find().then((resp) => {
        res.send(resp)
    }).catch((err) => {
        res.send({ error: err })
    })
})

// Route for add new record ///////////////////////////////////////////

app.post('/api/add-employee', (req, res) => {
    let data = new User(req.body)
    data.save().then((resp) => {
        res.send(resp)
    }).catch((err) => {
        res.send({ error: err })
    })
})

// Route for delete record /////////////////////////////////////////

app.delete('/api/delete-record/:id', (req, res) => {
    let id = req.params.id
    User.deleteOne({_id:id}).then((resp)=>{
        if(resp.deletedCount === 1){
            User.find().then((resp) => {
                res.send(resp)
            }).catch((err) => {
                res.send({ error: err })
            })
        }else{
            res.status(400).send({err:"record not deleted or maybe it is not exist in your database"})
        }
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
})

// Route for update existing record /////////////////////////////////

app.put('/api/update-data',(req,res)=>{
    User.updateOne({_id:req.body._id},{$set:req.body}).then((resp)=>{
        console.log(resp)
        if(resp.modifiedCount === 1){
            User.find().then((resp) => {
                res.send(resp)
            }).catch((err) => {
                res.send({ error: err })
            })
        }else{
            res.status(400).send({err:"Could not update or Updating with same data"})
        }
    })
})

Connect().then(() => {
    app.listen(5500, () => {
        console.log('Running')
    })
}).catch((err) => {
    console.log(err)
})
