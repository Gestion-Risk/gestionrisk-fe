<template>
    <div>
        <div class="headerempleados">
        <h1>Lista de empleados</h1>
        <p>Usario:<b>{{username}}</b></p>
        </div>
        <div class="divempleados">
            <table border="1px">
            <thead>
                <tr>
                <th scope="col">Cedula</th>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Email</th>
                <th scope="col">Cargo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trabajador in ListaTrabajadores" :key="trabajador.cedula">
                    <th scope="row">{{trabajador.cedula}}</th>
                    <td>{{trabajador.nombres}}</td>
                    <td>{{trabajador.apellidos}}</td>
                    <td>{{trabajador.email}}</td>
                    <td>{{trabajador.cargoIdFk.cargo}}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
   
</template>


/* _________________________ */


<script>
import axios from 'axios';

export default{
        name: "Empleados",

        data: function(){
            return {
                username: localStorage.getItem("username") || "none",
                ListaTrabajadores: null,
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
            /* let userId = jwt_decode(token).user_id.toString(); */

            axios.get(
                /* "http://localhost:8000/listalltrabajadores/", */
                "https://gestionrisk-be.herokuapp.com/listalltrabajadores/",
                {headers: {'Authorization': `Bearer ${token}`}}
            ).then((result) => {
                this.ListaTrabajadores = result.data
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
        }
    },
    created: async function(){
        this.getData();
    }
}

</script>


/* _________________________ */

<style>
    .headerempleados {
        padding-left: 40px;
        padding-top: 15px;    
    }

    .headerempleados h1{
        margin: 12px;
        display: inline-block;
        width: 80%;          
    }

    .headerempleados p{
        display: inline-block;
        width: 15%;  
    }
    .divempleados {
        /* scrollbar-color: rgb(189, 189, 162) #F2F0CE; */
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
    
    .divempleados table {
        height: 500px;
        width:100%;
        /* background-color: #F2F0CE; */
        background-color: #CFDBD5;
        font-size: 18px;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .divempleados table td,th{
       padding: 4px;
    }
</style>
