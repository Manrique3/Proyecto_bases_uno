SELECT * FROM producto WERE pr_id=6;

DELETE FROM proveedor WHERE po_id = 2;
    ENTIDAD RURBO
    CONSTRAINT fk_rubro FOREIGN KEY (fk_rubro) REFERENCES rubro (ru_codigo) ON DELETE CASCADE,
	CONSTRAINT fk_marca FOREIGN KEY (fk_marca) REFERENCES marca (ma_codigo) ON DELETE CASCADE,
	CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor (po_id) ON DELETE CASCADE	

-- ALTER TABLE producto DROP CONSTRAINT fk_proveedor;   Elimina un campo de una tabla

ALTER TABLE producto DROP CONSTRAINT fk_empleado_sup;
ALTER TABLE empleado
add CONSTRAINT fk_empleado_sup FOREIGN KEY (fk_empleado_sup) REFERENCES empleado (em_codigo);
	ALTER TABLE producto ADD CONSTRAINT fk_rubro FOREIGN KEY (fk_rubro) REFERENCES rubro (ru_codigo) ON DELETE CASCADE
	ALTER TABLE producto ADD CONSTRAINT fk_marca FOREIGN KEY (fk_marca) REFERENCES marca (ma_codigo) ON DELETE CASCADE;
	ALTER TABLE producto ADD CONSTRAINT fk_proveedor FOREIGN KEY (fk_proveedor) REFERENCES proveedor (po_id) ON DELETE CASCADE



33) SELECT l_nombre, l_tipo, l_total_habitantes
FROM lugar WHERE l_tipo !='EUROPA' AND l_tipo != 'OCEANIA'
ORDER BY l_tipo DESC

SELECT  E.em_cedula,
                    E.em_p_nombre || ' ' || E.em_s_nombre || ', ' ||
                    E.em_p_apellido || ' ' || E.em_s_apellido N_empleado,
                    to_char(co.coen_entrada::TIME, 'HH12:MI AM') coen_entrada,
                    to_char (co.coen_salida::TIME, 'HH12:MI AM') coen_salida,
                    (SELECT ro_nombre 
                        FROM rol 
                        WHERE ro_codigo = (
                            SELECT fk_rol 
                                FROM USUARIO 
                                WHERE fk_empleado = E.em_codigo
                                        )
                    ) ROL,
                    co.coen_entrada:: DATE Dia_reporte,
                    ti.ti_nombre Tienda_reporte                    
                    FROM control_entrada co, empleado E, tienda ti 
                    WHERE co.fk_empleado =  E.em_codigo 
                    AND E.fk_tienda = ti.ti_codigo
                    AND co.coen_entrada::DATE= '2020-12-19'
                    AND E.fk_tienda =1
                    ORDER BY co.coen_entrada

SELECT COUNT(*)  FROM empleado; 

--ASISTENCIA
SELECT  
 E.em_cedula,
 E.em_p_nombre || ' ' || E.em_s_nombre || ', ' ||
 E.em_p_apellido || ' ' || E.em_s_apellido N_empleado,
 to_char(co.coen_entrada::TIME, 'HH12:MI AM') coen_entrada,
 to_char (co.coen_salida::TIME, 'HH12:MI AM') coen_salida,
 to_char (co.coen_entrada::DATE, 'YYYY-MM-DD') coen_entrada,
 ti.ti_nombre, 
 (SELECT ro_nombre 
  	FROM rol 
 	WHERE ro_codigo = (
  		SELECT fk_rol 
			FROM USUARIO 
			WHERE fk_empleado = E.em_codigo
					)
 ) ROL
 FROM control_entrada co, empleado E, tienda ti 
 WHERE co.fk_empleado =  E.em_codigo 
 AND E.fk_tienda = ti.ti_codigo
 AND co.coen_entrada::DATE= {0}
 AND E.fk_tienda ={1}
 ORDER BY co.coen_entrada;

 SELECT  
 E.em_cedula,
 E.em_p_nombre || ' ' || E.em_s_nombre || ', ' ||
 E.em_p_apellido || ' ' || E.em_s_apellido N_empleado,
 to_char(co.coen_entrada::TIME, 'HH12:MI AM') coen_entrada,
 to_char (co.coen_salida::TIME, 'HH12:MI AM') coen_salida,
 to_char (co.coen_entrada::DATE, 'YYYY-MM-DD') Fecha_entrada,
 to_char (co.coen_salida::DATE, 'YYYY-MM-DD') Fecha_salida,

 ti.ti_nombre, 
 (SELECT ro_nombre 
  	FROM rol 
 	WHERE ro_codigo = (
  		SELECT fk_rol 
			FROM USUARIO 
			WHERE fk_empleado = E.em_codigo
					)
 ) ROL
 FROM control_entrada co, empleado E, tienda ti 
 WHERE co.fk_empleado =  E.em_codigo 
 AND E.fk_tienda = ti.ti_codigo
 AND co.coen_entrada::DATE='2020-12-06'
 AND E.fk_tienda =1
 ORDER BY co.coen_entrada;

