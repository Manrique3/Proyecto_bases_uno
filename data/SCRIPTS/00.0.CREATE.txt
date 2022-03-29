CREATE TABLE lugar(
	lu_codigo		SERIAL,
	lu_nombre		VARCHAR(50)	NOT NULL,
	lu_tipo			VARCHAR(20)	NOT NULL,
	fk_lugar		INTEGER,
	
	CONSTRAINT pk_lugar PRIMARY KEY (lu_codigo),
    CONSTRAINT fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar (lu_codigo),
	CONSTRAINT ch_lu_tipo CHECK(lu_tipo IN ('ESTADO', 'MUNICIPIO', 'PARROQUIA', 'DIRECCION'))
);



/* TIENDA Y  PRODUCTOS*/


CREATE TABLE tienda(
	ti_codigo		SERIAL,
	ti_nombre		VARCHAR(50)	NOT NULL,
	fk_lugar		INTEGER NOT NULL,
	CONSTRAINT pk_tienda PRIMARY KEY (ti_codigo),
	CONSTRAINT fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar (lu_codigo)
);







/*ROLES Y PRIVILEGIOS*/



CREATE TABLE rol(

	ro_codigo		   SERIAL,
	ro_nombre		   VARCHAR(50) NOT NULL,

	CONSTRAINT pk_rol PRIMARY KEY (ro_codigo)
);

CREATE TABLE privilegio(
	pv_codigo        SERIAL,
	pv_descripcion	 VARCHAR(50) 	NOT NULL,
	
	CONSTRAINT pk_privilegio PRIMARY KEY (pv_codigo)
	
);

CREATE TABLE privilegio_rol(

	fk_privilegio		INTEGER,
	fk_rol				INTEGER,	

	CONSTRAINT pk_privilegio_rol PRIMARY KEY (fk_privilegio,fk_rol),

	CONSTRAINT fk_privilegio FOREIGN KEY (fk_privilegio) REFERENCES privilegio (pv_codigo),
	CONSTRAINT fk_rol FOREIGN KEY (fk_rol) REFERENCES rol (ro_codigo)
);



/* EMPLEADOS */

CREATE TABLE empleado(
	em_codigo 			SERIAL,
	em_cedula			NUMERIC(10) 	NOT NULL 	UNIQUE,
	em_p_nombre			VARCHAR(20) 	NOT NULL,
	em_s_nombre			VARCHAR(20),
	em_p_apellido		VARCHAR(20) 	NOT NULL,
	em_s_apellido		VARCHAR(20),
	em_sueldo			NUMERIC(20) 	NOT NULL,
	em_fecha_nac		DATE			NOT NULL,

    fk_tienda			INTEGER		    NOT NULL,
    fk_empleado_sup     INTEGER,
    

	CONSTRAINT pk_empleado PRIMARY KEY (em_codigo),
    CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda(ti_codigo),	
	CONSTRAINT fk_empleado_sup FOREIGN KEY (fk_empleado_sup) REFERENCES empleado (em_codigo)
);

CREATE TABLE horario(
	ho_codigo        SERIAL,
	ho_descripcion	 VARCHAR(50) 	NOT NULL,
	ho_dia			 VARCHAR(20)	NOT NULL,
	ho_hora_entrada	 TIME			NOT NULL,
	ho_hora_salida   TIME			NOT NULL, 
	
	CONSTRAINT pk_horario PRIMARY KEY (ho_codigo),
	CONSTRAINT ch_ho_dia CHECK (ho_dia IN ('LUNES', 'MARTES', 'MIERCOLES','JUEVES', 'VIERNES', 'SABADO','DOMINGO'))
);

CREATE TABLE horario_empleado(

	fk_horario				INTEGER,
	fk_empleado				INTEGER,	

	CONSTRAINT pk_horario_empleado PRIMARY KEY (fk_horario,fk_empleado),

	CONSTRAINT fk_horario FOREIGN KEY (fk_horario) REFERENCES horario (ho_codigo),	
	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado (em_codigo)
);

