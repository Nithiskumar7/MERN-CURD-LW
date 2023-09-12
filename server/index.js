const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

const FoodModel=require("./models/Food");


mongoose.connect("mongodb://localhost:27017/food")
.then(()=>console.log("connected to mongoose"))
.catch(err=>console.log(err))

app.post("/insert",async(req,res)=>{

    const foodName=req.body.foodName
    const description=req.body.description

    const food=new FoodModel({
        foodName:foodName,
        description:description
    });
    try{
        await(food.save());
    }catch(err){
        console.log(err);
    }
});

app.get("/read",(req,res)=>{
 FoodModel.find()
 .then((result)=>{
   return res.json({Status:"Success",Result:result})
 })
 .catch(err=>console.log(err))
   
});

app.put("/update",async(req,res)=>{

    const newFoodName=req.body.newFoodName;
    const id=req.body.id;

 
    try{
      await FoodModel.findById(id,(err,updatedFood) => {
            updatedFood.foodName=newFoodName;
            updatedFood.save();
            res.send("update");
        });
    }catch(err){
        console.log(err);
    }
});
app.delete("/delete/:id", async(req,res) => {
    const id=req.params.id;
    await FoodModel.findByIdAndDelete(id);
    res.send("deleted");
});
app.listen(5000, () =>{
    console.log("server is running");
});
