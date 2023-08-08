import { EVENTS } from './consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    console.log(children);
    
    const [currentPath, setCurrentPath] = useState(getCurrentPath())

    // suscripcion al evento pushstate
    useEffect(() => {
// esto se ejecuta cada vez que hay un cambio en la navegacion y lo hace al escuchar el evento
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange) // evento cuando vamos para atras
        
        return () => {  // despues limpiamos el evento
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}

    // add routes from children <Route /> components
    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRpute = name === 'Route'

        return isRpute ? props : null
    })
    console.log(routesFromChildren);

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        // hemos usado path-to-regexp
        // para poder detectar rutas dinámicas como por ejemplo
        //  /search/:query <-- :query es una ruta dinamica
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        // guardar los parámetros de la url que eran dinámicas
        // y que hemos extraído con path-to-regexp
        // por ejemplo, si la ruta es /search/:query
        // y la url es /search/javascript
        // matched.params.query === 'javascript'
        routeParams = matched.params //en params tenemos el query
        return true
        })?.Component

    return Page 
        ? <Page routeParams={routeParams} /> 
        : <DefaultComponent routeParams={routeParams} />
}