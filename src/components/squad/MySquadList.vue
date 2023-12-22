<template>
  <v-data-iterator
    :items="players"
    :items-per-page="itemsPerPage"
  >
    <template #no-data>
      <div class="ml-4 text-h4 mt-16">
        Click <strong>"EDIT SQUAD"</strong> button to create your squad ⚾⚾
      </div>
    </template>
    <template #header="{ page, pageCount, prevPage, nextPage }">
      <div
        class="d-flex justify-space-between mb-4"
      >
        <div class="text-h4 font-weight-bold ma-3">
          My Squad
        </div>

        <div class="d-flex align-center">
          <v-btn
            class="mr-4"
            prepend-icon="mdi-baseball-diamond"
            @click="goSquad"
          >
            Edit Squad
          </v-btn>

          <div class="d-inline-flex mr-4">
            <v-btn
              :disabled="page === 1"
              icon="mdi-arrow-left"
              size="small"
              variant="tonal"
              class="me-2"
              @click="prevPage"
            />

            <v-btn
              :disabled="page === pageCount"
              icon="mdi-arrow-right"
              size="small"
              variant="tonal"
              @click="nextPage"
            />
          </div>
        </div>
      </div>
    </template>

    <template #default="{ items }">
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="6"
          sm="4"
        >
          <v-sheet border>
            <v-img
              :src="item.raw.playerPhoto"
              max-width="300px"
              max-height="410px"
            />

            <v-list-item
              :title="item.raw.firstName"
              lines="two"
              density="comfortable"
              :subtitle="getClubAndPositionName(item.raw)"
            >
              <template #title>
                <strong class="text-h6">
                  {{ getName(item.raw) }}
                </strong>
              </template>
            </v-list-item>

            <v-table
              density="compact"
              class="text-caption"
            >
              <tbody
                v-for="(value, key) in extractStat(item.raw)"
                :key="key"
              >
                <tr align="right">
                  <th>{{ key }}:</th>

                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <template
      v-if="players.length"
      #footer="{ page, pageCount }"
    >
      <v-footer
        color="surface-variant"
        class="justify-space-between text-body-2 mt-4"
      >
        <div>Page {{ page }} of {{ pageCount }}</div>
      </v-footer>
    </template>
  </v-data-iterator>
</template>

<script setup>
import {shallowRef} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useSquadStore} from "@/store/squad";

const {players} = storeToRefs(useSquadStore());

const router = useRouter();
const goSquad = () => {
  const mode = players.value.length ? 'edit' : 'new';
  router.push(`/squad?mode=${mode}`);
}

const getName = ({ primaryNum, firstName, lastName }) => `No.${primaryNum}  ${firstName} ${lastName}`;
const getClubAndPositionName = ({ clubName, positionName }) => `${clubName} (${positionName})`;

const isPitcher = (positionNumber) => positionNumber === 0 || positionNumber === 1;

const extractStat = ({position, gamePlayed, innings ,wins, losses, homeruns, plates, era, avg}) => {
  if (isPitcher(position)) {
    return {gamePlayed, innings, wins, losses, era};
  } else {
    return {gamePlayed, plates, homeruns, avg};
  }
}

const itemsPerPage = shallowRef(3);
</script>
