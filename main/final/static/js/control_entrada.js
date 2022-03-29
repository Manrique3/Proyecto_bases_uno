function control_entrada(){

    var mensaje;

    $.ajax({
			
        url:   '/control_entrada',
        type: 'GET',
        data: {
            'b': 'b'
        },
        dataSrc: "",
        async: false,

    }).done(function(resp){
        
        mensaje = resp;
    });
    

    if (confirm(mensaje))

        $.ajax({
            url:   '/control_entrada',
            type: 'POST',
            dataSrc: "",
            async: false,
        }).done(function(resp){
            alert(resp);
        });
        

};
  