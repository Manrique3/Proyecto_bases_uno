function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $("#titulo").html("Empleados");

    $('#tabla_datatable').DataTable({
        
        scrollY:        '50vh',
        scrollCollapse: true,
        scrollX: true,

        ajax: {
            url:   '/mostrar/empleados',
            type: 'POST',
            dataSrc: ""
        },

        columns: [
            { data: "em_codigo" ,     title: "COD"},
            { data: "em_cedula" ,     title: "CEDULA"},
            { data: "em_p_nombre" ,   title: "P_NOMBRE"},
            { data: "em_s_nombre" ,   title: "S_NOMBRE"},
            { data: "em_p_apellido" , title: "P_APELLIDO"},
            { data: "em_s_apellido" , title: "S_APELLIDO"},
            { data: "em_sueldo" ,     title: "SUELDO"},
            { data: "em_fecha_nac" ,  title: "FECHA NAC"},
            { data: "fk_tienda" ,     title: "TIENDA R"},
            { data: "fk_empleado_sup", title: "COD_SUP"},
           
        ]

        
        
    });
    

    var table = $('#tabla_datatable').DataTable();


    $('#tabla_datatable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
 
    $('#boton_eliminar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){
          
            var id = sel['em_codigo'];

            $.ajax({
                
                url:   '/manejo_empleado',
                data:  id.toString(),
                type: 'DELETE',
                    
                }).done(function(response){
                    
                    alerta(response['mensaje']);
                    table.row('.selected').remove().draw( false );
                    
                }).fail(function(response){
                    alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alerta('Debe seleccionar algo');
            
    });

    $('#boton_añadir').click( function () {
        
        window.location.href =  "/registro/empleado"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['em_codigo'];
            window.location.href =  '/empleado/'+id;	

        }

        else alerta('Debe seleccionar algo');
    });

});



