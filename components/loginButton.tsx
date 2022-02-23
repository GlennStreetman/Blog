import { useSession, signIn, signOut } from "next-auth/react"
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { BiLogInCircle } from "react-icons/bi";

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div>
     <Tippy content="Login" interactive={true} interactiveBorder={20} delay={100} arrow={true}>
      <a href='https://gstreet.test/login?callbackUrl=https://blog.gstreet.test/'>
      {/* <button onClick={() => signIn()}>Sign in</button> */}
      <BiLogInCircle className="h-7 w-7 text-primary hover:text-accent" />
      </a>
      </Tippy>
    </div>
  )
}