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
    const response = await $fetch(`https://ferien-api.de/api/v1/holidays/BY/${year.value()}`);

    return findSummerHolidays(response)
}

function findSummerHolidays(holidays: Holiday[]): Holiday {
    return holidays.find(holiday => {
        return holiday.name.startsWith('sommerferien')})
}

export {findLastSummerHoliday, Holiday};
