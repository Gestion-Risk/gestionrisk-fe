<template>
    <div class="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp">
                <input type="text"  v-model="user.username" placeholder="Username">
                <br />
                <input type="password" v-model="user.password" placeholder="Password">
                <br />
                <input type="text" v-model="user.name" placeholder="Nombre">
                <br />
                <input type="email" v-model="user.email" placeholder="email">
                <br />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:'SignUp',

        data:function(){
            return{
                user:{
                    username:"",
                    password:"",
                    name    :"",
                    email   :"",
                }
            }
        },
        methods:{
            processSignUp:function(){
                axios.post(
                    /* 'http://localhost:8000/createuser/', */
                    "https://gestionrisk-be.herokuapp.com/createuser/",
                    this.user,
                    {headers:{}}
                )
                .then((result) => {
                    let dataSignUp = {
                        username     : this.user.username,
                        token        : result.data.access,
                    }
                    this.$emit('completedSignUp', dataSignUp)
                })
                .catch((error) => {
                    console.log(error)
                    alert("Error. Fallo en el registro de usuario.");
                }); 
            }
        }
    }
</script>

<style>
    .signUpUser{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerSignUpUser {
        border: 3px solid #283747;
        border-radius: 15px;
        width: 25%;
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .signUpUser h2{
        color: #283747;
    }
    .signUpUser form{
        width: 75%;
    }
    .signUpUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }
    .signUpUser button{
        font-weight: bold;
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #A37A07;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }
    .signUpUser button:hover{
        color: #E5E7E9;
        background: #78755C;
        border: 1px solid #283747;
    }
</style>