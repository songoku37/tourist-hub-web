import React from 'react';
import TouristContentCard from "./components/main/TouristContentCard";
import Main from "./pages/Main";
import NavBar from "./components/common/NavBar";
import Header from "./components/common/Header";
//import sampleImage from '../public/sample.png'; // 이미지 경로 설정
function App() {
  return (
    <div className="mx-auto max-w-screen-xl my-10">
      <Header/>
      <NavBar/>
      <Main/>
    </div>
  );
}

export default App;
