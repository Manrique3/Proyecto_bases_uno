function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};

$(document).ready(function() {
    
    var item = (window.location.pathname.split('/'))[2];
    
    var datos;
    
    $.ajax({
                
        url:   '/manejo_rol',
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


    
    $("#id_rol").val(datos.ro_codigo);
    $("#inputrol").val(datos.ro_nombre);
   
    
        
    $('#loading').hide();

    
});

$(function(){
    $("#Modificar").click(function(){
        
        
        $("#inputrol").removeAttr('disabled');
        
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
      
        $("#id_rol").removeAttr('disabled');

        $('#loading').show()

        $.ajax({
            
            url:   '/manejo_rol',
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
       
        

   


