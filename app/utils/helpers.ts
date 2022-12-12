import { clsx } from "clsx";
import { startOfMonth, startOfDay, endOfDay, startOfWeek, startOfYear, subDays, subMonths, subWeeks, subYears, endOfWeek, endOfMonth, eachHourOfInterval, isBefore, eachDayOfInterval, endOfYear, eachMonthOfInterval, eachYearOfInterval, subMinutes, eachMinuteOfInterval, addMilliseconds, addDays, parse, addWeeks, addMonths, isToday, isThisWeek, isThisMonth, addYears, isThisYear, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { format, utcToZonedTime, zonedTimeToUtc, getTimezoneOffset, type OptionsWithTZ } from "date-fns-tz";
// import { type Database } from "~/lib/supabase.d";

export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export const classNames = (...inputs: ClassValue[]) => [...new Set(clsx(...inputs).split(" "))].join(" ");

export const tzOptions: OptionsWithTZ = { timeZone: "Europe/Oslo", locale: enUS, weekStartsOn: 1 };
const timeZone = tzOptions.timeZone as string;

export const zonedTimeToUtcString = (date: string | number | Date) => {
    return zonedTimeToUtc(date, timeZone, tzOptions).toUTCString();
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
    const parsedTime = time ? parse(time, "yyyy-MM-dd", Date.now(), tzOptions) : Date.now();
    const utcTime = utcToZonedTime(parsedTime, timeZone, tzOptions);

    switch (period.id) {
        case "day":
            return ({
                get from() { return startOfDay(utcTime); },
                get to() { return endOfDay(utcTime); },
                get previous() { return format(subDays(utcTime, 1), "yyyy-MM-dd", tzOptions); },
                get next() { return isToday(utcTime) ? undefined : format(addDays(utcTime, 1), "yyyy-MM-dd", tzOptions); },
                get title() { return format(this.from, "cccc", tzOptions); },
                get description() { return format(this.from, "PPP", tzOptions); },
                get labelDates() { return eachHourOfInterval({ start: this.from, end: this.to }); },
            });
        case "week":
            return ({
                get from() { return startOfWeek(utcTime, tzOptions); },
                get to() { return endOfWeek(utcTime, tzOptions); },
                get previous() { return format(subWeeks(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get next() { return isThisWeek(utcTime, tzOptions) ? undefined : format(addWeeks(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get title() { return `Week ${format(this.from, "I", tzOptions)}`; },
                get description() { return format(this.from, "yyyy", tzOptions); },
                get labelDates() { return eachDayOfInterval({ start: this.from, end: this.to }); },
            });
        case "month":
            return ({
                get from() { return startOfMonth(utcTime); },
                get to() { return endOfMonth(utcTime); },
                get previous() { return format(subMonths(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get next() { return isThisMonth(utcTime) ? undefined : format(addMonths(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get title() { return format(this.from, "LLLL", tzOptions); },
                get description() { return format(this.from, "yyyy", tzOptions); },
                get labelDates() { return eachDayOfInterval({ start: this.from, end: this.to }); },
            });
        case "year":
            return ({
                get from() { return startOfYear(utcTime); },
                get to() { return endOfYear(utcTime); },
                get previous() { return format(subYears(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get next() { return isThisYear(utcTime) ? undefined : format(addYears(this.from, 1), "yyyy-MM-dd", tzOptions); },
                get title() { return format(this.from, "yyyy", tzOptions); },
                get description() { return ""; },
                get labelDates() { return eachMonthOfInterval({ start: this.from, end: this.to }); },
            });
        case "all":
            return ({
                get from() { return startOfYear(subYears(utcTime, 10)); },
                get to() { return endOfYear(utcTime); },
                get previous() { return undefined; },
                get next() { return undefined; },
                get title() { return `${format(this.from, "yyyy", tzOptions)} - ${format(this.to, "yyyy", tzOptions)}`; },
                get description() { return "all time"; },
                get labelDates() { return eachYearOfInterval({ start: this.from, end: this.to }); },
            });
        default: // "realtime"
            return ({
                get from() { return subMinutes(utcTime, 60); }, // should be 30 mins but need to fix realtime view
                get to() { return utcTime; },  // startOfHour, endOfHour
                get title() { return format(this.from, "HH:mm", tzOptions); },
                get description() { return format(this.to, "HH:mm", tzOptions); },
                get labelDates() { return eachMinuteOfInterval({ start: this.from, end: this.to }, { step: 1 }); },
            });
    }

}

export const average = (oldValue: number, newValue: number) => Number((newValue > 0 ? oldValue == 0 ? newValue : ((oldValue || 0) + newValue) / 2 : (oldValue || 0).toFixed(2)));

export type NameCountData = { name?: string, count: number } & Partial<Pick<any, "countryCode" | "domain">>;

// Function to merge nested object and find 'count' or 'average' number and increment etc.
export const merge = (arr: Array<NameCountData>) => {

    if (arr.length === 1) return arr;
    const merged: { [s: string]: any; } = [];
    arr.forEach(item => {
        const key = (item.name || "_") as keyof NameCountData;
        merged[key] = Number((merged[key] || 0) + item.count || 0);
    });
    const result = Object.entries(merged).map(([key, value]) => {
        return key ? { name: (key == "_" ? "" : key), count: Number(value) } : null;
    });
    // console.log(result);
    return result;

};

export type ValueTimeData = { value: [number, number], time: string };

export type CountData = { count: number, change?: number; };

export type Aggregates = {
    avgVisitDuration: CountData;
    bounceRate: CountData;
    pageViews: CountData;
    singlePageVisits: CountData;
    uniqueVisits: CountData;
}

// Function to group objects
export const grouped = (arr: Array<ValueTimeData>, period: string, date?: string) => {

    if (typeof arr == "undefined") return [];
    // console.log(arr);
    const formatLabel = (t: string | number | Date) => {

        if (!t) return null;
        switch (period) {
          case "realtime":
          case "day":
            return format(t, "HH:mm", tzOptions);
          case "week":
            return format(t, "eee", tzOptions);
          case "month":
            return format(t, "eee do", tzOptions);
          case "year":
            return format(t, "MMM", tzOptions);
          default:
            return format(t, "yyyy", tzOptions);
        }

      };
      
      const linkPeriod = () => {
        
        switch (period) {
          case "realtime":
          case "day":
            return null;
          case "week":
            return "day";
          case "month":
            return "day";
          case "year":
            return "month";
          case "all":
            return "year";
          default:
            return null;
        }
        
      };

    const localizedFormatLabel = (d: string | number | Date) => {
        const time = utcToZonedTime(d, timeZone, tzOptions);
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
        if (label) initial[label] = filtered[label] ? filtered[label] : isBefore(d, Date.now()) ? [0, 0, format(d, "yyyy-MM-dd")] : undefined;
    });
    // console.log(periodLabels);
    // console.log(initial);

    const result = Object.entries(initial).map(([key, value]: [key: string, value: any]) => {
        if (key && value) return { label: key, pageViews: value[0], uniqueVisits: value[1], period: linkPeriod(), time: value[2] };
        return { label: key };
    });
    // console.log(result);
    return result;

};

export type GraphData = { label: string, pageViews: number, uniqueVisits: number, period: string, time: string };

// export type StatsData = Database["public"]["Tables"]["stats"]["Row"];
export type StatsData = {
    aggregates: Aggregates;
    browsers: NameCountData[];
    time: string;
    platforms: NameCountData[];
    utms: { sources: NameCountData[], campaigns: NameCountData[], contents: NameCountData[], terms: NameCountData[] };
    hashes: NameCountData[];
    systems: NameCountData[];
    engines: NameCountData[];
    pages: { all: NameCountData[], entry: NameCountData[], exit: NameCountData[] };
    queries: NameCountData[];
    referrers: NameCountData[];
    countries: NameCountData[];
    graph?: GraphData[];
};

export const merged = (stats: Array<StatsData> | null, period: string, date?: string) => {

    if (!stats || !Array.isArray(stats)) return stats;

    const merged = stats.reduce((total: any, document: StatsData) => {

        return {
            ...total,
            aggregates: {
                pageViews: { count: (total?.aggregates?.pageViews?.count || 0) + (document?.aggregates?.pageViews?.count || 0) },
                uniqueVisits: { count: (total?.aggregates?.uniqueVisits?.count || 0) + (document?.aggregates?.uniqueVisits?.count || 0) },
                singlePageVisits: { count: total?.aggregates?.singlePageVisits?.count || 0 + (document?.aggregates?.singlePageVisits?.count || 0) },
                bounceRate: { count: average(total?.aggregates?.bounceRate?.count || 0, document?.aggregates?.bounceRate?.count || 0) },
                avgVisitDuration: { count: average(total?.aggregates?.avgVisitDuration?.count || 0, document?.aggregates?.avgVisitDuration?.count || 0) },
            },
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
            graph: [...total.graph, { value: [document?.aggregates?.pageViews?.count || 0, document?.aggregates?.uniqueVisits?.count || 0], time: document?.time }],
        };
    }, {
        aggregates: { pageViews: { count: 0 }, uniqueVisits: { count: 0 }, singlePageVisits: { count: 0 }, bounceRate: { count: 0 }, avgVisitDuration: { count: 0 }, },
        browsers: [],
        systems: [],
        platforms: [],
        engines: [],
        pages: { all: [], entry: [], exit: [] },
        hashes: [],
        queries: [],
        utms: { sources: [], campaigns: [], contents: [], terms: [], },
        referrers: [],
        countries: [],
        graph: [],
    }
    );

    merged.graph = grouped(merged.graph, period, date);

    return merged as StatsData;
};

export const mergedStatsDataWithChange = (current: StatsData | null, previous: StatsData | null) => {

    if (!current || !previous) return current;

    for (const [key, value] of Object.entries(current.aggregates)) {
        const previousCount = previous.aggregates[key as keyof Aggregates].count;
        const change = (((value.count - previousCount) / previousCount)) || 0;
        let values = { count: value.count, change: change };
        current.aggregates[key as keyof Aggregates] = values;
    }
    // console.log(current.aggregates);

    return current;

};

export const toCSV = (input: StatsData[]) => {
    try {
        // const input = array; // typeof json == "object" ? json : JSON.parse(json);
        const replacer = (key: any, value: any) => value === null ? "" : value;
        const header = Object.keys(input[0]);
        let csv = input.map((row: any) => header.map((fieldName: any) => JSON.stringify(row[fieldName], replacer)).join(","));
        csv.unshift(header.join(","));
        return csv.join("\r\n");

    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(e);
            return `${JSON.stringify(input)} is not valid json.`;
        } else {
            return `${JSON.stringify(input)}, ${e}.`;
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