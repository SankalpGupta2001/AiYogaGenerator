// src/YogaForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import { jsPDF } from "jspdf";
const excludeWords = /\b(|\*)+\b/g;

const YogaForm = ({ onGenerate }) => {

  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [generatedRoutines, setGeneratedRoutines] = useState([]);



  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-routine', {
        duration: duration,
        difficulty: difficulty,
      });

      onGenerate(response.data.routines);
      setGeneratedRoutines(response.data.routines);
    } catch (error) {
      console.error('Error generating routine:', error);
    }
  };

  console.log(generatedRoutines,"oooooooooooooooo");

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0);

    let j=35;
    generatedRoutines.forEach((routine, index) => {
      const yOffset = 0;

      doc.setTextColor(255, 0, 0);
  
      const pose=routine['Pose']?routine['Pose'].replace(excludeWords, '').trim():'';

      doc.text(pose, 20, j + yOffset);j=j+10;

     
  
      const repetitions=routine['Repetitions']?routine['Repetitions'].replace(excludeWords, '').trim():'';
      doc.text(repetitions, 20, j + yOffset);j=j+10;
      doc.setTextColor(0, 0, 0);

      doc.setFont('helvetica', 'normal');
      const descriptionText = routine['Descriptions']?routine['Descriptions'].replace(excludeWords, '').trim():'';
      const descriptionLines = doc.splitTextToSize(descriptionText, 150); // Adjusted the width based on your preference
      descriptionLines.forEach((line, lineIndex) => {
      doc.text(line, 20, j + yOffset);j=j+10;
      
      });
      doc.text('', 20, j + yOffset); // You can adjust the value to control the space
      j=j+10;
      if(j >= 200){
      doc.addPage(); j=0;

      }
    });

  
    doc.save('yoga-routines.pdf');
  };
  



  return (
    <div className="yoga-form" >
      <h2>Yoga Routine Generator</h2>
      <div className="form-group">
        <label className="label">Duration (minutes):</label>
        <input
          type="number"
          className="input-field"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Difficulty:</label>
        <select
          className="select-field"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div className="button-group">
        <button className="generate-button" onClick={handleGenerate}>
          Generate Routine
        </button>
        
        <button
  className="download-button"
  onClick={generatePDF}
  disabled={generatedRoutines.length === 0}
  style={{ backgroundColor: generatedRoutines.length === 0 && 'lightgreen' }}
>
  Download
</button>      </div>
    </div>

  );
};

export default YogaForm;
