<template>
    <div class="home">
        <div class="contenthome">
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
.home{
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3.5em;
}

.contenthome{
    display: grid;
    grid-template-columns: 1fr;
    margin: 4em 3.5em;
    border: 3px solid #283747; 
    border-radius: 1em;
    padding: 2em;
}

.contenthome h1{
    padding-top: 0.5em;
    font-size: 38px;
    color: #283747;
    display: flex;
    justify-content: center;
}

.contenthome ul, p{
    font-size: 20px;
}

</style>