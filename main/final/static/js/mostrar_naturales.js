function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $("#titulo").html("Clientes Naturales");

    $('#tabla_datatable').DataTable({
        
        scrollY:        '50vh',
        scrollCollapse: true,
       

        ajax: {
            url:   '/mostrar/naturales',
            type: 'POST',
            dataSrc: ""
        },

        columns: [
            { data: "cl_id" ,         title: "ID"},
            { data: "cl_cedula" ,     title: "CEDULA"},
            { data: "cl_afiliacion" , title: "N_AFIL"},
            { data: "cl_puntos" ,     title: "PUNTOS"},
            { data: "cl_rif" ,        title: "RIF"},
            { data: "cl_p_nombre" ,   title: "P_NOMBRE"},
            { data: "cl_s_nombre" ,   title: "S_NOMBRE"},
            { data: "cl_p_apellido" , title: "P_APELLIDO"},
            { data: "cl_s_apellido" , title: "S_APELLIDO"},
            { data: "fk_lugar" ,      title: "DIR"},
           
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
          
            var id = sel['cl_id'];

            $.ajax({
                
                url:   '/manejo_natural',
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
        
        window.location.href =  "/registro/natural"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['cl_id'];
            window.location.href =  '/natural/'+id;	

        }

        else alerta('Debe seleccionar algo');
    });

});



