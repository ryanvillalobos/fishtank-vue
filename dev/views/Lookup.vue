<template>
  <div class="content-container">
    <h1>Autocomplete Lookup Examples</h1>
    <h3>Example 1:</h3>
    <autocomplete
      id="autocomplete_example1"
      :items="items"
      v-model="selected"
      label="Autocomplete Label"
      orientation="ltr"
      url="/some_autocomplete_endpoint"
    />
    <div v-if="selected">
      <span>label: {{selected.label}},</span>
      <span>value: {{selected.value}}</span>
    </div>

    <h3>Example 2:</h3>
    <autocomplete
      id="autocomplete_example2"
      :items="items2"
      v-model="selected2"
      label="Neighbor Search"
      orientation="ltr"
      :custom-slot="slotInfo"
      url="/some_autocomplete_endpoint"
      v-bind:content="this.content"
      v-on:update:content="content = $event"
    >
      <!-- <template v-slot:profile="props" :content = "content">
        <div @ `>
          {{ "props.test" }}
        </div>
      </template>-->
      <template>
        <div slot-scope = "{ filteredItems, _selectResult }" :content="content">
          <div v-for="(item, index) in filteredItems" :key="index">
            <div 
              class="card"
              @mousedown.native="() => _selectResult(item)"
              @mouseover.native="focusedItem=index">
              <img :src="content.profile" alt="Avatar" style="width:100%" />
              <div class="container">
                <h4>
                  <b> {{ content.character }} </b>
                </h4>
                <p>Address: {{ content.address }}</p>
                <p>Age: {{ content.age  }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </autocomplete>
    <div v-if="selected">
      <span>{{ selected2 }}</span>
    </div>
  </div>
</template>
<script>
const moxios = require("moxios");
import { FishTankLookup, FishTankText } from "@/index";
export default {
  components: {
    FishTankText,
    autocomplete: FishTankLookup
  },
  data() {
    return {
      selected: null,
      items: [
        { label: "Some item 1", value: "some-item-1" },
        { label: "Some item 2", value: "some-item-2" },
        { label: "Some item 3", value: "some-item-3" },
        { label: "Some item 4", value: "some-item-4" },
        { label: "Some item 5", value: "some-item-5" }
      ],
      slotInfo: {
        customSlot: true,
        slotName: "profile"
      },
      selected2: null,
      items2: [
        {
          character: "Elmo",
          color: "Red",
          age: "45",
          height: "2",
          food: "Pizza",
          address: "Sesame Street",
          phoneNumber: "(323) 319-6060",
          netWorth: "$1.6B",
          profile:
            "https://pbs.twimg.com/profile_images/1092451830758547457/EqQ6Csl3_400x400.jpg"
        },
        {
          character: "Barney",
          color: "Purple",
          age: "67",
          height: "10",
          food: "Meteors",
          address: "1101 K Street NW",
          phoneNumber: "(212) 458-1902",
          netWorth: "$200M",
          profile:
            "https://expo.advance.net/img/939589ecfc/width960/58a_barneypolarvortexarcticblast.jpeg"
        },
        {
          character: "Oscar",
          color: "Green",
          age: "34",
          height: "4",
          food: "Garbage",
          address: "Various Trash Cans",
          phoneNumber: "(240) 678-1945",
          netWorth: "$7",
          profile:
            "https://pbs.twimg.com/profile_images/1092452335446568961/nhIaXRoF_400x400.jpg"
        },
        {
          character: "Cookie Monster",
          color: "Blue",
          age: "56",
          height: "5",
          food: "Cookies",
          address: "619 Cookie Place",
          phoneNumber: "(903) 234-6196",
          netWorth: "$900,000",
          profile:
            "https://pbs.twimg.com/profile_images/1092451626781163523/0YzJMi-8_400x400.jpg"
        },
        {
          character: "Big Bird",
          color: "Yellow",
          age: "346",
          height: "12",
          food: "His Enemies",
          address: "Unknown",
          phoneNumber: "4",
          netWorth: "$3.2T",
          profile:
            "https://pbs.twimg.com/profile_images/1092452187777703936/acEpmmyi_400x400.jpg"
        }
      ],
      content: {}
    };
  }
};
</script>

<style scoped lang = "scss">
.content-container {
  margin: 25px;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style> 