CREATE TABLE beneficio(
	be_codigo        SERIAL,
	be_nombre		 VARCHAR(50) 	NOT NULL,
		
	CONSTRAINT pk_beneficio PRIMARY KEY (be_codigo)
);

CREATE TABLE beneficio_empleado(

	fk_beneficio			INTEGER,
	fk_empleado				INTEGER,	

	CONSTRAINT pk_beneficio_empleado PRIMARY KEY (fk_beneficio,fk_empleado),

	CONSTRAINT fk_beneficio FOREIGN KEY (fk_beneficio) REFERENCES beneficio (be_codigo),	
	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado (em_codigo)
);

CREATE TABLE control_entrada(
	
	coen_entrada		TIMESTAMP,
	coen_salida		 	TIMESTAMP,
	fk_empleado         INTEGER,

	CONSTRAINT pk_control_entrada PRIMARY KEY (fk_empleado,coen_entrada),
	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado (em_codigo)

);

CREATE TABLE vacaciones(

	va_fecha_ini	TIMESTAMP,
	va_fecha_fin	TIMESTAMP  NOT NULL,			

	fk_empleado		INTEGER,


	CONSTRAINT pk_vacaciones PRIMARY KEY (va_fecha_ini,fk_empleado), 


	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado (em_codigo)

);




/*CLIENTES*/


CREATE TABLE cliente(
	cl_id				SERIAL,	 
	cl_afiliacion		NUMERIC(10)	 NOT NULL,
	cl_rif				VARCHAR(20),
	cl_tipo				VARCHAR(20)	 NOT NULL,
	cl_puntos			NUMERIC(10)  NOT NULL,
	fk_tienda			INTEGER      NOT NULL,

	/*NATURAL*/

	cl_cedula			NUMERIC(10),
	cl_p_nombre			VARCHAR(20),
	cl_s_nombre			VARCHAR(20), 
	cl_p_apellido		VARCHAR(20), 
	cl_s_apellido		VARCHAR(20), 
	fk_lugar			INTEGER,
	
	/*JURIDICO*/

    cl_razon_social     VARCHAR(50),  
	cl_pagina_web       VARCHAR(100),
	cl_den_comercial    VARCHAR(50),
    cl_capital          NUMERIC(20),
	fk_lugar_fiscal		INTEGER,
	fk_lugar_fisica		INTEGER,
	  
	
	CONSTRAINT pk_cliente PRIMARY KEY (cl_id),
	CONSTRAINT ch_cl_tipo CHECK(cl_tipo IN ('NATURAL', 'JURIDICO')),
	CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda(ti_codigo),
	
	CONSTRAINT fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(lu_codigo),

	CONSTRAINT fk_lugar_fiscal FOREIGN KEY (fk_lugar_fiscal) REFERENCES lugar(lu_codigo),
	CONSTRAINT fk_lugar_fisica FOREIGN KEY (fk_lugar_fisica) REFERENCES lugar(lu_codigo)
	
);




CREATE TABLE tipo_pago(
	tp_codigo            	SERIAL,
	tp_descripcion			VARCHAR(50),
		
	CONSTRAINT pk_tipo_pago PRIMARY KEY (tp_codigo)
);



CREATE TABLE metodo_pago(
	mc_documento          	VARCHAR(25),
	fk_cliente				INTEGER,
	
	fk_tipo_pago			INTEGER,	
	

	CONSTRAINT pk_metodo_pago PRIMARY KEY (mc_documento,fk_cliente,fk_tipo_pago),


	CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente (cl_id) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_pago FOREIGN KEY (fk_tipo_pago) REFERENCES tipo_pago (tp_codigo)
);

CREATE TABLE moneda(
	mo_codigo        SERIAL,
	mo_descripcion	 VARCHAR(50) NOT NULL,
	
	CONSTRAINT pk_moneda PRIMARY KEY (mo_codigo)
);

