import { EVENTS } from './const'

export function navigate (href) {
    // history para cambiar la url sin recargar la pagina, solo reflejar el cambio en la url
        window.history.pushState({}, '', href)
    // creamos un evento personalizado
        const navigationEvent = new Event(EVENTS.PUSHSTATE) 
        window.dispatchEvent(navigationEvent) // enviamos el evento
    }

export function Link ({ target, to, ...props }) {
    const handleClick = (event) => {
    // usamos el preventDefault para evitar su comportamiento por defecto que 
    // recargue el sitio completo que lo ocasiona el Link
        event.preventDefault() 
        navigate(to)
    }

    return <a onClick={handleClick} href={to} target={target} {...props} />
}