import React from 'react';
import './scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';




//pages 
const Home = React.lazy(() => import("./pages/Home/Home"))
const Profile = React.lazy(() => import("./pages/Profile/Profile"))
const Auth = React.lazy(() => import("./pages/Auth/Auth"))

function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
