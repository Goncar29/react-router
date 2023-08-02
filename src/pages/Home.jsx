import { Link } from '../Link'

export default function HomePage(){
    return (
        <>
            <h1>Home</h1>
            <p>Esta es una pagina de ejemplo para crear un React Router</p>
            <Link to='/about'>IR a sobre nosotros</Link>
        </>
    )
}