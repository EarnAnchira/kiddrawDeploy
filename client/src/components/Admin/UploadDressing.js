import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Scrollbars } from "react-custom-scrollbars"

function UploadDressing() {
    const { AdminName } = useParams("");
    const [file, setFile] = useState("");
    const [DressingType, setDressingType] = useState('');
    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const addUserData = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", file)
        formData.append("DressingType", DressingType)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await axios.post(`/uploaddressing/${AdminName}`, formData, config);
        if (res.data.status === 201) {
            history(`/homeadmin/${AdminName}`)
        } else {
            console.log("error")
        }
    }

    return (
        <>
            {
            }
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>UPLOAD DRESSING</h1>
                <Scrollbars style={{ swidth: 400, height: 600 }}>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Dressing Type</Form.Label>
                            {/* <Form.Control type="text" name='PageType' onChange={event => setPageType(event.target.value)} /> */}
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                name='DressingType' onChange={event => setDressingType(event.target.value)} >
                                <option selected>Open this select dressing type</option>
                                <option value="Head">Head</option>
                                <option value="Body">Body</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ color: 'white' }} >Select Image</Form.Label>
                            <Form.Control type="file" name='photo' onChange={setimgfile} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={addUserData}>
                            ADD DRESSING
                        </Button>
                    </Form></Scrollbars>
            </div>
        </>
    )
}

export default UploadDressing