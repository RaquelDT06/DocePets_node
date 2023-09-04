//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'

function Register() {
    //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(evento) {
        setUser({ ...user, [evento.target.name]: evento.target.value })
        //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
    }

    function handleSubmit(evento) {
        evento.preventDefault()
        register(user)
    }

    return (
        <div>
            <h2>Registrar</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        label='Nome'
                        name='name'
                        placeholder='Digite seu nome'
                        type='text'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label='sobrenome'
                        name='sobrenome'
                        placeholder='Digite seu sobrenome'
                        type='text'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label='email'
                        name='email'
                        placeholder='Digite seu email'
                        type='text'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label='password'
                        name='password'
                        placeholder='Digite seu password'
                        type='password'
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label='Confirme a Senha'
                        name='confirmpassword'
                        placeholder='Digite seu confirmpassword'
                        type='password'
                        handleChange={handleChange}
                    />

                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register