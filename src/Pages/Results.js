import { useEffect, useState } from "react";
import styles from "./Results.module.css";
import celebration from "../Data/celebration.png"


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
                <h2 className={styles.questionHeader}>Question:</h2>
                <p className={styles.questionText}>{missedQuestions[missedIndex].question}</p>
                {!missedQuestions[missedIndex].matching ?
                    <div>
                        <h2 className={styles.yourAnswerHeader}>Your Answer:</h2>
                        <p className={styles.yourAnswerText}>
                            {Array.isArray(missedQuestions[missedIndex].yourAnswer) ? 
                            missedQuestions[missedIndex].yourAnswer.map((answer) => answer).join(',\n') : 
                            missedQuestions[missedIndex].yourAnswer }
                        </p>
                        <h2 className={styles.correctAnswerHeader}>Correct Answer:</h2>
                        <p className={styles.correctAnswerText}>
                            {Array.isArray(missedQuestions[missedIndex].answer) ? 
                            missedQuestions[missedIndex].answer.map((answer) => answer).join(',\n') : 
                            missedQuestions[missedIndex].answer }
                        </p>
                    </div> :
                    <div className={styles.matchingResultsContainer}>
                        {matchingObject &&
                            matchingObject.topics.map((topic, index) => (
                                <div>
                                    <p className={styles.matchingTopic}>{topic}</p>
                                    <p className={styles.correctAnswerText}>{`Correct: ${matchingObject.correctAnswers[index]}`}</p>
                                    <p className={matchingObject.correctAnswers[index] !== matchingObject.yourAnswers[index] ? styles.yourAnswerText : styles.correctAnswerText} >{`Yours: ${matchingObject.yourAnswers[index] || "\" \""}`}</p>
                                </div>
                            ))}
                    </div>
                }
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