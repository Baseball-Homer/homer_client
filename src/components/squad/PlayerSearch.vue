<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.showDialog"
      width="1000"
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
        <h2 class="ml-3 pt-3">
          Results
        </h2>
        <v-table>
          <thead>
            <tr>
              <th />
              <th />
              <th>Name</th>
              <th>PrimaryNumber</th>
              <th>Contact</th>
              <th>Control</th>
              <th>Discipline</th>
              <th>Power</th>
              <th>Stuff </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in players"
              :key="item.name"
            >
              <td>
                <v-radio-group v-model="selectedPlayerId">
                  <v-radio :value="item.playerId" />
                </v-radio-group>
              </td>
              <td>
                <v-img
                  :src="item.playerPhoto"
                  height="100px"
                  width="50px"
                />
              </td>
              <td>{{ getName(item) }}</td>
              <td>{{ getPrimaryNumber(item) }}</td>
              <td>{{ item.contact }}</td>
              <td>{{ item.control }}</td>
              <td>{{ item.discipline }}</td>
              <td>{{ item.power }}</td>
              <td>{{ item.stuff }}</td>
            </tr>
          </tbody>
        </v-table>

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
const getPrimaryNumber = ({primaryNum})=> `No. ${primaryNum}`;

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
