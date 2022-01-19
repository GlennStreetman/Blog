import {
    SiPostgresql,
    SiTypescript,
    SiRedux,
    SiExpress,
    SiJest,
    SiMongodb,
    SiGraphql,
    SiMaterialui,
    SiCss3,
    SiJavascript,
    SiReact,
    SiTailwindcss,
    SiNextdotjs,
} from "react-icons/si";
import { FaHtml5, FaNodeJs, FaNpm } from "react-icons/fa";

const findIcon = {
    "language-javascript": <SiJavascript className="  left-2 text-xl text-[#f7df1e] " />,
    "language-CSS": <SiCss3 className="  left-2 text-xl text-[#2965f1] " />,
    "language-HTML": <FaHtml5 className="  text-xl text-[#f06529] " />,
    "language-JSON": <FaNodeJs className="  text-xl text-[#3C873A] " />,
    "language-Postgres": <SiPostgresql className="  text-xl text-[#0064a5] " />,
    "language-typescript": <SiTypescript className="  text-xl text-[#3178C6] " />,
    "language-Redux": <SiRedux className="  text-xl text-[#764abc] " />,
    "language-Express": <SiExpress className="  text-xl text-[#3C873A] " />,
    "language-Jest": <SiJest className="  text-xl text-[#907f7f] " />,
    "language-MongoDB": <SiMongodb className="  text-xl text-[#3FA037] " />,
    "language-GraphQL": <SiGraphql className="  text-xl text-[#e535ab] " />,
    "language-MaterialUI": <SiMaterialui className="  text-xl text-[#FB8C00] " />,
    "language-React": <SiReact className="  text-xl text-[#61DBFB] " />,
    "language-Tailwind": <SiTailwindcss className="  text-xl text-[#38bdf8] " />,
    "language-Next": <SiNextdotjs className="  text-xl text-[#fc5b55] " />,
    "language-NPM": <FaNpm className="  text-xl text-[#3C873A] " />,
};

export default findIcon;
