import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="nothing">
        <Switch>
          <Route exact path="/secondPT/">
            <Home />
          </Route>
          <Route path="/secondPT/dashboard">
            <Navbar />
            <Dashboard />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
