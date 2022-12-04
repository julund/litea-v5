import { clsx } from "clsx";
import { startOfMonth, startOfDay, endOfDay, startOfWeek, startOfYear, subDays, subMonths, subWeeks, subYears, endOfWeek, endOfMonth, eachHourOfInterval, isBefore, eachDayOfInterval, endOfYear, eachMonthOfInterval, eachYearOfInterval, subMinutes, eachMinuteOfInterval, addMilliseconds } from "date-fns";
import { enUS } from "date-fns/locale";
import { format, utcToZonedTime, zonedTimeToUtc, getTimezoneOffset, type OptionsWithTZ } from "date-fns-tz";

export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export const classNames = (...inputs: ClassValue[]) => [...new Set(clsx(...inputs).split(" "))].join(" ");

export const periods = [
    { id: "realtime", title: "Realtime" },
    { id: "day", title: "Day (hours)" },
    { id: "week", title: "Week (days)" },
    { id: "month", title: "Month (days)" },
    { id: "year", title: "Year (months)" },
    { id: "all", title: "All time (years)" },
];

const options: OptionsWithTZ = { timeZone: "Europe/Oslo", locale: enUS, weekStartsOn: 1 };
const timeZone = options.timeZone as string;

export const zonedTimeToUtcString = (date: string | number | Date) => {
    return zonedTimeToUtc(date, timeZone, options).toUTCString();
};

type Period = "realtime" | "day" | "week" | "month" | "year" | "all";

export function getPeriodDates(periodName: string, index: number) {

    const period = periodName as Period;
    const time = utcToZonedTime(Date.now(), timeZone, options);

    const periodFns = {
        realtime: () => {
            const current = (d: number) => d;
            const fromDate = subMinutes(time, current(60)); // should be 30 mins but need to fix realtime view
            const toDate = time; // startOfHour, endOfHour,
            return ({
                name: "Realtime",
                from: fromDate,
                to: toDate,
                title: `${current(60)} minutes`,
                description: "Last",
                labelDates: eachMinuteOfInterval({ start: fromDate, end: toDate }, { step: 1 })
            });
        },
        day: () => {
            const current = (d: number | Date) => subDays(d, index);
            const fromDate = current(startOfDay(time));
            const toDate = current(endOfDay(time));
            return ({ 
                name: "Day (hours)", 
                from: fromDate, 
                to: toDate,
                title: format(fromDate, "cccc", options),
                description: format(fromDate, "PPP", options),
                labelDates: eachHourOfInterval({ start: fromDate, end: toDate })
            });
        },
        week: () => {
            const current = (d: number | Date) => subWeeks(d, index);
            const fromDate = current(startOfWeek(time, { locale: options.locale, weekStartsOn: options.weekStartsOn }));
            const toDate = current(endOfWeek(time, { locale: options.locale, weekStartsOn: options.weekStartsOn }));
            return ({
                name: "Week (days)", 
                from: fromDate,
                to: toDate,
                title: `week ${format(current(time), "I", options)}`,
                description: format(current(time), "yyyy", options),
                labelDates: eachDayOfInterval({ start: fromDate, end: toDate })
            });
        },
        month: () => {
            const current = (d: number | Date) => subMonths(d, index);
            const fromDate = current(startOfMonth(time));
            const toDate = current(endOfMonth(time));
            return ({
                name: "Month (days)", 
                from: fromDate,
                to: toDate,
                title: format(current(time), "LLLL", options),
                description: format(current(time), "yyyy", options),
                labelDates: eachDayOfInterval({ start: fromDate, end: toDate })
            });
        },
        year: () => {
            const current = (d: number | Date) => subYears(d, index);
            const fromDate = current(startOfYear(time));
            const toDate = current(endOfYear(time));
            return ({
                name: "Year (months)", 
                from: fromDate,
                to: toDate,
                title: format(current(time), "yyyy", options),
                description: "Year",
                labelDates: eachMonthOfInterval({ start: fromDate, end: toDate })
            });
        },
        all: () => {
            const current = (d: number) => d;
            const fromDate = subYears(time, current(10));
            const toDate = time;
            return ({
                name: "All time (years)", 
                from: fromDate,
                to: toDate,
                title: `${format(fromDate, "yyyy", options)} - ${format(toDate, "yyyy", options)}`,
                description: "Year",
                labelDates: eachYearOfInterval({ start: fromDate, end: toDate })
            });
        },
    };

    return periodFns[period]();

}

export const average = (oldValue: number, newValue: number) => Number((newValue > 0 ? oldValue == 0 ? newValue : ((oldValue || 0) + newValue) / 2 : (oldValue || 0).toFixed(2)));

// Function to merge nested object and find 'count' or 'average' number and increment etc.
export const merge = (arr: Array<any>) => {

    // console.log(arr);
    if (arr.length === 1) return arr;
    const merged: any = [];
    arr.forEach(item => {
        if (item.name == "") item.name = "_"; // key cant be empty string, we will turn it back in result
        merged[item.name] = (merged[item.name] || 0) + item?.count || 0;
    });
    const result = Object.entries(merged).map(([key, value]) => {
        return key ? { name: (key == "_" ? "" : key), count: value } : null;
    });
    return result;
};

