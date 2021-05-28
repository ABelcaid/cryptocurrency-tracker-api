
module.exports = (sequelize,DataTypes) => {

    const User = sequelize.define('User',{

        email: DataTypes.STRING,
        name: DataTypes.STRING,
        photoUrl :DataTypes.STRING,
        solde: {
            type : DataTypes.FLOAT,
            defaultValue : 1000
        }
    });


    User.associate = models=>{
        User.hasMany(models.Wallet)
      }
   


    return User;

}