import { useState, useEffect } from 'react'
import './App.css'
import { EVENTS } from './const'
import HomePage from './pages/Home'
import AboutPage from './pages/About'

function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    // suscripcion al evento pushstate
    useEffect(() => {
// esto se ejecuta cada vez que hay un cambio en la navegacion y lo hace al escuchar el evento
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange) // evento cuando vamos para atras
        
        return () => {  // despues limpiamos el evento
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    return (
        <main>
            {currentPath === '/' && <HomePage />}
            {currentPath === '/about' && <AboutPage />}
        </main>
    )
}

export default App
