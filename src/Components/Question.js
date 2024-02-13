import { useEffect, useState } from "react";
import styles from "./Question.module.css";

const Question = ({question, nextQuestion, correctCount, setCorrectCount, missedCount, setMissedCount, missedQuestions, setMissedQuestion, questionsLeft}) => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [multipleAnswer, setMultipleAnswer] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);

    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option))
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    }

    const handleNextAnswer = () => {
        nextQuestion();
        setShowExplanation(false);
    }

    const isOptionSelected = (option) => {
        return selectedOptions.includes(option) ? styles.optionSelected : '';
    }

    const handleCheckAnswer = () => {
        if (!multipleAnswer) {
            if (selectedOptions[0] === question.answer) {
                setCorrectCount(correctCount + 1);
                setAnswerStatus(true);
            } else {
                question.yourAnswer = selectedOptions;
                setMissedCount(missedCount + 1);
                setAnswerStatus(false);
                setMissedQuestion([...missedQuestions, question]);
            }
            
        }
        else if (multipleAnswer) {
            const answerSorted = question.answer.sort();
            const selectedOptionsSorted = selectedOptions.sort();
            const answerFilter = selectedOptionsSorted.filter((selectedOption, index) => selectedOption !== answerSorted[index])
            if (answerFilter.length === 0 && selectedOptions.length === question.answer.length) {
                setCorrectCount(correctCount + 1);
                setAnswerStatus(true);
            } else {
                question.yourAnswer = selectedOptions;
                setMissedCount(missedCount + 1);
                setAnswerStatus(false);
                setMissedQuestion([...missedQuestions, question]);
            }
        }

        setSelectedOptions([]);
        setShowExplanation(true);
    }

    useEffect(() => {
        const checkMultipleAnswer = () => {
            if (Array.isArray(question.answer)) {
                console.log('multiple choice');
                setMultipleAnswer(true);
            } else {
                setMultipleAnswer(false);
            }
        }

        checkMultipleAnswer();
    }, [question])

    return (
        <div>
            {!showExplanation ?
                <div className={styles.questionContainer}>
                    <h2 className={styles.question}>{question.question}</h2>
                    <button 
                        className={styles.checkAnswer} 
                        onClick={handleCheckAnswer}>
                            Check Answer
                    </button>
                    <div className={styles.optionsContainer}>
                        {question.options.map((option) => (
                            <div 
                                className={`${styles.option} ${isOptionSelected(option)}`} 
                                onClick={() => handleOptionSelect(option)}>
                                    {option}
                            </div>
                        ))}
                    </div>
                </div> : 
                <div className={styles.explanationContainer}>
                    <h1 className={answerStatus ? styles.correctAnswer : styles.wrongAnswer}>
                        {answerStatus ? "Correct!" : "Not Quite."}
                    </h1>
                    <h2 className={styles.explanation}>{question.explanation}</h2>
                    <p className={styles.dif}>{`DIF: ${question.dif}`}</p>
                    <p className={styles.obj}>{`OBJ: ${question.obj}`}</p>
                    <p className={styles.top}>{`TOP: ${question.top}`}</p>
                    <p className={styles.msc}>{`MSC: ${question.msc}`}</p>
                    <button className={styles.nextQuestionButton} onClick={handleNextAnswer}>{questionsLeft > 1 ? 'Next Question' : 'See Results'}</button>
                </div> }
        </div>
    )
}

export default Question;