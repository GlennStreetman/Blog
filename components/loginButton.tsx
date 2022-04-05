import { useSession, signOut } from "next-auth/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import pg from "pg";

export default function LoginButton() {
    const { data: session, status } = useSession();

    if (session) {
        return (
            <Tippy content={`Logout ${session.user.email}`} interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                <button onClick={() => signOut({ redirect: false })}>
                    <BiLogOutCircle className="h-7 w-7 text-primary hover:text-accent" />
                </button>
            </Tippy>
        );
    }
    return (
        <div>
            <Tippy content="Login" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
                <a href={process.env.NEXTAUTH_REDIRECT}>
                    <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent" />
                </a>
            </Tippy>
        </div>
    );
}
