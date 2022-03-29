
function alerta(mensaje){
    alert(mensaje);

};

var id_carrito;

function mostrar_carrito(id_car){

    id_carrito = id_car;

    $('#tabla_datatable').DataTable({
        
        info: false,
        paging: false,
        scrollY:        '50vh',
        scrollCollapse: true,
        bFilter: false,
        

        ajax: {
            url:   '/manejo_carrito',
            type: 'GET',
            data: {
                'id': id_carrito
            },
            dataSrc: ""
        },

        columns: [
            { data: "pr_id" ,         title: "COD"},
            { data: "pr_nombre" ,     title: "NOMBRE"},
            { data: "pr_peso" ,       title: "PESO"},
            { data: "ca_unidades" ,   title: "UNIDADES"},
            { data: "ca_costo"      , title: "COSTO P/U"},
        ]
    });

    $('#tabla_datatable tbody').on( 'click', 'tr', function () {
         
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $('#tabla_datatable').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

};
    
$(function(){

    $('#tabla_datatable tbody').on( 'click', 'tr', function () {
         
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            $('#tabla_datatable').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    
    $('#boton_eliminar').click( function () {

        var table = $('#tabla_datatable').DataTable();
        var sel = table.row('.selected').data();

        if (sel){
          
            $.ajax({
                
                url:   '/manejo_carrito',
                data:  sel,
                type: 'DELETE',
                    
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

        var table = $('#tabla_datatable').DataTable();
        var codigo =  $("#codigo_producto").val();
        var cant = $("#cantidad_producto").val();

        if (!cant) cant = 1 

        if (codigo){
          
            $.ajax({
                
                url:   '/manejo_carrito',
                data:  {
                    'carrito': id_carrito,
                    'codigo': codigo,
                    'cant': cant,                        
                },
                type: 'PUT',
                    
                }).done(function(resp){
                    
                    if(resp['error'])
                        alerta(resp['error']);
                    
                    else if (resp['invalido'])
                        alerta(resp['invalido']);
                    
                    else
                        table.row.add( {
                            "pr_id"       : resp['pr_id'],
                            "pr_nombre"   : resp['pr_nombre'],
                            "pr_peso"     : resp['pr_peso'],
                            "ca_unidades" : resp['ca_unidades'],
                            "ca_costo"    : resp['ca_costo'],
                        } ).draw();
                        

                
                    
                }).fail(function(response){
                    alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alert('Codigo producto vacio ');
        


    } );


    /*combox e inputs*/

   



});



