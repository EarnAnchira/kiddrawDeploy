import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Scrollbars } from "react-custom-scrollbars"
function EditStory() {
    const { StoryID } = useParams("");
    const { AdminName } = useParams("");
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [StoryTitleEng, setStoryTitleEng] = useState('');
    const [StoryTitleThai, setStoryTitleThai] = useState('');
    const [Author, setAuthor] = useState('');
    const [IntroductionStoryEng, setIntroductionStoryEng] = useState('');
    const [IntroductionStoryThai, setIntroductionStoryThai] = useState('');
    const [PublisherName, setPublisherName] = useState('');
    const [DatePublication, setDatePublication] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/updatestory/${StoryID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ StoryTitleEng, StoryTitleThai, Author, IntroductionStoryEng, IntroductionStoryThai, PublisherName, DatePublication })
        });
        const message = await response.text();
        console.log(message);
        history(`/homeadmin/${AdminName}`)
    };

    const getData = async () => {
        const res = await fetch(`/getdata/${StoryID}`, {
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
            setData(data[0])
            console.log("get data");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (<>
        <div className="container mt-2">
            <h1 className='text-center mt-2' style={{ color: 'white' }}>EDIT STORY</h1>
            <Scrollbars style={{ swidth: 400, height: 600 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Story Title Eng:</Form.Label>
                        <Form.Control type="text" value={StoryTitleEng} placeholder={data.StoryTitleEng} onChange={(e) => setStoryTitleEng(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Story Title Thai:</Form.Label>
                        <Form.Control type="text" value={StoryTitleThai} placeholder={data.StoryTitleThai} onChange={(e) => setStoryTitleThai(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Author:</Form.Label>
                        <Form.Control type="text" value={Author} placeholder={data.Author} onChange={(e) => setAuthor(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Introduction Story Eng:</Form.Label>
                        <Form.Control type="text" value={IntroductionStoryEng} placeholder={data.IntroductionStoryEng} onChange={(e) => setIntroductionStoryEng(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Introduction Story Thai:</Form.Label>
                        <Form.Control type="text" value={IntroductionStoryThai} placeholder={data.IntroductionStoryThai} onChange={(e) => setIntroductionStoryThai(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Publisher Name:</Form.Label>
                        <Form.Control type="text" value={PublisherName} placeholder={data.PublisherName} onChange={(e) => setPublisherName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white' }}>Date Publication:</Form.Label>
                        <Form.Control type="text" value={DatePublication} placeholder={data.DatePublication} onChange={(e) => setDatePublication(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        UPDATE STORY
                    </Button>
                </Form></Scrollbars>
        </div>
    </>
    );
}
export default EditStory;
