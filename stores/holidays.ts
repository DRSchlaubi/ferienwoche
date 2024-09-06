import {LocalDate, Year} from "@js-joda/core";
import {$fetch} from "ofetch";
import {defineStore} from "pinia";

interface Holiday {
    start: string,
    end: string,
    year: number,
    stateCode: string,
    name: string,
    slug: string
}

export const useLastSummerHoliday = defineStore(`holidays-${Year.now()}`, () => {
    const holiday = ref<LocalDate | null>(null);

    async function findLastSummerHoliday(year: Year = Year.now()): Promise<LocalDate> {
        const currentYear = await findHolidays(year);
        const start = LocalDate.parse(currentYear.start)
        if (start.isAfter(LocalDate.now())) {
            holiday.value = await findHolidays(year.minusYears(1))
        } else {
            holiday.value = start;
        }
        return holiday.value;
    }

    async function getOrFetchLastSummerHoliday(): Promise<LocalDate> {
        if (holiday.value) {
            return LocalDate.parse(holiday.value);
        }

        return await findLastSummerHoliday()
    }

    return {holiday, getOrFetchLastSummerHoliday};
}, {
    persist: true
});

async function findHolidays(year: Year = Year.now()): Promise<Holiday> {
    const data = await $fetch(`https://ferien-api.de/api/v1/holidays/BY/${year.value()}`, {
        key: `holiday-${year.value()}`,
        cache: "force-cache", // Enforces the usage of cache if available
    });

    // Ensure the function returns the expected data structure
    return findSummerHolidays(data);
}

function findSummerHolidays(holidays: Holiday[]): Holiday {
    return holidays.find(holiday => {
        return holiday.name.startsWith('sommerferien')
    })
}

export {findLastSummerHoliday, Holiday};