// Function to group objects
export const grouped = (arr : Array<any>, period: string, index = 0) => {

    if (typeof arr == "undefined") return [];

    const formatLabel = (t: string | number | Date) => {
        if (!t) return null;
        return period == "realtime" ? format(t, "HH:mm", options) :
            period == "day" ? format(t, "HH:mm", options) :
                period == "week" ? format(t, "eee", options) :
                    period == "month" ? format(t, "EEEEEE do", options) :
                        period == "year" ? format(t, "MMM", options) :
                            format(t, "yyyy", options);
    };

    const localizedFormatLabel = (d: string | number | Date) => {
        const time = utcToZonedTime(d, timeZone, options);
        const offset = getTimezoneOffset(timeZone);
        const localizedTime = addMilliseconds(time, offset);
        return formatLabel(localizedTime);
    };

    const withLabel = arr.map(item => {
        return { ...item, label: localizedFormatLabel(item.time) };
    });

    const filtered: any = [];
    withLabel.forEach(doc => {
        filtered[doc.label] = [(filtered[doc.label]?.[0] || 0) + doc.value[0] || 0, (filtered[doc.label]?.[1] || 0) + doc.value[1] || 0];
    });
    // console.log(filtered);
    const initial: any = [];
    const periods = getPeriodDates(period, index).labelDates || [];
    // const periodLabels = periods.filter(d => isBefore(d,Date.now())); //Change to filter values only, not labels
    const periodLabels = periods;
    // console.log(periodLabels);
    periodLabels.forEach(d => {
        const label = formatLabel(d); // localizedFormatLabel(d);
        if(label) initial[label] = filtered[label] ? filtered[label] : isBefore(d, Date.now()) ? [0, 0] : undefined;
    });
    // console.log(initial);

    const result = Object.entries(initial).map(([key, value] : [key: string, value: any]) => {
        if (key && value) return { label: key, pageViews: value[0], uniqueVisits: value[1] };
        return { label: key };
    });
    // console.log(result);
    return result;

};

export const merged = (stats: any, period: string, index: number) => {

const merged = stats ? stats?.reduce((total: any, document: any) => {

    return {
        ...total,
        aggregates: {
            pageViews: { count: (total?.aggregates?.pageViews?.count || 0) + (document?.aggregates?.pageViews?.count || 0) },
            uniqueVisits: { count: (total?.aggregates?.uniqueVisits?.count || 0) + (document?.aggregates?.uniqueVisits?.count || 0) },
            singlePageVisits: { count: total?.aggregates?.singlePageVisits?.count || 0 + document?.aggregates?.singlePageVisits?.count || 0 },
            bounceRate: { count: average(total?.aggregates?.bounceRate?.count, document?.aggregates?.bounceRate?.count) },
            avgVisitDuration: { count: average(total?.aggregates?.avgVisitDuration?.count, document?.aggregates?.avgVisitDuration?.count) },
        },
        graph: [...total.graph, { value: [document?.aggregates?.pageViews?.count || 0, document?.aggregates?.uniqueVisits?.count || 0], time: document?.time}],
        browsers:  merge([...total?.browsers, ...document?.browsers]),
        systems: merge([...total?.systems, ...document?.systems]),
        platforms: merge([...total?.platforms, ...document?.platforms]),
        engines: merge([...total?.engines, ...document?.engines]),
        pages: {
            all: merge([...total?.pages?.all, ...document?.pages?.all]),
            entry: merge([...total?.pages?.entry, ...document?.pages?.entry]),
            exit: merge([...total?.pages?.exit, ...document?.pages?.exit]),
        },
        hashes: merge([...total?.hashes, ...document?.hashes]),
        queries: merge([...total?.queries, ...document?.queries]),
        utms: {
            sources: merge([...total?.utms?.sources, ...document?.utms?.sources]),
            campaigns: merge([...total?.utms?.campaigns, ...document?.utms?.campaigns]),
            contents: merge([...total?.utms?.contents, ...document?.utms?.contents]),
            terms: merge([...total?.utms?.terms, ...document?.utms?.terms]),
        },
        referrers: merge([...total?.referrers, ...document?.referrers]),
        countries: merge([...total?.countries, ...document?.countries]),
    };
}, {
    aggregates: { pageViews: { count: 0 }, uniqueVisits: { count: 0 }, singlePageVisits: { count: 0 }, bounceRate: { count: 0 }, avgVisitDuration: { count: 0 }, },
    graph: [], browsers: [], systems: [], platforms: [], engines: [], 
    pages: { all: [], entry: [], exit: [] }, 
    hashes: [], 
    queries: [], 
    utms: { sources: [], campaigns: [], contents: [], terms: [], }, 
    referrers: [], countries: [],
}
) : [];

merged.graph = grouped(merged.graph, period, index);

return merged;
};

export const toCSV = (array: Array<any>) => {
    try {
        const input = array; // typeof json == "object" ? json : JSON.parse(json);
        const replacer = (key: any, value: any) => value === null ? "" : value;
        const header = Object.keys(input[0]);
        let csv = input.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(","));
        csv.unshift(header.join(","));
        return csv.join("\r\n");

    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(e);
            return `${JSON.stringify(array)} is not valid json.`;
        } else {
            return `${JSON.stringify(array)}, ${e}.`;
        }
    }
};

export const lowerCase = (value: string) => {
    return typeof value == "string" ? value.toLowerCase() : value;
};

export const  isValidDomain = (input: string) => {

    if (!input) return false;
    const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([-.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
    return !!(regex.test(input) == true);

};