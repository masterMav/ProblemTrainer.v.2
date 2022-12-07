import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Test from "./Test";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="nothing">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
