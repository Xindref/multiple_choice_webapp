import { useEffect, useState } from "react";
import styles from "./Results.module.css";
import celebration from "../Data/celebration.png"
import Question from "../Components/Question"


const Results = ({totalQuestions, correctCount, missedCount, missedQuestions, repeatChapter}) => {
    
    const [missedIndex, setMissedIndex] = useState(0);
    const [matchingObject, setMatchingObject] = useState(null);

    const calculatePercentage = () => {
        const percentage = Math.floor((100 / totalQuestions) * correctCount);
        return percentage
    }

    useEffect(() => {
        if (missedQuestions.length > 0 && missedQuestions[missedIndex].matching) {

            const newObject = {
                topics: [],
                yourAnswers: [],
                correctAnswers: []
            };

            for (let key in missedQuestions[missedIndex].answer) {
                newObject.topics.push(key);
                newObject.yourAnswers.push(missedQuestions[missedIndex].yourAnswer[key]);
                newObject.correctAnswers.push(missedQuestions[missedIndex].answer[key]);
            }

            setMatchingObject(newObject);
        }

    }, [missedIndex])
    

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.percentageText}>Score: {calculatePercentage()}%</h1>
            {correctCount === totalQuestions ? 
            <div>
                <h2 className={styles.allCorrectText}>Congrats!! Looks like you know this chapter pretty well!! You can repeat this chapter using the button below, or go to the next or previous by using the arrows or chapter select at the top!</h2>
                <button className={styles.repeatChapterButton} onClick={repeatChapter}>
                    Repeat Chapter
                </button>
                <img className={styles.celebrationImage} src={celebration} alt={'Image of Celebration'}/>
            </div> :
            <div className={styles.answerResults}>
                <p className={styles.correctResult}>Correct: {correctCount}</p>
                <p className={styles.missedResult}>Missed: {missedCount}</p>
            </div> }
            {missedQuestions.length > 0 ? 
            <div className={styles.missedQuestionContainer}>
                { Array.isArray(missedQuestions[missedIndex].answer) ? 
                    <p>
                        On multiple answer questions your answers will have a ✅ if you got that part 
                        of the answer correct, no ✅ if you didn't choose it, and an ❌ with a red 
                        highlight if it was not a part of the answer.
                    </p> : 
                    null
                }
                { missedQuestions[missedIndex].matching ?
                    <p>
                        On matching questions your answers will have a ✅ beside them if you
                        got that option correct, or an ❌ if you got it incorrect. Below your
                        incorrect answer will be the correct answer highlighted in green.
                    </p> :
                    null
                }
                <Question
                    question={missedQuestions[missedIndex]}
                    missedBool = {true}
                    yourAnswer = {missedQuestions[missedIndex].yourAnswer}
                />
                {missedQuestions.length > 1 ?
                <div className={styles.buttonsContainer}>
                    {missedIndex > 0 ? 
                    <div className={styles.prevButton} onClick={() => setMissedIndex(missedIndex - 1)}>⏮️</div> :
                    <div className={styles.buttonDisabled}>⏮️</div>
                    }
                    <p className={styles.missedIndexText}>{missedIndex + 1}</p>
                    {missedIndex < (missedQuestions.length - 1) ? 
                    <div className={styles.nextButton} onClick={() => setMissedIndex(missedIndex + 1)}>⏭️</div> :
                    <div className={styles.buttonDisabled}>⏭️</div>
                     }
                </div> : null }
                <button className={styles.repeatChapterButton} onClick={repeatChapter}>
                    Repeat Chapter
                </button>
            </div> : null }
        </div>
    )
}

export default Results;