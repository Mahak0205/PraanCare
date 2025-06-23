import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './auth';
import ChatWidget from "./components/Chatbot/ChatWidget";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
// import Cardiac from './pages/Cardiac';
// import Eye from './pages/Eye';
import Mental from './pages/Mental';
import Sleep from './pages/Sleep';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ProfileSetup from './pages/ProfileSetup'
import DemographicForm from './components/ProfileInfo/DemographicForm';
import PersonalityForm from './components/ProfileInfo/PersonalityForm';
import Depression from './pages/mentalCategories/Depression';
import Anxiety from './pages/mentalCategories/Anxiety';
import Stress from './pages/mentalCategories/Stress';




//import Anxiety from './pages/Anxiety';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/profilesetup' element={<ProfileSetup/>}/>
        <Route path='/ProfileInfo/DemographicForm' element={<DemographicForm/>}/>
        <Route path='/ProfileInfo/PersonalityForm' element={<PersonalityForm/>}/>

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* <Route path="/cardiac" element={<ProtectedRoute><Cardiac /></ProtectedRoute>} />
        <Route path="/eye" element={<ProtectedRoute><Eye /></ProtectedRoute>} /> */}

        <Route path="/mental" element={<ProtectedRoute><Mental /></ProtectedRoute>} />

        <Route path="/sleep" element={<ProtectedRoute><Sleep /></ProtectedRoute>} />


        <Route path="/mentalCategories/Depression" element={<Depression />} />
        <Route path="/mentalCategories/Anxiety" element={<Anxiety />} />
        <Route path="/mentalCategories/Stress" element={<Stress />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
