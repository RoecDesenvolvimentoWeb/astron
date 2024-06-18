import { mode } from "mode";
import { ReactElement } from "react";

interface IAtomGoogleAuthProps {
    type: "REGISTER" | "LOGIN"
    className?: string
}

const URI = mode === "DEV" ? "http://localhost:3000" : "https://astron.website"
const GOOGLE_AUTH_URLS = {
    REGISTER: `https://accounts.google.com/o/oauth2/auth?client_id=845243210398-afblu7mbd0o7riq0g0ijee2oiq0bhr3u.apps.googleusercontent.com&prompt=consent&redirect_uri=${URI}/register&response_type=token&scope=email+profile`,
    LOGIN: `https://accounts.google.com/o/oauth2/auth?client_id=845243210398-afblu7mbd0o7riq0g0ijee2oiq0bhr3u.apps.googleusercontent.com&prompt=consent&redirect_uri=${URI}/login&response_type=token&scope=email+profile`
}

export const AtomGoogleAuth = ({ type, className = "" }: IAtomGoogleAuthProps): ReactElement => {
    return (
        <a href={GOOGLE_AUTH_URLS[type]} className={"google-oauth-button !flex space-x-6 justify-center align-center" + ` ${className}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"/>
            <p>{type === "LOGIN" ? "Autenticar-se" : "Registrar-se"} com google</p>
        </a>
    )
}