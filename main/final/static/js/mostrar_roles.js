function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};


function alerta(mensaje){
    alert(mensaje);

};

$(document).ready(function(){

    $("#titulo").html("Roles");

    $('#tabla_datatable').DataTable({

        scrollY:        '50vh',
        scrollCollapse:  true,


        ajax: {
            url: '/mostrar/roles',
            type: 'POST',
            dataSrc: "",
        },

        columns:[
            { data:      "ro_codigo" ,        title: "CODIGO"},
            { data:      "ro_nombre" ,        title: "NOMBRE"},           
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
           
            var codigos = sel['ro_codigo'];

            $.ajax({
                
                url:   '/manejo_rol',
                type: 'DELETE',
                data: {'codigos':codigos},
                
                }).done(function(response){
                    
                    alerta(response['mensaje']);
                    table.row('.selected').remove().draw( false );
                    
                }).fail(function(response){
                   alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alert('Debe seleccionar algo');
            
    });

    $('#boton_añadir').click( function () {
        
        window.location.href =  "/registro/rol"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['ro_codigo'];
            window.location.href =  '/rol/'+id;	

        }

        else alert('Debe seleccionar algo');
    });




});



