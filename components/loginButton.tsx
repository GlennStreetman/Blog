import { useSession, signOut } from "next-auth/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

export default function LoginButton() {
    const { data: session, status } = useSession();
    console.log(session, status);
    if (session) {
        return (
            <Tippy content={`Logout ${session.user.email}`} interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                <button
                    className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
                    onClick={() => signOut({ redirect: false })}
                >
                    <BiLogOutCircle className="h-7 w-7 text-primary hover:text-accent" />
                </button>
            </Tippy>
        );
    }
    return (
        <div>
            <Tippy content="Login" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                <a className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1" href={process.env.NEXTAUTH_REDIRECT}>
                    <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent" />
                </a>
            </Tippy>
        </div>
    );
}
