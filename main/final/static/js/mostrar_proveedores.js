function alert(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $("#titulo").html("Proveedores");

    $('#tabla_datatable').DataTable({
        
        scrollY:        '50vh',
        scrollCollapse: true,
       

        ajax: {
            url:   '/mostrar/proveedores',
            type: 'POST',
            dataSrc: ""
        },

        columns: [
            { data: "po_id" ,           title: "ID"},
            { data: "po_rif" ,          title: "RIF"},
            { data: "po_den_comercial", title: "DEN COM"},
            { data: "po_razon_social" , title: "RAZON"},
            { data: "po_pagina_web" ,   title: "WEB"},
            { data: "po_correo",        title: "CORREO"},
            { data: "po_correo_alt" ,   title: "CORREO ALT"},
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
          
            var id = sel['po_id'];

            $.ajax({
                
                url:   '/manejo_proveedor',
                data:  id.toString(),
                type: 'DELETE',
                    
                }).done(function(response){
                    
                    alerta(response['mensaje']);
                    table.row('.selected').remove().draw( false );
                    
                }).fail(function(response){
                    alert('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alert('Debe seleccionar algo');
            
    });

    $('#boton_añadir').click( function () {
        
        window.location.href =  "/registro/proveedor"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['po_id'];
            window.location.href =  '/proveedor/'+id;	

        }

        else alert('Debe seleccionar algo');
    });

});



