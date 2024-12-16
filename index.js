// CRUD application
import express from "express"

const app = express()
const port = 3000;

app.use(express.json())

let teaData = []
let nextId = 1

// add a new tea
app.post("/teas", (req,res) => {
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// list all the teas 
app.get("/teas", (req,res) => {
    res.status(200).send(teaData)

})

// check for a tea by id
app.get("/teas/:id", (req,res) => {
    // const tea = teaData.find(t => t.id === parseInt(req.params.id))
    // if(!tea){
    //     return res.status(404).send("Tea not found")
    // }
    // res.status(200).send(tea)
    if (isNaN(parseInt(req.params.id))){
        return res.status(404).send("Tea not found1")
    }
    const indexNum = (parseInt(req.params.id))-1
    if ((teaData.length <= indexNum) || (indexNum <= -1) ){
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(teaData[indexNum]);
})

// update tea

app.put("/teas/:id",(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found12");
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea);

// delete tea

app.delete("/teas/:id", (req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1){
        return res.status(404).send("Tea not found123")
    }
    teaData.splice(index, 1)
    return res.status(204).send("deleted")
})

})
app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})