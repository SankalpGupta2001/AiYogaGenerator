// src/YogaList.js
import React from 'react';
import "./App.css";

import LoopIcon from '@mui/icons-material/Loop';
const excludeWords = /\b(|\*)+\b/g;

const Loader = () => (
  <div className="loader-container">
  <div className="loader"><LoopIcon style={{fontSize:60}}/></div>
  <p>One minute please wait...</p>
</div>

);

const RoutineList = ({ routines }) => {
  return (
    <div className="container mt-4">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh',marginBottom: routines.length === 0 && 100 }}>
        <h4
  style={{
    backgroundColor: '#eaeaea',
    width: 450,
    textAlign: 'center',
    padding: 10,
    color: 'green',
    borderRadius: 40,
      
  }}
>
  Enter Inputs and Get's Your Daily Yoga Routine For Free
</h4>

</div>
{routines.length === 0 ? (
        // Render loader when no routines
        <Loader />
      ) :(
      <ul className="list-group" style={{ listStyleType: 'none' }}>
        {routines.map((routine, index) => (
          <li
            key={index}
            className={`list-group-item custom-list-item ${index % 2 === 0 ? 'bg-grey' : 'bg-white'}`}
            style={{marginBottom:30,padding:20,borderRadius:20}}
          >
            
            <div className="mt-2 pose" >
              <strong>
              {routine['Pose']?routine['Pose'].replace(excludeWords, '').trim():''}
              </strong>
              
            </div>
            <div className="repetitions">
              <strong>
              {routine['Repetitions']?routine['Repetitions'].replace(excludeWords, '').trim():''}
              </strong>
            </div>
            <div className="descriptions">
              
              {routine['Descriptions']?routine['Descriptions'].replace(excludeWords, '').trim():''}
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default RoutineList;