--INGRESO Y EGRESOS

SELECT SUM(O.or_cantidad * O.or_monto_unidad) egreso_en_tienda,
 to_char (O.or_fecha::DATE, 'YYYY-MM-DD') Fecha_de_egresos, 
 (SELECT SUM(co_monto_cancelar) ingreso_en_tienda,
 to_char (co_fecha_hora::DATE, 'YYYY-MM-DD') Fecha_de_ingresos
 FROM compra
  WHERE co_fecha_hora::DATE='2020-12-06'
  GROUP BY co_fecha_hora
 ), 
 T.ti_tienda
 FROM orden_reposicion O,tienda T
 WHERE O.fk_tienda=T.ti_codigo 
 AND O.or_fecha::DATE='2020-12-06' 
 AND T.ti_codigo=1
 

 --10 mejores por tienda

SELECT sele.ti_nombre,
                    sele.nom_cliente,
                    sele.cant_compras,
                    MAX(mon_compras)
                FROM (SELECT ti.ti_nombre,
                            (CASE
                                WHEN cl.cl_tipo = 'NATURAL' THEN
                                    cl.cl_p_nombre||' '||cl.cl_s_nombre||', '||cl.cl_p_apellido||' '||cl.cl_s_apellido
                                WHEN cl.cl_tipo = 'JURIDICO' THEN
                                    cl.cl_razon_social
                            END) nom_cliente,
                            COUNT(1) cant_compras,
                            SUM(co.co_monto_cancelar) mon_compras
                        FROM compra  co,
                            carrito ca,
                            tienda  ti,
                            cliente cl
                        WHERE co.fk_carrito  = ca.ca_id
                        AND ca.fk_tienda   = ti.ti_codigo
                        AND cl.cl_id       = co.fk_cliente
                        GROUP BY ti.ti_nombre, nom_cliente
                        ORDER BY ti.ti_nombre
                        ) sele
                GROUP BY sele.ti_nombre, sele.nom_cliente, sele.cant_compras
                ORDER BY sele.ti_nombre;


-- 5 mejores
SELECT sele.ti_nombre,
                    sele.nom_cliente,
                    sele.cant_compras,
                    MAX(mon_compras)
                FROM (SELECT ti.ti_nombre,
                            (CASE
                                WHEN cl.cl_tipo = 'NATURAL' THEN
                                    cl.cl_p_nombre||' '||cl.cl_s_nombre||', '||cl.cl_p_apellido||' '||cl.cl_s_apellido
                                WHEN cl.cl_tipo = 'JURIDICO' THEN
                                    cl.cl_razon_social
                            END) nom_cliente,
                            COUNT(1) cant_compras,
                            SUM(co.co_monto_cancelar) mon_compras
                        FROM compra  co,
                            carrito ca,
                            tienda  ti,
                            cliente cl
                        WHERE co.fk_carrito  = ca.ca_id
                        AND ca.fk_tienda   = ti.ti_codigo
                        AND cl.cl_id       = co.fk_cliente
                        GROUP BY ti.ti_nombre, nom_cliente
                        ORDER BY ti.ti_nombre
                        ) sele, cliente c, tienda t
                WHERE c.fk_tienda = t.ti_codigo
                AND c.cl_id < 2
                GROUP BY sele.ti_nombre, sele.nom_cliente, sele.cant_compras
                ORDER BY sele.ti_nombre
                
--MESES mas productivos?
SELECT DISTINCT(to_char(co_fecha_hora,'MM')) MES,
   SUM(co_monto_cancelar),
   to_char (co_fecha_hora, 'YYYY') AÑO
 FROM compra
 GROUP BY to_char(co_fecha_hora,'MM'), to_char (co_fecha_hora, 'YYYY');
 
-- PRODUCTOS MAS COMPRADOS
SELECT p.pr_nombre,COUNT(p.pr_nombre),p.pr_precio,(to_char(co.co_fecha_hora,'MM')) MES
    FROM carrito c,carrito_producto cp,producto p,compra co
    WHERE c.ca_id = cp.fk_carrito
    AND cp.fk_producto= p.pr_id
    AND co.fk_carrito=c.ca_id
    AND NOT (p.pr_nombre < (SELECT MAX(p.pr_nombre) FROM producto p))
    GROUP BY p.pr_nombre,p.pr_precio,to_char(co.co_fecha_hora,'MM')
    ORDER BY COUNT(p.pr_nombre) ASC;

