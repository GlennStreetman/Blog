import { useRouter } from 'next/router';
import { useEffect } from 'react'

export function parseQueryString(qs) {
    //transform query string params into key/value obj.
    if (qs && qs.includes('/?')) {
        const qsTrim = qs.replace('/?', '')
        const qsObj = qsTrim.split('&').reduce((prev, curr) => {
            if (curr.includes(('='))) {
                const currKeyPair = curr.split('=')
                prev[currKeyPair[0]] = currKeyPair[1]
            }
            return prev
        }, {})
        return qsObj
    } else { 
        return false 
    }
}

export default function useCheckRedirect() {
    const router = useRouter()
    useEffect(()=>{
        const [path, queryString] = router.asPath.split('?')
        const queryStringObj = parseQueryString(queryString)
        console.log('queryStringObj', queryStringObj)
        if (queryStringObj?.['r'] === 'true') {
            console.log('redirect detected')
            router.push(`${path}`)
        } 
    },[])
}
