import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const SelectCreateAvatar = () => {
    return (
        <>
            <h1 className='text-center mt-2' style={{ color: 'white' }}>SELECT CREATE AVTAR</h1>
            <div className='d-flex justtify-content-between align-iteams-center mt-5' style={{ margin: "10px 10px 10px 300px" }}>
                <Card style={{ borderRadius: "50%", width: '15rem', height: "auto", background: '#FFDFA8', marginRight: '30px' }} className='text-center mt-2'>
                    <NavLink to="drawing" >
                        <img src="/drawing.png" alt="" roundedcircle={true} style={{ borderRadius: "50%", height: "150px", width: "150px", margin: "10px 10px 10px 0px" }}></img>
                        <Button style={{ color: '#000000', background: '#d47070', width: '10rem', height: "auto", margin: "10px 10px 10px 10px" }} type="submit" >
                            DRAWING
                        </Button>
                    </NavLink>
                </Card>
                <Card style={{ borderRadius: "50%", width: '15rem', height: "auto", background: '#FFDFA8', marginRight: '30px' }} className='text-center mt-2'>
                    <NavLink to="uploadimage" >
                        <img src="/upload.png" alt="" roundedcircle={true} style={{ borderRadius: "10%", height: "150px", width: "150px", margin: "10px 10px 10px 10px" }}></img>
                        <Button style={{ color: '#000000', background: '#d47070', width: '10rem', height: "auto", margin: "10px 10px 10px 10px" }} type="submit" >
                            UPLOAD IMAGE
                        </Button>
                    </NavLink>
                </Card>
                <Card style={{ borderRadius: "50%", width: '15rem', height: "auto", background: '#FFDFA8', marginRight: '30px' }} className='text-center mt-2'>
                    <NavLink to="dressing">
                        <img src="/dress.png" alt="" roundedcircle={true} style={{ borderRadius: "50%", height: "150px", width: "150px", margin: "10px 10px 10px 10px" }}></img>
                        <Button style={{ color: '#000000', background: '#d47070', width: '10rem', height: "auto", margin: "10px 10px 10px 10px" }} type="submit" >
                            DRESSING
                        </Button>
                    </NavLink>
                </Card>
            </div>
        </>
    )
}
export default SelectCreateAvatar