CREATE TABLE cotizacion(
	ct_fecha        TIMESTAMP,
	ct_valor		NUMERIC(20) NOT NULL,
	ct_expira       TIMESTAMP,

	fk_moneda		INTEGER NOT NULL,	
	
	CONSTRAINT pk_cotizacion PRIMARY KEY (ct_fecha,fk_moneda),
	CONSTRAINT fk_moneda FOREIGN KEY (fk_moneda) REFERENCES moneda (mo_codigo)
);








/*EMPLEADO Y CLIENTE*/


CREATE TABLE usuario(
	us_codigo		  SERIAL,
	us_correo		  VARCHAR(100)  NOT NULL UNIQUE,
	us_contrasena     VARCHAR(20)  NOT NULL,

	fk_rol			 INTEGER  NOT NULL,
	fk_cliente		 INTEGER,
	fk_empleado		 INTEGER,


	CONSTRAINT pk_usuario PRIMARY KEY (us_codigo),
	CONSTRAINT fk_rol FOREIGN KEY (fk_rol) REFERENCES rol(ro_codigo),
    CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente(cl_id) ON DELETE CASCADE,
	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(em_codigo) ON DELETE CASCADE
);























/*CLIENTES , PROVEEDORES, EMPLEADOS Y PERSONAS CONTACTO*/

CREATE TABLE proveedor(
	po_id				SERIAL,
	po_rif				VARCHAR(20)		NOT NULL	UNIQUE,
	po_den_comercial	VARCHAR(50)		NOT NULL,
	po_razon_social		VARCHAR(50)		NOT NULL,
	po_pagina_web		VARCHAR(100),
	po_correo			VARCHAR(50)		NOT NULL,
	po_correo_alt		VARCHAR(50),
	
	fk_lugar_fisica		INTEGER  			,
	fk_lugar_fiscal		INTEGER  		NOT NULL,
	
    CONSTRAINT pk_proveedor PRIMARY KEY (po_id),
	CONSTRAINT fk_lugar_fisica FOREIGN KEY (fk_lugar_fisica) REFERENCES lugar (lu_codigo),
	CONSTRAINT fk_lugar_fiscal FOREIGN KEY (fk_lugar_fiscal) REFERENCES lugar (lu_codigo)
);


CREATE TABLE persona_contacto(
	peco_codigo		SERIAL,
	peco_cedula		NUMERIC(10) NOT NULL,
	peco_p_nombre	VARCHAR(20)	NOT NULL,
	peco_p_apellido	VARCHAR(20)	NOT NULL,
	peco_s_nombre	VARCHAR(20)	,
	peco_s_apellido	VARCHAR(20)	,
	fk_cliente		INTEGER,
	fk_proveedor	INTEGER,

	CONSTRAINT pk_persona PRIMARY KEY (peco_codigo) ,
	CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente (cl_id) ON DELETE CASCADE,
	CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor(po_id) ON DELETE CASCADE
);

CREATE TABLE telefono(
	te_codigo			SERIAL,
	te_tipo				VARCHAR(20)	NOT NULL,
	te_numero			NUMERIC(15)	NOT NULL,
	fk_cliente			INTEGER,
	fk_empleado			INTEGER,
	fk_proveedor		INTEGER,
	fk_persona_contacto	INTEGER,


	CONSTRAINT pk_telefono PRIMARY KEY (te_codigo),
	CONSTRAINT ch_te_tipo CHECK (te_tipo IN ('CELULAR', 'OFICINA', 'CASA')),

	CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente (cl_id) ON DELETE CASCADE,
	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(em_codigo) ON DELETE CASCADE,
	CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor(po_id) ON DELETE CASCADE,
	CONSTRAINT fk_persona_contacto FOREIGN KEY (fk_persona_contacto) REFERENCES persona_contacto(peco_codigo) ON DELETE CASCADE
);



/*PRODUCTO , CARRITO, ORDENES*/

CREATE TABLE marca(

	ma_codigo 	SERIAL,
	ma_nombre   VARCHAR(20) NOT NULL,	
	ma_ucabmart	BOOLEAN,

	CONSTRAINT pk_marca PRIMARY KEY (ma_codigo)
);


