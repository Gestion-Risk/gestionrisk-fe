<template>
    <div>
        <div class="headerregistros">
        <h1>Lista de Registros</h1>
        <p>Usario:<b>{{username}}</b></p>
        </div>
        <div class="divregistros">
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
        <div class="botoneraregistros">
                <button v-on:click="loadCrearRegistros">Crear</button>
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
                /* "http://localhost:8000/listallregistros/", */
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
                /* 'http://localhost:8000/refresh/', */
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
                alert("El dato introducido es erroneo")
            })
        },
            verifyToken: async function(){
            return axios.post(
                /* 'http://localhost:8000/refresh/', */
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
    .headerregistros{
        padding-left: 40px;
        padding-top: 15px;
    }
    .headerregistros h1{
        margin: 12px;
        display: inline-block;
        width: 80%;             
    }

    .headerregistros p{
        display: inline-block;
        width: 15%;
    }

    .divregistros {
        scrollbar-color: rgb(189, 189, 162) #F2F0CE;
        scrollbar-color: #CFDBD5 #bdc7c2;
        scrollbar-width: 10px;
        overflow:scroll;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 25pc;
        width:  92%;
        position: absolute;
        left: 3em;
        top: 12em;
        right: 0;
        bottom: 2em;
    }
    
    .divregistros table {
        height: 400px;
        width:100%;
        /* background-color: #F2F0CE; */
        background-color: #CFDBD5;
        font-size: 18px;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .divregistros table td,th{
       padding: 4px;
    }

    .botoneraregistros {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        position:absolute; /*El div será ubicado con relación a la pantalla*/
        left:0px; /*A la derecha deje un espacio de 0px*/
        right:0px; /*A la izquierda deje un espacio de 0px*/
        bottom:110px; /*Abajo deje un espacio de 0px*/
        height:10px; /*alto del div*/
    } 

    .botoneraregistros button{
        height: 35px;
        width: 120px;
        border-radius: 6px;
        margin: 4px 2px;
        font-size: 20px;
        /* background: #A37A07; */
        background-color: #4062BB;
        color: blanchedalmond;
        padding: 8px 15px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    button:hover {
        /* background-color: #b9983c;
        color: white; */
        background:  #CFDBD5;
        color: black;
    }
    .deleteregistro {
        height: 80px;
        width: 135px;
        margin: 1rem;
        padding: 0.3rem;
        text-align: center;
    }

    .deleteregistro input{
        height: 25px;
        width: 95%;
        display: flex;
        border-radius: 5px;     
    }

    .deleteregistro button{
        width: 90%;   
    }

</style>
