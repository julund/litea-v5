import { clsx } from "clsx";
import { startOfMonth, startOfDay, endOfDay, startOfWeek, startOfYear, subDays, subMonths, subWeeks, subYears, endOfWeek, endOfMonth, eachHourOfInterval, isBefore, eachDayOfInterval, endOfYear, eachMonthOfInterval, eachYearOfInterval, subMinutes, eachMinuteOfInterval, addMilliseconds, addDays, parse, addWeeks, addMonths, isToday, isThisWeek, isThisMonth, addYears, isThisYear, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { format, utcToZonedTime, zonedTimeToUtc, getTimezoneOffset, type OptionsWithTZ } from "date-fns-tz";

export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export const classNames = (...inputs: ClassValue[]) => [...new Set(clsx(...inputs).split(" "))].join(" ");


const options: OptionsWithTZ = { timeZone: "Europe/Oslo", locale: enUS, weekStartsOn: 1 };
const timeZone = options.timeZone as string;

export const zonedTimeToUtcString = (date: string | number | Date) => {
    return zonedTimeToUtc(date, timeZone, options).toUTCString();
};

interface Period {
    id: string;
    name: string;
}

export const periods: Period[] = [
    { id: "realtime", name: "Realtime" },
    { id: "day", name: "Day (hours)" },
    { id: "week", name: "Week (days)" },
    { id: "month", name: "Month (days)" },
    { id: "year", name: "Year (months)" },
    { id: "all", name: "All time (years)" },
];

export function getPeriodByName(periodName: string, time?: string) {

    const period = periods.find(({ id }) => id === periodName);
    if (!period) throw new Error("unknown period");
    // console.log({ period });
    const parsedTime = time ? parse(time, "yyyy-MM-dd", Date.now(), options) : Date.now();
    const utcTime = utcToZonedTime(parsedTime, timeZone, options);

    switch (period.id) {
        case "day":
            return ({
                get from() { return startOfDay(utcTime); },
                get to() { return endOfDay(utcTime); },
                get previous() { return format(subDays(utcTime, 1), "yyyy-MM-dd", options); },
                get next() { return isToday(utcTime) ? undefined : format(addDays(utcTime, 1), "yyyy-MM-dd", options); },
                get title() { return format(this.from, "cccc", options); },
                get description() { return format(this.from, "PPP", options); },
                get labelDates() { return eachHourOfInterval({ start: this.from, end: this.to }); },
            });
        case "week":
            return ({
                get from() { return startOfWeek(utcTime, options); },
                get to() { return endOfWeek(utcTime, options); },
                get previous() { return format(subWeeks(this.from, 1), "yyyy-MM-dd", options); },
                get next() { return isThisWeek(utcTime, options) ? undefined : format(addWeeks(this.from, 1), "yyyy-MM-dd", options); },
                get title() { return `Week ${format(this.from, "I", options)}`; },
                get description() { return format(this.from, "yyyy", options); },
                get labelDates() { return eachDayOfInterval({ start: this.from, end: this.to }); },
            });
        case "month":
            return ({
                get from() { return startOfMonth(utcTime); },
                get to() { return endOfMonth(utcTime); },
                get previous() { return format(subMonths(this.from, 1), "yyyy-MM-dd", options); },
                get next() { return isThisMonth(utcTime) ? undefined : format(addMonths(this.from, 1), "yyyy-MM-dd", options); },
                get title() { return format(this.from, "LLLL", options); },
                get description() { return format(this.from, "yyyy", options); },
                get labelDates() { return eachDayOfInterval({ start: this.from, end: this.to }); },
            });
        case "year":
            return ({
                get from() { return startOfYear(utcTime); },
                get to() { return endOfYear(utcTime); },
                get previous() { return format(subYears(this.from, 1), "yyyy-MM-dd", options); },
                get next() { return isThisYear(utcTime) ? undefined : format(addYears(this.from, 1), "yyyy-MM-dd", options); },
                get title() { return format(this.from, "yyyy", options); },
                get description() { return ""; },
                get labelDates() { return eachMonthOfInterval({ start: this.from, end: this.to }); },
            });
        case "all":
            return ({
                get from() { return startOfYear(subYears(utcTime, 10)); },
                get to() { return endOfYear(utcTime); },
                get previous() { return undefined; },
                get next() { return undefined; },
                get title() { return `${format(this.from, "yyyy", options)} - ${format(this.to, "yyyy", options)}`; },
                get description() { return "all time"; },
                get labelDates() { return eachYearOfInterval({ start: this.from, end: this.to }); },
            });
        default: // "realtime"
            return ({
                get from() { return subMinutes(utcTime, 60); }, // should be 30 mins but need to fix realtime view
                get to() { return utcTime; },  // startOfHour, endOfHour
                get title() { return format(this.from, "HH:mm", options); },
                get description() { return format(this.to, "HH:mm", options); },
                get labelDates() { return eachMinuteOfInterval({ start: this.from, end: this.to }, { step: 1 }); },
            });
    }

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
export const grouped = (arr: Array<any>, period: string, date?: string) => {

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

    const linkPeriod = () => {
        return period === "realtime" ? "realtime" :
            period === "day" ? "realtime" :
                period === "week" ? "day" :
                    period === "month" ? "day" :
                        period === "year" ? "month" :
                            period === "all" ? "year" :
                                null;
    };

    const localizedFormatLabel = (d: string | number | Date) => {
        const time = utcToZonedTime(d, timeZone, options);
        const offset = getTimezoneOffset(timeZone);
        const localizedTime = addMilliseconds(time, offset);
        return formatLabel(localizedTime) || localizedTime.toDateString();
    };

    const withLabel = arr.map(item => {
        return { label: localizedFormatLabel(item.time), value: [...item.value, format(parseISO(item.time), "yyyy-MM-dd")] };
    });
    // console.log(withLabel);
    const filtered: any = [];
    withLabel.forEach(doc => {
        filtered[doc.label] = [(filtered[doc.label]?.[0] || 0) + doc.value[0] || 0, (filtered[doc.label]?.[1] || 0) + doc.value[1] || 0, doc.value[2]];
    });
    // console.log(filtered);
    const initial: any = [];
    const periods = getPeriodByName(period, date).labelDates || [];
    // const periodLabels = periods.filter(d => isBefore(d,Date.now())); //Change to filter values only, not labels
    const periodLabels = periods;
    // console.log(periodLabels);
    periodLabels.forEach(d => {
        const label = formatLabel(d); // localizedFormatLabel(d);
        if (label) initial[label] = filtered[label] ? filtered[label] : isBefore(d, Date.now()) ? [0, 0] : undefined;
    });
    // console.log(initial);

    const result = Object.entries(initial).map(([key, value]: [key: string, value: any]) => {
        if (key && value) return { label: key, pageViews: value[0], uniqueVisits: value[1], period: linkPeriod(), time: value[2] };
        return { label: key };
    });
    // console.log(result);
    return result;

};

export const merged = (stats: any, period: string, date?: string) => {

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
            graph: [...total.graph, { value: [document?.aggregates?.pageViews?.count || 0, document?.aggregates?.uniqueVisits?.count || 0], time: document?.time }],
            browsers: merge([...total?.browsers, ...document?.browsers]),
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

    merged.graph = grouped(merged.graph, period, date);

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

export const isValidDomain = (input: string) => {

    if (!input) return false;
    const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([-.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
    return !!(regex.test(input) == true);

};