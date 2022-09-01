import { useContext } from "react";
import { ScreenWidth } from "./ScreenWidth";
import LogoHover from './LogoHover'
import LogoFade from './LogoFade'


export default function LogoPicker(){
    
    const screenSize = useContext(ScreenWidth);
    const width = screenSize.width
    const component = width >= 1536 ?  <LogoHover /> : <LogoFade />

    // console.log('screen size', screenSize)

    return (
        <div key={width}>{component}</div>
    )
}