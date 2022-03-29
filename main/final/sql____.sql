


SELECT  
    numeml,
    nombre,
    apellido,
    dept,
    codtra
FROM   
    templ1
WHERE
    nombre IN (SELECT nombre FROM templ1 WHERE dept = 'D21')
    codtra NOT IN (SELECT codtra FROM templ1 WHERE dept = 'E21')


SELECT HS171 FROM HS17 WHERE HS173 > 350


SELECT 
    F.FU132,
    C.CX72,
    E.EV112,
    H.HS173
FROM
    FU13 F,
    CX7  C,
    HS17 H,
    EV11 E

WHERE
    F.FU134 = C.CX72
AND
    H.HS171 = F.FU131
AND
    H.HS175 = E.EV111




SELECT 
    H.HS171,
    COUNT(H.HS174),
    H.HS174*D.DW93+4567 AS DFRTGH76 
    
FROM 
    HS17 H

INNER JOIN DW9 D 
ON H.HS172 = D.DW91

GROUP BY H.HS171




-------------------------------

CREATE VIEW EV112Hs1713879 AS

SELECT 
    E.EV112,
    COUNT(H.HS171)
FROM
   
    HS17 H,
    EV11 E

WHERE
    H.HS175 = E.EV111

AND
    H.HS174 = 3879

GROUP BY H.HS171, E.EV112    

HAVING COUNT(H.HS171) >  98034


---------------------------------


CREATE VIEW revisadoHS17 AS

SELECT 
    E.EV111, 
    E.EV112, 
    E.EV113
FROM    
    EV11 E,
    HS17 H,
    


WHERE
    HS175 IN (
        SELECT HS175 FROM HS17 GROUP BY HS175 HAVING COUNT(DISTINCT HS172) )
AND hs174 > 823465
    

GROUP BY H.HS174

HAVING COUNT(H.HS174) > ((
    SELECT COUNT(HS174) FROM HS17 
    )/0.3765)



--------------------


SELECT
    EV113
FROM 
    EV11 

GROUP BY EV113
HAVING COUNT(EV113) > 1


---------------------

SELECT 
    HS175,
    COUNT(*)

FROM HS17

GROUP BY HS175

HAVING COUNT(*) > 7

-------------------


Obtener una lista con los CX72 de los CX7 que realizaron más de dos FU13 para el mismo FU132, utilizando inner join implícito.


SELECT 
    C.CX72
   
FROM
    FU13 F,
    CX7  C,
   

WHERE
    F.FU134 = C.CX71  

GROUP BY F.FU132

HAVING COUNT(*) > 2 