CREATE TABLE rubro(

	ru_codigo 	SERIAL,
	ru_nombre   VARCHAR(30) NOT NULL,

	CONSTRAINT pk_rubro PRIMARY KEY (ru_codigo)
);


CREATE TABLE producto(
	pr_id			SERIAL,
	pr_precio		NUMERIC(10)		NOT NULL,
	pr_nombre		VARCHAR(50)		NOT NULL,
	pr_peso		    NUMERIC(10)	,
	pr_imagen 		BYTEA,
	
	fk_rubro		INTEGER NOT NULL, 	
	fk_marca		INTEGER NOT NULL, 	 
	fk_proveedor	INTEGER NOT NULL, 		
	
    CONSTRAINT pk_producto PRIMARY KEY (pr_id),
	CONSTRAINT fk_rubro FOREIGN KEY (fk_rubro) REFERENCES rubro (ru_codigo) ON DELETE CASCADE,
	CONSTRAINT fk_marca FOREIGN KEY (fk_marca) REFERENCES marca (ma_codigo) ON DELETE CASCADE,
	CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor (po_id) ON DELETE CASCADE	
);


CREATE TABLE descuento (

	de_fecha_ini	TIMESTAMP,
	de_fecha_fin	TIMESTAMP      NOT NULL,	
	de_porcentaje   NUMERIC(10)    NOT NULL,
	de_notimart		BOOLEAN,

	fk_producto		INTEGER,


	CONSTRAINT pk_descuento PRIMARY KEY (de_fecha_ini,fk_producto),

	CONSTRAINT ch_de_porcentaje CHECK ( de_porcentaje > 0 AND de_porcentaje < 100)
);









CREATE TABLE estatus_reposicion (

	er_codigo 	  SERIAL,
	er_nombre     VARCHAR(20) NOT NULL,
	
	CONSTRAINT pk_estatus_reposicion PRIMARY KEY (er_codigo)

);


CREATE TABLE orden_reposicion(
	or_id			 SERIAL,
	or_fecha		 TIMESTAMP NOT NULL,
	or_cantidad		 NUMERIC(20)		NOT NULL,
	or_monto_unidad  NUMERIC(20),

	fk_tienda					INTEGER NOT NULL,
	fk_estatus_reposicion		INTEGER NOT NULL, 	
	fk_producto					INTEGER NOT NULL, 	 
	fk_proveedor				INTEGER NOT NULL, 		
	
    CONSTRAINT fk_orden_reposicion PRIMARY KEY (or_id),

	CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda (ti_codigo),
	CONSTRAINT fk_estatus_reposicion FOREIGN KEY (fk_estatus_reposicion) REFERENCES estatus_reposicion (er_codigo),
	CONSTRAINT fk_producto FOREIGN KEY (fk_producto) REFERENCES producto (pr_id),
	CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor (po_id)
	
);




CREATE TABLE zona (

	zo_codigo	 	  SERIAL,
	zo_nombre	      VARCHAR(20) NOT NULL,

	CONSTRAINT pk_zona PRIMARY KEY (zo_codigo)

);


CREATE TABLE almacen (

	fk_tienda	      INTEGER NOT NULL,
	fk_producto	      INTEGER NOT NULL,
	fk_zona		      INTEGER NOT NULL,

	al_cantidad	 	  NUMERIC(10) NOT NULL,

	CONSTRAINT pk_almacen PRIMARY KEY (fk_tienda,fk_producto),

	CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda (ti_codigo),
	CONSTRAINT fk_producto FOREIGN KEY (fk_producto) REFERENCES producto (pr_id),
	CONSTRAINT fk_zona FOREIGN KEY (fk_zona) REFERENCES zona (zo_codigo)

);


CREATE TABLE pasillo (

	fk_tienda	      INTEGER NOT NULL,
	fk_producto	      INTEGER NOT NULL,

	pa_pasillo	 	  NUMERIC(10) NOT NULL,
	pa_anaquel	 	  NUMERIC(10) NOT NULL,
	pa_cantidad	 	  NUMERIC(10) NOT NULL,

	CONSTRAINT pk_pasillo PRIMARY KEY (fk_tienda,fk_producto),

	CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda (ti_codigo),
	CONSTRAINT fk_producto FOREIGN KEY (fk_producto) REFERENCES producto (pr_id)

);



