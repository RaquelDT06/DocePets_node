import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'
import api from '../../utils/api'



function NavBar() {
    const { authenticated, logout } = useContext(Context)
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (!token) {
            // navigate('/');
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data);
            });
        }
    }, []);

    console.log(user)

    return (
        <nav className='navbar bg-warning'>
            <div className='container'>
                <Link className='navbar-brand'>Logo</Link>
                <div>
                    <ul className='navbar nav'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        {!authenticated ? (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/register'>Registrar</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/perfil'>Perfil</Link>
                                </li>
                                {/* <li className='nav-item'>
                                    <Link className='nav-link' to='/pet/create'>Cadastrar Pet</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/pet/mypets'>Meu Pets</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/pet/myadoptions'>Minhas adoções</Link>
                                </li> */}
                                {user.nivel === 1 ? (
                                    <>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/Agendamento'>Criar Agendamento</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/'>Criar Admin</Link>
                                        </li>
                                    </>
                                ) : (null)}
                                <li onClick={logout} className='nav-item'><Link className='nav-link' to='/'>Sair</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar