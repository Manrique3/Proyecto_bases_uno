
function alerta(mensaje){
    alert(mensaje);

};

var table;

$(document).ready(function() {

    var id = (window.location.pathname.split('/'))[2];

    $('#tabla_datatable3').DataTable({
        
        info: false,
        paging: false,
        scrollX: false,
        bFilter: false,


        ajax: {
            url:   '/vacaciones',
            type: 'GET',
            data: {
                'id': id
            },
            dataSrc: ""

            
        },

        columns: [
            { data: "va_fecha_ini" ,   title: "FECHA INICIO"},
            { data: "va_fecha_fin" ,   title: "FECHA FINAL"}
        ]
        
    });
    

    table = $('#tabla_datatable3').DataTable();
 
    $('#tabla_datatable3 tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    
    $('#fechaspnl').hide();
    $('#boton_añadir6').hide();


});

$(function(){

    $('#boton_eliminar5').click( function () {
        
        var sel = table.row('.selected').data();
        
        if (sel){
          
            $.ajax({
                
                url:   '/vacaciones',
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

    $('#boton_añadir5').click( function () {
        
        $('#boton_añadir5').hide();
        $('#boton_eliminar5').hide();

        $('#fechaspnl').show();
        $('#boton_añadir6').show();

    } );


    $('#boton_añadir6').click( function () {
    
        var fk_empleado = (window.location.pathname.split('/'))[2];
        var fecha_ini =  $("#fecha_ini").val();
        var fecha_fin =  $("#fecha_fin").val();
        
        $.ajax({
            
            url:   '/vacaciones',
            type: 'POST',
            data: {
                'fk_empleado' : fk_empleado ,
                'fecha_ini'   : fecha_ini,
                'fecha_fin'   : fecha_fin,
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


