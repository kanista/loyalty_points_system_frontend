import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from "./component/UserForm";
import Home from "./page/Home";
import Dashboard from "./page/DashBoard";

function App() {
  return (
      <Router>
          <Home>
                <Routes>
                  <Route path="/add-user" element={<UserForm />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
          </Home>
      </Router>
  );
}

export default App;
