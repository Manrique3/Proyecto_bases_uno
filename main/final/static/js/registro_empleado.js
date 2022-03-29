

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {


    var tiendas;
    var id_tienda;

    var empleados;
    var id_empleado_sup;

    var rol;
    var id_rol;
    
    
    $.ajax({
                
        url:   '/mostrar/tiendas',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            tiendas = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>TIENDAS</option>');

            for (var i=0, l=tiendas.length; i<l; i++){
                opciones.push('<option value="'+tiendas[i].ti_codigo+'">'+tiendas[i].ti_nombre+'<opciones>');
            }

            $('#selecttienda').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    $('#selecttienda').change(function() {

        id_tienda = $(this).find('option:selected').val();

    });



    $.ajax({
                
        url:   '/mostrar/roles',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            roles = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>ROL</option>');

            for (var i=1, l=roles.length; i<l; i++){
                opciones.push('<option value="'+roles[i].ro_codigo+'">'+roles[i].ro_nombre+'<opciones>');
            }

            $('#selectrol').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    $('#selectrol').change(function() {

        id_rol = $(this).find('option:selected').val();

    });








    $.ajax({
                
        url:   '/mostrar/empleados',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            empleados = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>SUPERVISOR</option>');

            for (var i=0, l=empleados.length; i<l; i++){
                opciones.push('<option value="'+empleados[i].em_codigo+'">'+empleados[i].em_p_nombre + ' ' + empleados[i].em_p_apellido+'<opciones>');
            }

            $('#selectempsup').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    $('#selectempsup').change(function() {

        id_empleado_sup = $(this).find('option:selected').val();

    });



   


    
});


$(function(){
    $('form').submit(function(e){

        $.ajax({
            
            url:   '/manejo_empleado',
            data:  $('form').serialize(),
            type: 'POST',
                
            }).done(function(response){
                            
                if(response['error'])
					alerta(response['error']);
				
				else if (response['invalido'])
                    alerta(response['invalido']);
				
                else
                    window.location.href =  "/mostrar/empleados";
                    
                    			
                
            }).fail(function(response){
                alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });

        e.preventDefault();
    
    });
});

