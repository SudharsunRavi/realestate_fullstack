const user=async(req,res)=>{
    try{
        res.json("User Controller");
    }catch(error){
        console.log(error);
    }
}

module.exports={user}

