const { User } = require('../models');



 const addUser = async (req, res) => {

        try {

                let email = req.body.email;
                let name = req.body.name;
                let photoUrl = req.body.photoUrl

            // const existingUser = await User.findOne({ email: email });

            const existingUser = await User.findOne({
                where: {
                    email: email,
                },
              });


         

            if (existingUser  == null) {

                let user =  await User.create({
                    email : email,
                    name :name,
                    photoUrl: photoUrl,
                })

                res.send(user)

                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&');
                console.log(user);
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&');
                
            }else {

                console.log('"""""""""""""""""""""""""""""""""""""');
                console.log(existingUser);
                console.log('"""""""""""""""""""""""""""""""""""""');

                res.send(existingUser);

            }

             
                
            }
            catch (err) {
                res.json(err)
            }
     
}


module.exports = { addUser }