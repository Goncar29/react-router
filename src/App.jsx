import './App.css'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import Page404 from './pages/404'
import { Router } from './Router'

const appRoutes = [
    { 
        path: '/',
        component: HomePage
    },
    { 
        path: '/about',
        component: AboutPage
    }
]

function App() {
    return (
        <main>
            <Router routes={appRoutes} defaultComponent={Page404} />
        </main>
    )
}

export default App
