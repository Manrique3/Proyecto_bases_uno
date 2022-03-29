
SELECT
    *
FROM
    empleado
WHERE 
    em_codigo BETWEEN 5 AND 15

-------------!*----------------------

SELECT
    em_codigo,
    em_p_nombre,
    fk_tienda
FROM
    empleado
WHERE 
    fk_tienda IN (5,9,12,3,7)       --NOT IN 


-------------!*----------------------

SELECT
    em_codigo,
    em_p_nombre,
    em_fecha_nac
FROM
    empleado
WHERE 
    em_p_nombre LIKE '%AN%'             --REGEXP
AND
    em_p_nombre LIKE '%IO%'


-------------!*----------------------

SELECT
    em_codigo,
    CONCAT(em_p_nombre,' ',em_s_nombre),       
    em_p_nombre||' '||em_s_nombre ,           --lo mismo
    em_fecha_nac
FROM
    empleado
LIMIT
    6


-------------!*----------------------

SELECT
    fk_tienda,
    count(*)
FROM
    empleado
GROUP BY
    fk_tienda


CREATE TABLE temple1 ( nuempl CHAR(6) NOT NULL, nombre CHAR(12) NOT NULL, inicial CHAR(1) NOT NULL, apellido CHAR(15) NOT NULL, dept CHAR(3) NOT NULL, tlfn CHAR(4), feching DATE NOT NULL, codtra SMALLINT NOT NULL, niveduc SMALLINT NOT NULL, sexo CHAR(1) NOT NULL, fechnac DATE NOT NULL, salario DECIMAL(9,2) NOT NULL ); CREATE TABLE tdepar2 ( numdep CHAR(3) NOT NULL, nomdep CHAR(36) NOT NULL, numdirec CHAR(6) NOT NULL);