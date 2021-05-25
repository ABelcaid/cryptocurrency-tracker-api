const { User } = require('../models');



 const addUser = async (req, res) => {

        try {

               await User.create({
                    email : req.body.email,
                    name : req.body.name,
                })

                res.send("user added")
                
            }
            catch (err) {
                res.json(err)
            }
     
}


module.exports = { addUser }