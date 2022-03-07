<template>
    <div class="updatecapcon">
        <div class="headerupdatecap">
            <h1>Editar Capacitacion</h1>
        </div>

        <div class="contentupdatecap">
            <div class="tableupdatecap">
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
                        <td>{{capacitacion.fecha}}</td>
                        <td>{{capacitacion.hora}}</td>
                        <td>{{capacitacion.idAreaCapacitacionFk_id.area}}</td>
                        <td>{{capacitacion.idAreaCapacitacionFk_id.descripcion}}</td>
                    </tr>
                </tbody>
                </table>
                <div class="buscadorcon">
                <form class="buscador" v-on:submit.prevent="getCapacitacionesUpdate">
                    <input type="text" placeholder="Buscar por ID capacitacion" v-model="idcapa">
                    <button>Buscar</button>
                </form>
                </div>
            </div>     
        

            <div class="formupdatecap">
                <form v-on:submit.prevent="updateCapacitaciones">
                    <input type="text"  placeholder="ID capacitacion" v-model="capacitaciones.id_capacitacion">
                    <input type="text"  placeholder="Curso" v-model="capacitaciones.curso">
                    <select v-model="capacitaciones.idAreaCapacitacionFk">
                        <option disabled selected>Selecciona Area...</option>
                        <option v-for="area in areas" :key="area.idAreaCap" :value="area.idAreaCap">
                            {{area.area}}</option>
                    </select>        
                    <input type="date" placeholder="Fecha" v-model="capacitaciones.fecha">             
                    <input type="time" placeholder="Hora" v-model="capacitaciones.hora">
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
                        this.$swal({
                            title: 'Revise los datos introducidos',
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
                        this.$swal({
                            title: 'Usted no está autorizado para realizar esta operación.',
                            icon: 'error'
                        })
                    }
                    else if(error.response.status == "500"){
                        this.$swal({
                            title: 'La plataforma está presentando problemas.\nIntente de nuevo más tarde.',
                            icon: 'error'
                        })
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

.updatecapcon{
    display: grid;
    grid-template-rows: auto 1fr;
    margin-bottom: 3.5em;
    gap: 1em;
}


.headerupdatecap{
    display: grid;
    grid-template-columns: 1fr;
    margin: 2em 2.5em 0 2.5em;
    text-align: center;
}

.contentupdatecap{
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 2em 2.5em 0 2.5em;
    margin-bottom: 3.5em;
    gap: 1em;
}

.tableupdatecap{
    display: grid;
    grid-template-columns: 1fr; 
    scrollbar-color: #CFDBD5 #bdc7c2;
    height: 25em;
    width:  100%;
}

.tableupdatecap table{
    width:100%;
    background-color: white;
    font-size: 18px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: 2px solid #283747; 
    border-collapse: collapse;
}

.tableupdatecap table td,th{
    padding: 2px;
    } 

.formupdatecap{
    border: 2px solid #283747;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.formupdatecap form, option{
    width: 75%;
    padding: 2em;
}

.formupdatecap form button{
    font-weight: bold;
    width: 100%;
    height: 35px;
    color: blanchedalmond;
    font-size: 18px;
    background-color: #4062BB;
    border-radius: 5px;
    margin: 5px 0 25px 0;
}

.formupdatecap form button:hover{
    background:  #CFDBD5;
    color: black;
}

.formupdatecap form select, input {
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 0.5em 0;
    border: 1px solid #283747;
    border-radius: 5px;
    font-size: 15px;
}

.tableupdatecap form input{
    height: 30px;
    width: 55%;
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 0.5em 0;
    border: 1px solid #283747;
    border-radius: 5px;
    font-size: 15px;
    margin: auto 3em;
}

.tableupdatecap form button{
    font-weight: bold;
    width: 20%;
    height: 30px;
    color: blanchedalmond;
    font-size: 15px;
    background-color: #4062BB;
    border-radius: 5px;

    margin: auto 3em;
    text-align: center;

}

.tableupdatecap form button:hover {
    background:  #CFDBD5;
    color: black;
}

.buscadorcon{
    display: grid;
    grid-template-rows: auto; 
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px;
    padding: 0.5em;
}

.buscadorcon form button{
    margin-top: 0.3em;
}
</style>