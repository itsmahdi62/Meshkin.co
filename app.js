const express = require('express')

const app = express();

app.get('/' , (req , res) => {
    res.status(404).json
    ({message : ' hello from the serve side!' , app:'Natours'})
} )
app.post('/', (req,res ) => {
    res.send("you can post")
})

app.listen(8000, () =>{
    console.log("Listening ... on port 8000")
})