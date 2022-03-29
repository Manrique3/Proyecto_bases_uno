
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
            c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


};


$(document).ready(function() {

    var id_estado;
    var id_municipio;
    var id_parroquia;

    lugares('ESTADO','',0);
    
   
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
    


    var tiendas;
    var id_tienda;
    
    $.ajax({
                
        url:   '/mostrar/tiendas',
        type: 'POST',
        dataSrc: "",
            
        }).done(function(resp){
            
            tiendas = resp;         

            var opciones = [];

            opciones.push('<option value="default" selected disabled>TIENDAS</option>');

            for (var i=0, l=tiendas.length; i<l; i++){
                opciones.push('<option value="'+tiendas[i].ti_codigo+'">'+tiendas[i].ti_nombre+'<opciones>');
            }

            $('#selecttienda').html(opciones.join(''));

            
        }).fail(function(resp){
            c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    $('#selecttienda').change(function() {

        id_tienda = $(this).find('option:selected').val();

    });
    
});


$(function(){
    $('form').submit(function(e){

        $.ajax({
            
            url:   '/manejo_natural',
            data:  $('form').serialize(),
            type: 'POST',
                
            }).done(function(response){
                            
                if(response['error'])
					c_error(response['error']);
				
				else if (response['invalido'])
                    c_error(response['invalido']);
				
                else
                    window.location.href =  "/mostrar/naturales";
                    /*window.location.href =  "/"*/
                    			
                
            }).fail(function(response){
                c_error('No se pudo acceder al servidor. Intente de nuevo mas tarde');
            });

        e.preventDefault();
    
    });
});


$(function(){
    
    $("#Continuar").click(function(){    
       
        var form = $('form');
        var flag = 0;
     
        for (var n = 0; n <= 11; n++){
            if (!(form[0][n].checkValidity())){
                form[0][n].reportValidity();
                
                flag = 1;
                break;
            }
        }
    
        var cont = ($("#inputcont").val());
        var contval = ($("#inputcontval").val());
        
        if (cont != contval){
            $("#inputcontval")[0].setCustomValidity("Las contraseñas no coinciden");
            $("#inputcontval")[0].reportValidity();
            $("#inputcontval")[0].setCustomValidity('');
            flag = 1;
        } 
        

        if (flag == 0 ){
            $("#fondo3").fadeOut("slow");       
            $("#fondo4").fadeIn("slow");     
            $("#fondo3").css("display", "none");                 				
        }

    });          

    $("#Regresar").click(function(){
        $("#fondo3").css("display", "block");   
        $("#fondo4").fadeOut("slow");     
        $("#fondo3").fadeIn("slow");   
    });  

    $("#selecttipo2").click(function(){
        window.location.href = "/registro/juridico";

    });
   

});



