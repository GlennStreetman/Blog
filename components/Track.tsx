import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

interface props {
    index: number;
    totalLength: number;
    divisor: number;
    callback: Function;
}

export default function Track(p: props) {
    const selected = "p-2 border-2 rounded-full border-1 border-[secondary] font-medium rounded-md text-secondary  hover:bg-weak text-sm ";
    const notSelected = "p-2 border-line border-1 border-black font-medium rounded-md text-secondary  hover:bg-weak text-sm ";
    const trackList = [...Array(Math.ceil(p.totalLength / p.divisor))].map((el, indx) => {
        return (
            <button
                key={`${indx}indexKey`}
                className={indx + 1 === p.index ? selected : notSelected}
                onClick={() => {
                    p.callback(indx + 1);
                }}
            >
                <div className="flex">
                    <div className="m-auto">{`${indx + 1}`}</div>
                </div>
            </button>
        );
    });

    return (
        <div className="flex flex-inline gap-x-2">
            <button
                className={notSelected}
                onClick={() => {
                    const newIndex = p.index - 1 > 0 ? p.index - 1 : 1;
                    p.callback(newIndex);
                }}
            >
                <div className="flex">{<TbPlayerTrackPrev />}</div>
            </button>
            {trackList}
            <button
                className={notSelected}
                onClick={() => {
                    const maxIndex = Math.ceil(p.totalLength / p.divisor);
                    const newIndex = p.index + 1 <= maxIndex ? p.index + 1 : maxIndex;
                    p.callback(newIndex);
                }}
            >
                <div className="flex">{<TbPlayerTrackNext />}</div>
            </button>
        </div>
    );
}
