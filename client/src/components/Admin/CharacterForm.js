import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Scrollbars } from "react-custom-scrollbars"
import { useParams } from "react-router-dom"

function CharacterForm() {
    const { StoryID } = useParams("");
    const [Storyid, setStoryID] = useState('');
    const { AdminName } = useParams("");
    const [CharacterImg, setFile] = useState("");
    const [CharacterID, setCharacterID] = useState('');
    const [CharacterName, setCharacterName] = useState('');

    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("StoryID", StoryID);
        formData.append("CharacterID", CharacterID);
        formData.append("CharacterName", CharacterName);
        formData.append("photo", CharacterImg)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        axios.post('/characterform', formData, config)
            .then(response => {
                console.log(response.data);
                history(`/homeadmin/${AdminName}`)
                alert("add character success")
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>UPLOAD STORY DETAIL</h1>
                <Scrollbars style={{ swidth: 400, height: 600 }}>
                    <Form >

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story ID</Form.Label>
                            <Form.Control type="text" name='StoryID' value={StoryID} onChange={event => setStoryID(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Character Image</Form.Label>
                            <Form.Control type="file" name='CharacterImg' onChange={setimgfile} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Character ID</Form.Label>
                            <Form.Control type="text" name='CharacterID' onChange={event => setCharacterID(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Character Name</Form.Label>
                            <Form.Control type="text" name='CharacterName' onChange={event => setCharacterName(event.target.value)} />
                        </Form.Group> 

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            ADD CHARACTER
                        </Button>
                    </Form>
                </Scrollbars>
            </div>
        </>
    );
}
export default CharacterForm