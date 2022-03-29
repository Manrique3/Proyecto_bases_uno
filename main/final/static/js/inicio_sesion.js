$(function(){
	$('form').submit(function(e){

		$.ajax({
			
			url:   '/inicio_sesion',
			data:  $('form').serialize(),
			type: 'POST',
				
			}).done(function(response){
				
				console.log(response);
				
				if(response['error'])
					c_error();
				
				else if (response['invalido'])
					$(m_invalido).replaceWith( '<p id="m_invalido">'+response['invalido']+'</p>'   )
				
				else
					window.location.href =  "/"					
				
			}).fail(function(response){
				c_error();
			});

		e.preventDefault();
	
	});
});





$(function(){
	$('#btnRegistro').click(function(){
			window.location.href =  "/registro/natural"
		});
});



function c_error(){
	$('form').html('<div class="alert alert-danger">No se pudo acceder al servidor. Intente de nuevo mas tarde</div>');
};

