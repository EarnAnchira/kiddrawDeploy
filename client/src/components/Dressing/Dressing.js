import './Dressing.css';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from "react-router-dom"

function Dressing() {
    const [dressingHead, setDressingHead] = useState([]);
    const [dressingBody, setDressingBody] = useState([]);

    const [selectedDressingHead, setSelectedDressingHead] = useState({});
    const [selectedDressingBody, setSelectedDressingBody] = useState({});
    const jsonArray = [selectedDressingHead, selectedDressingBody];

    const { UserName } = useParams("");
    const { StoryID } = useParams("");
    const [dataC, setDataC] = useState([]);
    const history = useNavigate();

    async function fetchDressingHead() {
        const response = await fetch('/GetDressingHead');
        const data = await response.json();
        setDressingHead(data);
    }
    async function fetchDressingBody() {
        const response = await fetch('/GetDressingBody');
        const data = await response.json();
        setDressingBody(data);
    }

    useEffect(() => {
        fetchDressingHead();
        fetchDressingBody();
    }, []);

    async function handleDressingClickHead(dressing) {
        setSelectedDressingHead(dressing);
    }
    async function handleDressingClickBody(dressing) {
        setSelectedDressingBody(dressing);
    }

    async function handleSaveClick() {
        const response = await fetch(`/SaveDressing/${UserName}/${StoryID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonArray),
        });
        if (response.ok) {
            console.log('Dressing saved');
            history(`/homeuser/${UserName}/${StoryID}/poseanimator`)
        } else {
            console.error('Error saving dressing');
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
        <div className='container py-5' >
            <div className='row'>
                <div className='col-lg-4' >
                    {/* SELECTED */}
                    <div className="figureDis">
                        <div className="figbody">
                            {selectedDressingBody.BodyImg && (
                                <div className="fighead">
                                    <h4 style={{ color: 'white' }} >Selected dressing:</h4>
                                    <Card.Img variant="top"
                                        src={`/uploads/${selectedDressingBody.BodyImg}`}
                                        style={{ width: '400px', textAlign: "center", margin: "auto", marginTop: '10px' }}
                                        className="mb-2"
                                    ></Card.Img>
                                </div>
                            )}
                            {selectedDressingHead.HeadImg && (
                                <div className="fighead">
                                    <h4 style={{ color: 'white' }} >Selected dressing:</h4>
                                    <Card.Img variant="top"
                                        src={`/uploads/${selectedDressingHead.HeadImg}`}
                                        style={{ width: '400px', textAlign: "center", margin: "auto", marginTop: '10px' }}
                                        className="mb-2"
                                    ></Card.Img>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='col-lg-8' >
                    {/* SELECT HEAD and BODY*/}
                    <div className="figure container">
                        <h3 className="text-center" style={{ color: 'white' }}> CUSTOM </h3>
                        <h4 style={{ color: 'white' }}> select your head </h4>
                        <div className="figure-head" >
                            {dressingHead.map((dressing) => (
                                <li key={dressing.DressingID}
                                    onClick={() => handleDressingClickHead(dressing)}>
                                    <Card.Img variant="top"
                                        src={`/uploads/${dressing.HeadImg}`}
                                        style={{ width: '200px', textAlign: "center", margin: "auto", marginTop: '10px' }}
                                        className="mb-2"></Card.Img>
                                </li>
                            ))}
                        </div>
                        <h4 style={{ color: 'white' }}> select your body </h4>
                        <div className="figure-body">
                            {dressingBody.map((dressing) => (
                                <li key={dressing.DressingID}
                                    onClick={() => handleDressingClickBody(dressing)}>
                                    <Card.Img variant="top"
                                        src={`/uploads/${dressing.BodyImg}`}
                                        style={{ width: '200px', textAlign: "center", margin: "auto", marginTop: '10px' }}
                                        className="mb-2"></Card.Img>
                                </li>
                            ))}
                        </div>
                        <button className="button" onClick={handleSaveClick}>SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dressing;