/*CARRITO Y COMPRAS*/



CREATE TABLE carrito (

	ca_id			  SERIAL,
	ca_monto_total	  NUMERIC(20) NOT NULL,

	fk_tienda	      INTEGER NOT NULL,
	fk_cliente 	      INTEGER NOT NULL,
	

	CONSTRAINT pk_carrito PRIMARY KEY (ca_id),

	CONSTRAINT fk_tienda FOREIGN KEY (fk_tienda) REFERENCES tienda (ti_codigo),
	CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente (cl_id) ON DELETE CASCADE
	
);


CREATE TABLE carrito_producto (

	ca_unidades	 	  NUMERIC(10) NOT NULL,
	ca_costo	 	  NUMERIC(20) NOT NULL,

	fk_carrito	      INTEGER NOT NULL,
	fk_producto	      INTEGER NOT NULL,

	CONSTRAINT pk_carrito_producto PRIMARY KEY (fk_producto,fk_carrito),

	CONSTRAINT fk_carrito FOREIGN KEY (fk_carrito) REFERENCES carrito (ca_id),
	CONSTRAINT fk_producto FOREIGN KEY (fk_producto) REFERENCES producto (pr_id)

);


CREATE TABLE estatus_despacho(

	ed_codigo	SERIAl,
	ed_nombre	VARCHAR(20) NOT NULL,

	
	CONSTRAINT pk_estatus_despacho PRIMARY KEY (ed_codigo)


);





CREATE TABLE compra(
	co_id				SERIAL,	 
	co_fecha_hora		TIMESTAMP	 NOT NULL,
	co_monto_cancelar 	NUMERIC(20)  NOT NULL,
	co_tipo				VARCHAR(20)	 NOT NULL,
	fk_carrito 			INTEGER		 NOT NULL,
	fk_cliente			INTEGER 	 NOT NULL,
	
	/*FISICA*/

	fk_empleado			INTEGER,
	
	/*WEB*/

    co_despacho_id       INTEGER,  
	fk_lugar			 INTEGER,
	fk_estatus_despacho	 INTEGER,
	  


	CONSTRAINT pk_co_id PRIMARY KEY (co_id),
	CONSTRAINT ch_co_tipo CHECK(co_tipo IN ('FISICA', 'WEB')),
	CONSTRAINT fk_carrito FOREIGN KEY (fk_carrito) REFERENCES carrito (ca_id) ON DELETE CASCADE,	
	CONSTRAINT fk_cliente FOREIGN KEY (fk_cliente) REFERENCES cliente (cl_id) ON DELETE CASCADE,

	CONSTRAINT fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(em_codigo),

	CONSTRAINT fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(lu_codigo),
	CONSTRAINT fk_estatus_despacho FOREIGN KEY (fk_estatus_despacho) REFERENCES estatus_despacho(ed_codigo)
);


CREATE TABLE metodo_pago_compra(
	mp_documento            VARCHAR(25),
	mp_monto				NUMERIC(20) NOT NULL,
	mp_cantidad				NUMERIC(10) NOT NULL,
	
	fk_moneda 				INTEGER NOT NULL,
	fk_compra				INTEGER,
	fk_tipo_pago			INTEGER,
	
	
	CONSTRAINT pk_pago_compra PRIMARY KEY (fk_compra,fk_tipo_pago,mp_documento),
	

	CONSTRAINT fk_moneda FOREIGN KEY (fk_moneda)REFERENCES moneda (mo_codigo),
	CONSTRAINT fk_compra FOREIGN KEY (fk_compra) REFERENCES compra (co_id),
	CONSTRAINT fk_tipo_pago FOREIGN KEY (fk_tipo_pago) REFERENCES tipo_pago (tp_codigo)
);


