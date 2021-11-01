<template>
    <div>
        <div class="headerupdatecapacitacion">
        <h1>Editar Capacitacion</h1>
        </div>
        <div>
        <div class="imagecontentupdatecapacitacion">
            <div class="divtableroupdatecapa">
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
                <tr v-for="capacitacion in listaCapacitaciones" :key="capacitacion.id_capacitacion">
                    <th scope="row">{{capacitacion.id_capacitacion}}</th>
                    <td>{{capacitacion.curso}}</td>
                    <td>{{capacitacion.fecha}}}</td>
                    <td>{{capacitacion.hora}}</td>
                    <td>{{capacitacion.idAreaCapacitacionFk_id.area}}</td>
                    <td>{{capacitacion.idAreaCapacitacionFk_id.descripcion}}</td>
                </tr>
            </tbody>
        </table>
        <form class="buscador" v-on:submit.prevent="getCapacitacionesUpdate">
            <input type="text" placeholder="Buscar por ID capacitacion" v-model="idcapa">
            <button>Buscar</button>
        </form>
        </div>
        </div>
        <div class="formcontentupdatecapacitacion">
        <form v-on:submit.prevent="updateCapacitaciones">
                <input type="text"  placeholder="ID capacitacion" v-model="capacitaciones.id_capacitacion">
                <br>
                <input type="text"  placeholder="Curso" v-model="capacitaciones.curso">
                <br />
                <select v-model="capacitaciones.idAreaCapacitacionFk">
                    <option disabled selected>Selecciona Area...</option>
                    <option v-for="area in areas" :key="area.idAreaCap" :value="area.idAreaCap">
                        {{area.area}}</option>
                </select>
                <br />
                <input type="date" placeholder="Fecha" v-model="capacitaciones.fecha">
                <br />
                <input type="time" placeholder="Hora" v-model="capacitaciones.hora">
                <br />
                <button type="submit">Actualizar</button>
        </form> 
        </div>
        </div>
    </div>
   
</template>



<script>
    import axios from 'axios';
    export default{
        name: "UpdateRegistro",

        data: function(){
            return {
            capacitaciones : {
                    id_capacitacion: null,
                    curso          : "",
                    fecha          : "",
                    hora           : "",
                    idAreaCapacitacionFk: 0,
                    },
                areas: [],
                listaCapacitaciones: [],
                idcapa: null,
                }
            },

            methods: {
                updateCapacitaciones: async function(){
                    if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                    }
                    await this.verifyToken();
                    let token = localStorage.getItem("tokenAccess");

                    axios.put(
                        `https://gestionrisk-be.herokuapp.com/updatecapacitaciones/${this.capacitaciones.id_capacitacion}`,
                        this.capacitaciones,
                        {headers: {'Authorization': `Bearer ${token}`}}
                    )
                    .then((result) => {
                        console.log("Update Proccess");
                        this.$emit("capacitacionActualizada");
                    })
                    .catch((error) => {
                        alert("Revise los datos introducidos")
                    })         
                    },
                    verifyToken: async function(){
                        return axios.post(
                    "https://gestionrisk-be.herokuapp.com/refresh/",               
                    {refresh: localStorage.getItem("tokenRefresh")},
                    {headers:{}}
                    )
                    .then((result) => {
                        console.log("New access token");
                        localStorage.setItem("tokenAccess", result.data.access);
                    })
                    .catch((error) => {
                        this.$emit("logOut");
                    })
                },

                getAreaListUpdate: async function(){
                    if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                    }
                    await this.verifyToken();
                    let token = localStorage.getItem("tokenAccess");

                axios.get(
                    "https://gestionrisk-be.herokuapp.com/listareas/",
                    {headers: {'Authorization': `Bearer ${token}`}}
                    ).then((result) => {
                        console.log("data obtained")
                        this.areas = result.data;
                    })
                    .catch((error) => {
                    if(error.response.status == "401") {
                        alert("Usted no está autorizado para realizar esta operación.");
                    }
                    else if(error.response.status == "500"){
                        alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                    }
                })
             },

                getCapacitacionesUpdate: async function(){
                    if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                    }
                    await this.verifyToken();
                    let token = localStorage.getItem("tokenAccess");

                    axios.get(
                        `https://gestionrisk-be.herokuapp.com/listcapacitaciones/?idCapacitacion=${this.idcapa}`,
                        {headers: {'Authorization': `Bearer ${token}`}}
                        ).then((result) => {
                            this.listaCapacitaciones = result.data
                        })
                        .catch((error) => {
                            console.log("Esperando ID");
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
        },
        created: async function(){
            this.getAreaListUpdate();
            this.getCapacitacionesUpdate();
        }
  }
</script>



<style>
.headerupdatecapacitacion {
    padding-left: 40px;
    padding-top: 15px;
}

.headerupdatecapacitacion h1{
    width: 100%;
    text-align: center;
}

.formcontentupdatecapacitacion{
    border: 3px solid #283747;
    border-radius: 15px;
    width: 25%;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: right;
    margin-right: 60px;
    margin-top: 50px;

}

.formcontentupdatecapacitacion form {
    width: 75%;
}

.formcontentupdatecapacitacion form button{
    font-weight: bold;
    width: 100%;
    height: 40px;
    color: blanchedalmond;
    font-size: 15px;
    background-color: #4062BB;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.formcontentupdatecapacitacion form button:hover {
        background:  #CFDBD5;
        color: black;
    }

.formcontentupdatecapacitacion form select, input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 10px 0;
    border: 1px solid #283747;
}

.imagecontentupdatecapacitacion {
    float: left;
    width: 45%;
}
.imagecontentupdatecapacitacion img{
    margin: 15px;
    height: 400px;
    width: 500px;
    border-radius: 10px;
}

.divtableroupdatecapa {
        /* scrollbar-color: #CFDBD5 #bdc7c2;
        scrollbar-width: 10px;
        overflow:scroll; */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:  63%;
        position: absolute;
        left: 3em;
        top: 14em;
        right: 0;
        bottom: 2em;
    }
    
    .divtableroupdatecapa table {
        border-radius: 10px;
        height: 120px;
        width:100%;
        background-color: #CFDBD5;
        font-size: 18px;
        font-family:'Gill Sans', 'Gill Sans MT','Trebuchet MS', sans-serif;
    }

    .divtableroupdatecapa table td,th{
       padding: 4px;
    }

    .buscador {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
    .buscador input {
        height: 25px;
        border-radius: 5px;
        width: 200px;

    }
    .buscador button {
        height: 25px;
        width: 80px;
        border-radius: 5px;
        background-color: #4062BB;
        color: blanchedalmond;   
        font-size: 15px; 
    }
    .buscador button:hover{
        background:  #CFDBD5;
        color: black;
    }
</style>