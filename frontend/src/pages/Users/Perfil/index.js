import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'

function Perfil() {
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data);
            });
        }
    }, [token, navigate]);

    console.log(user);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.patch(`users/edit/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'application/json'
                }
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response.data);
        }
    }

    return (
        <div>
            <h1>Olá, {user.name}.</h1>

            <form onSubmit={handleSubmit}>
                <InputGroup
                    type='text'
                    name='name'
                    label='label'
                    placeholder='Digite seu nome'
                    handleChange={handleChange}
                    value={user.name}
                />
                <InputGroup
                    type='email'
                    name='email'
                    label='label'
                    placeholder='Digite seu email'
                    handleChange={handleChange}
                    value={user.email}
                />
                <InputGroup
                    type='text'
                    name='sobrenome'
                    label='label'
                    placeholder='Digite seu sobrenome'
                    handleChange={handleChange}
                    value={user.sobrenome}
                />
                <InputGroup
                    type='password'
                    name='password'
                    label='label'
                    placeholder='Digite seu password'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='password'
                    name='confirmpassword'
                    label='label'
                    placeholder='Digite seu password'
                    handleChange={handleChange}
                />

                <button type='submit' className={`mt-5 mb-3 `}>
                    ATUALIZAR
                </button>
            </form>
        </div>
    );
}

export default Perfil;
