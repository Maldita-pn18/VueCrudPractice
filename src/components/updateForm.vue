<template>
  <div>
    <center>
      <h4>Update Section</h4>
      <br>
      <label>Name</label>
      <input type="text" placeholder="Name" v-model="Ydata.name">
      <br>
      <br>
      <label>Age</label>
      <input type="number" placeholder="Age" v-model="Ydata.age">
      <br>
      <br>
      <label>Gender</label>
      <select>
        <option value="male" :selected="(returnData.gender === 'male') ? 'selected' : ''">Male</option>
        <option value="female" :selected="(returnData.gender === 'female') ? 'selected' : ''">Female</option>
      </select>
      <br>
      <p>{{returnData}}</p>
      <br>
      <button type="button" @click="update">UPDATE</button>&nbsp;
      <button type="button" @click="backForm">CANCEL</button>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Ydata: {
        name: "",
        age: null,
        gender: "",
        index: null
      }
    };
  },
  computed: {
    returnData() {
      return this.Ydata;
    }
  },
  methods: {
    update() {},
    backForm() {
      this.$router.push("/crud");
    }
  },
  mounted() {
    this.$emitter.$on("update-event", payload => {
        this.Ydata.name = payload.name;
        this.Ydata.name = payload.name
        this.Ydata.age = payload.age
        this.Ydata.gender = payload.gender
        this.Ydata.index = payload.index
    });
  }
};
</script>

<style>
</style>
