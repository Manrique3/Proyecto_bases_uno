
function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $(id_user).prop("disabled", false); 
    var id = $(id_user).val();
    $(id_user).prop("disabled", true)

    $('#tabla_datatable').DataTable({
        
        info: false,
        paging: false,
        scrollX: false,
        bFilter: false,


        ajax: {
            url:   '/metodo_pago_cliente',
            type: 'GET',
            data: {
                'id': id
            },
            dataSrc: ""

            
        },

        columns: [
            { data: "mc_documento" ,   title: "DOCUMENTO"},
            { data: "fk_tipo_pago" ,   title: "CODIGO"},
            { data: "tp_descripcion" ,   title: "TIPO DE PAGO"},
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

    
    $('#tipo').hide();
    $('#inputdocmt').hide();
    $('#boton_añadir2').hide();

 
    $('#boton_eliminar').click( function () {
        
        var sel = table.row('.selected').data();

        if (sel){
          
            $.ajax({
                
                url:   '/metodo_pago_cliente',
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
        
        $('#boton_añadir').hide();
        $('#boton_eliminar').hide();

        $('#tipo').show();
        $('#inputdocmt').show();
        $('#boton_añadir2').show();

    } );


    /*combox e inputs*/


    $.ajax({
                
        url:  '/mostrar/tipo_pagos',
        type: 'POST',
        dataSrc: "",
        async: false, 
        
            
        }).done(function(resp){
        
            console.log(resp);         

            var opciones = [];

            opciones.push('<option value="0" selected disabled>TIPO DE PAGO</option>');

            for (var i=0, l=resp.length; i<l; i++){
                opciones.push('<option selected value="'+resp[i].tp_codigo+'">'+resp[i].tp_descripcion+'<opciones>');
            }
            
            $('#selecttipo').html(opciones.join(''));
           
            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });




    $('#boton_añadir2').click( function () {
    
        var mc_documento = $("#inputdocmt").val();
        var fk_cliente = (window.location.pathname.split('/'))[2];
        var fk_tipo_pago =  $("#selecttipo").find('option:selected').val();

        $.ajax({
            
            url:   '/metodo_pago_cliente',
            type: 'POST',
            data: {
                'mc_documento' : mc_documento ,
                'fk_cliente'   : fk_cliente,
                'fk_tipo_pago' : fk_tipo_pago,
	
            },
            async: false, 
                   
            
                
            }).done(function(response){
                            
                if(response['error'])
                    alerta(response['error']);
                
                else if (response['invalido'])
                    alerta(response['invalido']);
                
                else
                    window.location.href = window.location.href;
                                
                
            }).fail(function(response){
                alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });
            

    });

    





});



