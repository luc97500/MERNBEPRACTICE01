const Category = require("../models/category");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const categoryList = await Category?.find();

  if (!categoryList) {
    res.status(500).json({ message: "not found any category" });
  }

  res.status(200).send(categoryList);
});

router.get("/:id", async (req,res)=>{
  const id = req.params.id;

  const iid = await Category.findById(id)

  if(!iid){
    return res.status(404).json({message:"not found any data"})
  }

  res.status(200).json({message:"ok found", iid})

})

router.post("/create", async (req, res) => {
  try {
    const categoriesData = req.body; 

    if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const categories = categoriesData.map(
      (category) =>
        new Category({
          name: category.name ,
          color: category.color, 
          age: category.age 
        })
    );

    const savedCategories = await Category.insertMany(categories); 

    res
      .status(201)
      .json({
        message: "Categories created successfully",
        data: savedCategories,
      });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error creating categories", error: error.message });
  }
});


router.patch("/:id", async (req,res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const categ = await Category.findById(id)

        if(!categ){
            return res.status(404).send({message:"id not found !"})
        }
        const updated = await Category.findByIdAndUpdate(id,{name:req.body.name , color : req.body.color , age : req.body.age},{new:true})

        if(!updated){
           return res.status(400).json({message:"data is not updated!"})
        }

        res.status(200).json({message:"updated ok!", updated})

    } catch (err) {
        console.log(err)
    }

})

router.delete("/:id", async(req,res)=>{
  const id = await Category.findById(req.params.id)
  console.log(id)

  const dd = await Category.findByIdAndDelete(id)

  if(!dd){
    return res.status(400).json({message:"not able to delete"})
  }

  res.status(200).json({message:"deleted successfully!",dd})
})

module.exports = router;
