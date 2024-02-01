import NavBar from "./components/NavBar/NavBar";
import UserInfo from "./components/userInfo/UserInfo";
import VideoUploader from "./components/videoUploader/VideoUploader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/video" element={<VideoUploader />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
