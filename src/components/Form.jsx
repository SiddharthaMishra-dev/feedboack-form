import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#E67D22',
        lightGreen:'#B9DBA7',
        darkGreen:'#497036',
        red:'#FE393C'
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  
const FeedbackForm = () => {
    const [questions, setQuestions] = useState();
    const [options, setOptions] = useState();
    const [feedback, setFeedback] = useState({
        questions: [],
        choices: [],
    });

    const getData = async () => {
        const response = await fetch("https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1");
        const result = await response.json();
        setQuestions(result.feedbackQuestions);
        setOptions(result.choices);
    };

    const handleChange = (e, index) => {
        const updatedChoices = [...feedback.choices];
        updatedChoices[index] = e.target.value;

        const updatedQuestions = [...feedback.questions];
        updatedQuestions[index] = questions[index];

        setFeedback({
            ...feedback,
            questions: updatedQuestions,
            choices: updatedChoices,
        });
        console.log(feedback)
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            
                {questions ? (
                    <form>
                        <FormControl sx={{
                            padding:7
                        }}>
                            {questions.map((question, index) => {
                                return (
                                    <div className='choice-container' key={index}>
                                        <FormLabel sx={{
                                            fontSize:23,
                                            paddingBottom:10,
                                            color:theme.palette.primary.red,
                                            '&.Mui-focused':{
                                                color:theme.palette.primary.red,
                                            }
                                        }}>{question}</FormLabel>
                                        <RadioGroup
                                            name={`radio-button-group-${index}`}
                                            value={feedback.choices[index]}
                                            onChange={(e) => handleChange(e, index)}
                                        >
                                            {options[index].map((option, optionIndex) => (
                                                <FormControlLabel
                                                    key={optionIndex}
                                                    value={option}
                                                    control={<Radio />}
                                                    label={option}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </div>
                                );
                            })}
                            <Button variant="contained" onClick={()=>console.log(feedback)}>Submit</Button>
                        </FormControl>
                    </form>
                ) : ""}
            
        </>
    );
};

export default FeedbackForm