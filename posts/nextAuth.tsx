/*
    @start
    id: nextAuth
    title: Domain wide login using NextAuth
    date: 2022-03-17
    type: notes
    dependancies: Nextjsv12.0.9, NextAuthv4.2.1
    languages: language-Next
    project: Blog
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {
    return (
        <div className="article">
            <h2>{nextAuth}</h2>
            <p>
                {nextAuth} is an open source {OAuth} solution for {nextJS} applications. Authentication can be performed with either stateless JSON webtokens or
                a database sessions. Using NextAuth you can quickly setup a login system for a single Next.js application. Things get tricky though if you want
                to use NextAuth as a login provider for multiple web applications. gstreet.dev has multiple web apps hosted under the same root domain but using
                seperate subdomains. This article outlines some of the hurdles I encountered using NextAuth as a shared login service for a Nextjs app & an
                Express app. If you are not familier with NextAuth you should go through the {NextAuthtut} first. Make sure to setup a database {nextAdapter} as
                I'm not sure this can be done using a serverless approach. I recommend Prisma with postgres.
            </p>
            <h2>gstreet.dev sub domain setup</h2>

            <table className="table-auto">
                <tr>
                    <th>Domain</th>
                    <th>Description</th>
                </tr>
                <tbody>
                    <tr>
                        <td>gstreet.dev</td>
                        <td>NextAuth Login Service</td>
                    </tr>
                    <tr>
                        <td>blog.gstreet.dev</td>
                        <td>Next.js Blog</td>
                    </tr>
                    <tr>
                        <td>finndash.gstreet.dev</td>
                        <td>Express.js Financial App</td>
                    </tr>
                </tbody>
            </table>

            <h2>Nextauth session cookie</h2>
            <p>
                NextAuth expects there to be a cookie in the clients browser in order to check the clients authentication status. If your web applications are
                divided up using subdomains this will violate the client side CORS:{sameOrigin}, gstreet.dev, blog.street.dev and finndash.gstreet.dev are all
                different origins, so the cookie createdwill by the login server will be unavailable to blog and finndash. When the user is authenticated,
                NextAuth needs to create a cookie thatis available domain wide. My Auth server is served under the root domain, gstreet.dev, so the cookies the
                auth server create have a domain of gstreet.dev by default. If, however, the cookies domain has a "." appended to the beginning of the domain it
                will become available to all gstreet.dev subdomains. NextAuths default cookie behavior can be changed by modifying the [...nextauth].js
                configuration file. The code below will append a "." to the login servers domain.
            </p>

            <CodeBlock language="language-javascript" file="/pages/api/auth/[...nextauth].js">{`
//make sure .env is setup and includes NEXTAUTH_URL            
const useSecureCookies = process.env.NEXTAUTH_URL.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(process.env.NEXTAUTH_URL).hostname

export default NextAuth({
    ...
    cookies: {
        sessionToken: 
        {
          name: \${cookiePrefix}next-auth.session-token\`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: useSecureCookies,
            //line below assumes login server is served under root domain. If served under subdomain, strip out subdomain instead of adding '.'
            domain: hostName == 'localhost' ? hostName : '.' + hostName
          }
        },
      },
    ...
            
            `}</CodeBlock>
            <h2>Checking shared login status with Nextjs app</h2>
            <p>
                Once your session cookie is available accross all subdomains checking the session status with a Nextjs application is easy assuming your login
                server is persisting sessions using a database {nextAdapter}. All you need to do is install NextAuth as a dependancy of each Next application
                and point its adapter at the same database as the login server. Because the auth token is available domain wide your session status will be
                maintained.
            </p>
            <h2>Checking shared login status with non-Nextjs application </h2>
            <p>
                Nextjs provides a number of Nextjs hooks for dealing with sessions. Nextjs does not provide a way to check session status for react apps,
                pythons apps, PHP, etc. You will need to add a custom API to your NextAuth login application to handle login status and logout requests from non
                NextJS applications. Login requests should be handled directly by your NextAuth application.
            </p>

            <h2>
                Create an API route that non-Nextjs applications can use to check login status. Because the session cookie is avaiable domain wide the custom
                API route defined below will be able to check the session status and return the users email address. The example below assumes you are using
                prisma with postgres.
            </h2>

            <CodeBlock language="language-javascript" file="/pages/api/remoteLogin.js">{`

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findEmail  = async function(cookieHeader){
    
    const secure = cookieHeader['__Secure-next-auth.session-token']
    const insecure = cookieHeader['next-auth.session-token']
    const loginToken = secure !== undefined ? secure : insecure

    const userID = await prisma.session.findUnique({
        where: {
            sessionToken: loginToken
        },
        select: {userId: true}
        })

    const thisID = userID?.['userId'] ? userID['userId'] : undefined
    
    if (thisID !== undefined ) {
    const email = await prisma.user.findUnique({
        where: {
            id: thisID
        },
        select: {email: true}

    })
    return email
   } else {
       return false
   }
}

export default async function handler(req , res) {
    if (req.method === 'GET') {
      const cookieHeader = req.headers.cookie.split(';').reduce((prev, cur)=>{
          let [key, val] = cur.split('=')
          key = key.trim()
          cur = cur.trim()
          prev[key] = val
          return prev
        }, {})

        const loginStatus = await findEmail(cookieHeader)

        if (loginStatus !== false) {
            const email = loginStatus.email
            const login = email !== undefined ? 1 : 0

            res.status(200).json({
            email: email,
            login: login,
            });
        } else {
            res.status(200).json({
                login: '0',
            });
        }
}

}
            
            `}</CodeBlock>

            <h2>Create a logout route so non-Nextjs applications can logout without redirecting the client to the NextAuth application.</h2>

            <CodeBlock language="language-javascript" file="/pages/api/remoteLogin.js">{`
      import { PrismaClient } from '@prisma/client'

      const prisma = new PrismaClient()
      
      const logout  = async function(cookieHeader){
          
          await prisma.session.deleteMany({
              where: {
                  sessionToken: cookieHeader['__Secure-next-auth.session-token']
              },
          })
      
          return true
      }
      
      export default async function handler(req , res) {
          try {
          if (req.method === 'GET') {
              //build headers from string.
              const cookieHeader = req.headers.cookie.split(';').reduce((prev, cur)=>{
                  let [key, val] = cur.split('=')
                  key = key.trim()
                  cur = cur.trim()
                  prev[key] = val
                  return prev
                  }, {})
      
                  await logout(cookieHeader)
      
                  res.status(200).json({
                      message: 'user logged out'
              });
          } else {
              res.status(200).json({
              message: 'GET ONLY'
          })
      }
          }catch(err){console.log(err)}
      }
            `}</CodeBlock>

            <h2>Conclusion</h2>
            <p>
                At this point you should have a NextAuth application that can provide authentication, as a microservice, to all of the applications being served
                under the same domain. Other Nextjs applications can simply check session status using the same backend database as your NextAuth application.
                Non-NextAuth applications can query the custom API your create to check session status.
            </p>
        </div>
    );
};

const nextAuth = (
    <a href="https://next-auth.js.org/" target="_blank">
        NextAuth.js
    </a>
);

const nextJS = (
    <a href="https://nextjs.org/" target="_blank">
        Next.js
    </a>
);

const OAuth = (
    <a href="https://oauth.net/" target="_blank">
        0Auth
    </a>
);

const sameOrigin = (
    <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy" target="_blank">
        Same-origin policy
    </a>
);

const NextAuthtut = (
    <a href="https://next-auth.js.org/tutorials" target="_blank">
        Next Auth Tutorial
    </a>
);

const nextAdapter = (
    <a href="https://next-auth.js.org/adapters/overview" target="_blank">
        adapter
    </a>
);

export default body;
