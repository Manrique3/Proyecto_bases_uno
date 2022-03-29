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
                
        url:   '/manejo_moneda',
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


    
    $("#id_moneda").val(datos.mo_codigo);
    $("#inputmoneda").val(datos.mo_descripcion);
    
    var cotz = datos['cotizacion'];
    

    for (var i=0, l=cotz.length; i<l; i++)
        if (cotz[i].ct_expira == null){
            $("#cot_actual").val(cotz[i].ct_valor);
            $("#fechacot").html(cotz[i].ct_fecha);
        }
     


    $('#tabla_datatable').DataTable({
        
        info: false,
        paging: false,
        scrollX: false,
        bFilter: false,

        data: cotz,

        columns: [
            { data: "ct_fecha" ,   title: "FECHA"},
            { data: "ct_expira" ,   title: "EXPIRACION"},
            { data: "ct_valor" ,   title: "VALOR BS."},
        ]
        
    });
    
   

    $('#loading').hide();

    
    

});

$(function(){
    $("#Modificar").click(function(){
        
        
        $("#inputmoneda").removeAttr('disabled');
        $("#cot_nueva").removeAttr('disabled');
        $("#Confirmar").removeAttr('disabled');


        
        $("#Modificar").css("display","none"); 

        $("#Cancelar").css("display","block"); 
        $("#Confirmar").css("display","block"); 
        $("#cot_nueva").css("display","block");
        $("#cot_nuevatl").css("display","block");
       
        
       
    });
});

$(function(){
    $("#Cancelar").click(function(){
        window.location.href=window.location.href;
    });
});


$(function(){
    $('form').submit(function(e){
      
        $("#id_moneda").removeAttr('disabled');

        $('#loading').show()

        $.ajax({
            
            url:   '/manejo_moneda',
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
       
        

   


