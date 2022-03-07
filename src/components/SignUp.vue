<template>
    <div class="signUpUser">
        <div class="containerSignUpUser">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="inisecion1">
                    <input type="text"  v-model="user.username" placeholder="Username" required>
                </div>
                <div class="inisecion1">
                    <input type="password" v-model="user.password" placeholder="Password" required>
                </div>
                <div class="inisecion1">
                    <input type="text" v-model="user.name" placeholder="Nombre" required>
                </div>
                <div class="inisecion1">
                    <input type="email" v-model="user.email" placeholder="Email" required>
                </div>
                <div class="botoncontain">
                    <button type="submit">Registrarse</button>
                </div>
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
                    this.$swal({
                        title: 'Fallo en el registro. Intentelo de nuevo',
                        icon: 'error'
                    })
                }); 
            }
        }
    }
</script>

<style>

.signUpUser{
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3.5em;
}

.containerSignUpUser{
    display: grid;
    grid-template-columns: 1fr;
    margin: 4em auto;
    border: 3px solid #283747; 
    border-radius: 1em;
    padding: 2em;
}

.containerSignUpUser h2{
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    margin-bottom: 0.5em;
    color: #283747;
    text-align: center;
    display: flex;
    justify-content: center;
}
.containerSignUpUser button{
    font-size: 18px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;


    background-color: #4062BB;
    color: blanchedalmond;

    border-radius: 0.5em;
    padding: 0.5em;
    margin-top: 0.8em;
    border: none;
}
    /* .signUpUser{
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
        margin-bottom: 20px;
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
        border-radius: 5px;
    }
    .signUpUser button{
        font-weight: bold;
        width: 100%;
        height: 40px;
        background-color: #4062BB;
        color: blanchedalmond;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }
    .signUpUser button:hover{
        background:  #CFDBD5;
        color: black;
    } */
</style>