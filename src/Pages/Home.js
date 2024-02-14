import styles from "./Home.module.css";

const Home = () => {
    

    
    return (
        <div className={styles.homeContainer}>
            <h1>
                Just a question/answer app for future nurses!
            </h1>
            <h2>
                To get started just choose a chapter from the "Chapter Select" dropdown on the right side of the screen! It will randomly pull a question from that chapter until you reach the end, and then give you a chance to review any you may have missed or repeat the chapter you just completed. You can change chapters at any time, but the results screen will only show if you complete the chapter.
            </h2>
            <h2>
                Send any bugs or problems you may run into to:
            </h2>
            <a href="mailto:dakotahmccrary@gmail.com?subject=Bug_Report">
                dakotahmccrary@gmail.com
            </a>
            <h3>Study hard!</h3>
            <img className={styles.memeImage} src="https://i.pinimg.com/736x/b8/10/94/b810943aa4b325891cdc9ec9afce2863.jpg" alt="Party on image"/>
        </div>
    )
}

export default Home;