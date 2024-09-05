import {LocalDate, Year} from "@js-joda/core";

interface Holiday {
    start: string,
    end: string,
    year: number,
    stateCode: string,
    name: string,
    slug: string
}

async function findLastSummerHoliday(year: Year = Year.now()): Promise<LocalDate> {
    const currentYear = await findHolidays(year);
    const start = LocalDate.parse(currentYear.start)
    if (start.isAfter(LocalDate.now())) {
        return await findHolidays(year.minusYears(1))
    }
    return start;
}

async function findHolidays(year: Year = Year.now()): Promise<Holiday> {
    const {
        data,
        refresh
    } = await useFetch(`https://ferien-api.de/api/v1/holidays/BY/${year.value()}`, {
        key: `holiday-${year.value()}`,
        cache: "force-cache", // Enforces the usage of cache if available
    });

    if (!data) {
        await refresh(); // Fetches fresh data if no cached data is available
    }

    // Ensure the function returns the expected data structure
    return findSummerHolidays(data.value);
}
function findSummerHolidays(holidays: Holiday[]): Holiday {
    return holidays.find(holiday => {
        return holiday.name.startsWith('sommerferien')
    })
}

export {findLastSummerHoliday, Holiday};
