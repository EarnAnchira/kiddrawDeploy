import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Scrollbars } from "react-custom-scrollbars"
import { useParams } from "react-router-dom"

function StoryDetailFormNormal() {
    const { StoryID } = useParams("");
    const { AdminName } = useParams("");
    const [StoryDetailThai, setStoryDetailThai] = useState('');
    const [StoryDetailEng, setStoryDetailEng] = useState('');
    const [PageNo, setPageNo] = useState('');
    const [PageNoAnswer1Extra, setPageNoAnswer1Extra] = useState('');
    const [PageNoAnswer2Extra, setPageNoAnswer2Extra] = useState('');

    const [PageNoNext, setPageNoNext] = useState('');
    const [Storyid, setStoryID] = useState('');
    const [PageType, setPageType] = useState('');
    const [SceneImage, setFile] = useState("");
    const history = useNavigate();

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append("photo", SceneImage)
        formData.append("StoryDetailThai", StoryDetailThai);
        formData.append("StoryDetailEng", StoryDetailEng);
        formData.append("PageNo", PageNo)
        formData.append("StoryID", StoryID);
        formData.append("PageType", PageType);
        formData.append("PageNoNext", PageNoNext);
        formData.append("PageNoAnswer1Extra", PageNoAnswer1Extra);
        formData.append("PageNoAnswer2Extra", PageNoAnswer2Extra);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        axios.post('/storydetailnormal', formData, config)
            .then(response => {
                console.log(response.data);
                history(`/homeadmin/${AdminName}`)
                alert("add story detail success")
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
                            <Form.Label style={{ color: 'white' }}>Page Type</Form.Label>
                            <Form.Control type="text" name='PageType' value={"normal"} onChange={event => setPageType(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>PageNo</Form.Label>
                            <Form.Control type="text" name='PageNo' onChange={event => setPageNo(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story Detail Eng</Form.Label>
                            <Form.Control as="textarea" rows={3} name='StoryDetailEng' onChange={event => setStoryDetailEng(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>Story Detail Thai</Form.Label>
                            <Form.Control as="textarea" rows={3} name='StoryDetailThai' onChange={event => setStoryDetailThai(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>SceneImage</Form.Label>
                            <Form.Control type="file" name='SceneImage' onChange={setimgfile} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>PageNo Next</Form.Label>
                            <Form.Control type="text" name='PageNoNext' onChange={event => setPageNoNext(event.target.value)} />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>PageNo Next</Form.Label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                name='PageNoNext' onChange={event => setPageNoNext(event.target.value)} >
                                <option selected value=""></option>
                                <option value="end">end</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>PageNo Answer1 Extra</Form.Label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                name='PageNoAnswer1Extra' onChange={event => setPageNoAnswer1Extra(event.target.value)} >
                                <option selected value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color: 'white' }}>PageNo Answer2 Extra</Form.Label>
                            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                name='PageNoAnswer2Extra' onChange={event => setPageNoAnswer2Extra(event.target.value)} >
                                <option selected value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                            </select>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            ADD STORY
                        </Button>
                    </Form>
                </Scrollbars>
            </div>
        </>
    );
}

export default StoryDetailFormNormal