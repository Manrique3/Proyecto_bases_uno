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
                
        url:   '/manejo_marca',
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


    
    $("#id_marca").val(datos.ma_codigo);
    $("#inputmarca").val(datos.ma_nombre);
   
    if (datos.ma_ucabmart) 
        $("#inputpropia").prop("checked", true);

        
    $('#loading').hide();

    
});

$(function(){
    $("#Modificar").click(function(){
        
        
        $("#inputmarca").removeAttr('disabled');
        $("#inputpropia").removeAttr('disabled');
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
      
        $("#id_marca").removeAttr('disabled');

        $('#loading').show()

        $.ajax({
            
            url:   '/manejo_marca',
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
       
        

   


