import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { CreateUser } from '../services/user';
import './insert.css';
import { socket } from '../socket.js'



function Insert() {
    const [socketInstance] = useState(socket());
    const [insert, setInsert] = useState({ email: '', password: '' })

    const handleSubmit = () => {
        socketInstance.emit('userCreate');
    };

    const handleInsert = async () => {
        try {
            await CreateUser(insert);
            handleSubmit()
            setInsert({ email: '', password: '' });
            // navigate("/select");
        } catch (error) {

        }
    }

    useEffect(() => {
        socketInstance.on('userCreate', () => {
            alert('Usuario criado')
        })

        return () => {
            socketInstance.off('userCreate');
        }
    }, [])

    return (
        <div>
            <form className='form' action='#'>
                <fieldset>
                    <legend>Your credentials</legend>
                    <div className='myInput'>
                        <label className='email2'>Email:</label>
                        <input
                            type='text'
                            value={insert.email}
                            onChange={(e) => {
                                const temp = e.target.value;
                                setInsert({ ...insert, email: temp })
                            }} />
                    </div>

                    <div className='myInput'>
                        <label className='senha2'>Senha:</label>
                        <input
                            type='password'
                            value={insert.password}
                            onChange={(e) => {
                                const temp = e.target.value;
                                setInsert({ ...insert, password: temp })
                            }} />
                    </div>
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleInsert}>Submit</button>
                    <Link to="/select">
                        <button type="button" className="btn btn-primary btn-lg">Voltar</button>
                    </Link>
                </fieldset>
            </form>
            <body>

            </body>
            <footer>
                <Link to="/">
                    <button type="button" className="btn btn-primary btn-lg">Início</button>
                </Link>
                <Link to="/">
                    <button type="button" className="btn btn-primary btn-lg">Select</button>
                </Link>
            </footer>
        </div>
    )
}

export default Insert;