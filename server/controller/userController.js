const User = require("../model/usermodel.js");

const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email }); //find is email already exisited

    if (userExist) {
      return res.status(400).json({ message: "User already exist." });
    }

    const saveData = await newUser.save();
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



const getAlluser = async (req, res) => {
  try {
    const userData = await User.find(); // Check if User model is imported correctly

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(userData); // Send the data as JSON
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


const getId = async(req,res) => {
  
  
  try{  
      const id = req.params.id;
      const userExits = await User.findById(id).select("name");
      
      
      if(!userExits)
      {
        return res.status(404).json({message:"No user id found"})
      }

      res.status(200).json(userExits);



  }catch(error){
      res.status(500).json({ errorMessage: error.message });

  }
}

 const updateData = async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "No user found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,          // Return the updated document
      runValidators: true // (optional) Run schema validations

      
    });

   res.status(200).json(updatedUser);

    

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


//delete


const deleteUser = async(req,res) => {
     
    try{

        const id = req.params.id;

        const userExist = await User.findById(id);

        if(!userExist){
          res.status(404).json({ message:" no user found" });

        }

        const deletData = await User.findByIdAndDelete(id,req.body,{
          new:true
        })

        res.status(200).json(deletData);

    }catch(error){
      res.status(500).json({errorMessage: error.message})
    }
}



module.exports = { create, getAlluser, getId , updateData ,deleteUser };
