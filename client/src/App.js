//https://bezkoder.com/react-crud-web-api/
import React from 'react';
import { Switch, Route, Link} from "react-router-dom";

import Report from './components/Report';
import ListReport from './components/ListReport';
import AddReport from './components/AddReport';
import './App.css';

const App = () => {
  return (
      <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/reports"} className="nav-link">
<<<<<<< HEAD
                          Отчеты по проектам
=======
                          Reports
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/add"} className="nav-link">
<<<<<<< HEAD
                          Добавить отчет
=======
                          Add
>>>>>>> 80be9ad7ad77aa9f7c1a839a010bd09fadfc7ccd
                      </Link>
                  </li>
              </div>
          </nav>

          <div>
              <Switch>
                  <Route exact path={["/", "/reports"]} component={ListReport} />
                  <Route exact path="/add" component={AddReport} />
                  <Route path="/reports/:id" component={Report} />
              </Switch>
          </div>
      </div>
  );
}

export default App;