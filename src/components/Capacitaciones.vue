<template>
    <div class="capacitacionescon">
        <div class="headercapacitaciones">
            <h1>Lista de Capacitaciones</h1>
            <p>Usario:<b>{{username}}</b></p>
           
        </div>
        <div class="tablebuttoncon">
            <div class="tablecapacitaciones">
                <table border="1px">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Curso</th>
                    <th scope="col">fecha</th>
                    <th scope="col">hora</th>
                    <th scope="col">Area</th>
                    <th scope="col">Descripcion</th>      
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="capacitacion in ListaCapacitaciones" :key="capacitacion.id_capacitacion">
                        <th scope="row">{{capacitacion.id_capacitacion}}</th>
                        <td>{{capacitacion.curso}}</td>
                        <td>{{capacitacion.fecha}}</td>
                        <td>{{capacitacion.hora}}</td>
                        <td>{{capacitacion.idAreaCapacitacionFk_id.area}}</td>
                        <td>{{capacitacion.idAreaCapacitacionFk_id.descripcion}}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div class="botoneracapacitaciones">
                <div class="creareditarcon">
                    <button v-on:click="loadCrearCapacitaciones">Crear</button>
                    <button v-on:click="loadUpdateCapacitaciones">Editar</button>
                </div>
                <div class="deletecon">
                    <form v-on:submit.prevent="EliminarCapacitaciones">
                        <div class="notacon">
                            <p><b>Nota:</b> Introduzca el Id del curso que desee eliminar, despues pulse el boton eliminar.</p>
                        </div>
                        <div class="deleteallcon">
                            <input type="text" placeholder="ID capacitacion" v-model="id_capa">
                            <button type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>


<script>
import axios from 'axios';

export default{
    name: "Capacitaciones",

    data: function(){
        return {
            username: localStorage.getItem("username") || "none",
            ListaCapacitaciones: null,
            id_capa: null,
        }
    },

    methods:{
        getData: async function(){
        if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
            this.$emit("logOut");
            return;
        }

        await this.verifyToken();
        let token = localStorage.getItem("tokenAccess");

        axios.get(
            "https://gestionrisk-be.herokuapp.com/listcapacitaciones/",
            {headers: {'Authorization': `Bearer ${token}`}}
        ).then((result) => {
            this.ListaCapacitaciones = result.data
        })
        .catch((error) => {
            this.$emit("logOut");
        })
    },

    verifyToken: async function(){
        return axios.post(
            "https://gestionrisk-be.herokuapp.com/refresh/",               
            {refresh: localStorage.getItem("tokenRefresh")},
            {headers:{}}
        )
        .then((result) => {
            localStorage.setItem("tokenAccess", result.data.access);
        })
        .catch((error) => {
            this.$emit("logOut");
        })
    },

    EliminarCapacitacion: async function(){
        if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
            this.$emit("logOut");
            return;
        }

        await this.verifyToken();
        let token = localStorage.getItem("tokenAccess");

        axios.delete(
            `https://gestionrisk-be.herokuapp.com/deletecapacitaciones/${this.id_capa}`,
            {headers: {'Authorization': `Bearer ${token}`}}
        ).then(result => {
            this.$emit("capacitacionEliminada");
        })
        .catch((error) => {
            this.$swal({
                title: 'El dato introducido es erroneo',
                icon: 'error'
            })
        })
            
    },

    verifyToken: async function(){
        return axios.post(
            "https://gestionrisk-be.herokuapp.com/refresh/",               
            {refresh: localStorage.getItem("tokenRefresh")},
            {headers:{}}
        )
        .then((result) => {
            localStorage.setItem("tokenAccess", result.data.access);
        })
        .catch((error) => {
            this.$emit("logOut");
        })
    },

    loadCrearCapacitaciones: function(){
        this.$router.push({name: "crearcapacitaciones"})
    },

    loadUpdateCapacitaciones: function(){
        this.$router.push({name: "updatecapacitaciones"})
    },      
    },

    created: async function(){
        this.getData();
    }
}

</script>



<style>

.capacitacionescon{
    display: grid;
    grid-template-rows: auto auto;
    margin-bottom: 4.5em;
}

.headercapacitaciones{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2em 2.5em 0 2.5em;
}

.headercapacitaciones h1{
    display: flex;
    justify-content: left;
    align-items: center;
}

.headercapacitaciones p{
    display: flex;
    justify-content: right;
    align-items: center;
}

.tablebuttoncon{
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 2em 2.5em;
    gap: 2em;
}


.tablecapacitaciones{
    display: grid;
    grid-template-columns: 1fr; 
    scrollbar-color: #CFDBD5 #bdc7c2;
    overflow:scroll;
    height: 20em;
    width:  100%;
}

.tablecapacitaciones table{
    width:100%;
    background-color: white;
    font-size: 18px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 3px solid #283747; 
    border-radius: 1em;
}

.tablecapacitaciones table td,th{
       padding: 2px;
    }

.botoneracapacitaciones{
    display: grid;
    grid-template-rows: auto auto;
    padding: 1em;
}

.creareditarcon{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7.4em;
}

.creareditarcon button{
    font-family: "Raleway", "Arial", sans-serif;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    font-size: 18px;
    background-color: #4062BB;
    color: rgb(255, 255, 255);
}
  button:hover {
    background:  #234cbd;
    color: rgb(255, 255, 255);
}

.deletecon form{
    display: grid;
    grid-template-rows: auto auto;
    margin: 0;
}


.notacon{
    text-align: justify;
    margin: 0;
}

.deleteallcon{
    text-align: center;
}

.deleteallcon input{
    margin: 0.5em;
    height: 40px;
    width: 100%;
    border-radius: 5px;  
    text-align: center;
}

.deleteallcon button{
    font-family: "Raleway", "Arial", sans-serif;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    font-size: 18px;
    background-color: #4062BB;
    color: rgb(255, 255, 255);
}

</style>
