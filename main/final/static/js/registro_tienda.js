function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};


function lugares (lu_tipo, fk_lugar,sel_op,y){

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
            console.log(lugars);     

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
            c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


};


$(document).ready(function() {

    var id_estado;
    var id_municipio;
    var id_parroquia;

    lugares('ESTADO','',0,1);
    
   
    $('#selectestado').change(function() {

        id_estado = $(this).find('option:selected').val();
        lugares('MUNICIPIO',id_estado,0,1);
    });
    
    $('#selectmunicipio').change(function() {

        id_municipio = $(this).find('option:selected').val();
        lugares('PARROQUIA',id_municipio,0,1);
    });

    $('#selectparroquia').change(function() {

        id_parroquia = $(this).find('option:selected').val();
    });




    var id_estado2;
    var id_municipio2;
    var id_parroquia2;

    lugares('ESTADO','',0,2);
    
    $('#selectestado2').change(function() {

        id_estado2 = $(this).find('option:selected').val();
        lugares('MUNICIPIO',id_estado2,0,2);
    });
    
    $('#selectmunicipio2').change(function() {

        id_municipio2 = $(this).find('option:selected').val();
        lugares('PARROQUIA',id_municipio2,0,2);
    });

    $('#selectparroquia2').change(function() {

        id_parroquia2 = $(this).find('option:selected').val();
    });



  
    

});


$(function(){
    $('form').submit(function(e){

        $.ajax({
            
            url:   '/manejo_tienda',
            data:  $('form').serialize(),
            type: 'POST',
                
            }).done(function(response){
                
                console.log(response);
                
                if(response['error'])
					c_error(response['error']);
				
				else if (response['invalido'])
                    c_error(response['invalido']);
				
				else
					window.location.href =  "/mostrar/tiendas";				
                
            }).fail(function(response){
                c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });

        e.preventDefault();
    
    });
});

$(function(){ // FUNCION PARA GENERAR EL CORREO
    $('#Generarc').click(function(){

        var tienda=$('#inputtienda').val();
    
        if (tienda =='') 
            alert("No agregó un nombre en Tienda");
        
        else{
           var String = tienda.replace(/ /g,"");
           
           var ucab='@UCABMART.com'; 
           var generado = String + ucab;
           console.log($('#inputcorreo').val(generado));
        }
    });
});

$(function(){
    $('#Registrar').click(function(){

        if ($('#inputtienda').val == '') 
            alert("No agregó un nombre en Tienda");
        
        else if ($('selecestado').val =='ESTADO')  
            alert ("No agregó un estado");      

    });


});

   
