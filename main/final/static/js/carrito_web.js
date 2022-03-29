
function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


var id_carrito = null;

$(document).ready(function() {
    
    $.ajax({
                
        url:   '/carrito_web',                 
        type: 'POST',
        dataSrc: ""
        
    }).done(function(resp){
        
        if(resp['error'])
            alerta(resp['error']);
        
        else if (resp['invalido'])
            alerta(resp['invalido']);
        
        else{
            id_carrito = resp;
            mostrar_carrito(resp)
        }

    }).fail(function(response){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    

});

$(function(){

    
    $("#boton_pagar").click(function(){
        
        $.ajax({
                
            url:   '/carrito_web',                 
            type: 'PUT',
            data:  {'id_carrito' : id_carrito,}           
            
        }).done(function(resp){
            
            if(resp['error'])
                alerta(resp['error']);
            
            else if (resp['invalido'])
                alerta(resp['invalido']);
            
            else
                window.location.href = 'compra/'+resp;
              
        }).fail(function(response){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
        });
    });  

        
    $("#boton_regresar").click(function(){
        window.location.href =  '/'
    });  

});