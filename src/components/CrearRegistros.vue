<template>
    <div>
        <div class="headerregistro">
        <h1>Crear Registro</h1>
        </div>
        <div>
        <div class="imagecontentregistro">
            <img v-bind:src="require('/src/assets/registros.jpg')" alt="">
        </div>
        <div class="formcontentregistro">
        <form v-on:submit.prevent="proccesCrearRegistro">
                <input type="text"  placeholder="Cedula Trabajador" v-model="registros.cedulaTrabajador">
                <br />
                <select v-model="registros.idCapacitacionFk">
                    <option disabled selected>Selecciona Capacitacion...</option>
                    <option v-for="capa in capacitaciones" :key="capa.id_capacitacion" :value="capa.id_capacitacion">
                        {{capa.curso}}</option>
                </select>
                <br />
                <button type="submit">Crear</button>
        </form> 
        </div>
        </div>
    </div>
   
</template>

<script>
    import axios from 'axios';
    export default{
        name: "EliminarRegistros",

        data: function(){
            return {
                registros:{
                    idCapacitacionFk : null,
                    cedulaTrabajador : null,
                },
                trabajadores: [],
                capacitaciones: [],
            }
        },

        methods:{
            proccesCrearRegistro: async function(){
                    if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                    }
                    await this.verifyToken();
                    let token = localStorage.getItem("tokenAccess");

                axios.post(
                "https://gestionrisk-be.herokuapp.com/createregistros/",
                this.registros,
                {headers: {'Authorization': `Bearer ${token}`}}
                )
                .then((result) => {
                    console.log("Succes register post");
                    this.$emit("registroCreado");
                })
                .catch((error) => {
                    alert("Trabajador no disponible")
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
                    console.log("New access token");
                    localStorage.setItem("tokenAccess", result.data.access);
                })
                .catch((error) => {
                    this.$emit("logOut");
                })
            },

                getTrabajadoresList: async function(){
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
                        console.log("data obtained")
                        this.trabajadores = result.data;
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

                getCapacitacionesList: async function(){
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
                        console.log("data obtained")
                        this.capacitaciones = result.data;
                    })
                    .catch ((error) => {
                        console.log("data no obtained")
                        if(error.response.status == "401") {
                            alert("Usted no está autorizado para realizar esta operación.");
                        }
                        else if(error.response.status == "500"){
                            alert("La plataforma está presentando problemas.\nIntente de nuevo más tarde.");
                        }
                    })
                }
        },
            created: async function(){
                this.getTrabajadoresList();
                this.getCapacitacionesList();
            }
        }

</script>




<style>
.headerregistro {
    padding-left: 40px;
    padding-top: 15px;
}

.headerregistro h1{
    width: 100%;
    text-align: center;
}

.formcontentregistro{
    border: 3px solid #283747;
    border-radius: 15px;
    width: 25%;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: right;
    margin-right: 115px;
    margin-top: 100px;

}

.formcontentregistro form {
    width: 75%;
}

.formcontentregistro form button{
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

.formcontentregistro form button:hover {
        background:  #CFDBD5;
        color: black;
    }

.formcontentregistro form select, input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 10px 0;
    border: 1px solid #283747;
}

.imagecontentregistro {
    float: left;
    width: 45%;
}
.imagecontentregistro img{
    margin: 15px;
    height: 450px;
    width: 550px;
    border: 1px solid black;
    border-radius: 10px;
    margin: 40px;
    margin-left: 100px;
}
</style>