import './App.css';
import NavBar from './Nav/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Chapter from './Pages/Chapter';
import ChapterSelect from './Pages/ChapterSelect';

function App() {
    return (
      <div className="App">

        <NavBar />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/chapter_3" element={<Chapter chapter={3}/>}/>
          <Route path="/chapter_6" element={<Chapter chapter={6}/>}/>
          <Route path="/chapter_11" element={<Chapter chapter={11}/>}/>
          <Route path="/chapter_22" element={<Chapter chapter={22}/>}/>
          <Route path="/chapter_23" element={<Chapter chapter={23}/>}/>
          <Route path="/chapter_25" element={<Chapter chapter={25}/>}/>
          <Route path="/chapter_26" element={<Chapter chapter={26}/>}/>
          <Route path="/chapter_31" element={<Chapter chapter={31}/>}/>
          <Route path="/chapter_32" element={<Chapter chapter={32}/>}/>
          <Route path="/chapter_37" element={<Chapter chapter={37}/>}/>
          <Route path="/chapter_38" element={<Chapter chapter={38}/>}/>
          <Route path="/chapter_39" element={<Chapter chapter={39}/>}/>
          <Route path="/chapter_43" element={<Chapter chapter={43}/>}/>
          <Route path="/chapter_48" element={<Chapter chapter={48}/>}/>
          <Route path="/chapter_select" element={<ChapterSelect />}/>
        </Routes>
      </div>
    );
}

export default App;
