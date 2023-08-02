import { useState } from 'react'
import './App.css'

function HomePage(){
    return (
        <>
            <h1>Home</h1>
            <p>Esta es una pagina de ejemplo para crear un React Router</p>
            <a href="/about">IR a sobre nosotros</a>
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
            <a href="/">Ir al home</a>
        </>
    )
}


function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    return (
        <main>
            {currentPath === '/' && <HomePage />}
            {currentPath === '/about' && <AboutPage />}
        </main>
    )
}

export default App
