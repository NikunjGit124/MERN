import { Suspense } from 'react';
import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import {AllRoutes} from "./Routes/Routes";
import './Assests/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
       <Routes>
       {(AllRoutes).map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={                  
              <Suspense fallback={<>...</>}>                   
              <route.element/>                  
              </Suspense>                
              }
          />
        );
      })}
    </Routes>
   </Router>
  );
}

export default App;


