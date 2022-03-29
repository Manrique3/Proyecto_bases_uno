
function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};


function itemlist(items) {

    if (fk_cliente)
        boton_carrito = '<button id="Registrar" class="btn btn-sm btn-primary" type ="submit">Añadir al Carrito</button>'
    else 
        boton_carrito = ''

    $("ul").empty();

    for (var i=0, l=items.length; i<l; i++){
        $("ul").append(`
        
            <li>    
                <form action="/añadir_carrito_web/`+items[i].pr_id+`" method="POST">
                    <div id="inner" class="row">
                        <div class="col-4">
                            <img type="image" id="imagen" src="../static/media/brokenpng.jpg">
                        </div>
                        <div class="col-8">
                            <h3>`+items[i].pr_nombre+`</h4> 
                            <h5>`+items[i].ma_nombre+`</h5>
                            <h6>`+items[i].ru_nombre+`</h6> 
                            <br>
                            <div class="row">
                                <div class="col mr-auto">
                                    <h4>`+items[i].pr_precio+` Bs.</h4>
                                </div>
                                <div class="col-auto">
                                    `+boton_carrito+`
                                </div>
                            </div>
                        </div>
                    </div>
                </form> 
            </li>  
        
        `);
    }
    
};

function psearch(search){

    $.ajax({
                
        type: 'POST',
        url: '/ver_productos',
        data:{
            'search': search ,
        }
            
    }).done(function(resp){
    
        if (!resp)
            $("ul").append("<h3>No hay resultado</h3>")

        else if(resp['error'])
            alerta(resp['error']);
        
        else if (resp['invalido'])
            alerta(resp['invalido']);
         
        else
            itemlist(resp);


    }).fail(function(resp){
        alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    }); 


};


/*DE SESSION Y COMBO DE OPCIONES */
var privilegios = null;
var rol = null;
var correo = null;
var fk_cliente = null;
var fk_empleado = null;




$(document).ready(function() {
  
    $.ajax({
                
        url:   '/sesion',
        type: 'GET',
        data: {
            'b': 0,
        },
        async: false
            
        }).done(function(resp){
        
            var opciones = [];
            opciones.push('<option value="0" selected disabled>MENU</option>');

            console.log(resp)

            if (resp['privilegios']){
                rol = resp['fk_rol'];
                privilegios = resp['privilegios'];
                correo = resp['us_correo'];
                fk_empleado = resp['fk_empleado'];
                fk_cliente = resp['fk_cliente'];


                opciones.push('<option value="1002">Cerrar Sesion</option>');    
                
                for (var i=0, l=privilegios.length; i<l; i++){
                    if (i != 2)
                         opciones.push('<option value="'+privilegios[i].pv_codigo+'">'+privilegios[i].pv_descripcion+'<opciones>');
                }  
            }
            else{
                opciones.push('<option value="1000">Iniciar Sesion</option>');
                opciones.push('<option value="1001">Crear Cuenta</option>');
            }
            
            $('#selectpriv').html(opciones.join(''));
    

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });


    psearch('')
  


});






