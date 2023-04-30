import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

function UploadImage() {
    const { StoryID } = useParams("");
    const { UserName } = useParams("");
    const [file, setFile] = useState("");
    const [dataC, setDataC] = useState([]);
    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const addUserData = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", file)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await axios.post(`/uploadimage/${UserName}/${StoryID}`, formData, config);
        if (res.data.status === 201) {
            history(`/homeuser/${UserName}/${StoryID}/poseanimator`)

        } else {
            console.log("error")
        }
    }
    const getDataCustom = async () => {
        const res = await fetch(`/poseanimatorCustom/${StoryID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setDataC(data[0])
            console.log("get data");
        }
    }

    useEffect(() => {
        getDataCustom();
    }, []);

    return (
        <>
            <div className='container mt-3'>
                <h1 style={{ color: 'white' }}>Upload Image</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'white' }} >Select Your Image</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addUserData}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default UploadImage