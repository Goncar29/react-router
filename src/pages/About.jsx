import { Link } from '../Link'

export default function AboutPage(){
    return (
        <>
            <h1>About</h1>
            <div>
                <img src="https://yt3.ggpht.com/yti/AOXPAcWxyho-M7fI7bjPbdteU9ULNSmEoedWy9JgvEql_A=s88-c-k-c0x00ffffff-no-rj" alt="foto"></img>
                <p>Hola Soy Carlos y estoy aprendiendo a usar React Router</p>
            </div>
            <Link to='/'>Ir al home</Link>
        </>
    )
}