const User = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserById = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, sobrenome, confirmpassword } = req.body

        const nivel = 0

        //validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!sobrenome) {
            res.status(422).json({ message: 'O sobrenome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'O password é obrigatório' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'O confirmpassword é obrigatório' })
            return
        }


        //criar a senha
        //criar a criptografia
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Checar se o usuario existe 
        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            res.status(422).json({ message: 'Email já cadastrado' })
            return
        }

        const user = new User({
            name: name,
            sobrenome: sobrenome,
            nivel: nivel,
            email: email,
            password: passwordHash
        })

        try {
            //criando o usuario no banco
            const newUser = await user.save()
            //entregar o token para o novo user
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'O password é obrigatório' })
            return
        }

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            res.status(422).json({ message: 'Email não encontrado' })
            return
        }

        //checar se o password é igual a senha do banco
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha incorreta' })
            return
        }

        await createUserToken(user, req, res)
    }

    static async editUser(req, res) {
        //recebendo o ID da URL
        const id = req.params.id

        //checar se o usuario exite
        const token = getToken(req)
        const user = await getUserById(token)

        //receber os dados nas variaves
        const { name, email, sobrenome, password, confirmpassword } = req.body

        //validações de campos vazios 
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        const userExists = await User.findOne({ where: { email: email } })
        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Por favor utilize outro email' })
            return
        }
        if (!sobrenome) {
            res.status(422).json({ message: 'O sobrenome é obrigatório' })
            return
        }
        user.sobrenome = sobrenome

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'as senhas não batem' })
            return
        } else if (password === confirmpassword && password != null) {
            //criptografando senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        const userToUpdate = await User.findByPk(id)

        if (!userToUpdate) {
            res.status(422).json({ message: 'Usuario não encontrado' })
            return
        }

        userToUpdate.name = name
        userToUpdate.email = email
        userToUpdate.sobrenome = sobrenome


        if (password === confirmpassword && password != null) {
            //criptografando senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            userToUpdate.password = passwordHash
        }

        try {
            await userToUpdate.save()
            res.status(200).json({ message: 'usuario atualizado com sucesso' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findByPk(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
    
    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findByPk(id, {
            where: { id: id }
        })

        if (!user) {
            res.status(422).json({ message: 'Usuario não encontrado' })
            return
        }

        user.password = undefined

        res.status(200).json({ user })
    }

}