SELECT fk_producto,COUNT(1) 
FROM carrito_producto 
GROUP BY fk_producto 



SELECT c.co_fecha_hora, 
    fk_producto,    
    p.pr_nombre,      
    COUNT(1) 
  FROM carrito_producto cp, producto p, compra c 
  where p.pr_id = cp.fk_producto
  AND c.fk_carrito=cp.fk_carrito  
  --AND cp.fk_carrito = 10
 GROUP BY c.co_fecha_hora,
    fk_producto, p.pr_nombre 
 HAVING COUNT(1) = (SELECT MAX(sel.cant)
                      FROM (SELECT c.co_fecha_hora,fk_producto,p.pr_nombre,COUNT(1) cant
                              FROM carrito_producto cp, producto p,compra c
                               where p.pr_id = cp.fk_producto
                               AND c.fk_carrito=cp.fk_carrito
                             GROUP BY c.co_fecha_hora,fk_producto,p.pr_nombre) sel
                    );


SELECT to_char(c.co_fecha_hora,'MM') MESRP,p.pr_nombre,(cp.ca_unidades*cp.ca_costo), Max_pro.cantidad,COUNT(1) cant
                                        FROM carrito_producto cp, producto p,compra c,                                         
                                        (SELECT  sel.MES, MAX(sel.cant) cantidad
                                         FROM (
                                        SELECT to_char(c.co_fecha_hora,'MM') MES,fk_producto,p.pr_nombre,COUNT(1) cant
                                                            FROM carrito_producto cp, producto p,compra c
                                                            WHERE p.pr_id = cp.fk_producto
                                                            AND c.fk_carrito=cp.fk_carrito                                                              
                                                            GROUP BY to_char(c.co_fecha_hora,'MM'),fk_producto,p.pr_nombre
                                                            ORDER BY to_char(c.co_fecha_hora,'MM')
                                            ) sel 
                                        GROUP BY sel.MES
                                        ORDER BY sel.MES) Max_pro                                         
                            WHERE p.pr_id = cp.fk_producto
                            AND c.fk_carrito=cp.fk_carrito
                            AND Max_pro.MES = to_char(c.co_fecha_hora,'MM')                                    
                            GROUP BY to_char(c.co_fecha_hora,'MM'),p.pr_nombre,(cp.ca_unidades*cp.ca_costo),Max_pro.cantidad 
                            HAVING COUNT(1) = Max_pro.cantidad                                       
                            ORDER BY to_char(c.co_fecha_hora,'MM')



SELECT * 
    FROM 
    (SELECT  sel.MES,MAX(sel.cant)
    FROM (
            SELECT to_char(c.co_fecha_hora,'MM') MES,fk_producto,p.pr_nombre,COUNT(1) cant
                                        FROM carrito_producto cp, producto p,compra c
                                        where p.pr_id = cp.fk_producto
                                        AND c.fk_carrito=cp.fk_carrito
                                       -- AND to_char(c.co_fecha_hora,'MM') = '10'
                                        GROUP BY to_char(c.co_fecha_hora,'MM'),fk_producto,p.pr_nombre
                                        ORDER BY to_char(c.co_fecha_hora,'MM')
    ) sel 
    GROUP BY sel.MES
    ORDER BY sel.MES) Max_pro

RESULTADOS DE LA TABLA    
09	33	
10	22	
11	5	
12	59



SELECT DISTINCT(co_fecha_hora)FROM compra


SELECT fk_producto,
 p.pr_precio,
 p.pr_nombre,
 COUNT(1)
FROM carrito_producto cp,producto p
WHERE cp.fk_producto = p.pr_id
GROUP BY fk_producto, p.pr_precio, p.pr_nombre, p.pr_precio
ORDER BY COUNT(1) DESC






SELECT * FROM producto

