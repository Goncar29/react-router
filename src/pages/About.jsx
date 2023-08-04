import { Link } from '../Link'

const i18n = {
    es: {
        title: 'Sobre nosotros',
        button: 'Ir a la home',
        description: '!Hola¡ Me llamo Carlos Gonzalez y estamos creando un clon de React Router'
    },
    en: {
        title: 'About us',
        button: 'Go to home',
        description: 'Hi! My name is Carlos Gonzalez and we are creating a clone of React Router'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    return (
        <>
            <h1>{i18n.title}</h1>
            <div>
                <img src="https://yt3.ggpht.com/yti/AOXPAcWxyho-M7fI7bjPbdteU9ULNSmEoedWy9JgvEql_A=s88-c-k-c0x00ffffff-no-rj" alt="foto"></img>
                <p>{i18n.description}</p>
            </div>
            <Link to='/'>{i18n.button}</Link>
        </>
    )
}