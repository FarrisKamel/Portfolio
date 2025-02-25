import './App.css'
import { NavBar } from './components/NavBar'
import { HomePage } from './components/homePage'
import { Projecthomepage } from './components/Projecthomepage'
import { ProjectsPage } from './components/projectsPage'
import { Footer } from './components/Footer'
import { ExperiencePage } from './components/experiencesPage'
import { DotLetterEffect } from './components/Interactivedots'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

    return (
        <Router> 
            <Routes>
                <Route path='/' element={
                    <div>
                        <NavBar />
                        <HomePage />
                        <div className="dot-effect">
                            <DotLetterEffect />
                        </div>
                        < Projecthomepage />
                        <Footer /> 
                    </div>
                } />
                <Route path='/projects' element={
                    <div>
                        <NavBar />
                        <ProjectsPage /> 
                        <Footer /> 
                    </div>
                } /> 
                <Route path='/experience' element={
                    <div>
                        <NavBar />
                        <ExperiencePage />
                        <Footer /> 
                    </div>
                } /> 
            </Routes>
        </Router> 
    )
}

export default App
