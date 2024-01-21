const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

require('dotenv').config();



const { v4: uuidv4 } = require('uuid');




const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const supabaseUrl = 'https://yyqgmgzclbdcbmhsamqp.supabase.co'

const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)



// let Pose =  "1. **Main Pose: Ardha Chandrasana (Half Moon Pose)**";
// let Repetitions =  "Repetitions: Hold each side for 5-8 breaths";
// let Descriptions = "Details: From a standing position, bend your right knee and place your right foot on your left inner thigh. Extend your left leg out behind you and keep your left heel on the floor. Reach your arms overhead and twist your torso to the left. Press your right hand into your inner thigh and extend your left arm up toward the ceiling. Keep your gaze fixed on a point in front of you.";
          

app.post('/generate-routine', async (req, res) => {
    
    const { duration, difficulty } = req.body;

    
    const prompt = `Generate minimum 10 yoga routine for ${duration} minutes with ${difficulty} difficulty with each routine in three line main pose heading then next line repetitions then in third line details `;

    try {
        
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);



        
        const routines = text.split('\n\n');
        const routineObjects = routines.map((routine, index) => {
        const lines = routine.split('\n');
        
        const pose = lines[0];
        const repetition = lines[1];
        const description = lines.slice(2).join(' ');
        
        
                return {
                    Pose: pose,
                    Repetitions: repetition,
                    Descriptions: description
                };
            
        });


        const { data, error } = await supabase
        .from('aiyoga')
        .insert(routineObjects)
        
        
      if (error) {
        console.error('Error inserting data into Supabase:', error);
      } else {
        console.log('Data inserted into Supabase:', data);
      }
      
        
        res.json({ success: true, routines: routineObjects });


    } catch (error) {
        console.error('Error generating routine:', error);
        
        res.status(500).json({ success: false, error: 'Error generating routine' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
