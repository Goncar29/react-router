import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { EVENTS } from './const'

function navigate (href) {
// history para cambiar la url sin recargar la pagina, solo reflejar el cambio en la url
    window.history.pushState({}, '', href)
// creamos un evento personalizado
    const navigationEvent = new Event(EVENTS.PUSHSTATE) 
    window.dispatchEvent(navigationEvent) // enviamos el evento
}

function HomePage(){
    return (
        <>
            <h1>Home</h1>
            <p>Esta es una pagina de ejemplo para crear un React Router</p>
            <a onClick={() => navigate('/about')}>IR a sobre nosotros</a>
        </>
    )
}

function AboutPage(){
    return (
        <>
            <h1>About</h1>
            <div>
                <img src="https://yt3.ggpht.com/yti/AOXPAcWxyho-M7fI7bjPbdteU9ULNSmEoedWy9JgvEql_A=s88-c-k-c0x00ffffff-no-rj" alt="foto"></img>
                <p>Hola Soy Carlos y estoy aprendiendo a usar React Router</p>
            </div>
            <a onClick={() => navigate('/')}>Ir al home</a>
        </>
    )
}


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
