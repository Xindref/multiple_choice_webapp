import { useState } from "react";
import styles from "./Results.module.css";
import celebration from "../Data/celebration.png"


const Results = ({totalQuestions, correctCount, missedCount, missedQuestions, repeatChapter}) => {
    
    const [missedIndex, setMissedIndex] = useState(0);

    const calculatePercentage = () => {
        const percentage = Math.floor((100 / totalQuestions) * correctCount);
        return percentage
    }
    

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