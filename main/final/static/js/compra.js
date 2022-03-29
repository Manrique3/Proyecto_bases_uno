
function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


var datos_compra;
var total;

$(document).ready(function() {
    
    id_compra = (window.location.pathname.split('/'))[2];

    
    /*validacion de monto o existencia*/
    monto_restante();
    
    
    $.ajax({
                
        url:   '/manejo_compra',                 
        type: 'GET',
        data: {'item' : id_compra},
        async: false
        
    }).done(function(resp){
        
        if(resp['error'])
            alerta(resp['error']);
        
        else if (resp['invalido'])
            alerta(resp['invalido']);
        
        else{
            datos_compra = resp
            mostrar_metodos(datos_compra['co_id'])    
            total = datos_compra.co_monto_cancelar
            $('#total').html('Total: '+total+' Bs.')
        }
          
    }).fail(function(response){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });



    

});

$(function(){

    $("#boton_continuar").click(function(){
        console.log("bueno");
    });  

        
    $("#boton_regresar").click(function(){
        window.location.href =  '/'
    });  

});



/*

    $.ajax({
                
        url:   '/metodo_pago_cliente',                 
        type: 'GET',
        data: {'id' : datos_compra.fk_cliente},
        async: false
        
    }).done(function(resp){
        
        if(resp['error'])
            alerta(resp['error']);
        
        else if (resp['invalido'])
            alerta(resp['invalido']);
        
        else{
            
            console.log(resp)


        }
          
    }).fail(function(response){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });



*/