import { useSession, signOut } from "next-auth/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";

export default function LoginButton() {
    const { data: session, status } = useSession();
    console.log('session data', session, status)
    const login = session?.user?.email ? session.user.email : ''
    if (status === 'authenticated') {
        return (
            <div key={status}>
                <Tippy content={`Logout ${login}`} interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                    <button
                        className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1"
                        onClick={() => signOut({ redirect: false })}
                    >
                        <BiLogOutCircle className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                    </button>
                </Tippy>
            </div>
        );
    }
    return (
        <a href={process.env.NEXT_PUBLIC_NEXTAUTH_REDIRECT} >
            <Tippy content="Login" interactive={true} interactiveBorder={1} delay={1} arrow={true}>
                <div className=" flex font-bold uppercase  text-primary hover:text-accent rounded-md active:bg-strong gap-1">
                    <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent bg-primary" />
                </div>
            </Tippy>
        </a>
    );
}
