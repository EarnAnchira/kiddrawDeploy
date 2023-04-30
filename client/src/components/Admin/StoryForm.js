import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Scrollbars } from "react-custom-scrollbars"

function StoryForm() {
    const { AdminName } = useParams("");
    const [fid, setFid] = useState("");
    const [fstorytitleeng, setFstorytitleeng] = useState("");
    const [fstorytitlethai, setFstorytitlethai] = useState("");
    const [fauthor, setFauthor] = useState("");
    const [fintroductionstoryeng, setFintroductionstoryeng] = useState("");
    const [fintroductionstorythai, setFintroductionstorythai] = useState("");
    const [fpublishername, setFpublishername] = useState("");
    const [fdatepublication, setFdatepublication] = useState("");
    const [file, setFile] = useState("");
    const history = useNavigate();

    const setid = (e) => {
        setFid(e.target.value)
    }
    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const getUserData = async () => {
        const res = await axios.get(`/storyform/${AdminName}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.data.status === 201) {
            console.log("data get get get get");
        } else {
            console.log("error")
        }
    }

    const addUserData = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", file)
        formData.append("fid", fid);
        formData.append("fstorytitleeng", fstorytitleeng);
        formData.append("fstorytitlethai", fstorytitlethai);
        formData.append("fauthor", fauthor);
        formData.append("fintroductionstoryeng", fintroductionstoryeng);
        formData.append("fintroductionstorythai", fintroductionstorythai);
        formData.append("fpublishername", fpublishername);
        formData.append("fdatepublication", fdatepublication);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await axios.post(`/storyform/${AdminName}`, formData, config);
        if (res.data.status === 201) {
            history(`/homeadmin/${AdminName}`)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {
            }
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>UPLOAD STORY</h1>
                <Scrollbars style={{ swidth: 400, height: 600 }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story ID</Form.Label>
                            <Form.Control type="text" name='fid' onChange={setid} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ color: 'white' }} >Select Story Image</Form.Label>
                            <Form.Control type="file" name='photo' onChange={setimgfile} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story Title Eng</Form.Label>
                            <Form.Control type="text" name='fstorytitleeng' onChange={(e) => setFstorytitleeng(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story Title Thai</Form.Label>
                            <Form.Control type="text" name='fstorytitlethai' onChange={(e) => setFstorytitlethai(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Author</Form.Label>
                            <Form.Control type="text" name='fauthor' onChange={(e) => setFauthor(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Introduction Story Eng</Form.Label>
                            <Form.Control type="text" name='fintroductionstoryeng' onChange={(e) => setFintroductionstoryeng(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Introduction Story Thai</Form.Label>
                            <Form.Control type="text" name='fintroductionstorythai' onChange={(e) => setFintroductionstorythai(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Publisher Name</Form.Label>
                            <Form.Control type="text" name='fpublishername' onChange={(e) => setFpublishername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Date Publication</Form.Label>
                            <Form.Control type="text" name='fdatepublication' onChange={(e) => setFdatepublication(e.target.value)} placeholder="xx-xx-20xx" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={addUserData}>
                            ADD STORY
                        </Button>
                    </Form></Scrollbars>
            </div>
        </>
    )
}

export default StoryForm