--HORARIO
SELECT empl.em_cedula,
       empl.em_p_nombre,
       empl.em_s_nombre,
       empl.em_p_apellido,
       empl.em_s_apellido,
       cent.coen_entrada,
       cent.coen_salida,
      (CASE
          WHEN (DATE_PART('dow',cent.coen_entrada) NOT IN
                  (SELECT (CASE 
                              WHEN hor.ho_dia = 'DOMINGO'   THEN 0
                              WHEN hor.ho_dia = 'LUNES'     THEN 1
                              WHEN hor.ho_dia = 'MARTES'    THEN 2
                              WHEN hor.ho_dia = 'MIERCOLES' THEN 3
                              WHEN hor.ho_dia = 'JUEVES'    THEN 4
                              WHEN hor.ho_dia = 'VIERNES'   THEN 5
                              WHEN hor.ho_dia = 'SABADO'    THEN 6
                           END
                          ) ho_dia_num
                     FROM horario_empleado hemp,
                          horario hor
                    WHERE hemp.fk_empleado = empl.em_codigo
                      AND hor.ho_codigo  = hemp.fk_horario
                  )
               ) THEN 'N'
          WHEN (DATE_PART('dow',cent.coen_salida) NOT IN
                  (SELECT (CASE
                              WHEN hor.ho_dia = 'DOMINGO'   THEN 0
                              WHEN hor.ho_dia = 'LUNES'     THEN 1
                              WHEN hor.ho_dia = 'MARTES'    THEN 2
                              WHEN hor.ho_dia = 'MIERCOLES' THEN 3
                              WHEN hor.ho_dia = 'JUEVES'    THEN 4
                              WHEN hor.ho_dia = 'VIERNES'   THEN 5
                              WHEN hor.ho_dia = 'SABADO'    THEN 6
                           END
                          ) ho_dia_num
                     FROM horario_empleado hemp,
                          horario hor
                    WHERE hemp.fk_empleado = empl.em_codigo
                      AND hor.ho_codigo  = hemp.fk_horario
                  )
               ) THEN 'N'
          WHEN (EXTRACT(HOUR FROM cent.coen_entrada) > 
		          (SELECT EXTRACT (HOUR FROM hor2.ho_hora_entrada)
                     FROM horario_empleado hemp2,
                          horario hor2
                    WHERE hemp2.fk_empleado = empl.em_codigo
                      AND hor2.ho_codigo  = hemp2.fk_horario
					  AND hor2.ho_dia = (CASE
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 0 THEN 'DOMINGO'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 1 THEN 'LUNES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 2 THEN 'MARTES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 3 THEN 'MIERCOLES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 4 THEN 'JUEVES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 5 THEN 'VIERNES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 6 THEN 'SABADO'
                                         END)
                  )
               ) THEN 'N'
          WHEN (EXTRACT(HOUR FROM cent.coen_salida) < 
		          (SELECT EXTRACT (HOUR FROM hor2.ho_hora_entrada)
                     FROM horario_empleado hemp2,
                          horario hor2
                    WHERE hemp2.fk_empleado = empl.em_codigo
                      AND hor2.ho_codigo  = hemp2.fk_horario
					  AND hor2.ho_dia = (CASE
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 0 THEN 'DOMINGO'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 1 THEN 'LUNES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 2 THEN 'MARTES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 3 THEN 'MIERCOLES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 4 THEN 'JUEVES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 5 THEN 'VIERNES'
                                            WHEN DATE_PART('dow',cent.coen_entrada) = 6 THEN 'SABADO'
                                         END) 
                  )
               ) THEN 'N'
          ELSE 'S'
       END
      ) ind_cumple
 FROM empleado empl,
      control_entrada cent
WHERE empl.fk_tienda = 1
  AND cent.fk_empleado = empl.em_codigo
  AND DATE_TRUNC('day',cent.coen_entrada) >= '2020-12-05'
  AND DATE_TRUNC('day',cent.coen_entrada) <= '2020-12-20';

"tienda parametro" es el código de la tienda que se recibe como parámetro desde el sistema.
"fec_desde_parametro" es la fecha "sin formato de hora" de inicio de rango que se recibe como parámetro desde el sistema.
"fec_hasta_parametro" es la fecha "sin formato de hora" de final de rango que se recibe como parámetro desde el sistema.

-- FACTURA

SELECT DISTINCT(to_char (CO_FECHA_HORA::DATE, 'YYYY-MM-DD')) Fecha,
 to_char(co_FECHA_HORA::TIME, 'HH12:MI AM') Hora,
 co_id Factura, 
 co_monto_cancelar Monto_total,
 P.pr_nombre Nombre_producto,
 (CP.ca_unidades*CP.ca_costo) Costo_producto
 FROM COMPRA C, carrito CA, carrito_producto CP, producto P
 WHERE C.fk_carrito= CA.ca_id
 AND Cp.fk_carrito = CA.ca_id
 AND CP.fk_producto= P.pr_id
 --AND to_char (CO_FECHA_HORA::DATE, 'YYYY-MM-DD') IN( '2020-12-09','2020-12-30')
 GROUP BY Fecha,co_id,P.pr_nombre,Costo_producto,Ca.ca_id
 ORDER BY Factura

