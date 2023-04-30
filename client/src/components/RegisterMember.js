import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"

function RegisterMember() {
    const [fusername, setFusername] = useState("");
    const [fpassword, setFpassword] = useState("");
    const [ffname, setFfname] = useState("");
    const [flname, setFlname] = useState("");
    const [file, setFile] = useState("");
    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const addUserData = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", file)
        formData.append("fusername", fusername);
        formData.append("fpassword", fpassword);
        formData.append("ffname", ffname);
        formData.append("flname", flname);
        if (fusername === "") {
            alert("user name is required")
        } else if (fpassword === "") {
            alert("password is required")
        } else if (ffname === "") {
            alert("first name is required")
        } else if (flname === "") {
            alert("last name is required")
        } else if (file === "") {
            alert("photo is required")
        } else {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const res = await axios.post("/registermember", formData, config);
            if (res.data.status === 202) {
                alert("This User Name is already exist")
            } else if (res.data.status === 201) {
                alert("register success")
                history("/loginmember")
            } else {
                console.log("error")
            }
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <h1 style={{ color: '#ffffff', margin: "10px 10px 10px 535px" }}>SIGN UP</h1>
                <Form style={{ width: '10rem', height: "auto", margin: "10px 10px 10px 450px" }} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='fusername' placeholder="User Name" onChange={(e) => setFusername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='fpassword' placeholder="Password" onChange={(e) => setFpassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='ffname' placeholder="First Name" onChange={(e) => setFfname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='flname' placeholder="Last Name" onChange={(e) => setFlname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'white' }} >Image Profile</Form.Label>
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>
                    <Button style={{ width: '10rem', height: "auto", margin: "10px 10px 10px 90px", background: '#FFB9CA', color: '#000000' }} variant="primary" type="submit" onClick={addUserData}>
                        Sign up
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default RegisterMember