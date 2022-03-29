TABLE lugar;                       -- #LISTO   T: 2505 (24 ESTADO, 335 MUNICIPIO, 1159 PARROQUIAS.  984 DIRECCIONES ( 335P, 59T ,590 C ))  

/* TIENDA Y  PRODUCTOS*/    
TABLE tienda;                      -- #LISTO   T: 59      
TABLE rol;                         -- #LISTO   T: 11
TABLE privilegio;                  -- #LISTO   T: 45
TABLE privilegio_rol;              -- #LISTO   T: 98

/* EMPLEADOS */
TABLE empleado;                    -- #LISTO   T: 590  
TABLE horario;                     -- #LISTO   T: 14 (7 MAnANA, 7 TARDE)
TABLE horario_empleado;            -- #LISTO   T: 2124
TABLE beneficio;                   -- #LISTO   T: 20
TABLE beneficio_empleado;          -- #LISTO   T: 1475 (2 GENERALES, 1 DEL E1-5)
TABLE control_entrada;             -- #LISTO   T: 9558                                      
TABLE vacaciones;                  -- #LISTO   T: 236  (4 POR TIENDA) 

/*CLIENTES*/
TABLE cliente;                     -- #LISTO   T: 590 ( ~80% NATURAL,  ~20% JURIDICO) 
TABLE tipo_pago;                   -- #LISTO   T: 5
TABLE moneda;                      -- #LISTO   T: 5
TABLE cotizacion;                  -- #LISTO   T: 8
TABLE metodo_pago;                 -- #LISTO   T: 177 (2 NATURAL, 1 JURIDICO X TIENDA)

/*CLIENTES , PROVEEDORES, EMPLEADOS 
Y PERSONAS CONTACTO*/
TABLE usuario;                     -- #LISTO   T: 1180 ( 590 C, 590 E )
TABLE proveedor;                   -- #LISTO   T: 335  ( 1 POR MUNICIPIO )
TABLE persona_contacto;            -- #LISTO   T: 461  ( 335 P, 126C )
TABLE telefono;                    -- #LISTO   T: 2566 ( 335 P, 590x2 C, 590 E, 461 P_C)

/*PRODUCTO , CARRITO, ORDENES*/
TABLE marca;                       -- #LISTO   T: 15 (11 PROPIA, 4 NO PROPIA)
TABLE rubro;                       -- #LISTO   T: 18
TABLE producto;                    -- #LISTO   T: 110 (10 POR MARCA PROPIA)
TABLE descuento;                   -- #LISTO   T: 6
TABLE estatus_reposicion;          -- #LISTO   T: 4
TABLE orden_reposicion;            -- #LISTO   T: 6490 TXT: 110 X TIENDA
TABLE zona;                        -- #LISTO   T: 8 
TABLE almacen;                     -- #LISTO   T: 6490 ( 80 X PRODUCTO POR TIENDA )   TXT: 110 X TIENDA
TABLE pasillo;                     -- #LISTO   T: 6490 ( 20 X PRODUCTO POR TIENDA)    TXT: 110 X TIENDA
                                   

/*CARRITO Y COMPRAS*/
TABLE carrito;                     -- #LISTO   T: 413
TABLE carrito_producto;            -- #LISTO   T: 1416
TABLE estatus_despacho;            -- #LISTO   T: 3
TABLE compra;                      -- #LISTO   T: 413 (295 WEB, 118 FISICA)  5 WEB, 2 FISICA POR TIENDA     
TABLE metodo_pago_compra;          -- #LISTO   T: 531 (295 WEB, 236 FISICA)    


UPDATE empleado                    --#LISTO    T: 531
UPDATE almacen/pcdasillo:cantidad  --#LISTO    T: 1416 ( ALMACEN: 885, PASILLO: 531 )
UPDATE cliente:puntos              --#LISTO    T: 531  (2 CLIENTES: 1X4, 1X5 POR TIENDA)
