<template>
    <div>
        <div class="headercapacitaciones">
        <h1>Lista de Capacitaciones</h1>
        <p>Usario:<b>{{username}}</b></p>
        </div>
        <div class="divtablerocapacitaciones">
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
                <button v-on:click="loadCrearCapacitaciones">Crear</button>
                <div class="delete">
                <form v-on:submit.prevent="EliminarCapacitacion">
                <input type="text" placeholder="ID capacitacion" v-model="id_capa">
                <button type="submit">Eliminar</button>
                </form>
                </div>
                
                <button>Editar</button>
        </div>
    </div> 
</template>

/* _________________________ */

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
                /* "http://localhost:8000/listcapacitaciones/", */
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
                console.log(result)
                this.$emit("capacitacionEliminada");
            })
            .catch((error) => {
                alert("El dato introduciodo es erroneo")
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
            loadCrearCapacitaciones: function(){
            this.$router.push({name: "crearcapacitaciones"})
            },
            
    },

    

    created: async function(){
        this.getData();
    }
}

</script>


/* _________________________ */

<style>
    .headercapacitaciones {
        padding-left: 40px;
        padding-top: 15px;
    }
    .headercapacitaciones h1{
        margin: 12px;
        display: inline-block;
        width: 80%;       
    }

    .headercapacitaciones p{
        display: inline-block;
        width: 15%;
    
    }

    .divtablerocapacitaciones {
        scrollbar-color: rgb(189, 189, 162) #F2F0CE;
        scrollbar-width: 10px;
        overflow:scroll;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 20pc;
        width:  92%;
        position: absolute;
        left: 3em;
        top: 12em;
        right: 0;
        bottom: 2em;
    }
    
    .divtablerocapacitaciones table {
        height: 400px;
        width:100%;
        background-color: #F2F0CE;
        font-size: 16px;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .divtablerocapacitaciones table td,th{
       padding: 4px;
    }

    .botoneracapacitaciones {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        position:absolute; /*El div será ubicado con relación a la pantalla*/
        left:0px; /*A la derecha deje un espacio de 0px*/
        right:0px; /*A la izquierda deje un espacio de 0px*/
        bottom:125px; /*Abajo deje un espacio de 0px*/
        height:10px; /*alto del div*/
        z-index:0;
    } 

    .botoneracapacitaciones button{
        height: 35px;
        width: 130px;
        border: 2px solid #A37A07;
        border-radius: 6px;
        margin: 4px 2px;
        font-size: 20px;
        background: #A37A07;
        padding: 8px 15px;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    button:hover {
        background-color: #b9983c;
        color: white;
    }

    .delete {
        height: 80px;
        width: 135px;
        margin: 1rem;
        padding: 0.3rem;
        text-align: center;
    }

    .delete input{
        height: 25px;
        width: 100%;
        display: flex;     
    }

    .delete button{
        width: 97%;   
    }
</style>
