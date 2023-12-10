<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.showDialog"
      width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Select Managers</span>
        </v-card-title>
        <v-list>
          <v-radio-group v-model="selectedManagerId">
            <v-list-item
              v-for="(item, i) in managers"
              :key="i"
              :value="item"
              color="primary"
              rounded="xl"
            >
              <template #prepend>
                <v-radio :value="item.managerId" />
                <v-img
                  :src="item.photo"
                  height="100px"
                  width="50px"
                />
              </template>
              <v-list-item-title class="ml-5">
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="ml-5">
                {{ getBoostDescription(item) }}
              </v-list-item-subtitle>
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
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {usePlayerStore} from "@/store/player";


const {managers} = storeToRefs(usePlayerStore());
const {fetchManagers} = usePlayerStore();

const getBoostDescription
  = ({batterBoost, pitcherBoost}) => `batterBoost: ${batterBoost}, pitcherBoost: ${pitcherBoost}`;

onMounted(async () => {
  await fetchManagers();
});

const props = defineProps({
  showDialog: Boolean
})
const selectedManagerId = ref(null);

const emit = defineEmits(["save", "close"]);
const emitSave = () => {
  const selectedManager = managers.value.find(it => it.managerId === selectedManagerId.value);
  emit('save', selectedManager);
  emit('close');
};
</script>
