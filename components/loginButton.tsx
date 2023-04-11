import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useLoginInfoContext } from '../pages/_app'


export default function LoginButton() {

    const loginInfo = useLoginInfoContext()

    if (loginInfo.login === true) {
        return (
            <div>
                <Tippy content={`Logout ${loginInfo.userName}`} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                    <button
                        className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
                        onClick={() => loginInfo.logout()}
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
