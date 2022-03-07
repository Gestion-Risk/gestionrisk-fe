<template>
    <div class="crearcapcontainer">
        <div class="headercrearcapacitacion">
            <h1>Crear Capacitacion</h1>
        </div>
    <div class="formcrearcon">
        <div class="imagecontent">
            <img v-bind:src="require('/src/assets/capacitacion.jpg')" alt="">
        </div>
        <div class="formcontent">
            <form v-on:submit.prevent="proccesCrearCapacitacion">
                <input type="text"  placeholder="Curso" v-model="capacitaciones.curso">
                <select v-model="capacitaciones.idAreaCapacitacionFk">
                    <option disabled selected>Selecciona Area...</option>
                    <option v-for="area in areas" :key="area.idAreaCap" :value="area.idAreaCap">
                        {{area.area}}</option>
                </select>
                <input type="date" placeholder="Fecha" v-model="capacitaciones.fecha">
                <input type="time" placeholder="Hora" v-model="capacitaciones.hora">
                <button type="submit">Crear</button>
            </form> 
            </div>
        </div>
    </div>
   
</template>


/* _________________________ */


<script>
    import axios from 'axios';
    export default{
        name: "CrearCapacitacion",

        data: function(){
            return {
                capacitaciones : {
                    curso          : "",
                    fecha          : "",
                    hora           : "",
                    idAreaCapacitacionFk: 0,
                    },
                areas: [],
            }
        },
        methods:{
            proccesCrearCapacitacion: async function(){

                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                    this.$emit("logOut");
                    return;
                }
                await this.verifyToken();
                let token = localStorage.getItem("tokenAccess");

            axios.post(
                "https://gestionrisk-be.herokuapp.com/createcapacitaciones/",
                this.capacitaciones,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                console.log("Then");
                this.$emit("capacitacionCreada");
            })
            .catch((error) => {
                this.$swal({
                    title: 'Error en el modelo',
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

        getAreaList: async function(){
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
        }
    },
    created: async function(){
            this.getAreaList();
    }
}
</script>


/* _________________________ */


<style>

.crearcapcontainer{
    display: grid;
    grid-template-rows: auto 1fr;
    margin-bottom: 3.5em;
    gap: 1em;
}



.headercrearcapacitacion{
    display: grid;
    grid-template-columns: 1fr;
    margin: 2em 2.5em 0 2.5em;
    text-align: center;
}

.formcrearcon{
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 3em;
    gap: 1em;
}

.imagecontent img{
    width: 800px;
    height: 400px;
    max-width: 100%;
    border-radius: 1em;
} 

.formcontent{
    border: 2px solid #283747;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.formcontent form, option{
    width: 70%;
    padding: 2em;
}

.formcontent form button{
    font-weight: bold;
    width: 100%;
    height: 40px;
    color: blanchedalmond;
    font-size: 15px;
    background-color: #4062BB;
    border-radius: 5px;
    margin: 5px 0 25px 0;
    font-size: 20px;
}

.formcontent form button:hover {
        background:  #CFDBD5;
        color: black;
    }

.formcontent form select, input {
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 1em 0;
    border: 1px solid #283747;
    border-radius: 5px;
    font-size: 18px;
}
</style>