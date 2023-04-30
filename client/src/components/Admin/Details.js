import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import moment from "moment";
import { useParams } from "react-router-dom"

const Details = () => {
    const { StoryID } = useParams("");
    const [data, setData] = useState([]);
    const [Character, setCharater] = useState([]);

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

    const getCharacter = async () => {
        const res = await fetch(`/getcharacter/${StoryID}`, {
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
            setCharater(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getData()
        getCharacter()
    }, [])

    return (
        <>
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>STORY</h1>
                <div className='d-flex justtify-content-between align-iteams-center mt-5'>
                    <>
                        <Card style={{ width: '22rem', height: "18rem" }} className="mb-3">
                            <Card.Img variant="top" src={`/uploads/${data.StoryImage}`} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mb-2"></Card.Img>
                            <Card.Body className='text-center'>
                                <Card.Title>Story Name: {data.StoryTitleEng}</Card.Title>
                                <Card.Text>
                                    Date Added : {moment(data.date).format("DD-MM-YYYY")}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </>
                </div>
            </div>
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>CHARACTER</h1>
                <div className='d-flex justtify-content-between align-iteams-center mt-5'>
                    {Character.map((el, i) => {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "30rem", background: '#FFDFA8', marginRight: '10px' }} className="mb-3">
                                    <Card.Img variant="top" src={`/uploads/${el.CharacterImg}`} style={{ width: '200px', textAlign: "center", margin: "auto", marginTop: '10px' }} className="mb-2"></Card.Img>
                                    <Card.Body className='text-center'>
                                        <Card.Title>Character Name: {el.CharacterName}</Card.Title>
                                        <Card.Text>
                                            Date Added : {moment(el.date).format("DD-MM-YYYY")}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default Details