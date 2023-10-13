const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID = (req , res , next , val) =>{
    if(val > tours.length){
        return res.status(404).json({status:'fail' , message : 'Invalid ID'})
    }
    next();    
}

exports.checkPatch = (req , res , next) =>{
    if(!req.body.name || !req.body.price){
            return res.status(400).json({status:'fail' , message : 'missing name'})
        }
    next();    
}

exports.getAllTour = (req , res) => {
    res.status(200).json({
        status : 'success',
        data: {
            tours
        }
    })
} 
exports.createTour =  (req,res ) => {
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1
    const newTour  = Object.assign({id:newId} , req.body)
    tours.push(newTour)
    fs.writeFile('../dev-data/data/tours-simple.json', JSON.stringify(tours) ,err =>{
        res.status(201).json({
            status:'success',
            data:{
                tours : newTour  
            }
        })
    })
}

exports.getTour =  (req , res) => {
    res.status(200).json({
        status : 'success',
        data: {
            tours
        }
    })
} 

exports.patchTour =  (req , res) =>{
    res.status(200).json({
        status:'success',  
        data:{
            tours : '<Updated here>'
        }
    })
}
exports.deleteTour =  (req , res) =>{
    res.status(202).json({
        status:'success',
        data:{
            tours : null
        }
    })
}