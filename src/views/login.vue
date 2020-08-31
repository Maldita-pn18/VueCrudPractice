<template>
    <div>
        username: <input type="text" id="username" placeholder="username" v-model="userName">
        <br>
        password: <input type="password" id="password" placeholder="password" v-model="passWord">
        <br>
        <br>
        <button type="button" id="submit" @click="login">login</button>
        <br>
        <p>username : {{userName}}</p>
        <p>password : {{passWord}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userName: '',
            passWord: ''
        }
    },
    methods: {
        login(){
            if(this.userName !== '' && this.passWord !== ''){
                // alert('success')
                // this.$router.push('/crud')
                // 
                //HTTP REQUEST USING GET
                // this.$axios.get('http://localhost:8000/login/'+this.userName +'/'+this.passWord,{}).then(response => {
                //     console.log(response)
                // })
                let parameters = {username: this.userName, password: this.passWord}
                this.$axios.post('http://localhost:8000/login', parameters).then(response => {
                    console.log('login', response.data.data)
                    if(response.data.data.token !== null && response.data.data.token !== undefined){
                        localStorage.setItem('token', response.data.data.token)
                        this.$router.push('/crud')
                    }
                })
            }else{
                alert('fields are required!')
            }
        }
    }
}
</script>

<style>

</style>
