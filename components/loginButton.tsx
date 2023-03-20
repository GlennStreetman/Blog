import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { useState, useEffect, useContext } from 'react'
import { useLoginInfoContext } from '../pages/_app'


const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.NEXT_PUBLIC_cognito_userpool_id,
    clientId: process.env.NEXT_PUBLIC_cognito_client_id,
    tokenUse: "access"
})

async function checkLogin(loginInfo, setLogin) {
    if (typeof window !== 'undefined') {
        const token = loginInfo.token
        if (token && token !== null) {
            try {
                await verifier.verify(token);
                setLogin(true)
            } catch {
                console.log("Token not valid!");
            }
        }
    }
}

async function getIdentity(loginInfo, setId) {
    if (typeof window !== 'undefined') {
        const codeId = loginInfo.id
        if (codeId && codeId !== null) {
            try {
                const id_token = codeId.split('.')[1]
                const decode = atob(id_token)
                const parsedUser = JSON.parse(decode)
                console.log("ID: ", parsedUser)
                setId(parsedUser.email)
            } catch {
                console.log("ID not valid!", codeId);
            }
        }
    }
}

async function logout(setLogin, setUserName) {
    localStorage.setItem("access_token", null);
    localStorage.setItem("id_token", null);
    setLogin(false)
    setUserName('')
}

export default function LoginButton() {

    const [login, setLogin] = useState(false)
    const [userName, setUserName] = useState()

    const loginInfo = useLoginInfoContext()

    useEffect(() => {
        console.log('login info', loginInfo)
        checkLogin(loginInfo, setLogin)
        getIdentity(loginInfo, setUserName)
    }, [loginInfo])

    if (login === true) {
        return (
            <div>
                <Tippy content={`Logout ${userName}`} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                    <button
                        className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
                        onClick={() => logout(setLogin, setUserName)}
                    >
                        <BiLogOutCircle className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                    </button>
                </Tippy>
            </div>
        );
    }
    return (
        <a href={process.env.NEXT_PUBLIC_loginurl} >
            <Tippy content="Login" interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                <div className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1">
                    <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                </div>
            </Tippy>
        </a>
    );
}
