const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encriptaClave = async (password)=>{
    const salt = await bcrypt.genSalt(10); 
    //genera un hash y lo ejecuta 10 veces 
    //con ese patron genera el cifrado
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

helpers.comparaClave = async(contra,contraGuardada) =>{
    try{
    return await bcrypt.compare(contra,contraGuardada);
    }catch(e){
        console.log(e);
    }
};

module.exports = helpers;