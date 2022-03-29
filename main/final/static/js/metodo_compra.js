
function alerta(mensaje){
    alert(mensaje);

};


function monto_restante(){
   
    id_compra = (window.location.pathname.split('/'))[2];
    $.ajax({
                    
        url:   '/manejo_metodo_compra',                 
        type: 'PUT',
        data: {'co_id' :id_compra},
        async: false
        
    }).done(function(resp){
        
        if(resp['error'])
            alerta(resp['error']);
        
        else if (resp['invalido'])
            alerta(resp['invalido']);
        
        else{
            if (resp == 1)
                window.location.href =  '/pdf/Facturas';
            else 
                $('#restante').html('Restante: '+resp+' Bs.')
        }
        
    }).fail(function(response){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });

};


var codigo_compra = null

function mostrar_metodos(co_id){

    codigo_compra = co_id;

    $('#tabla_datatable').DataTable({
        
        info: false,
        paging: false,
        scrollY:  '50vh',
        scrollCollapse: true,
        bFilter: false,
        

        ajax: {
            url:   '/manejo_metodo_compra',
            type: 'GET',
            data: {
                'co_id': co_id,
            },
            dataSrc: ""
        },

        columns: [
            { data: "tp_descripcion" ,   title: "TIPO DE PAGO"},
            { data: "mp_documento" ,     title: "DOCUMENTO"},
            { data: "mp_cantidad" ,      title: "CANTIDAD"},
            { data: "mo_descripcion" ,   title: "MONEDA"},
            { data: "mp_monto" ,         title: "MONTO"},
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
                opciones.push('<option  value="'+resp[i].tp_codigo+'">'+resp[i].tp_descripcion+'<opciones>');
            }
            
            $('#selecttipo').html(opciones.join(''));
           
            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });

    $.ajax({
                
        url:  '/mostrar/monedas',
        type: 'POST',
        dataSrc: "",
        async: false, 
        
            
        }).done(function(resp){
        
            console.log(resp);         

            var opciones = [];

            opciones.push('<option value="0" selected disabled>MONEDA</option>');

            for (var i=0, l=resp.length; i<l; i++){
                opciones.push('<option value="'+resp[i].mo_codigo+'">'+resp[i].mo_descripcion+'<opciones>');
            }
            
            $('#selectmoneda').html(opciones.join(''));
           
            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });






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
                
                url:   '/manejo_metodo_compra',
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
        var mp_documento =  $("#input_doc").val();
        var mp_cantidad = $("#input_cantidad").val();
        var fk_moneda =  $("#selectmoneda").find('option:selected').val();
        var fk_tipo_pago =  $("#selecttipo").find('option:selected').val();

        if (mp_documento && fk_moneda && fk_tipo_pago && fk_tipo_pago && fk_moneda != 0 && fk_tipo_pago != 0){
          
            $.ajax({
                
                url:   '/manejo_metodo_compra',
                data:  {
                    'mp_documento': mp_documento,
                    'mp_cantidad': mp_cantidad,
                    'fk_moneda': fk_moneda,    
                    'fk_tipo_pago': fk_tipo_pago,                 
                    'co_id': codigo_compra,
                },
                type: 'POST',
                    
                }).done(function(resp){
                    
                    if(resp['error'])
                        alerta(resp['error']);
                    
                    else if (resp['invalido'])
                        alerta(resp['invalido']);
                    
                    else{
                        table.row.add( {
                            "tp_descripcion"  : resp['tp_descripcion'],
                            "mp_documento"    : resp['mp_documento'],
                            "mp_cantidad"     : resp['mp_documento'],
                            "mo_descripcion"  : resp['mo_descripcion'],
                            "mp_monto"        : resp['mp_monto'],
                        } ).draw();
                        monto_restante();
                    }
                    
                }).fail(function(response){
                    alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
                });

        }
        else alert('Error campos vacios');
        


    } );


    /*combox e inputs*/

   



});


