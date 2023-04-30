import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
const HomeUser = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = () => {
        const filtered = data.filter((el) =>
            el.StoryTitleEng.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const getUserData = async () => {
        const res = await axios.get("/getdata", {
            params: { q: query },
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (res.data.status === 201) {
            console.log("data get");
            handleFilter()
            setData(res.data.data);
            setFilteredData(res.data.data);
        }
        else {
            console.log("error")
        }
    }

    useEffect(() => {
        getUserData()

    }, [])

    return (
        <>
            {/* Serch box */}
            <ul class="form-inline">
                <input class="form-control mr-sm-2" placeholder="search" aria-label="search" style={{ borderRadius: "25px" }}
                    type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleFilter} class="btn btn-outline-success my-2 my-sm-0">search</button>
            </ul>
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>STORY</h1>
                <div className='d-flex justtify-content-between align-iteams-center mt-5'>

                    {/* Data Story from database */}
                    {data.filter(el => el.StoryTitleEng.toLowerCase().includes(query.toLowerCase()) || el.StoryTitleEng.includes(query) || el.StoryTitleThai.toLowerCase().includes(query.toLowerCase())
                    ).map((el, i) => {
                        return (
                            <>
                                <Card style={{ width: '22rem', height: "30rem", background: '#FFDFA8', marginRight: '10px' }} className="mb-3">
                                    <Card.Img variant="top" src={`/uploads/${el.StoryImage}`} style={{ width: '200px', textAlign: "center", margin: "auto", marginTop: '10px' }} className="mb-2"></Card.Img>
                                    <Card.Body className='text-center'>
                                        <Card.Title key={el.StoryTitleEng}> {el.StoryTitleEng} </Card.Title>
                                        <Card.Title key={el.StoryTitleThai}> {el.StoryTitleThai} </Card.Title>
                                        <Card.Text>Introduction : {el.IntroductionStoryEng}</Card.Text>
                                        <Card.Text>เรื่องย่อ : {el.IntroductionStoryThai}</Card.Text>
                                        <NavLink to={`${el.StoryID}`} className="text-decoration-none text-dark"><Button style={{ marginRight: '2px' }} variant="info" className='col-lg-6 text-center'>Select</Button></NavLink>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default HomeUser