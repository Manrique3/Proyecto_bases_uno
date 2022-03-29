function c_error(mensaje){
    $(m_invalido).replaceWith( '<p id="m_invalido">'+mensaje+'</p>'   )
};

function alerta(mensaje){
    alert(mensaje);

};




$(document).ready(function() {

    $("#titulo").html("Inventario");

    
    var tienda = (window.location.pathname.split('/'))[2];

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
                if (tienda == tiendas[i].ti_codigo)
                    opciones.push('<option selected value="'+tiendas[i].ti_codigo+'">'+tiendas[i].ti_nombre+'<opciones>');
                else 
                    opciones.push('<option value="'+tiendas[i].ti_codigo+'">'+tiendas[i].ti_nombre+'<opciones>');
                
            }

            $('#selecttienda').html(opciones.join(''));

            
        }).fail(function(resp){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
    });



    $('#tabla_datatable').DataTable({
        
        scrollY:        '50vh',
        scrollCollapse: true,

        


        ajax: {
            url:   '/inventario/'+tienda,
            type: 'POST',
            data: {
               
                'tienda': tienda,
            },
            dataSrc: ""
        },

        columns: [

            { data: "pr_id" ,           title: "ID"},
            { data: "pr_nombre" ,       title: "NOMBRE"},
            { data: "pr_peso" ,         title: "PESO"},
            { data: "pr_precio" ,       title: "PRECIO"},
            { data: "al_cantidad",      title: "CNT EN ALMACEN"},
            { data: "pa_cantidad",      title: "CNT EN PASILLO"},      
        
        ]
        
    });
    

    var table = $('#tabla_datatable').DataTable();
 
    $('#tabla_datatable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 


    $('#selecttienda').change(function() {

        id_tienda = $(this).find('option:selected').val();
        window.location.href =  '/inventario/'+id_tienda;	

    });

    $('#boton_reponer').click(function() {

        $.ajax({
            
            url:   '/inventario/'+tienda,
            type: 'PUT',
            data: {
                'tienda': tienda,
            },        
                
        }).done(function(response){
            
            console.log(response);
            
            if(response['error'])
                alerta(response['error']);
            
            else if (response['invalido'])
                alerta(response['invalido']);
            
            else{
                alerta(response)    
                window.location.href =   window.location.href ;	
            }			
            
        }).fail(function(response){
            alerta('No se pudo acceder al servidor. Intente de nuevo mas tarde');
        });

    });



 

   

});



