const User = require('../models/User')
const yup = require('yup')

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(15)
})

class UserController{
    async store(req, res){
        schema.isValid(req.body)
        .then(function(valid){
            if(valid){
                const user = User.create(req.body)
                return res.json(user)
            }else{
                return res.json({"res":"todos os campos são obrigatorios"})
            }
        })
        
    }

    async index(req, res){
        const users = await User.findAll()
        return res.json(users)
    }

    async delete(req, res){
        const  idUser  = req.params.id;
       
        const deleted = await User.destroy({
        where: { id: idUser }
        });
        if (deleted) {
             return res.status(200).send("Excluido com sucesso");
        }   
    }

    async update(req, res){
        const idUser = req.params.id;
        //return res.json(idUser)  
        if(req.body.name == '' || req.body.email == '' || req.body.password == ''){
            return req.status(400).send({error:'Todos campos são obrigatorios'})
        }
        const [ updated ] = await User.update(req.body, {
            where: { id: idUser }
        });
        if(updated){
            return res.json({user:"Atualizado com sucesso"})  
        } 
    }

}

module.exports = new UserController()