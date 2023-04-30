import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";

function RegisterAdmin() {
    const [fid, setFid] = useState("");
    const [fadminname, setFadminname] = useState("");
    const [fpassword, setFpassword] = useState("");
    const [ffname, setFfname] = useState("");
    const [flname, setFlname] = useState("");
    const history = useNavigate();

    const setid = (e) => {
        setFid(e.target.value)
    }

    const addUserData = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append("fid", fid);
        formData.append("fadminname", fadminname);
        formData.append("fpassword", fpassword);
        formData.append("ffname", ffname);
        formData.append("flname", flname);

        if (fid === "") {
            alert("id is required")
        } else if (fadminname === "") {
            alert("admin name is required")
        } else if (fpassword === "") {
            alert("password is required")
        } else if (ffname === "") {
            alert("first name is required")
        } else if (flname === "") {
            alert("last name is required")
        } else {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post("/registeradmin", formData, config);
            if (res.data.status === 202) {
                alert("This Admin Name is already exist")
            } else if (res.data.status === 201) {
                history("/loginadmin")
                alert("register success")
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
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='fid' placeholder="Admin ID" onChange={setid} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control style={{ width: '22rem', height: "auto" }} type="text" name='fadminname' placeholder="Admin Name" onChange={(e) => setFadminname(e.target.value)} />
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
                    <Button style={{ width: '10rem', height: "auto", margin: "10px 10px 10px 90px", background: '#62AEC5', color: '#000000' }} variant="primary" type="submit" onClick={addUserData}><NavLink to="/storyform"></NavLink>
                        Sign up
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default RegisterAdmin