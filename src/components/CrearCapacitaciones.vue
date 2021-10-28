<template>
    <div>
        <div class="headercrearcapacitacion">
        <h1>Crear Capacitacion</h1>
        </div>
        <div>
        <div class="imagecontent">
            <img v-bind:src="require('/src/assets/capacitacion.jpg')" alt="">
        </div>
        <div class="formcontent">
        <form v-on:submit.prevent="proccesCrearCapacitacion">
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
                /* "http://localhost:8000/createcapacitaciones/", */
                this.capacitaciones,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                console.log("Then");
                this.$emit("capacitacionCreada");
            })
            .catch((error) => {
                alert("Error en el modelo")
                /* this.$emit("logOut"); */
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

        getAreaList: async function(){
            if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null) {
                this.$emit("logOut");
                return;
            }
            await this.verifyToken();
            let token = localStorage.getItem("tokenAccess");

            axios.get(
                "https://gestionrisk-be.herokuapp.com/listareas/",
                /* "http://127.0.0.1:8000/listareas/", */
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
        }
    },
    created: async function(){
            /* this.proccesCrearCapacitacion(); */
            this.getAreaList();
    }
}
</script>


/* _________________________ */


<style>
.headercrearcapacitacion {
    padding-left: 40px;
    padding-top: 15px;
}

.headercrearcapacitacion h1{
    width: 100%;
    text-align: center;
}

.formcontent{
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
    margin-top: 60px;

}

.formcontent form {
    width: 75%;
}

.formcontent form button{
    font-weight: bold;
    width: 100%;
    height: 40px;
    color: #000000;
    background: hsl(47, 71%, 51%);
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
}

.formcontent form button:hover {
        background-color: #b9983c;
        color: white;
    }

.formcontent form select, input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 10px 0;
    border: 1px solid #283747;
}

.imagecontent {
    float: left;
    width: 45%;
}
.imagecontent img{
    margin: 15px;
    height: 400px;
    width: 500px;
    border-radius: 10px;
}
</style>