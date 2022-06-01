import LabeledInput from "./labeledInput";
import { useState } from "react";
import { formatPhone, stripPhone, validPhone } from "../lib/formatPhone";

import React from "react";

function labeledInputExample() {
    const [phone, setPhone] = useState("");
    const [phoneHelp, setPhoneHelp] = useState("");

    function processRequest() {
        if (!validPhone(phone)) {
            setPhoneHelp("Please enter a valid phone number");
        } else {
            setPhoneHelp("Success");
        }
    }

    function reset() {
        setPhone("");
        setPhoneHelp("");
    }

    return (
        <div className="flex flex-col gap-2">
            <LabeledInput
                autocomplete="tel"
                fieldType="tel"
                id="phone_id"
                label="Phone"
                value={formatPhone(phone)}
                onClickCallback={(e) => {
                    setPhone(stripPhone(e));
                }}
                helperText={phoneHelp}
            />
            <div className="text-primary">{`Phone state = ${phone}`}</div>

            <button
                className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black text-primary hover:text-accent active:bg-strong text-2x font-bold"
                onClick={processRequest}
            >
                Submit
            </button>
            <button
                className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black text-primary hover:text-accent active:bg-strong text-2x font-bold"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
}

export default labeledInputExample;
