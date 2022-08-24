export function formatPhone(phone) {
    if (phone && typeof phone === "string") {
        const raw = phone.replace(/\D/g, ""); //replace any non number
        let formatPhone;
        if (raw.length > 6) formatPhone = raw.slice(0, 3) + "-" + raw.slice(3, 6) + "-" + raw.slice(6);
        if (raw.length <= 6) formatPhone = raw.slice(0, 3) + "-" + raw.slice(3, 6);
        if (raw.length <= 3) formatPhone = formatPhone = raw;
        return formatPhone;
    } else {
        return "";
    }
}

export function stripPhone(phone) {
    if (phone && typeof phone === "string") {
        let strippedPhone = phone.replace(/(\D|^1)/g, ""); //replace any non number OR leading 1
        strippedPhone = strippedPhone.slice(0, 10);
        return strippedPhone;
    } else {
        return "";
    }
}

export function validPhone(phone) {
    if (phone && typeof phone === "string") {
        return phone.length === 10;
    } else {
        return false;
    }
}
