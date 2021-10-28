<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Gestion Capacitaciones<br /> G03 - P8</h1>
      <nav>
        <button v-if="isAuth" v-on:click="loadHome">Inicio</button>
        <button v-if="isAuth" v-on:click="loadEmpleados">Empleados</button>
        <button v-if="isAuth" v-on:click="loadCapacitacion">Capacitaciones</button>
        <button v-if="isAuth" v-on:click="loadRegistros">registros</button>
        <button v-if="isAuth" v-on:click="logOut">Cerrar Sesion</button>

        <button v-if="!isAuth" v-on:click="loadLogIn">Iniciar Sesion</button>  
        <button v-if="!isAuth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:capacitacionCreada="capacitacionCreada"
        v-on:capacitacionEliminada="capacitacionEliminada"
        >
      </router-view>
    </div>

    <div class="footer">
      <h2>MisionTic 2022 - p8 Course</h2>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
  export default{
    name: 'App',

    data: function(){
      return {
        isAuth: false
      }
    },

    components:{

    },

    methods: {
      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        if(this.isAuth == false){
          this.$router.push({name: "login"})
        }
          else{
          this.$router.push({name: "home"});
        } 
      },

      loadHome: function(){
        this.$router.push({name: "home"});
      },

      loadEmpleados: function(){
        this.$router.push({name: "empleados"});
      },

      loadRegistros: function(){
        this.$router.push({name: "registros"})
      },

      loadCapacitacion: function(){
        this.$router.push({name: "capacitaciones"})
      },

      logOut: function(){
        let token  = localStorage.getItem("token");
        localStorage.clear();
        alert("Sesion Cerrada");
        this.verifyAuth();
      },

      loadLogIn: function(){
        this.$router.push({name: "login"})
      },
      
      loadSignUp: function(){
        this.$router.push({name: "signup"})
      },

      completedLogIn: function(data){
        localStorage.setItem('username', data.username);
        localStorage.setItem('tokenRefresh', data.tokenRefresh);
        localStorage.setItem('tokenAccess', data.tokenAccess);
        localStorage.setItem('isAuth', true);
        alert("Autenticacion Exitosa");
        this.verifyAuth()
      },

      completedSignUp: function(data){
        alert("Registro Exitoso");
        this.completedLogIn(data);
      },
      capacitacionCreada: function(){
        alert("Capacitacion creada");
        this.$router.push({name: "capacitaciones"})
      },
      capacitacionEliminada: function(){
        alert("Capacitacion Eliminada")
        this.$router.push({name: "capacitaciones"})
      }
    },

    created: function(){
      this.verifyAuth();

    }
  }

</script>


<style>

  html, body {
    margin: 0; 
    padding: 0;
  } 
  p {
    margin: 0 0 3px 0; 
    padding: 0;
  } 
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 2px 0; 
    padding: 0;
    } 
  form {
    margin: 0; 
    padding: 0;
    }

  body {
    max-width: 0 0 0 0;
  }
  .header{
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #A37A07;
    color:#E5E7E9 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1{
    width: 50%;
    text-align: center;
  }
  .header nav {
    height: 50%;
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
    top: 15px;
  }
  .header nav button{
    color: #000000;
    background: #F0EAB9;
    border: 1px solid #A37A07;
    border-radius: 5px;
    padding: 4px 7px;
  }
  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }
  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    background:  #F0EAB9;
  }
  .footer{
    margin: 0%;
    padding: 0%;
    width: 100%;
    height: 8vh;
    min-height: 15vh;
    display: flex;
    background-color: #A37A07;
    color: #E5E7E9;
  }
  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>