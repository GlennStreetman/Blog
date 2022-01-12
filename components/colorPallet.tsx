import React from "react";
import IconButton from "./iconButton";
import { AdjustmentsIcon } from "@heroicons/react/solid";

function ColorPallet() {
    return (
        <div className="flex flex-col">
            HELLO
            <div className="text-primary">
                <IconButton
                    text="Text Colors"
                    icon={<AdjustmentsIcon className="h-7 w-7 " />}
                    callback={() => {
                        console.log("click");
                    }}
                />
            </div>
            <div className="w-full ">
                <div id="primary1" className="rounded-full border-2 h-24 w-24 bg-textPrimary relative">
                    <div id="secondary" className="rounded-full border-2 h-24 w-24 bg-textSecondary absolute left-20">
                        <div id="accent" className="rounded-full border-2 h-24 w-24 bg-textAccent absolute left-20"></div>
                    </div>
                </div>
            </div>
            {/* BACKGROUND COLORS */}
            <div className="text-primary">
                <IconButton
                    text="Background Colors"
                    icon={<AdjustmentsIcon className="h-7 w-7 " />}
                    callback={() => {
                        console.log("click");
                    }}
                />
            </div>
            <div>
                <div className="w-full  ">
                    <div className="rounded-full border-2 h-24 w-24 bg-secondary relative hover:bg-weak ">
                        <div className="rounded-full border-2 h-24 w-24 bg-primary absolute left-20 hover:bg-weak"></div>
                    </div>
                </div>
            </div>
            {/* Highlight Colors */}
            <div className="text-primary">
                <IconButton
                    text="Highlight Colors"
                    icon={<AdjustmentsIcon className="h-7 w-7 " />}
                    callback={() => {
                        console.log("click");
                    }}
                />
            </div>
            <div>
                <div className="w-full  ">
                    <div className="rounded-full border-2 h-24 w-24 bg-strong relative ">
                        <div className="rounded-full border-2 h-24 w-24 bg-weak absolute left-20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorPallet;
