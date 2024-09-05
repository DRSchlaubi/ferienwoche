<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-10 px-5">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">Ferienwochen Information</h1>
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <p class="mb-2">Wir haben aktuell die {{ 126481 }}. Ferienwoche nach der Feria Scolarum.</p>
        <p class="mb-2">
          Wir haben aktuell die {{ 4301 }}. Ferienwoche nach <a
href="https://schulferien.org" target="_blank"
                                                                class="text-blue-500 dark:text-blue-300">Schulferien.org</a>.
        </p>
        <p class="mb-2">
          Wir haben aktuell die {{ weeksSinceGermanyFoundingDate }}. Ferienwoche seit Gründung der Bundesrepublik
          Deutschland.
        </p>
        <p class="mb-2">
          Wir haben aktuell die {{ weeksSinceHamburgTreaty }}. Ferienwoche nach dem „<a
            href="https://de.wikipedia.org/wiki/Hamburger_Abkommen" target="_blank"
            class="text-blue-500 dark:text-blue-300">Hamburger Abkommen</a>“.
        </p>
        <p class="mb-2">
          Wir haben aktuell die {{ weeksSinceStartOfYear }}. Ferienwoche des aktuellen Jahres.
        </p>
      </div>
    </div>
    <footer class="fixed bottom-0 left-0 w-full text-center pb-4">
      <p>
        <span class="material-symbols-outlined text-base align-middle">code</span> mit <span class="material-symbols-outlined text-base align-middle">favorite</span> by
        <a href="https://schlau.bi" class="text-blue-500 dark:text-blue-300"> Schlaubi </a>
        &
        <a href="https://korsti.pp.ua" class="text-blue-500 dark:text-blue-300"> Korsti </a>
        auf <a class="text-blue-500 dark:text-blue-300" href="https://github.com/DRSchlaubi/ferienwoche">GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import {ChronoUnit, LocalDate, Month, type Temporal, Year} from "@js-joda/core";

function calculateWeeksSince(start: Temporal): number {
  const now = LocalDate.now();

  return start.until(now, ChronoUnit.WEEKS);
}

export default {
  data() {
    return {
      currentYear: Year.now().atDay(1),
      hamburgTreatyDate: LocalDate.of(1964, Month.OCTOBER, 28),
      germanyFoundingDate: LocalDate.of(1964, Month.OCTOBER, 28),
    };
  },

  computed: {
    weeksSinceGermanyFoundingDate(): number {
      return calculateWeeksSince(this.germanyFoundingDate);
    },
    weeksSinceHamburgTreaty(): number {
      return calculateWeeksSince(this.hamburgTreatyDate);
    },
    weeksSinceStartOfYear(): number {
      return calculateWeeksSince(this.currentYear);
    }
  }
}
</script>
