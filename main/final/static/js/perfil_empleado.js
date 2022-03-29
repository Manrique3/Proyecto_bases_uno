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
    
    var id = (window.location.pathname.split('/'))[2];
    
    var datos;
    var tienda_registro;

    
    $("#tlfcodigo").hide();
    var tlfcodigo = null;
    var telefono1 = null;
    
    
    $.ajax({
                
        url:   '/manejo_empleado',
        type: 'GET',
        data: {
            'id': id,
        },
        async: false, 
                   
    
    }).done(function(response){
        
        if (response['error'])
            alerta(response['error']);
        else 
            datos = response; 
        
    }).fail(function(){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });

    console.log(datos);

    $.ajax({
        
        url:   '/telefonos/'+id,
        type: 'GET',
        data: {
            'tipo': 'fk_empleado' ,
        },
        async: false, 
            
    }).done(function(response){
        
        var telefonos = response;

        if ( telefonos[0] ){
            telefono1 = telefonos[0].te_numero;
            tipot1 = telefonos[0].te_tipo;
            tlfcodigo = telefonos[0].te_codigo;
        }                 
    });

    
  
    var d = new Date(datos.em_fecha_nac);
    d.setDate(d.getDate() + 1);
    var datestring = d.getFullYear() + '-' + ("0"+(d.getMonth()+1)).slice(-2) + "-" +  ("0" + d.getDate()).slice(-2);

   

    llenacombo('tiendas','TIENDA REGISTRO','ti_codigo','ti_nombre','#selecttienda',datos.fk_tienda);
    llenacombo('roles','ROL','ro_codigo','ro_nombre','#selectrol',datos.fk_rol);
    llenacombo('empleados','SUPERVISOR','em_codigo','em_p_apellido','#selectempsup',datos.fk_empleado_sup);
    

    $("#id_user").val(datos.em_codigo);
    $("#inputcedula").val(datos.em_cedula);


    $("#selectfecha").val(datestring);

    $("#tlfcodigo").val(tlfcodigo);
    $("#inputtelefono").val(telefono1);
    
    $("#inputpnombre").val(datos.em_p_nombre);
    $("#inputsnombre").val(datos.em_s_nombre);
    $("#inputpapellido").val(datos.em_p_apellido);
    $("#inputsapellido").val(datos.em_s_apellido);

    $("#inputsueldo").val(datos.em_sueldo);
    $("#tiendaregistro").val(tienda_registro);


    $("#inputcorreo").val(datos.us_correo);
    $("#inputcont").val(datos.us_contrasena);

   
    
    


    $('#loading').hide();

    
    

});

$(function(){
    $("#Modificar").click(function(){
        
        $("#inputtelefono").removeAttr('disabled');
       
        $("#inputpnombre").removeAttr('disabled');
        $("#inputsnombre").removeAttr('disabled');
        $("#inputpapellido").removeAttr('disabled');
        $("#inputsapellido").removeAttr('disabled');
        $("#inputcont").removeAttr('disabled');
        $("#selecttienda").removeAttr('disabled');
    
        $("#selectrol").removeAttr('disabled');
        $("#selectempsup").removeAttr('disabled');
        $("#inputsueldo").removeAttr('disabled');
        

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
      
        $("#id_user").removeAttr('disabled');

        $('#loading').show()

        $.ajax({
            
            url:   '/manejo_empleado',
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
       
        

   


