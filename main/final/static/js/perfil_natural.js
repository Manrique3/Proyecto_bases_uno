function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


function lugares (lu_tipo, fk_lugar,sel_op){

    $.ajax({
                
        url:   '/lugares',
        type: 'GET',
        data: {
            'LUGAR': lu_tipo ,
            'FK_LUGAR': fk_lugar,
        },
        async: false, 
            
        }).done(function(resp){
        
            lugars = resp;          

            var opciones = [];

            opciones.push('<option value="0" selected disabled>'+lu_tipo+'</option>');

            for (var i=0, l=lugars.length; i<l; i++){

                if (sel_op == lugars[i].lu_codigo)
                    opciones.push('<option selected value="'+lugars[i].lu_codigo+'">'+lugars[i].lu_nombre+'<opciones>');
                else 
                    opciones.push('<option value="'+lugars[i].lu_codigo+'">'+lugars[i].lu_nombre+'<opciones>');
            }


            if (lu_tipo == 'ESTADO')
                $('#selectestado').html(opciones.join(''));
            else if (lu_tipo == 'MUNICIPIO')
                $('#selectmunicipio').html(opciones.join(''));
            else 
                $('#selectparroquia ').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


};



$(document).ready(function() {
    
    var item = (window.location.pathname.split('/'))[2];
    

    $("#tlfcodigo").hide();
    $("#tlfcodigo2").hide();
    $("#tlfcodigo3").hide();





    var datos;
    var tienda_registro;

    var direccion;

    var id_estado;
    var id_municipio;
    var id_parroquia;
    var idv_estado;
    var idv_municipio;
    var idv_parroquia;

    var telefono1 = null;
    var tipot1 = null;
    var tlfcodigo = null;
    var telefono2 = null;
    var tipot2 = null;
    var tlfcodigo2 = null;
    var telefono3 = null;
    var tipot3 = null;
    var tlfcodigo3 = null;
    
    $.ajax({
                
        url:   '/manejo_natural',
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

    $.ajax({
                
        url:   '/mostrar/tiendas',
        type: 'POST',
        dataSrc: "",
        async: false, 
            
        }).done(function(resp){
            
            tiendas = resp;
            for (var i=0, l=tiendas.length; i<l; i++){
                if (tiendas[i].ti_codigo == datos.fk_tienda)
                    tienda_registro = tiendas[i].ti_nombre;
            }     
                      
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
        });


    $.ajax({
                
        url:   '/lugares',
        type: 'POST',
        data: {
            'fk_dir': datos.fk_lugar ,
        },
        async: false, 
            
        }).done(function(response){
        
            idv_estado = response['idv_estado'];
            idv_municipio =  response['idv_municipio'];
            idv_parroquia =  response['idv_parroquia'];
            direccion = response['direccion']
        });


    $.ajax({
            
        url:   '/telefonos/'+datos.cl_id,
        type: 'GET',
        data: {
            'tipo': 'fk_cliente' ,
        },
        async: false, 
            
        }).done(function(response){
            
            var telefonos = response;

            if ( telefonos[0] ){
                telefono1 = telefonos[0].te_numero;
                tipot1 = telefonos[0].te_tipo;
                tlfcodigo = telefonos[0].te_codigo;
            }
            if ( telefonos[1] ){
                telefono2 = telefonos[1].te_numero;
                tipot2 = telefonos[1].te_tipo;
                tlfcodigo2 = telefonos[1].te_codigo;
            }
            if ( telefonos[2] ){
                telefono3 = telefonos[2].te_numero;
                tipot3 = telefonos[2].te_tipo;
                tlfcodigo3 = telefonos[2].te_codigo;
            }
                            
        });

    console.log(telefono1);
    console.log(telefono2);
    console.log(telefono3);

    $("#inputtelefono").val(telefono1);
    $("#inputtelefono2").val(telefono2);
    $("#inputtelefono3").val(telefono3);

    $("#tlfcodigo").val(tlfcodigo);
    $("#tlfcodigo2").val(tlfcodigo2);
    $("#tlfcodigo3").val(tlfcodigo3);



    $("#id_user").val(datos.cl_id);
    $("#inputcedula").val(datos.cl_cedula);
    
    $("#inputpnombre").val(datos.cl_p_nombre);
    $("#inputsnombre").val(datos.cl_s_nombre);
    $("#inputpapellido").val(datos.cl_p_apellido);
    $("#inputsapellido").val(datos.cl_s_apellido);
    $("#inputrif").val(datos.cl_rif);

    $("#inputcorreo").val(datos.us_correo);
    $("#inputcont").val(datos.us_contrasena);

    $("#tiendaregistro").val(tienda_registro);
    
    $("#inputdir").val(direccion);



    /* DIRECCION */

    lugares('ESTADO','',idv_estado);
    lugares('MUNICIPIO',idv_estado,idv_municipio);
    lugares('PARROQUIA',idv_municipio,idv_parroquia);  


    

    $('#selectestado').change(function() {

        id_estado = $(this).find('option:selected').val();
        lugares('MUNICIPIO',id_estado,0);
    });
        

    $('#selectmunicipio').change(function() {

        id_municipio = $(this).find('option:selected').val();
        lugares('PARROQUIA',id_municipio,0);
    });

    
    $('#selectparroquia').change(function() {

        id_parroquia = $(this).find('option:selected').val();
    });















    $('#loading').hide();

    
    

});

$(function(){
    $("#Modificar").click(function(){
        
        $("#inputtelefono").removeAttr('disabled');
        $("#inputtelefono2").removeAttr('disabled');
        $("#inputtelefono3").removeAttr('disabled');
        $("#inputpnombre").removeAttr('disabled');
        $("#inputsnombre").removeAttr('disabled');
        $("#inputpapellido").removeAttr('disabled');
        $("#inputsapellido").removeAttr('disabled');
        $("#inputcont").removeAttr('disabled');
        
        $("#selectestado").removeAttr('disabled');
        $("#selectmunicipio").removeAttr('disabled');
        $("#selectparroquia").removeAttr('disabled');
        $("#inputdir").removeAttr('disabled');
        
        
        $("#Modificar").css("display","none"); 
        $("#Cancelar").css("display","block"); 
       
        $("#Confirmar").removeAttr('disabled');
        $("#Carnet").css("display","none"); 
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
            
            url:   '/manejo_natural',
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
       
        

   


