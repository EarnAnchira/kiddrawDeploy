import React, { useState, useEffect, useRef } from 'react';
import './Drawing.css';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"

function Drawing() {
  const { StoryID } = useParams("");
  const { UserName } = useParams("");
  const { CustomID } = useParams("");
  const { CharacterID } = useParams("");
  const [dataC, setDataC] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState('#000000');
  const [penSize, setPenSize] = useState(15);
  const [penStyle] = useState('round');
  const canvasWidth = 400;
  const canvasHeight = 500;
  const history = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.lineWidth = penSize;
    ctx.lineJoin = penStyle;
    ctx.lineCap = penStyle;
    ctx.strokeStyle = color;
  }, [color, penSize, penStyle]);

  function handleColorChange(event) {
    const newColor = event.target.value;
    setColor(newColor);
  }

  function handlePenSizeChange(event) {
    const newPenSize = parseInt(event.target.value);
    setPenSize(newPenSize);
  }

  function handleMouseDown(event) {
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  function handleMouseMove(event) {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  }
  const saveDrawing = async (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pngData = canvas.toDataURL('image/png');
    axios.post(`/canvas/${UserName}/${StoryID}`, { pngData })
      .then(() => {

        history(`/homeuser/${UserName}/${StoryID}/poseanimator`)
        console.log('Drawing saved successfully');
      })
      .catch((error) => {
        console.error('Error saving drawing:', error);
      });
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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
    <div className="canvas-wrapper">
      <canvas data-testid="canvas" className="canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <div className="tool">
        <label htmlFor="color-picker"> PEN COLOR: </label>
        <input
          type="color"
          id="color-picker"
          value={color}
          onChange={handleColorChange}
        />
        <label htmlFor="pen-size"> PEN SIZE: </label>
        <input
          type="range"
          id="pen-size"
          min="1"
          max="50"
          value={penSize}
          onChange={handlePenSizeChange}
        />
        <button className="dowload_btn" onClick={saveDrawing}> Download </button>
        <button className="clear_btn" onClick={clear}> Clear </button>
      </div>
    </div>
  );
}
export default Drawing;
