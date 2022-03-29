function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};

function llenacombo ( ent, titulo, ent_codigo, ent_valor , nombrecbx, opcion){


    $.ajax({
                
        url:   '/mostrar/'+ent,
        type: 'POST',
        dataSrc: "", 
        async: false,
            
        }).done(function(resp){
        
            resp;          

            var opciones = [];

            opciones.push('<option value="0" selected disabled>'+titulo+'</option>');

            for (var i=0, l=resp.length; i<l; i++){
                
                if (opcion == resp[i][ent_codigo])
                    opciones.push('<option selected value="'+resp[i][ent_codigo]+'">'+resp[i][ent_valor]+'<opciones>');
                else 
                    opciones.push('<option value="'+resp[i][ent_codigo]+'">'+resp[i][ent_valor]+'<opciones>');
            }

            
            $(nombrecbx).html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


};


$(document).ready(function() {
    
    var item = (window.location.pathname.split('/'))[2];
    
    var datos;
    
    $.ajax({
                
        url:   '/manejo_producto',
        type: 'GET',
        data: {
            'item': item,
        },
        async: false, 
                   
    
    }).done(function(response){
        
        if (response['error'])
            alerta(response['error']);
        else if (response['invalido'])
            alerta(response['invalido']);
        else 
            datos = response; 
        
    }).fail(function(){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    console.log(datos);



    llenacombo('proveedores','PROVEEDOR','po_id','po_razon_social','#selectproveedor',datos.fk_proveedor);
    llenacombo('rubros','RUBRO','ru_codigo','ru_nombre','#selectrubro',datos.fk_rubro);
    llenacombo('marcas','MARCA','ma_codigo','ma_nombre','#selectmarca',datos.fk_marca);
    
    $("#id_producto").val(datos.pr_id);
    $("#inputproducto").val(datos.pr_nombre);
    $("#inputprecio").val(datos.pr_precio);
    $("#inputpeso").val(datos.pr_peso);
      

    $('#loading').hide();

    
});

$(function(){
    $("#Modificar").click(function(){
        
        
        $("#inputproducto").removeAttr('disabled'); 
        $("#inputnombre").removeAttr('disabled'); 
        $("#inputpeso").removeAttr('disabled');
        $("#inputprecio").removeAttr('disabled'); 
        $("#selectmarca").removeAttr('disabled');
        $("#selectrubro").removeAttr('disabled');


        $("#Confirmar").removeAttr('disabled');

        $("#Modificar").css("display","none"); 

        $("#Cancelar").css("display","block"); 
        $("#Confirmar").css("display","block"); 
        
        
    });
});

$(function(){
    $("#Cancelar").click(function(){
        window.location.href=window.location.href;
    });
});


$(function(){
    $('form').submit(function(e){
      
        $("#id_producto").removeAttr('disabled');

        $('#loading').show()

        $.ajax({
            
            url:   '/manejo_producto',
            data:  $('form').serialize(),
            type: 'PUT',
                
            }).done(function(response){
                
                $('#loading').hide()

                if(response['error'])
					alerta(response['error']);
				
				else if (response['invalido'])
                    alerta(response['invalido']);
				
                else
                    alerta(response['mensaje']);
                
                
                window.location.href=window.location.href;
             	
                
            }).fail(function(response){
                alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });

        e.preventDefault();
        
        
    });
});
       
        

   


