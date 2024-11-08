import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from "./component/UserForm";
import Home from "./page/Home";

function App() {
  return (
      <Router>
          <Home>
                <Routes>
                  <Route path="/add-user" element={<UserForm />} />
                  {/*<Route path="/manage-points/:userId" element={<ManagePoints />} />*/}
                </Routes>
          </Home>
      </Router>
  );
}

export default App;
