import { useEffect, useState } from "react";
import styles from "./Question.module.css";

const Question = ({question, nextQuestion, correctCount, setCorrectCount, missedCount, setMissedCount, missedQuestions, setMissedQuestion, questionsLeft, missedBool, yourAnswer}) => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [multipleAnswer, setMultipleAnswer] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);

    const handleOptionSelect = (option) => {
        if (!multipleAnswer) {
            setSelectedOptions([option]);
        }  

        else if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option))
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    }

    const handleMatchingChange = (topic, match) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [topic]: match
        }));
    }

    const handleNextAnswer = () => {
        nextQuestion();
        setShowExplanation(false);
    }

    const isOptionSelected = (option) => {
        return selectedOptions.includes(option) ? styles.optionSelected : '';
    }

    const handleCheckAnswer = () => {

        if (question.matching) {
            let correctCount = 0;
            for (let key in question.answer) {
                if (selectedOptions[key] === question.answer[key]) {
                    correctCount++;
                }
            }
            if (correctCount === Object.keys(question.answer).length) {
                setCorrectCount(correctCount + 1);
                setAnswerStatus(true);
            } else {
                question.yourAnswer = selectedOptions;
                setMissedCount(missedCount + 1);
                setAnswerStatus(false);
                setMissedQuestion([...missedQuestions, question])
            }
        }

        else if (!multipleAnswer && !question.matching) {
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
        else if (multipleAnswer && !question.matching) {
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
        window.scrollTo({top: 0, behavior: 'smooth'});
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
        window.scrollTo({top: 0, behavior: 'smooth'});
        setShowExplanation(false);
    }, [question])

    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!showExplanation ?
                <div className={!missedBool ? styles.questionContainer : styles.questionContainerResults}>
                    <h2 className={styles.question}>{question.question}</h2>
                    {!missedBool ? <button 
                        className={styles.checkAnswer} 
                        onClick={handleCheckAnswer}>
                            Check Answer
                    </button> : null }
                    {question.matching ? 
                        <div className={styles.matchingAnswerCheckContainer}>
                            {question.matching.map((topic, index) => {
                                if (missedBool) {
                                    return (
                                        <div className={styles.topicResultContainer}>
                                            <p className={styles.matchingNameReview} key={index}>{topic}</p>
                                            {question.answer[topic] === question.yourAnswer[topic] ?
                                                <div className={styles.matchingAnswerCheckContainer}>
                                                    <p className={styles.optionGood}>
                                                    <p style={{paddingLeft: '30px', paddingRight: '30px'}} >{question.yourAnswer[topic]}</p>
                                                        <p className={styles.greenCheck}>✅</p>
                                                    </p>
                                                </div> :
                                                null }
                                            {question.answer[topic] !== question.yourAnswer[topic] ?
                                                <div className={styles.matchingAnswerCheckContainer}>
                                                    <p className={styles.optionBad}>
                                                        <p style={{paddingLeft: '30px', paddingRight: '30px'}} >{question.yourAnswer[topic]}</p>
                                                        <p className={styles.redX}>❌</p>
                                                    </p>
                                                    <p className={styles.optionGood}>
                                                        {question.answer[topic]}
                                                    </p>
                                                </div> : null }
                                        </div>
                                    )
                                }
                                else return (
                                    <div>
                                        <p className={styles.matchingName} key={index}>{topic}</p>
                                        <select className={styles.selectDropdown} onChange={(event) => handleMatchingChange(topic, event.target.value)}>
                                            <option></option>
                                            {question.options.map((option) => (
                                                <option className={styles.matchingOption} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            })}
                        </div> :
                    <div className={styles.optionsContainer}>
                        {question.options.map((option) => {
                            if (missedBool) {
                                if (option === question.answer || question.yourAnswer.includes(option) || question.answer.includes(option)) 
                                    return (
                                        <div
                                            className={question.answer.includes(option) ? styles.optionGood : styles.optionBad}>
                                                {option}
                                                {question.yourAnswer.includes(option) && question.answer.includes(option) ? <div className={styles.greenCheck}>✅</div> : null}
                                                {question.yourAnswer.includes(option) && !question.answer.includes(option) ? <div className={styles.redX}>❌</div> : null}
                                        </div>
                                    )
                                else return (
                                    <div
                                        className={styles.optionNeutral}>
                                            {option}
                                    </div>
                                )
                            } else return (
                                <div 
                                    className={`${styles.option} ${isOptionSelected(option)}`} 
                                    onClick={() => handleOptionSelect(option)}>
                                        {option}
                                </div>
                            )
                        })}
                    </div> }
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