<template>
  <v-data-iterator
    :items="Object.entries(matches)"
  >
    <template #default="{ items }">
      <v-timeline align="start">
        <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          size="small"
        >
          <template v-slot:opposite>
            <div
              :class="`pt-1 headline font-weight-bold`"
              v-text="i % 2 === 0 ? `${Math.floor(i / 2) + 1} Inning Top` : `${Math.floor(i / 2) + 1} Inning Bottom`"
            ></div>
          </template>
          <div>
            <v-list-item
              v-for="(results, index) in item.raw"
              :key="index"
            >
              <v-list-item
                v-for="(result, idx) in results"
                :key="idx"
              >
                <v-list-item-title
                  v-if="index !== 0"
                  :class="{ 'font-weight-black': idx === results.length - 1 }"
                >
                  <span v-if="idx === results.length - 1">Score</span>
                  {{ result }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item>
          </div>
        </v-timeline-item>
      </v-timeline>
    </template>
  </v-data-iterator>
</template>


<script setup>
import {storeToRefs} from "pinia";
import {useMatchStore} from "@/store/match";


const {matches} = storeToRefs(useMatchStore());
console.log(matches);

</script>
