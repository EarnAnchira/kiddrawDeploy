import { ReactP5Wrapper } from "react-p5-wrapper";
import * as ml5 from "ml5";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Scrollbars } from "react-custom-scrollbars"
import Form from 'react-bootstrap/Form';
import ReactAudioPlayer from 'react-audio-player';
import { useParams, useNavigate } from "react-router-dom"
import Modal from "react-bootstrap/Modal";

const ImageComponent = () => {
    const { StoryID } = useParams("");
    const { UserName } = useParams("");
    const { PageNoAnswer2 } = useParams("");
    const { PageNoAnswer1Extra } = useParams("");
    const { PageNoAnswer2Extra } = useParams("");
    const history = useNavigate();

    const [dataT, setDataT] = useState([]);
    const [dataD, setDataD] = useState([]);
    const [dataC, setDataC] = useState([]);

    const [AudioEng, setAudioEng] = useState(null);
    const [AudioThai, setAudioThai] = useState(null);

    const [AudioAnswerEng1, setAudioAnswerEng1] = useState(null);
    const [AudioAnswerEng2, setAudioAnswerEng2] = useState(null);

    const fetchAudioAnswerEng1 = async () => {
        const response = await fetch(`/audioanswereng1/${StoryID}/${PageNoAnswer2}`);
        const blob = await response.blob();
        setAudioAnswerEng1(blob);
    };

    const fetchAudioAnswerEng2 = async () => {
        const response = await fetch(`/audioanswereng2/${StoryID}/${PageNoAnswer2}`);
        const blob = await response.blob();
        setAudioAnswerEng2(blob);
    };

    const fetchAudioEng = async () => {
        const response = await fetch(`/audioeng/${StoryID}/${PageNoAnswer2}`);
        const blob = await response.blob();
        setAudioEng(blob);
    };

    const fetchAudioThai = async () => {
        const response = await fetch(`/audiothai/${StoryID}/${PageNoAnswer2}`);
        const blob = await response.blob();
        setAudioThai(blob);
    };

    const getDataTitle = async () => {
        const res = await fetch(`/poseanimatorT/${StoryID}`, {
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
            setDataT(data[0])
            console.log("get data");
        }
    }

    const getDataDetail = async () => {
        const res = await fetch(`/poseanimatorD/${StoryID}/${PageNoAnswer2}`, {
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
            setDataD(data[0])
            console.log("get data");
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
        getDataTitle();
        getDataDetail();
        getDataCustom();
    }, []);

    function PostAnimator(poses) {
        let capture;
        let posenet;
        let singlePose, skeleton;
        let bgImage;
        let imgUpload, imgDrawing,imgDressingHead,imgDressingBody;

        poses.preload = function () {
            if (dataC.UploadImg != null) {
                imgUpload = poses.loadImage(`/uploads/${dataC.UploadImg}`);
            } else if (dataC.Drawing != null) {
                imgDrawing = poses.loadImage(`/${dataC.Drawing}`);
            }else if (dataC.DressingHead != null && dataC.DressingBody!= null ) {
                imgDressingHead = poses.loadImage(`/uploads/${dataC.DressingHead}`);
                imgDressingBody = poses.loadImage(`/uploads/${dataC.DressingBody}`);

            }
        };

        poses.setup = function () {
            capture = poses.createCapture(poses.VIDEO);
            // capture.hide();
            capture.position(720, 8);
            capture.size(-1, 150);
            poses.createCanvas(720, 400);
            posenet = ml5.poseNet(capture, modelLoaded);
            posenet.on('pose', receivedPoses);
            bgImage = poses.loadImage(`/uploads/${dataD.SceneImage}`);
        };

        function receivedPoses(poses) {
            // console.log(poses);
            if (poses.length > 0) {
                singlePose = poses[0].pose;
                skeleton = poses[0].skeleton;
            }
            // console.log(noseX + " " + noseY);
        }
        function modelLoaded() {
            // console.log('Model Loaded!');
        }

        poses.draw = function () {
            poses.background(bgImage);
            if (singlePose) {
                if (dataC.Drawing != null) {
                    poses.image(imgDrawing, singlePose.nose.x - 200, singlePose.nose.y - 150, 400, 400);
                } else if (dataC.UploadImg != null) {
                    poses.image(imgUpload, singlePose.nose.x - 200, singlePose.nose.y - 150, 400, 400);
                }else if (dataC.DressingHead != null && dataC.DressingBody != null)  {
                    poses.image(imgDressingBody, singlePose.nose.x - 200, singlePose.nose.y - 100, 400, 400);
                    poses.image(imgDressingHead, singlePose.nose.x - 200, singlePose.nose.y-150, 400, 400);
                }else {
                    console.log("error")
                }
            }
        };
    };

    // select answer
    const [isOpen, setIsOpen] = React.useState(false);
    const showModal = () => {
        if (dataD.PageType === "normal" && dataD.PageNoAnswer1Extra===PageNoAnswer1Extra && dataD.PageNoNext!=="end") {
            setIsOpen(false);
            dataD.PageNoNext = PageNoAnswer1Extra
            history(`/homeuser/${UserName}/${StoryID}/poseanimator/${dataD.PageNoNext}/n2/${PageNoAnswer2Extra}`);
        }
        if (dataD.PageType === "normal" && (dataD.PageNoAnswer2Extra===PageNoAnswer2Extra )) {
            setIsOpen(false);
            dataD.PageNoNext = PageNoAnswer2Extra
            history(`/homeuser/${UserName}/${StoryID}/poseanimator/${dataD.PageNoNext}/n2/${PageNoAnswer1Extra}`);
        } 
        else
        if (dataD.PageType === "normal"&& dataD.PageNoAnswer1Extra!==PageNoAnswer1Extra && dataD.PageNoAnswer2Extra!==PageNoAnswer2Extra) {
            setIsOpen(false);
            history(`/homeuser/${UserName}/${StoryID}/poseanimator/${dataD.PageNoNext}/n2/${PageNoAnswer1Extra}/${PageNoAnswer2Extra}`);
        } 
        else if (dataD.PageType === "alternative") {
            setIsOpen(true);
        }
        if(dataD.PageNoNext==="end"){
            alert("END STORY")
            history(`/homeuser/${UserName}`);
        }
    };
    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <>
        {/* Show select answer */}
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>
                        {dataD.QuestionEng}
                        <br />
                        {dataD.QuestionThai}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please select an answer</Modal.Body>
                <div className="d-flex justify-content-center">
                    <NavLink to={`/homeuser/${UserName}/${StoryID}/poseanimator/n2/${dataD.PageNoAnswer1Extra}/${dataD.PageNoAnswer1}`} className="text-decoration-none text-dark"><Button variant="warning" size="lg" style={{ marginRight: '5px' }}>{dataD.AnswerEng1}</Button></NavLink>
                    <NavLink to={`/homeuser/${UserName}/${StoryID}/poseanimator/n2/${dataD.PageNoAnswer2Extra}/${dataD.PageNoAnswer2}/Ans2`} className="text-decoration-none text-dark"><Button variant="info" size="lg" style={{ marginRight: '5px' }}>{dataD.AnswerEng2}</Button></NavLink>
                </div>
                <Modal.Footer>
                    {/* audio answer */}
                    <div className="container mt-2">
                        <Button variant="outline-warning" style={{ marginRight: '5px' }} onClick={fetchAudioAnswerEng1}>Play audio</Button>
                        {AudioAnswerEng1 && <ReactAudioPlayer src={URL.createObjectURL(AudioAnswerEng1)} controls />}
                        <Button variant="outline-info" onClick={fetchAudioAnswerEng2}>Play audio</Button>
                        {AudioAnswerEng2 && <ReactAudioPlayer style={{ color: 'brown' }} src={URL.createObjectURL(AudioAnswerEng2)} controls />}
                    </div>
                    <Button variant="outline-danger" style={{ marginRight: '5px' }} onClick={hideModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <h1 className='text-center mt-2' style={{ color: 'white' }}>{dataT.StoryTitleEng}  {dataT.StoryTitleThai}</h1>
            <Scrollbars style={{ swidth: 600, height: 600 }}>
                <Form>
                    <div className="container mt-2">
                        {/* poseanimator */}
                        <div className="container mt-2">
                            <ReactP5Wrapper sketch={PostAnimator} />
                        </div>
                        {/* audio story */}
                        <div className="container mt-2">
                            <Button variant="success" style={{ marginRight: '5px' }} onClick={fetchAudioEng}>Play audio english</Button>
                            {AudioEng && <ReactAudioPlayer src={URL.createObjectURL(AudioEng)} controls />}
                            <Button variant="success" onClick={fetchAudioThai}>Play audio thai</Button>
                            {AudioThai && <ReactAudioPlayer style={{ color: 'brown' }} src={URL.createObjectURL(AudioThai)} controls />}
                        </div>
                        {/* story detail */}
                        <div className="container mt-2">
                            <Card style={{ width: '60rem', height: "11rem", background: '#BD9165' }} className="mb-3">
                                <Card.Body className='text-center' >
                                    <Card.Text >
                                        {dataD.StoryDetailEng}
                                    </Card.Text>
                                    <Card.Text>
                                        {dataD.StoryDetailThai}
                                    </Card.Text>
                                    <div className="text-end">
                                        <Button variant="success" onClick={showModal} >Next</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Form>
            </Scrollbars>
        </>
    )
};
export default ImageComponent