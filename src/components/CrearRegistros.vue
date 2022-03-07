<template>
    <div class="crearregcon">
        <div class="headerregistro">
            <h1>Crear Registro</h1>
        </div>

        <div class="bodycrearreg">
            <div class="imagecontentregistro">
                <img v-bind:src="require('/src/assets/registros.jpg')" alt="">
            </div>

            <div class="formcontentregistro">
                <form v-on:submit.prevent="proccesCrearRegistro">
                    <input type="text"  placeholder="Cedula Trabajador" v-model="registros.cedulaTrabajador">
                    <select v-model="registros.idCapacitacionFk">
                        <option disabled selected>Selecciona Capacitacion...</option>
                        <option v-for="capa in capacitaciones" :key="capa.id_capacitacion" :value="capa.id_capacitacion">
                            {{capa.curso}}</option>
                    </select>
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
                    this.$swal({
                            title: 'Trabajador no disponible',
                            icon: 'warning'
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
                }
        },
            created: async function(){
                this.getTrabajadoresList();
                this.getCapacitacionesList();
            }
        }

</script>


<style>

.crearregcon{
    display: grid;
    grid-template-rows: auto 1fr;
    margin-bottom: 3.5em;
    gap: 1em;
}

.imagecontentregistro{
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin-bottom: 3.5em;
    gap: 1em;
}


.headerregistro{
    display: grid;
    grid-template-columns: 1fr;
    margin: 2em 2.5em 0 2.5em;
    text-align: center;
}

.bodycrearreg{
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 2em 2.5em 0 2.5em;
    text-align: center;
}

.imagecontentregistro img{
    width: 800px;
    height: 400px;
    max-width: 140%;
    border-radius: 1em;
} 

.formcontentregistro{
    height: 87%;
    border: 2px solid #283747;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.formcontentregistro form, option{
    width: 80%;
    padding: 2em;
}

.formcontentregistro form button{
    font-weight: bold;
    width: 100%;
    height: 40px;
    color: blanchedalmond;
    font-size: 18px;
    background-color: #4062BB;
    border-radius: 5px;
    margin: 5px 0 25px 0;
}

.formcontentregistro form button:hover {
        background:  #CFDBD5;
        color: black;
    }

.formcontentregistro form select, input {
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 1em 0;
    border: 1px solid #283747;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
}


</style>