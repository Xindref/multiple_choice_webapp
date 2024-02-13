import { useEffect, useState } from "react";
import Question from "../Components/Question";
import questionData from "../Data/Questions.json";
import Results from "./Results";
import { Link } from "react-router-dom";


const Chapter = ({chapter}) => {

    const [correctCount, setCorrectCount] = useState(0);
    const [missedCount, setMissedCount] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [availableQuestions, setAvailableQuestions] = useState([]);
    const [missedQuestions, setMissedQuestions] = useState([]);

    const chapterList = [22, 23, 25, 26, 31, 32, 37, 38, 39, 48];

    const nextQuestion = (index) => {
        removeQuestionFromAvailable(index);
    }

    const handleChapterChange = (direction) => {
        if (direction === 'next') {
            const nextChapter = chapterList[chapterList.indexOf(chapter) + 1];
            return `/chapter_${nextChapter}`;
        }
        else if (direction === 'prev') {
            const prevChapter = chapterList[chapterList.indexOf(chapter) - 1];
            return `/chapter_${prevChapter}`;
        }
    }

    const removeQuestionFromAvailable = (index) => {
        setAvailableQuestions(questions => {
            const updatedQuestions = [...questions];
            updatedQuestions.splice(index, 1);
            const shuffledQuestions = shuffleArray(updatedQuestions);
            return shuffledQuestions;
        })
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        const initializeAvailableQuestions = () => {
            const questions = Object.keys(questionData[`chapter${chapter}`])
            const shuffledQuestions = shuffleArray(questions);
            setAvailableQuestions(shuffledQuestions);
            setCorrectCount(0);
            setMissedCount(0);
            setMissedQuestions([]);
        }
        
        initializeAvailableQuestions();
    }, [chapter])

    return (
        <div>
            <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', gap: '20px'}} >
                {chapterList.indexOf(chapter) > 0 ? <Link style={{fontSize: 40, textDecoration: 'none', cursor: 'pointer', userSelect: 'none'}} to={handleChapterChange('prev')}>⏮️</Link> : null}
                <h1>Chapter {chapter}</h1>
                {chapterList.indexOf(chapter) < chapterList.length - 1 ? <Link style={{fontSize: 40, textDecoration: 'none', cursor: 'pointer', userSelect: 'none'}} to={handleChapterChange('next')}>⏭️</Link> : null}
            </div>
            {availableQuestions.length > 0 && questionData[`chapter${chapter}`][availableQuestions[0]]? 
                <Question 
                    question={questionData[`chapter${chapter}`][availableQuestions[0]]}
                    correctCount={correctCount}
                    setCorrectCount={setCorrectCount}
                    missedCount={missedCount}
                    setMissedCount={setMissedCount}
                    missedQuestions={missedQuestions}
                    setMissedQuestion={setMissedQuestions}
                    nextQuestion={nextQuestion}
                    questionsLeft={availableQuestions.length}
                /> :
                <Results
                    totalQuestions={Object.keys(questionData[`chapter${chapter}`]).length}
                    correctCount={correctCount}
                    missedCount={missedCount}
                    missedQuestions={missedQuestions}
                /> }
        </div>
    )
}

export default Chapter;