<template>
    <div class="loginUser">   
        <div class="containerLoginUser">
            <h2>Iniciar Sesión</h2>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <div class="inisecion1">
                    <input type="text" v-model="user.username" placeholder="Username" required>
                </div>
                <div class="inisecion1">
                    <input type="password" v-model="user.password" placeholder="Password" required>
                </div>
                <div class="botoncontain">
                    <button type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </div>
</template>         

<script>
    import axios from 'axios';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            processLogInUser: function(){
                axios.post(
                    "https://gestionrisk-be.herokuapp.com/login/",
                    this.user,
                    {headers:{}}
                )
                .then((result) => {
                    let dataLogin = {
                        username     : this.user.username,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    this.$emit('completedLogIn', dataLogin)
                })
                .catch((error) => {
                    if(error.response.status == "401")
                        this.$swal({
                            title: 'Credenciales Incorrectas',
                            icon: 'error'
                        })
                });
            }
        }
    }
</script>

<style>

.loginUser{
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3.5em;
}

.containerLoginUser{
    display: grid;
    grid-template-columns: 1fr;
    margin: 5.5em auto;
    border: 3px solid #283747; 
    border-radius: 1em;
    padding: 2em;
}

.containerLoginUser h2{
    font-family: 'Courier New', Courier, monospace;
    font-size: 25px;
    margin-bottom: 0.5em;
    color: #283747;
    text-align: center;
    display: flex;
    justify-content: center;
}

.inisecion1{
  font-family: 'Courier New', Courier, monospace;
  margin: 1em;
}

.inisecion1 input{
  font-family: 'Courier New', Courier, monospace;
  padding: 0.3em;
  margin-top: 0.5em;
  width: 100%;
  height: 1.8em;
  font-size: 18px;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid black;
}


.containerLoginUser button{
    font-size: 18px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;


    background-color: #4062BB;
    color: white;

    border-radius: 0.5em;
    padding: 0.5em;
    margin-top: 0.8em;
    border: none;
}

.botoncontain{
  display: flex;
  justify-content: center;
}

.botoncontain button:hover{
    background:  #081863;
    color: blanchedalmond;
}
</style>