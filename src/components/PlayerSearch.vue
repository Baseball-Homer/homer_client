<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.showDialog"
      width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Search Players</span>
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
              item-value="clubId"
              label="Club"
              density="compact"
            />
          </v-col>
          <v-col
            cols="12"
            sm="5"
          >
            <v-text-field
              v-model="inputPlayerName"
              placeholder="Player's Name"
              density="compact"
            />
          </v-col>
          <v-col>
            <v-btn
              prepend-icon="mdi-magnify"
              @click="emitSearch"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
        <v-list>
          <v-list-subheader>Results</v-list-subheader>

          <v-radio-group v-model="selectedPlayerId">
            <v-list-item
              v-for="(item, i) in players"
              :key="i"
              :value="item"
              color="primary"
              rounded="xl"
            >
              <template #prepend>
                <v-radio :value="item.playerId" />
                <v-img
                  :src="item.playerPhoto"
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

              <v-list-item-title class="ml-5">
                {{ `${item.firstName} ${item.lastName}` }}
              </v-list-item-title>
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
            Apply
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="() => emit('close')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {ref} from "vue";
import {clubs} from "@/assets/club.json";
import {usePlayerStore} from "@/store/player";
import {storeToRefs} from "pinia";

const {players} = storeToRefs(usePlayerStore());

const getName = ({firstName, lastName}) => `${firstName} ${lastName}`;
const getClubAndPositionName = ({clubName, positionName}) =>
  `${clubName} (${positionName})`;

const props = defineProps({
  showDialog: Boolean,
  position: Number
})

const selectedClubId = ref(null);
const selectedPlayerId = ref(null);
const inputPlayerName = ref(null);

const emit = defineEmits(['save', 'close', 'search']);
const emitSave = () => {
  const selectedPlayer = players.value.find(it => it.playerId === selectedPlayerId.value);
  emit('save', props.position, selectedPlayer);
  emit('close');
};
const emitSearch = () => {
  if (!selectedClubId.value) {
    alert('Club is a required search condition!');
    return;
  }

  emit('search', {
    clubId: selectedClubId.value,
    playerName: inputPlayerName.value
  })
}
</script>
