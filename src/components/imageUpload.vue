<template>
    <div class="container-fluid">
        <center>
            <div class="card-container">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3" v-if="image">
                            <img :src="image" class="img-responsive" height="70" width="90">
                        </div>
                        <div class="col-md-6">
                            <input type="file" v-on:change="onImageChange" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <button
                                class="btn btn-success btn-block"
                                @click="uploadImage"
                            >Upload Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    </div>
</template>
<script>
export default {
  data() {
    return {
      image: ""
    };
  },
  methods: {
    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      this.$axios
        .post("http://localhost:8000/image", { image: this.image })
        .then(response => {
          if (response.data.success) {
            alert(response.data.success);
          }
        });
    }
  }
};
</script>

<style>
.card {
  width: 70%;
  border: 1px solid red;
}
</style>
