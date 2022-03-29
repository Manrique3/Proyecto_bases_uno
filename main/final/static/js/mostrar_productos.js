function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};


function alerta(mensaje){
    alert(mensaje);

};

$(document).ready(function(){

    $("#titulo").html("Productos");

    $('#tabla_datatable').DataTable({

        scrollY:        '50vh',
        scrollCollapse:  true,


        ajax: {
            url: '/mostrar/productos',
            type: 'POST',
            dataSrc: "",
        },

        columns:[
            { data:      "pr_id"    ,       title: "CODIGO"},
            { data:      "pr_nombre" ,      title: "NOMBRE"},
            { data:      "pr_precio" ,      title: "PRECIO"},
            { data:      "pr_peso"  ,       title: "PESO"},
            { data:      "ru_nombre"  ,      title: "RUBRO"},
            { data:      "ma_nombre"  ,      title: "MARCA"}
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
           
            var codigos = sel['pr_id'];

            $.ajax({
                
                url:   '/manejo_producto',
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
        
        window.location.href =  "/registro/producto"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['pr_id'];
            window.location.href =  '/producto/'+id;	

        }

        else alert('Debe seleccionar algo');
    });




});



