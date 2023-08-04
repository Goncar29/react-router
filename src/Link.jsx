import { BUTTONS, EVENTS } from './consts.js'

export function navigate (href) {
    // history para cambiar la url sin recargar la pagina, solo reflejar el cambio en la url
        window.history.pushState({}, '', href)
    // creamos un evento personalizado
        const navigationEvent = new Event(EVENTS.PUSHSTATE) 
        window.dispatchEvent(navigationEvent) // enviamos el evento
    }

export function Link ({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === BUTTONS.primary // primary click or left click
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
    // usamos el preventDefault para evitar su comportamiento por defecto que 
    // recargue el sitio completo que lo ocasiona el Link
            event.preventDefault() 
            navigate(to) // navegacion con SPA
        }

    }

    return <a onClick={handleClick} href={to} target={target} {...props} />
}