function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $("#titulo").html("Clientes Juridicos");

    $('#tabla_datatable').DataTable({
        
        scrollY:        '50vh',
        scrollCollapse: true,
       

        ajax: {
            url:   '/mostrar/juridicos',
            type: 'POST',
            dataSrc: ""
        },

        columns: [
            { data: "cl_id" ,          title: "ID"},
            { data: "cl_rif" ,         title: "RIF"},
            { data: "cl_afiliacion" ,  title: "N_AFIL"},
            { data: "cl_puntos" ,      title: "PUNTOS"},
            { data: "cl_den_comercial", title: "DEN COM"},
            { data: "cl_razon_social" , title: "RAZON"},
            { data: "cl_pagina_web" ,   title: "WEB"},
            { data: "cl_capital" ,      title: "CAPITAL"},
            { data: "fk_lugar_fisica" , title: "DIR"},
            { data: "fk_lugar_fiscal" , title: "DIR2"},
           
           
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
    } );
 
    $('#boton_eliminar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){
          
            var id = sel['cl_id'];

            $.ajax({
                
                url:   '/manejo_juridico',
                data:  id.toString(),
                type: 'DELETE',
                    
                }).done(function(response){
                    
                    alerta(response['mensaje']);
                    table.row('.selected').remove().draw( false );
                    
                }).fail(function(response){
                    c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alert('Debe seleccionar algo');
            
    });

    $('#boton_añadir').click( function () {
        
        window.location.href =  "/registro/juridico"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['cl_id'];
            window.location.href =  '/juridico/'+id;	

        }

        else alert('Debe seleccionar algo');
    });

});



