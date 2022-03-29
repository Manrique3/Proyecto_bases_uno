function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido"'+mensaje+'</p')
};

function alerta(mensaje){
    alert(mensaje);

};


$(document).ready(function() {

    $("#ASISTENCIA").hide();   
    $("#HORARIO").hide();
    $("#INGRESO_EGRESO").hide();
    $("#EMPLEADO").hide();
    $("#HORARIO").hide();
    $("#FRECUENTES").hide();
    $("#MES").hide();
    $("#FACTURA").hide();
    $("#Genera0").hide();


});



$(function(){

    var priv

    $("#selecttipo").change(function() {

        priv = $(this).find('option:selected').val();          
        console.log(priv);

        $("#Genera0").show();
        
        /*ESCODER TODO*/
        $("#ASISTENCIA").hide();   
        $("#HORARIO").hide();
        $("#INGRESO_EGRESO").hide();
        $("#FRECUENTES").hide();
        $("#MES").hide();
        $("#FACTURA").hide();
        
        

        if (priv == "Asistencia")
            $("#ASISTENCIA").show(); 
        if (priv == "Horario")
            $("#HORARIO").show();  
        if (priv == "Ingresos")
            $("#INGRESO_EGRESO").show(); 
        if (priv == "Horario")
            $("#HORARIO").show(); 
        if (priv == "Frecuentes")
            $("#FRECUENTES").show(); 
        if (priv == "Mes")
            $("#MES").show();   
        if (priv == "Factura")
            $("#FACTURA").show();            

    });
    

    $("#Genera0").click(function(){     
       
        console.log(priv)

        $.ajax({
                    
            url:   '/Genera/'+priv,
            type: 'POST',
            data:  $('form').serialize(),
        
            }).done(function(response){
                
                console.log(response);
                
                if(response['error'])       
                    alerta(response['error']);
                
                else if (response['invalido'])
                    alerta(response['invalido']);
                else{
                    
                    if (priv == 'Asistencia')
                        window.location.href =  "/excel/"+priv;
                    else
                        window.location.href =  "/pdf/"+priv;

                }
                    				
                
            }).fail(function(response){
                alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });  
        


    });


});