SELECT TO_CHAR(co_fecha_hora::DATE, 'YYYY-MM-DD') Fecha,
       TO_CHAR(co_fecha_hora::TIME, 'HH12:MI AM') Hora,
       co_id Factura, 
       co_monto_cancelar Monto_total,
       P.pr_nombre Nombre_producto,
       (CP.ca_unidades*CP.ca_costo) Costo_producto
  FROM COMPRA C, carrito CA, carrito_producto CP, producto P
 WHERE C.co_id = 4
   AND CA.ca_id = C.fk_carrito
   AND Cp.fk_carrito = CA.ca_id
   AND P.pr_id = CP.fk_producto
 ORDER BY P.pr_nombre;



-- PRUEBA HORARIO 


SELECT (EXTRACT(HOUR FROM coen_salida)) FROM control_entrada
(SELECT (CASE 
                              WHEN hor.ho_dia = 'DOMINGO'   THEN '1'
                              WHEN hor.ho_dia = 'LUNES'     THEN '2'
                              WHEN hor.ho_dia = 'MARTES'    THEN '3'
                              WHEN hor.ho_dia = 'MIERCOLES' THEN '4'
                              WHEN hor.ho_dia = 'JUEVES'    THEN '5'
                              WHEN hor.ho_dia = 'VIERNES'   THEN '6'
                              WHEN hor.ho_dia = 'SABADO'    THEN '7'
                           END
                          ) ho_dia_num
                     FROM horario_empleado hemp,
                          horario hor
                    WHERE hemp.fk_empleado = 1 -- empl.em_codigo
                      AND hor.ho_codigo  = 1-- hemp.fk_horario
                  )

SELECT * FROM horario

SELECT * FROM horario_empleado 

SELECT (DATE_PART('dow',coen_entrada)) FROM control_entrada

select (CASE
             WHEN DATE_PART('dow',coen_entrada) not IN ('1','2','3','4','5','6') THEN 'VALIDO'
             ELSE 'INVALIDO'
         END) DIA
  from control_entrada;

SELECT (CASE        
          WHEN DATE_PART('dow',coen_entrada) NOT IN
                  (SELECT (CASE 
                              WHEN hor.ho_dia = 'DOMINGO'   THEN 1
                              WHEN hor.ho_dia = 'LUNES'     THEN 2
                              WHEN hor.ho_dia = 'MARTES'    THEN 3
                              WHEN hor.ho_dia = 'MIERCOLES' THEN 4
                              WHEN hor.ho_dia = 'JUEVES'    THEN 5
                              WHEN hor.ho_dia = 'VIERNES'   THEN 6
                              WHEN hor.ho_dia = 'SABADO'    THEN 7
                           END
                          ) ho_dia_num
                     FROM horario_empleado hemp,
                          horario hor
                    WHERE hemp.fk_empleado = 1 --empl.em_codigo
                      AND hor.ho_codigo  = hemp.fk_horario
                  ) 
                  THEN 'N'
                  ELSE 'S'
        END) CUMPLIO FROM control_entrada
 













-- FACTURA

--WHERE coen_entrada:: DATE= '2020-12-01'
--DATE_FORMAT(ts_creacion,'%H:%i:%s')
fk_empleado_sup

SELECT * 
FROM ((producto p 
	  INNER JOIN almacen a ON a.fk_producto = p.pr_id) 
	  INNER JOIN pasillo pa 
	  ON pa.fk_producto = p.pr_id) 
	  WHERE a.fk_tienda = {0} 
	  AND pa.fk_tienda = {0}



Select to_char(coen_entrada::Time, 'HH12:MI:SS AM')
SELECT * :: INT FROM ROL
SELECT * FROM usuario WHERE FK_EMPLEADO IS NOT NULL
SELECT date_trunc('minute', TIMESTAMP '2017-03-17 02:09:30');
SELECT coen_entrada::TIME , coen_salida::TIME 

productos por cada carrito 
version mia
SELECT fk_carrito, COUNT(fk_producto)
	FROM carrito_producto
	WHERE fk_producto = 
	(SELECT pr_id 
	FROM producto 
	WHERE pr_id=fk_producto)
	GROUP BY fk_carrito
    
version antonio
SELECT ca_id, 
(SELECT COUNT(*)
 FROM carrito_producto 
 WHERE fk_carrito=ca_id)
 cant_p
 FROM carrito

