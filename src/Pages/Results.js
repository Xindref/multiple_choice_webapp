import { useState } from "react";
import styles from "./Results.module.css";


const Results = ({totalQuestions, correctCount, missedCount, missedQuestions}) => {
    
    const [missedIndex, setMissedIndex] = useState(0);

    const calculatePercentage = () => {
        const percentage = (100 / totalQuestions) * correctCount;
        return percentage
    }
    

    return (
        <div className={styles.resultsContainer}>
            <h1 className={styles.percentageText}>{calculatePercentage()}%</h1>
            {correctCount === totalQuestions ? 
            "You got em all!!!" :
            <div className={styles.answerResults}>
                <p className={styles.correctResult}>You got {correctCount} correct</p>
                <p className={styles.missedResult}>You missed {missedCount}</p>
            </div> }
            {missedQuestions.length > 0 ? 
            <div className={styles.missedQuestionContainer}>
                <h2 className={styles.questionHeader}>Question:</h2>
                <p className={styles.questionText}>{missedQuestions[missedIndex].question}</p>
                <h2 className={styles.yourAnswerHeader}>Your Answer:</h2>
                <p className={styles.yourAnswerText}>{missedQuestions[missedIndex].yourAnswer}</p>
                <h2 className={styles.correctAnswerHeader}>Correct Answer:</h2>
                <p className={styles.correctAnswerText}>{missedQuestions[missedIndex].answer}</p>
                {missedQuestions.length > 1 ?
                <div className={styles.buttonsContainer}>
                    {missedIndex > 0 ? <div className={styles.prevButton} onClick={() => setMissedIndex(missedIndex - 1)}>⏮️</div> : null}
                    {missedIndex < (missedQuestions.length - 1) ? <div className={styles.nextButton} onClick={() => setMissedIndex(missedIndex + 1)}>⏭️</div> : null}
                </div> : null }
            </div> : null }
        </div>
    )
}

export default Results;