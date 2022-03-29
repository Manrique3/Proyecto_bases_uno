from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
from datetime import datetime

 

class DB_reporte(DB):


    def report (self,fecha,tienda):

        try:
            fe = fecha           
            id = tienda
            
           

            qry = '''SELECT  E.em_cedula,
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
                    AND co.coen_entrada::DATE= '{0}'
                    AND E.fk_tienda ={1}
                    ORDER BY co.coen_entrada;'''.format(fe,id)    

            #print(self.cursor.mogrify(qry))

            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data 

        except Exception:
            print('ERROR DE EXCEPTION')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})


    def ingreso (self,fecha1,fecha2):

        try:
            fe1=fecha1
            fe2=fecha2           
            
            
            qry = '''SELECT ti.ti_codigo,
                ti.ti_nombre,
                (SELECT SUM(co.co_monto_cancelar)
                    FROM compra co, carrito ca
                    WHERE co.co_fecha_hora::DATE BETWEEN '{0}' AND '{0}'
                    AND co.fk_carrito = ca.ca_id
                    AND ca.fk_tienda  = ti.ti_codigo
                ) ti_ingresos,
                (SELECT SUM(od.or_cantidad * od.or_monto_unidad)
                    FROM orden_reposicion od
                    WHERE od.fk_tienda = ti.ti_codigo
                    AND od.or_fecha::DATE BETWEEN '{1}' AND '{1}'
                ) ti_egresos
                FROM tienda ti
                GROUP BY ti.ti_codigo,ti.ti_nombre
                ORDER BY ti.ti_codigo; '''.format(fe1,fe2) 



            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data   

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})


    def frecuentes (self):

        try:
                     
            
            
            qry = '''SELECT sele.ti_nombre,
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
                GROUP BY sele.ti_nombre, sele.nom_cliente, sele.cant_compras;

                '''

            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data   

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})    

    
    
    def Mes (self):

        try:                     
            
            
            qry = '''
                    SELECT DISTINCT(to_char(co_fecha_hora,'MM')) MES,
                        SUM(co_monto_cancelar),
                        to_char (co_fecha_hora, 'YYYY') AÑO
                     FROM compra
                     GROUP BY to_char(co_fecha_hora,'MM'), to_char (co_fecha_hora, 'YYYY');
                '''

            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data   

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})    



    def horarios (self,tienda,fecha1,fecha2):

        try:                     
            ti = tienda
            fe1 = fecha1
            fe2 = fecha2  
            
            qry = '''
                   SELECT empl.em_cedula,
      empl.em_p_nombre || ' ' || empl.em_s_nombre || ', ' ||
                    empl.em_p_apellido || ' ' || empl.em_s_apellido N_empleado,
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
                ) ind_cumple,empl.fk_tienda
            FROM empleado empl,
                control_entrada cent
            WHERE empl.fk_tienda = {0}
            AND cent.fk_empleado = empl.em_codigo
            AND DATE_TRUNC('day',cent.coen_entrada) >= '{1}'
            AND DATE_TRUNC('day',cent.coen_entrada) <= '{1}';'''.format(ti,fe1,fe2) 
            

           

            self.cursor.execute(qry)      

            
            resp = self.cursor.fetchall()
            
            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data       

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})            

    def productos (self):

        try:
                     
            
            
            qry = '''SELECT to_char(c.co_fecha_hora,'MM') MESRP,p.pr_nombre,(cp.ca_unidades*cp.ca_costo) Costo, Max_pro.cantidad,COUNT(1) cant
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
                            ORDER BY to_char(c.co_fecha_hora,'MM')    '''

            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data   

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'}) 

    def facturas (self,factu):

        try:
                     
            fa=factu
            
            qry = '''SELECT TO_CHAR(co_fecha_hora::DATE, 'YYYY-MM-DD') Fecha,
                    TO_CHAR(co_fecha_hora::TIME, 'HH12:MI AM') Hora,
                    co_id Factura, 
                    co_monto_cancelar Monto_total,
                    P.pr_nombre Nombre_producto,
                    (CP.ca_unidades*CP.ca_costo) Costo_producto
                FROM COMPRA C, carrito CA, carrito_producto CP, producto P
                WHERE C.co_id = {0}
                AND CA.ca_id = C.fk_carrito
                AND Cp.fk_carrito = CA.ca_id
                AND P.pr_id = CP.fk_producto
                ORDER BY P.pr_nombre;   '''.format(fa)

            self.cursor.execute(qry)           

            resp = self.cursor.fetchall()

            columnas = self.cursor.description           

            data = self.querydictdecimal(resp,columnas)            

            for entidad in data:
                for atributo in entidad:
                    if type(entidad[atributo]) == datetime.date:
                        entidad[atributo] = str(entidad[atributo])

            return data   

        except Exception:
            print('ERROR DE EXCEPTION1')
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'}) 

    
    