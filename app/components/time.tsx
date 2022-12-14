import { parseISO, formatDistanceToNow } from "date-fns";
import { enGB } from "date-fns/locale";
import { format } from "date-fns-tz";
import { useEffect, useState } from "react";

const Time = ({ value, dateFormat = "PPpp" }: { value?: string; dateFormat?: string; }) => {

    const [dateTime, setDateTime] = useState<string | undefined>(undefined);
    const [distance, setDistance] = useState<string | undefined>(undefined);

    useEffect( () => {
        
        if (!value) return;
        const dateTime = format(parseISO(value), dateFormat, { locale: enGB, timeZone: "Europe/Oslo" });
        setDateTime(dateTime);
        const distance = formatDistanceToNow(parseISO(value), { locale: enGB, addSuffix: true, includeSeconds: false });
        setDistance(distance);
    },[value, dateFormat]);



    return (
        <time className="" dateTime={dateTime} data-tooltip={dateTime}>
            {distance}
        </time>
    );
};

export default Time;