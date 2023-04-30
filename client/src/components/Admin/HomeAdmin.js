import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from "moment";
import Alert from 'react-bootstrap/Alert';
import Scrollbars from 'react-custom-scrollbars';
import Form from 'react-bootstrap/Form';
const Home = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
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

    const dltStory = async (StoryID) => {
        console.log(StoryID)
        const res = await axios.delete(`/${StoryID}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.data.status === 201) {
            getUserData()
            setShow(true)
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
                show ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        Delete
                    </Alert> : ""
            }
            <ul class="form-inline">
                <input class="form-control mr-sm-2" placeholder="search" aria-label="search" style={{ borderRadius: "25px" }}
                    type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleFilter} class="btn btn-outline-success my-2 my-sm-0">search</button>
            </ul>
            <div className="container mt-2">
                <h1 className='text-center mt-2' style={{ color: 'white' }}>Story management system</h1>
                <div className="text-end mt-3">
                    <NavLink to={`storyform`} className="text-decoration-none text-light"><Button variant="primary" style={{ marginRight: '5px' }}>New Story</Button></NavLink>
                    <NavLink to={`uploaddressing`} className="text-decoration-none text-light"><Button variant="success">New Dressing</Button></NavLink>
                </div>
                <Scrollbars style={{ swidth: 600, height: 600 }}>
                    <Form>
                        <table className="table table-hover mt-3">
                            <thead class="thead-dark">
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Story Name</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(el => el.StoryTitleEng.toLowerCase().includes(query.toLowerCase()) || el.StoryTitleEng.includes(query) || el.StoryTitleThai.toLowerCase().includes(query.toLowerCase())
                                ).map((el, i) => (
                                    <tr className="table-info" key={el.StoryID}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Card.Img variant="top" src={`/uploads/${el.StoryImage}`} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mb-2"></Card.Img>
                                        </td>
                                        <td>{el.StoryTitleEng}</td>
                                        <td>{moment(el.date).format("DD-MM-YYYY")}</td>
                                        <td>
                                            <button style={{ marginRight: '2px' }} onClick={() => dltStory(el.StoryID)} type="button" className="btn btn-danger"> Delete </button>
                                            <NavLink to={`editstory/${el.StoryID}`} className="text-decoration-none text-dark"><Button style={{ marginRight: '2px' }} variant="warning">Edit</Button></NavLink>
                                            {/* <NavLink to={`view/${el.StoryID}`} className="text-decoration-none text-dark"><Button style={{ marginRight: '2px' }} variant="success">View</Button></NavLink> */}
                                            <NavLink to={`storydetailformnormal/${el.StoryID}`} className="text-decoration-none text-dark"><Button style={{ marginRight: '2px' }} variant="info">Add story normal page</Button></NavLink>
                                            <NavLink to={`storydetailformalternative/${el.StoryID}`} className="text-decoration-none text-dark"><Button style={{ marginRight: '2px' }} variant="info">Add story alternative page</Button></NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Form>
                </Scrollbars>
            </div>
        </>
    )
}

export default Home