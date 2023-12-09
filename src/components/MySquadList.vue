<template>
  <v-data-iterator
    :items="players"
    :items-per-page="itemsPerPage"
  >
    <template #header="{ page, pageCount, prevPage, nextPage }">
      <h1
        class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center"
      >
        <div class="text-truncate">
          내 스쿼드
        </div>

        <div class="d-flex align-center">
          <v-btn
            prepend-icon="mdi-baseball-diamond"
            @click="goSquad"
          >
            내 스쿼드 편집
          </v-btn>

          <div class="d-inline-flex">
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
      </h1>
    </template>

    <template #default="{ items }">
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="6"
          sm="4"
          xl="3"
        >
          <v-sheet border>
            <v-img
              :src="item.raw.image"
              max-width="200px"
              max-height="400px"
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
              <!--TODO 한글로 변경  -->
              <tbody
                v-for="(value, key) in item.raw.stats"
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

    <template #footer="{ page, pageCount }">
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
import { ref, shallowRef } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const goSquad = () => router.push('/squad');

const getName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
const getClubAndPositionName = ({ clubName, positionName }) =>
  `${clubName} (${positionName})`;

const itemsPerPage = shallowRef(3);
const mockPlayers = [
  {
    firstName: "Justin",
    lastName: "Verlander",
    clubName: "Houston Astros",
    positionName: "선발 투수",
    stats: {
      gamePlayedCount: 1,
      gameStartedCount: 2,
      innings: 5,
      wins: 1,
      losses: 20,
      saves: 5,
      era: 5.32,
    },
    image:
      "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/450203/headshot/67/current",
  },
  {
    firstName: "Kenley",
    lastName: "Jansen",
    clubName: "Boston Red Sox",
    positionName: "선발 투수",
    stats: {
      gamePlayedCount: 1,
      gameStartedCount: 2,
      innings: 5,
      wins: 1,
      losses: 20,
      saves: 5,
      era: 5.32,
    },
    image:
      "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/445276/headshot/67/current",
  },
  {
    firstName: "Charlie",
    lastName: "Morton",
    clubName: "Atlanta Braves",
    positionName: "선발 투수",
    stats: {
      gamePlayedCount: 1,
      gameStartedCount: 2,
      innings: 5,
      wins: 1,
      losses: 20,
      saves: 5,
      era: 5.32,
    },
    image:
      "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/453268/headshot/67/current",
  },
  {
    name: "SteelSeries Rival 3",
    firstName: "Daniel",
    lastName: "Bard",
    dpi: 8500,
    buttons: 6,
    weight: "77g",
    wireless: false,
    price: 29.99,
    description: "SteelSeries Rival 3",
    src: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/453268/headshot/67/current",
  },
];

const players = ref(mockPlayers);
</script>
