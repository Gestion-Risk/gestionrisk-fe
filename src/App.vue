<template>
  <div id="app" class="app">
    <div class="header">
      <div class="left-header">
        <h1>Gestión <br/>Capacitaciones</h1>
      </div>
      <div id="right-header" class="right-header">
        <nav>
          <button v-if="isAuth" v-on:click="loadHome">Inicio</button>
          <button v-if="isAuth" v-on:click="loadEmpleados">Empleados</button>
          <button v-if="isAuth" v-on:click="loadCapacitacion">Capacitaciones</button>
          <button v-if="isAuth" v-on:click="loadRegistros">Registros</button>
          <button v-if="isAuth" v-on:click="logOut">Cerrar Sesión</button>

          <button v-if="!isAuth" v-on:click="loadLogIn">Iniciar Sesion</button>  
          <button v-if="!isAuth" v-on:click="loadSignUp">Registrarse</button>
        </nav>
      </div>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:capacitacionCreada="capacitacionCreada"
        v-on:capacitacionEliminada="capacitacionEliminada"
        v-on:registroEliminado="registroEliminado"
        v-on:registroCreado="registroCreado"
        v-on:capacitacionActualizada="capacitacionActualizada"
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
        this.$swal({
          title: 'Sesion Terminada',
          icon: 'success'
        })
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
         this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Autenticacion Exitosa',
        })
        this.verifyAuth()
      },

      completedSignUp: function(data){
        this.$swal({
          title: 'Registro Exitoso',
          icon: 'success'
        })
        this.completedLogIn(data);
      },

      capacitacionCreada: function(){
        this.$swal({
          title: 'Capacitacion creada',
          icon: 'success'
        })
        this.$router.push({name: "capacitaciones"})
      },
      capacitacionEliminada: function(){
        this.$swal({
          title: 'Capacitacion Eliminada',
          icon: 'success'
        })
        this.$router.push({name: "capacitaciones"})
      },

      capacitacionActualizada: function(){
        this.$swal({
          title: 'Capacitacion Actualizada',
          icon: 'success'
        })
        this.$router.push({name: "capacitaciones"})
      },

      registroEliminado: function(){
        this.$swal({
          title: 'Registro Eliminado',
          icon: 'success'
        })
        this.$router.push({name: "registros"})
      },
      
      registroCreado: function(){
        this.$swal({
          title: 'Registro Creado',
          icon: 'success'
        })
        this.$router.push({name: "registros"})
      }
    },

    created: function(){
      this.verifyAuth();

    }
  }

</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');

h1, h2, h3, h4, h5, h6 {
  margin: 0 0 2px 0; 
  padding: 0;
} 

html{
  min-height: 100%;
  position: relative;
}

body {
  margin: 0;
  margin-bottom: 2em;
}

.header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  background-color: #4062BB;
}

.left-header {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2em;
  margin-left: 2em;
}

.left-header h1{
  font-family: 'Redressed', cursive;
  margin: 0px;
  color:#E5E7E9;
  font-size: 40px;
  text-align: center;
}

.right-header nav{
  float: right;
  margin-right: 2em;
}

.right-header nav button{
  color: black;
  background: white;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  
  border: 1px solid #3a3b28;
  border-radius: 0.5em;
  padding: 0.2em;
  margin: 0.5em;
  width: 10.5em;
  max-width: 65%;
}

.right-header nav button:hover{
  color: #283747;
  background: #E5E7E9;
}


.footer{
  font-family: "Raleway", "Arial", sans-serif;
  color: #E5E7E9;
  text-align: center;
  background-color: #4062BB;
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 18px;
}

.footer h2{
  padding: 0.4em;
  font-size: 25px;
}
</style>


