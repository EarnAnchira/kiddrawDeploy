import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function LoginMember() {
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const history = useNavigate();

    const login = () => {
        axios.post(`/loginmember/${UserName}`, {
            UserName: UserName,
            Password: Password,
        }).then((response) => {
            if (response.data.message) {
                alert("Wrong user name/password cobination")
            } else {
                history(`/homeuser/${UserName}`)
                alert("login success")
            }
            console.log(response.data);
        });
    };

    return (
        <>
            <div className='container mt-3'>
                <Card style={{ width: '25rem', height: "24rem", background: '#FFB9CA', margin: "10px 10px 10px 450px" }} className='text-center mt-2'>
                    <img src="/User-avatar-whiteBg.png" alt="" roundedcircle={true} style={{ borderRadius: "50%", height: "100px", width: "100px", margin: "10px 10px 10px 150px" }}></img>
                    <h1 className='text-mt-3' style={{ color: '#000000', marginTop: '10px' }}>Member login</h1>
                    <Form className="login">
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Control style={{ width: '22rem', height: "auto", margin: "10px 10px 10px 20px" }} type="text" placeholder="User Name..."
                                onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control style={{ width: '22rem', height: "auto", margin: "10px 10px 10px 20px" }} type="password" placeholder="Password..."
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <Button style={{ background: '#003F5D', width: '5rem', height: "auto", margin: "10px 10px 10px 160px" }} variant="primary" type="submit" onClick={login}>
                        Login
                    </Button>
                </Card>
            </div>
        </>
    )
}

export default LoginMember