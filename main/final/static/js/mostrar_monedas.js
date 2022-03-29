function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};


function alerta(mensaje){
    alert(mensaje);

};

$(document).ready(function(){

    $("#titulo").html("Monedas");

    $('#tabla_datatable').DataTable({

        scrollY:        '50vh',
        scrollCollapse:  true,


        ajax: {
            url: '/mostrar/monedas',
            type: 'POST',
            dataSrc: "",
        },

        columns:[
            { data:      "mo_codigo"    ,     title:"CODIGO"},
            { data:      "mo_descripcion" ,   title: "DESCRIPCION"},
            { data:      "ct_valor"  ,        title: "COTIZACION"},
            { data:      "ct_fecha"  ,        title: "FECHA COT"}
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
           
            var codigos = sel['mo_codigo'];

            $.ajax({
                
                url:   '/manejo_moneda',
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
        
        window.location.href =  "/registro/moneda"		

    } );

    $('#boton_modificar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){

            var id = sel['mo_codigo'];
            window.location.href =  '/moneda/'+id;	

        }

        else alert('Debe seleccionar algo');
    });




});



