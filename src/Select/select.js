import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { DeleteUser, FilterListUser, ListUser } from '../services/user';
import './select.css';
import { socket } from '../socket.js'


function Selection() {
    const [socketInstance] = useState(socket());
    const [search, setSearch] = useState('');
    const [listUser, setListUser] = useState([]);



    const handleSubmit = () => {
        socketInstance.emit('userDelete');
    };

    const handleSearch = async () => {
        try {
            const user = await FilterListUser(search);
            setListUser(user);
        } catch (error) {

        }
    }

    const handleDelete = async (userId) => {
        try {
            await DeleteUser(userId);
            const data = await ListUser();
            handleSubmit()
            setListUser(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        socketInstance.on('userDelete', async () => {
            alert('Usuario deletado');
            try {
                const data = await ListUser();
                setListUser(data)
            } catch (e) {
                console.log(e);
            } finally {
            }
        })

        return () => {
            socketInstance.off('userDelete');
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await ListUser();
                setListUser(data)
            } catch (e) {
                console.log(e);
            } finally {
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <header>Tela de seleção</header>
            <body>
                <div>
                    <input
                        type='text'
                        value={search}
                        placeholder='Type the email'
                        onChange={(e) => {
                            const temp = e.target.value;
                            setSearch(temp);
                        }}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <ListGroup>
                    {listUser.map((a) => {
                        return (
                            <div className='itemList' key={a.id}>
                                <ListGroup.Item>{a.email}</ListGroup.Item>
                                <button onClick={async () => handleDelete(a.id)}>Delete</button>
                            </div>
                        )
                    })}
                </ListGroup>
            </body>
            <footer>
                <Link to="/">
                    <button type="button" className="btn btn-primary btn-lg">Início</button>
                </Link>
                <Link to="/insert">
                    <button type="button" className="btn btn-primary btn-lg">Insert</button>
                </Link>
            </footer>
        </>
    )

}

export default Selection;