<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.showDialog"
      width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">선수 검색</span>
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <v-select
              v-model="selectedClubId"
              :items="clubs"
              item-title="name"
              item-value="id"
              label="소속팀"
              density="compact"
            />
          </v-col>
          <v-col
            cols="12"
            sm="5"
          >
            <v-text-field
              v-model="inputPlayerName"
              placeholder="선수 명을 입력해주세요"
              density="compact"
            />
          </v-col>
          <v-col>
            <v-btn
              prepend-icon="mdi-magnify"
              @click="emitSearch"
            >
              검색
            </v-btn>
          </v-col>
        </v-row>
        <v-list>
          <v-list-subheader>검색 결과</v-list-subheader>

          <v-radio-group v-model="selectedPlayerId">
            <v-list-item
              v-for="(item, i) in mockPlayers"
              :key="i"
              :value="item"
              color="primary"
              rounded="xl"
            >
              <template #prepend>
                <v-radio :value="item.id" />
                <v-img
                  :src="item.image"
                  height="100px"
                  width="50px"
                >
                  <v-overlay
                    activator="parent"
                    location-strategy="connected"
                    scroll-strategy="close"
                  >
                    <v-card
                      class="mx-auto"
                      max-width="500"
                      :title="getName(item)"
                      :subtitle="getClubAndPositionName(item)"
                      :prepend-avatar="item.image"
                    >
                      <v-card-text>
                        <!--TODO 한글로 변경  -->
                        <tbody
                          v-for="(value, key) in item.stats"
                          :key="key"
                        >
                          <tr>
                            <th align="left">
                              {{ key }}:
                            </th>

                            <td align="right">
                              {{ value }}
                            </td>
                          </tr>
                        </tbody>
                      </v-card-text>
                    </v-card>
                  </v-overlay>
                </v-img>
              </template>

              <v-list-item-title>{{ item.firstName }}</v-list-item-title>
            </v-list-item>
          </v-radio-group>
        </v-list>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="emitSave"
          >
            추가
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="() => emit('close')"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {ref} from "vue";

const getName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
const getClubAndPositionName = ({ clubName, positionName }) =>
  `${clubName} (${positionName})`;

const props = defineProps({
  showDialog: Boolean,
  position: Number
})

const selectedClubId = ref(null);
const selectedPlayerId = ref(null);
const inputPlayerName = ref(null);

const mockPlayers = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
];
const clubs = [
  {
    id: 1,
    name: 'Los Angeles Angels'
  },
  {
    id: 2,
    name: 'Arizona Diamondbacks'
  },
  {
    id: 3,
    name: 'Chicago Cubs'
  }
];

const emit = defineEmits(['save', 'close','search']);
const emitSave = () => {
  const selectedPlayer = mockPlayers.find(it=>it.id === selectedPlayerId.value);
  emit('save', props.position, selectedPlayer);
  emit('close');
};
const emitSearch = () => {
  emit('search',{
     clubId: selectedClubId.value,
     playerName: inputPlayerName.value
  })
}
</script>
