<template>
    <div>
        <h1>This is CRUD page</h1>
        <br>
        <br>
        <div :style="displayTable">
            <center>
                <button type="button" @click="create">Create</button>&nbsp;
                <button type="button" @click="redirect('/upload')">Upload Image</button>
                <br>
                <br>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in tableData" :key="index">
                            <td>{{data.name}}</td>
                            <td>{{data.age}}</td>
                            <td>{{data.gender}}</td>
                            <td>
                                <button type="button" @click="editForm(data, index)">Edit</button>
                                <button type="button" @click="remove(data,index)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <br>
                <button type="button" @click="logout">Log out</button>
            </center>
        </div>
        <!-- <Update/> -->
        <div :style="updateForm">
            <center>
                <h4>Update Section</h4>
                <br>
                <label>Name</label>
                <input type="text" placeholder="Name" v-model="updateFormsVariables.name">
                <br>
                <br>
                <label>Age</label>
                <input type="number" placeholder="Age" v-model="updateFormsVariables.age">
                <br>
                <br>
                <label>Gender</label>
                <select v-model="updateFormsVariables.gender">
                    <option
                        value="male"
                        :selected="(updateFormsVariables.gender === 'male') ? 'selected' : ''"
                    >Male</option>
                    <option
                        value="female"
                        :selected="(updateFormsVariables.gender === 'female') ? 'selected' : ''"
                    >Female</option>
                </select>
                <br>
                <p>{{updateFormsVariables}}</p>
                <br>
                <button type="button" @click="update">UPDATE</button>&nbsp;
                <button type="button" @click="cancel">CANCEL</button>
            </center>
        </div>
        <!-- Create -->
        <div :style="createForm">
            <h4>Create Form</h4>
            <br>
            <label>Name</label>&nbsp;
            <input type="text" placeholder="name" v-model="createFormsVariables.name">
            <br>
            <label>Age</label>&nbsp;
            <input type="number" placeholder="age" v-model="createFormsVariables.age">
            <br>
            <label>Gender</label>
            <select v-model="createFormsVariables.gender">
                <option>Male</option>
                <option>Female</option>
            </select>
            <br>
            <button type="button" @click="createData">Create</button>
            <p>{{createFormsVariables}}</p>
        </div>
    </div>
</template>
<script>
import router from "../router";
// import Update from "../components/updateForm";
export default {
  //   components: {
  //     Update
  //   },
  data() {
    return {
      displayTable: "display: inline-block;",
      updateForm: "display: none;",
      createForm: "display:none;",
      tableData: [],
      updateFormsVariables: {
        name: "",
        age: null,
        gender: "",
        index: null
      },
      createFormsVariables: {
        name: "",
        age: "",
        gender: ""
      }
    };
  },
  mounted() {
    // using POST request kay naay BODY ang request, pwede mag get basta; http://localhost:8000/retrieve/ + data1 + '/' + data2
    this.$axios
      .post("http://localhost:8000/retrieve", {
        token: localStorage.getItem("token")
      })
      .then(response => {
        this.tableData = response.data.data;
      });
  },
  methods: {
    editForm(passeddata, passedindex) {
      this.displayTable = "display: none;";
      this.updateForm = "display: inline-block;";
      this.updateFormsVariables.name = passeddata.name;
      this.updateFormsVariables.age = passeddata.age;
      this.updateFormsVariables.gender = passeddata.gender;
      this.updateFormsVariables.index = passedindex;
      this.updateFormsVariables["id"] = passeddata.id;
    },
    cancel() {
      this.displayTable = "display: inline-block;";
      this.updateForm = "display: none;";
      this.updateFormsVariables.name = "";
      this.updateFormsVariables.age = null;
      this.updateFormsVariables.gender = "";
      this.updateFormsVariables.index = null;
    },
    update() {
      let updateInfo = this.updateFormsVariables;
      this.$axios
        .post("http://localhost:8000/update", updateInfo)
        .then(response => {
          console.log("update ", response);
          this.tableData.forEach((element, index) => {
            if (index === this.updateFormsVariables.index) {
              element.name = this.updateFormsVariables.name;
              element.age = this.updateFormsVariables.age;
              element.gender = this.updateFormsVariables.gender;
            }
          });
          this.displayTable = "display: inline-block;";
          this.updateForm = "display: none;";
        });
    },
    remove(data, toRemoveIndex) {
      //   this.tableData = this.tableData.filter((element, index) => {
      //       if(index !== toRemoveIndex){
      //           return element
      //       }
      //   })
      this.$axios
        .post("http://localhost:8000/delete/" + data.id)
        .then(response => {
          console.log("delete ", response);
          this.tableData.splice(toRemoveIndex, 1);
        });
    },
    create() {
      this.displayTable = "display: none;";
      this.updateForm = "display: none;";
      this.createForm = "display: inline-block";
    },
    createData() {
      if (
        this.createFormsVariables.name !== "" &&
        this.createFormsVariables.age !== "" &&
        this.createFormsVariables.gender !== ""
      ) {
        let informations = this.createFormsVariables;
        informations["token"] = localStorage.getItem("token");
        this.$axios
          .post("http://localhost:8000/create", informations)
          .then(response => {
            console.log("create ", response);
            this.displayTable = "display: inline-block;";
            this.updateForm = "display: none;";
            this.createForm = "display:none;";
            this.tableData.push(this.createFormsVariables);
            this.createFormsVariables = {
              name: "",
              age: null,
              gender: ""
            };
          });
      } else {
        alert("all fields are required!");
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    redirect(url) {
      router.push(url);
    }
  }
};
</script>

<style>
</style>
