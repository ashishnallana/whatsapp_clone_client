import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import StartingLoader from "./pages/StartingLoader";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app bg-[#1c1e21] h-screen w-full min-w-[750px]">
      <Router>
        {/* <Auth />  */}
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/auth" Component={Auth} />
        </Routes>
      </Router>
      {/* <StartingLoader /> */}
    </div>
  );
}

export default App;
