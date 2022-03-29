function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};



$(document).ready(function(){


    var proveedores;
    var marcas;
    var rubros;    
    
    $.ajax({
                
        url:   '/mostrar/proveedores',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            proveedores = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>PROVEEDORES</option>');

            for (var i=0, l=proveedores.length; i<l; i++){
                opciones.push('<option value="'+proveedores[i].po_id+'">'+proveedores[i].po_razon_social+'<opciones>');
            }

            $('#selectproveedor').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });





    $.ajax({
                
        url:   '/mostrar/rubros',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            rubros = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>RUBRO</option>');

            for (var i=1, l=rubros.length; i<l; i++){
                opciones.push('<option value="'+rubros[i].ru_codigo+'">'+rubros[i].ru_nombre+'<opciones>');
            }

            $('#selectrubro').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });






    $.ajax({
                
        url:   '/mostrar/marcas',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            marcas = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>MARCA</option>');

            for (var i=0, l=marcas.length; i<l; i++){
                opciones.push('<option value="'+marcas[i].ma_codigo+'">'+marcas[i].ma_nombre+'<opciones>');
            }

            $('#selectmarca').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });



    /*
    
    $('#selectproveedor').change(function() {

        id_proveedor = $(this).find('option:selected').val();

    });

    $('#selectrubro').change(function() {

        id_rubro = $(this).find('option:selected').val();

    });


    $('#selectmarca').change(function() {

        id_marca_sup = $(this).find('option:selected').val();

    });

    */



});





$(function(){
    $('form').submit(function(e){

        $.ajax({
            
            url:   '/manejo_producto',
            data:  $('form').serialize(),
            type: 'POST',
                
            }).done(function(response){
                
                console.log(response);
                
                if(response['error'])
					c_error(response['error']);
				
				else if (response['invalido'])
                    c_error(response['invalido']);
				
				else
					window.location.href =  "/mostrar/productos";				
                
            }).fail(function(response){
                c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });

        e.preventDefault();
    
    });
});



   
