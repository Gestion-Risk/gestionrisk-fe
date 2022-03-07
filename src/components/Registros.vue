<template>
    <div class="registroscontainer">
        <div class="headercapacitaciones">
            <h1>Lista de Registros</h1>
            <p>Usario:<b>{{username}}</b></p>
        </div>

        <div class="divregistros">
            <div class="tableregistros">
                <table border="1px">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">email</th>
                        <th scope="col">cargo</th>
                        <th scope="col">curso</th>
                        <th scope="col">fecha</th>
                        <th scope="col">hora</th>
                        <th scope="col">Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="registro in ListaRegistros" :key="registro.idRegistro">
                            <th scope="row">{{registro.idRegistro}}</th>
                            <td>{{registro.cedulaTrabajador}}</td>
                            <td>{{registro.cedulaTrabajadorFk.nombres}}</td>
                            <td>{{registro.cedulaTrabajadorFk.apellidos}}</td>
                            <td>{{registro.cedulaTrabajadorFk.email}}</td>
                            <td>{{registro.cedulaTrabajadorFk.cargoIdFk.cargo}}</td>
                            <td>{{registro.idCapacitacionFk.curso}}</td>
                            <td>{{registro.idCapacitacionFk.fecha}}</td>
                            <td>{{registro.idCapacitacionFk.hora}}</td>
                            <td>{{registro.idCapacitacionFk.idAreaCapacitacionFk.area}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="botoneraregistros">
            <div>
            <button v-on:click="loadCrearRegistros">Crear</button>
            </div>
            <div class="deleteregistro">
                <form v-on:submit.prevent="EliminarRegistro">
                    <input type="text" placeholder="ID registro" v-model="id_registro">
                    <button type="submit">Eliminar</button>
                </form>
            </div>
        </div>
    </div>
   
</template>

/* _________________________ */

<script>
import axios from 'axios';

export default{
        name: "Registros",

        data: function(){
            return {
                username: localStorage.getItem("username") || "none",
                ListaRegistros: null,
                id_registro:    null,
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
                "https://gestionrisk-be.herokuapp.com/listallregistros/",
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then((result) => {
                this.ListaRegistros = result.data
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
            EliminarRegistro: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                return;
                }
                await this.verifyToken();
                let token = localStorage.getItem("tokenAccess");

            axios.delete(
                `https://gestionrisk-be.herokuapp.com/deleteregistros/${this.id_registro}`,
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then(result =>    {
                console.log(result)
                this.$emit("registroEliminado");
                this.getData();
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
            loadCrearRegistros: function(){
                this.$router.push({name: "crearregistros"})
            },
        },

    created: async function(){
        this.getData();
    }
}

</script>


/* _________________________ */

<style>

.registroscontainer{
    display: grid;
    grid-template-rows: auto auto auto;
    margin-bottom: 3.5em;
}

.divregistros{
    display: grid;
    grid-template-columns: 1fr;
    margin: 1em 2.5em;
}

.tableregistros{
    display: grid;
    grid-template-columns: 1fr; 
    scrollbar-color: #CFDBD5 #bdc7c2;
    overflow:scroll;
    height: 20em;
    width:  100%;
}

.tableregistros table{
    width:100%;
    background-color: white;
    font-size: 15px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 3px solid #283747; 
    border-radius: 1em;
    text-align: center;
}


.botoneraregistros{
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin: 0 0 2em 0;
    text-align: center;
}

.botoneraregistros button{
    font-family: "Raleway", "Arial", sans-serif;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    font-size: 18px;
    background-color: #4062BB;
    color: rgb(255, 255, 255);
}

.botoneraregistros input{
    margin: 0.5em;
    height: 35px;
    width: 15%;
    border-radius: 5px;  
    text-align: center;
    justify-content: center;
    align-items: center;
}

</style>
