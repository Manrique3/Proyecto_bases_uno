

INSERT INTO rol (ro_nombre) VALUES ('Cliente');
INSERT INTO rol (ro_nombre) VALUES ('Gerente de Tienda');
INSERT INTO rol (ro_nombre) VALUES ('Coordinador de Promocion y Ventas');
INSERT INTO rol (ro_nombre) VALUES ('Coordinador de Talento Humano');
INSERT INTO rol (ro_nombre) VALUES ('Jefe de Compras/Atencion al Cliente');
INSERT INTO rol (ro_nombre) VALUES ('Cajero');
INSERT INTO rol (ro_nombre) VALUES ('Coordinador de despacho');
INSERT INTO rol (ro_nombre) VALUES ('Despachador');
INSERT INTO rol (ro_nombre) VALUES ('Jefe de Almacen ');
INSERT INTO rol (ro_nombre) VALUES ('Jefe de Pasillo');
INSERT INTO rol (ro_nombre) VALUES ('Administrador');


/* 
Distribucion de Tienda con rol

em	ro	ro_nombre
 	
1	2	Gerente de Tienda
2	3	Coordinador de Promocion y Ventas
3	4	Coordinador de Talento Humano
4	5	Jefe de Compras/Atencion al Cliente
5&6	6	Cajero
7	7	Coordinador de despacho
8	8	Despachador
9	9	Jefe de Almacen 
10	10	Jefe de Pasillo
*/


INSERT INTO privilegio (pv_descripcion) VALUES ('Modificar Perfil');
INSERT INTO privilegio (pv_descripcion) VALUES ('Mostrar Carrito');
INSERT INTO privilegio (pv_descripcion) VALUES ('Generar Presupuesto');
INSERT INTO privilegio (pv_descripcion) VALUES ('Generar Compra Web');
INSERT INTO privilegio (pv_descripcion) VALUES ('Asignacion De Descuentos');
INSERT INTO privilegio (pv_descripcion) VALUES ('Generar Revista Notimart (PDF)');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Ingresos/Egresos');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Clientes Frecuentes');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Mejores Clientes');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Clientes Con Presupuestos Efectivos');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Meses Productivos');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Mejores Clientes');
INSERT INTO privilegio (pv_descripcion) VALUES ('Imprimir Orden De Despacho');
INSERT INTO privilegio (pv_descripcion) VALUES ('Procesar Orden De Despacho');
INSERT INTO privilegio (pv_descripcion) VALUES ('Cerrar Orden De Despacho');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Zonas De Almacen');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Almacen De Tienda');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Producto');
INSERT INTO privilegio (pv_descripcion) VALUES ('Generacion De Orden De Reposicion');
INSERT INTO privilegio (pv_descripcion) VALUES ('Aprobacion De Reposicion');
INSERT INTO privilegio (pv_descripcion) VALUES ('Recepcion De Orden Reposicion');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Proveedores');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Monedas');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Cotizaciones');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Tipos De Pago');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Marcas');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Rubros');
INSERT INTO privilegio (pv_descripcion) VALUES ('Emision De Carnet');
INSERT INTO privilegio (pv_descripcion) VALUES ('Registrar Cliente');
INSERT INTO privilegio (pv_descripcion) VALUES ('Modficar Perfil de Cliente');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Pasillo De Tienda');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reposicion De Pasillo');
INSERT INTO privilegio (pv_descripcion) VALUES ('Generar Compra Fisica');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Empleados');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Beneficios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Asignacion De Beneficios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Horarios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Registro De Vacaciones');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De Privilegios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Administracion De rol');
INSERT INTO privilegio (pv_descripcion) VALUES ('Asignacion De Privilegios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Horarios');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Asistencia');
INSERT INTO privilegio (pv_descripcion) VALUES ('Reporte De Empleados');
INSERT INTO privilegio (pv_descripcion) VALUES ('Registro De Horario');



INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (1,1);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (1,2);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (1,3);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (1,4);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,5);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,6);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,7);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,8);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,9);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,10);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,11);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,12);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (7,13);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (7,14);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (7,15);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (8,14);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (8,15);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (9,16);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (9,17);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (9,18);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,19);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,20);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,21);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,22);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,23);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,24);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,25);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,26);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,27);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,28);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,29);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,30);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (10,31);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (10,32);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (6,33);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,34);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,35);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,36);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,37);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,38);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,39);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,40);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,41);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,42);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,43);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,44);

INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (2,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (3,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (4,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (5,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (6,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (7,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (8,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (9,45);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (10,45);

INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,1);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,2);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,3);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,4);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,5);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,6);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,7);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,8);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,9);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,10);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,11);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,12);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,13);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,14);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,15);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,16);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,17);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,18);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,19);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,20);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,21);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,22);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,23);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,24);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,25);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,26);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,27);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,28);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,29);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,30);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,31);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,32);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,33);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,34);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,35);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,36);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,37);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,38);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,39);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,40);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,41);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,42);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,43);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,44);
INSERT INTO privilegio_rol (fk_rol, fk_privilegio) VALUES (11,45);