$(function(){

    $("#buscarbtn").click(function(){
        search = $('#buscar').val();
        psearch(search);
    });  


    document.addEventListener("keyup", function(event) {
        if (event.code === 'Enter') {
            $("#buscarbtn").click();
        }
    });


    function cerrar_sesion(){

        $.ajax({
                
            url:   '/sesion',
            type: 'DELETE',
            dataSrc: ""
                
            }).done(function(resp){
            
                window.location.href = window.location.href;
                
            }).fail(function(resp){
                alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
        });
    
    };
    

    $('#selectpriv').change(function() {

        priv = $(this).find('option:selected').val();
        console.log(priv);

        switch(priv) {
            case '1000':
                window.location.href =  '/inicio_sesion';	
                break;
            case '1001':
                window.location.href =  '/registro/natural';	
                break;
            case '1002':
                cerrar_sesion();	
                break;
            case '1':
                window.location.href =  '/cliente/'+fk_cliente;	
                break;
            case '2':
                window.location.href =  '/carrito_web';	
                break;
            case '3':
                window.location.href =  '/';	/*generar presupuesto*/
                break;
            case '4':
                window.location.href =  '/';    	/* /Generar Compra Web */
                break;
            case '5':
                window.location.href =  '/';	 /*Asignación De Descuentos*/
                break;
            case '6':
                window.location.href =  '/';	/*Generar Revista Notimart (PDF)*/
                break;
            case '7':
                window.location.href =  '/Genera/Ingresos';	
                break;
            case '8':
                window.location.href =  '/Genera/Frecuentes';	
                break;
            case '9':
                window.location.href =  '/Genera/Frecuentes';	
                break;
            case '10':
                window.location.href =  '/';	
                break;
            case '11':
                window.location.href =  '/Genera/Mes';	
                break;
            case '12':
                window.location.href =  '/Genera/Frecuentes';	
                break;
            case '13':
                window.location.href =  '/';	
                break;
            case '14':
                window.location.href =  '/';	
                break;
            case '15':
                window.location.href =  '/';	
                break;
            case '16':
                window.location.href =  '/mostrar/zonas';	
                break;
            case '17':
                window.location.href =  '/inventario/1';	
                break;
            case '18':
                window.location.href =  '/mostrar/productos';	
                break;
            case '19':
                window.location.href =  '/';	
                break;
            case '20':
                window.location.href =  '/';	
                break;
            case '21':
                window.location.href =  '/';	
                break;
            case '22':
                window.location.href =  '/mostrar/proveedores';	
                break;
            case '23':
                window.location.href =  '/mostrar/monedas';	
                break;
            case '24':
                window.location.href =  '/mostrar/monedas';	
                break;
            case '25':
                window.location.href =  '/mostrar/tipo_pagos';	
                break;
            case '26':
                window.location.href =  '/mostrar/marcas';	
                break;
            case '27':
                window.location.href =  '/mostrar/rubros';	
                break;
            case '28':
                window.location.href =  '/mostrar/clientes';    /*Emisión De Carnet*/	
                break;
            case '29':
                window.location.href =  '/registro/natural';	
                break;
            case '30':
                window.location.href =  '/cliente/'+fk_cliente;	 
                break;
            case '31':
                window.location.href =  '/inventario/1';	
                break;
            case '32':
                window.location.href =  '/inventario/1';	
                break;
            case '33':
                window.location.href =  '/carrito_fisica';	
                break;
            case '34':
                window.location.href =  '/mostrar/empleados';	
                break;
            case '35':
                window.location.href =  '/mostrar/beneficios';	
                break;
            case '36':
                window.location.href =  '/mostrar/empleados';	
                break;
            case '37':
                window.location.href =  '/mostrar/horarios';	
                break;
            case '38':
                window.location.href =  '/mostrar/empleados';	
                break;
            case '39':
                window.location.href =  '/mostrar/privilegios';	
                break;
            case '40':
                window.location.href =  '/mostrar/roles';	
                break;
            case '41':
                window.location.href =  '/mostrar/roles';	
                break;
            case '42':
                window.location.href =  '/Genera/Horario';	
                break;
            case '43':
                window.location.href =  '/Genera/Asistencia';	
                break;
            case '44':
                window.location.href =  '/Genera/Asistencia';	
                break;
            case '45':
                control_entrada();
                window.location.href = window.location.href;
                break;
        
           
          } 
        
        
    });
    

});


/*

CLI23 FATIMAVANESA23@gmail.com


EMP1 TULIOAURELIO1@gmail.com
EMP2 CORANIAVICTORIA2@gmail.com
EMP3 CONSUELOBELINDA3@gmail.com
EMP4 FERMINIGNACIO4@gmail.com
EMP5 PACIANOALVARO5@gmail.com
EMP6 AMADASARA6@gmail.com
EMP7 MIALEOPOLDA7@gmail.com
EMP8 CHRISTIANEJENNIFER8@gmail.com
EMP9 MIGUELAGUSTIN9@gmail.com
EMP10 THAISCONSUELO10@gmail.com

*/


