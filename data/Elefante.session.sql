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

SELECT * FROM control_entrada

INSERT INTO control_entrada(coen_entrada,coen_salida,fk_empleado) VALUE ('2020/12/01 7:00:00.00','2020/12/01 12:00:00.00',1);


33) SELECT l_nombre, l_tipo, l_total_habitantes
FROM lugar WHERE l_tipo !='EUROPA' AND l_tipo != 'OCEANIA'
ORDER BY l_tipo DESC


--INGRESO Y EGRESOS
SELECT ti.ti_codigo,
       ti.ti_nombre,
      (SELECT SUM(co.co_monto_cancelar)
         FROM compra co, carrito ca
        WHERE co.co_fecha_hora::DATE BETWEEN '2020-12-01' AND '2020-12-02'
          AND co.fk_carrito = ca.ca_id
          AND ca.fk_tienda  = ti.ti_codigo
      ) ti_ingresos,
      (SELECT SUM(od.or_cantidad * od.or_monto_unidad)
         FROM orden_reposicion od
        WHERE od.fk_tienda = ti.ti_codigo
          AND od.or_fecha::DATE BETWEEN '2020-12-01' AND '2020-12-02'
      ) ti_egresos
  FROM tienda ti
 GROUP BY ti.ti_codigo,ti.ti_nombre
 ORDER BY ti.ti_codigo;


SELECT COUNT(*)  FROM empleado; 

SELECT cl_cedula, cl_p_nombre, cl_s_nombre,cl_p_apellido,cl_s_apellido	






