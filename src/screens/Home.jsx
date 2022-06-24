import { Box, Button, Card, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getData } from '../config/firebase/firebaseMethods'

function Home() {
    const [users, setUsers] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    const [userNames, setUserNames] = useState([]);


    const reducerData = useSelector(data => data);
    const dispatch = useDispatch();

    const getUsers = () => {
        let url = 'https://jsonplaceholder.typicode.com/users';
        axios.get(url).then((res) => {

            dispatch({
                type: "SETUSERNAMES",
                userNames: res.data
            })

            console.log("reducerData: ", reducerData.userNames)
            if (reducerData && reducerData.userNames) {
                setUserNames(reducerData.userNames)
                console.log("userNames", userNames);
            }
        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {

        if (params.id) {
            navigate(`/home/${params.id}`)
        } else {
            navigate('/login')
        }



        getData('todos').then((snapshot) => {
            if (snapshot.exists()) {

                // setTodos([snapshot.val()])               // if getting data by id then use this
                let Todos = Object.values(snapshot.val());  // if getting complete data then use this
                setTodos(Todos)

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });


    }, [])
    return (
        <Box>
            <Typography variant='h1'>Home Page</Typography>

            <Box>
                {/* {users.length > 0 ?
                    <Box>
                        {users.map((e, i) => <li>{e.name}</li>)}
                    </Box> :
                    <Box>
                        <Typography variant='h4'>Loading...</Typography>
                    </Box>
                } */}
                {/* <ul>
                    {todos.length ? todos.map((e, i) => <li key={i}>{e.todo}</li>)
                        : <Typography variant='h3'>Loading...</Typography>}
                </ul> */}

                <Button variant='contained' onClick={getUsers}>Get Users</Button>

                <ul>
                    {userNames.length ? userNames.map((e, i) => <li key={i}>{e.name}</li>)
                        : <Typography variant='h3'>Loading...</Typography>}
                </ul>
            </Box>
        </Box>
    )
}

export default Home