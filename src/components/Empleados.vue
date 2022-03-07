<template>
    <div class="empleadoscontainer">
        <div class="headerempleados">
            <div class="title">
                <h1>Lista de empleados</h1>
                <p>Usario:<b>{{username}}</b></p>
            </div>
            <div class="note">
                <p><span style="font-weight: bold;">Nota:</span> &nbsp; Para hacer la busqueda mas eficiente pulse las teclas Ctrl + F para iniciar una busqueda por Cedula.</p>
            </div>
        </div>
        <div class="divempleados">
            <div class="tableempleados">
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
    </div>
   
</template>


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

            axios.get(
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

.empleadoscontainer{
    display: grid;
    grid-template-rows: auto auto;
    margin-bottom: 3.5em;
}

.headerempleados{
    display: grid;
    grid-template-columns: 1fr;
    margin: 2em 2.5em 0 2.5em;
}

.title{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.note{
    margin-bottom: 1em;
    display: flex;
    text-align: left;
}


.headerempleados h1{
    display: flex;
    justify-content: left;
    align-items: center;

}
.headerempleados p{
    display: flex;
    justify-content: right;
    align-items: center;
}   

.divempleados{
    display: grid;
    grid-template-columns: 1fr;
    margin: 0.5em 3em 3em 3em;
}

.tableempleados{
    display: grid;
    grid-template-columns: 1fr; 
    scrollbar-color: #CFDBD5 #bdc7c2;
    overflow:scroll;
    height: 25em;
    width:  100%;
}

 .divempleados table {
    width:100%;
    background-color: white;
    font-size: 18px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 3px solid #283747; 
    border-radius: 1em;
    }

.divempleados table td,th{
    padding: 2px;
    } 

@media screen and (max-width: 600px) {
       table {
           width:100%;
       }
       thead {
           display: none;
       }
       tr:nth-of-type(2n) {
           background-color: inherit;
       }
       tr td:first-child {
           background: #f0f0f0;
           font-weight:bold;
           font-size:1.3em;
       }
       tbody td {
           display: block;
           text-align:center;
       }
       tbody td:before {
           content: attr(data-th);
           display: block;
           text-align:center;
       }
}
</style>
