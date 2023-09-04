const router = require('express').Router()
const UserController = require('../Controller/UserController')
//helpers
const verifyToken = require('../helpers/verify-token')

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

//rotas protegidas, só acessar caso esteja logado!!!
router.patch('/edit/:id', verifyToken, UserController.editUser)

module.exports = router