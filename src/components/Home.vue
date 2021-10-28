<template>
    <div class="home">
        <h1 class>Bienvenido {{ username }}</h1>
        <p class="headp"> Bienvenido al sistema de gestion de capacitaciones, con nuestro software usted
        podra:</p>
        <ul>
            <h3>Capacitaciones</h3>
            <li>Crear: Podra crear las capacitaciones asignando su area laboral.</li>
            <li>Eliminar: Podra eliminar las capacitaciones por su id.</li>
            <li>Actualizar: Podra actualizar las capacitaciones mediante un formulario.</li>
            <li>Listar: Podra listar las capacitaciones creadas.</li>
        </ul>
        <ul>
            <h3>Empleados</h3>
            <li>Listar: Podra listar los empleados disponibles en la plataforma, podra filtrar
                por su cedula.</li>
        </ul>
        <ul>
            <h3>Registros</h3>
            <li>Crear: Podra asignarle capacitaciones a los empleados, relacionando la cedula
                y el nombre de la capacitacion.</li>
            <li>Listar: Podra mediante filtros filtrar los registros hechos, podra   
                utilizar la cedula del trabajador y la id del registro.</li>
            <li>Eliminar: podra eliminar el registro por su ID.</li>
        </ul>
    </div>
</template>


<script>
    export default{
        name: "Home",
        data: function(){
            return {
                username: localStorage.getItem("username") || "none"
            }
        }
    }
</script>


<style>
    .home {
        margin         : 0;
        padding        : 0%;
        height         : 100%;
        width          : 100%;     
    }
    .home h1 {
        padding-top: 15px;
        font-size: 40px;
        color    : #283747;
        display        : flex;
        justify-content: center; 
        align-items    : center;    
        
    } 
    .headp , ul{
        margin-top: 15px;
        margin-left: 40px;
        font-size: 18px;
    }
</style>