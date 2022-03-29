
function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    var id = (window.location.pathname.split('/'))[2];

    $('#tabla_datatable2').DataTable({
        
        info: false,
        paging: false,
        scrollX: false,
        bFilter: false,


        ajax: {
            url:   '/beneficios_empleado',
            type: 'GET',
            data: {
                'id': id
            },
            dataSrc: ""

            
        },

        columns: [
            { data: "fk_beneficio" ,   title: "CODIGO DEL BENEFICIO"},
            { data: "be_nombre" ,   title: "NOMBRE"},
        ]
        
    });
    

    var table = $('#tabla_datatable2').DataTable();
 
    $('#tabla_datatable2 tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    
    $('#input_beneficio').hide();
    $('#boton_añadir4').hide();

    
    $('#boton_eliminar3').click( function () {
        
        var sel = table.row('.selected').data();
        

        if (sel){
          
            $.ajax({
                
                url:   '/beneficios_empleado',
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

    $('#boton_añadir3').click( function () {
        
        $('#boton_añadir3').hide();
        $('#boton_eliminar3').hide();

        $('#input_beneficio').show();
        $('#boton_añadir4').show();

    } );


    /*combox e inputs*/


    $.ajax({
                
        url:  '/mostrar/beneficios',
        type: 'POST',
        dataSrc: "",
        async: false, 
        
            
        }).done(function(resp){
        
            var opciones = [];

            opciones.push('<option value="0" selected disabled>BENEFICIO</option>');

            for (var i=0, l=resp.length; i<l; i++){
                opciones.push('<option value="'+resp[i].be_codigo+'">'+resp[i].be_codigo+' - '+resp[i].be_nombre+'<opciones>');
             
            }
            
            $('#input_beneficio').html(opciones.join(''));
           
            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });




    $('#boton_añadir4').click( function () {
    
        var fk_empleado = (window.location.pathname.split('/'))[2];
        var fk_beneficio =  $("#input_beneficio").find('option:selected').val();

        $.ajax({
            
            url:   '/beneficios_empleado',
            type: 'POST',
            data: {
                'fk_empleado' : fk_empleado ,
                'fk_beneficio'   : fk_beneficio,
            
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



