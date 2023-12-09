<template>
  <v-row justify="center">
    <v-dialog
      v-model="props.showDialog"
      width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">감독 선택</span>
        </v-card-title>
        <v-list>
          <v-radio-group v-model="selectedManagerId">
            <v-list-item
              v-for="(item, i) in mockManagers"
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
                />
              </template>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
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

const props = defineProps({
  showDialog: Boolean
})
const selectedManagerId = ref(null);

const mockManagers = [
  {
    id: 1,
    name: 'Don Mattingly',
    pitcherBoost: 1,
    batterBoost: 2,
    image: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:83:current.png/ar_1:1,c_pad,b_auto:border/r_max/w_180,q_auto:best/v1/people/118443/headshot/83/coach/current'
  },
  {
    id: 2,
    name: 'Buck Showalter',
    pitcherBoost: 2,
    batterBoost: 4,
    image: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:83:current.png/ar_1:1,c_pad,b_auto:border/r_max/w_180,q_auto:best/v1/people/427469/headshot/83/coach/current'
  },
  {
    id: 3,
    name: 'Dusty Baker',
    pitcherBoost: 10,
    batterBoost: 3,
    image: 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:83:current.png/ar_1:1,c_pad,b_auto:border/r_max/w_180,q_auto:best/v1/people/110481/headshot/83/coach/current'
  },
];

const emit = defineEmits(["save", "close"]);
const emitSave = () => {
  const selectedManager = mockManagers.find(it=>it.id === selectedManagerId.value);
  emit('save', selectedManager);
  emit('close');
};
</script>
