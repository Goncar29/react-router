import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './Router'
import { Route } from './pages/Route'
import { Link } from './Link'
import { getCurrentPath } from './utils.js'


// Con la herramienta vi de vitest mockeamos el archivo utils y 
// con una funcion le decimos que tiene que devolver 
// pero en este caso le decimos que devuelva una funcion de vi,
//  asi le decimos que valores devuelve cuando queramos 
vi.mock('./utils.js', () => ({
    getCurrentPath: vi.fn()
}))

describe('Router', () => {
    beforeEach(() => {
        cleanup() //este metodo va a limpiar la pantalla y evitamos el doble renderizado del screen
        vi.clearAllMocks() //limpiamos todos los mocks
    })

    it('should render withot problems', () => {
        render(<Router routes={[]} />)
        expect(true).toBeTruthy()
    })

    it('should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
        console.log(screen.debug());
        // screen nos muestra un arbol de como esta estrucutado
    })

    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/about') // aqui le decimos que nos devuelva el about

        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: () => <h1>About</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('About')).toBeTruthy()
        //si en el screen contiene el texto about nos dara un ok
    })

    it('should navigate using links', async () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route path='/' Component={() => {
                    return (
                        <>
                            <h1>Home</h1>
                            <Link to='/about'>Go to About</Link>
                        </>
                    )
                }} />
                <Route path='/about' Component={() => <h1>About</h1>} />
            </Router>
        )
        // Click on the link
        const anchor = screen.getByText(/Go to About/)
        fireEvent.click(anchor)

        const aboutTitle = await screen.findByText('About')

        console.log(screen.debug());

        // Check that the new route is rendered
        expect(aboutTitle).toBeTruthy
    })
})