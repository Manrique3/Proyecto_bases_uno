
function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    var id = (window.location.pathname.split('/'))[2];

    $('#tabla_datatable').DataTable({
        
        info: false,
        paging: false,
        scrollX: false,
        bFilter: false,


        ajax: {
            url:   '/horarios_empleado',
            type: 'GET',
            data: {
                'id': id
            },
            dataSrc: ""

            
        },

        columns: [
            { data: "fk_horario" ,   title: "CODIGO"},
            { data: "ho_descripcion" ,   title: "DESCRIPCION"},
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

    
    $('#input_horario').hide();
    $('#boton_añadir2').hide();

    
    $('#boton_eliminar').click( function () {
        
        var sel = table.row('.selected').data();
        
        /*var fk_empleado = (window.location.pathname.split('/'))[2];

        var obj = {
            'fk_empleado' : fk_empleado
        };

        $.extend(sel,obj);
        */

        if (sel){
          
            $.ajax({
                
                url:   '/horarios_empleado',
                data: sel,
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

        $('#input_horario').show();
        $('#boton_añadir2').show();

    } );


    /*combox e inputs*/




    $.ajax({
                
        url:  '/mostrar/horarios',
        type: 'POST',
        dataSrc: "",
        async: false, 
        
            
        }).done(function(resp){
        
            var opciones = [];

            opciones.push('<option value="0" selected disabled>HORARIO</option>');

            for (var i=0, l=resp.length; i<l; i++){
                opciones.push('<option value="'+resp[i].ho_codigo+'">'+resp[i].ho_codigo+' - '+resp[i].ho_descripcion+'<opciones>');
             
            }
            
            $('#input_horario').html(opciones.join(''));
           
            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });




    $('#boton_añadir2').click( function () {
    
        var fk_empleado = (window.location.pathname.split('/'))[2];
        var fk_horario =  $("#input_horario").find('option:selected').val();

        $.ajax({
            
            url:   '/horarios_empleado',
            type: 'POST',
            data: {
                'fk_empleado' : fk_empleado ,
                'fk_horario'   : fk_horario,
            
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



