from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal


 


class DB_metodo_pago(DB):


    def getall (self,fk_cliente):  
    
        try:

            self.cursor.execute("SELECT mc.mc_documento,mc.fk_cliente,mc.fk_tipo_pago,tp.tp_descripcion FROM metodo_pago mc,tipo_pago tp WHERE mc.fk_tipo_pago = tp.tp_codigo AND fk_cliente = %s", (fk_cliente,) )
            resp = self.cursor.fetchall()

            columnas = self.cursor.description

            data = self.querydictdecimal(resp,columnas)

            return data 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})
    

    def add (self, data):
        
        try:

            for key in data.keys():
                if (data[key] == '' or data[key] == ' '): data[key] = None
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO metodo_pago ({0}) VALUES ({1})'.format(columns, values)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()
            
            return jsonify({'mensaje':'metodo_pago creado satisfactoriamente'}) 

        except Exception:
            print(Exception)
            return jsonify({'error':'Error: Hubo un problema con el servidor'})


    def delete2 (self,doc,fk_tipo,fk_cliente):

        try:

            self.cursor.execute("DELETE FROM metodo_pago WHERE mc_documento = %s AND fk_tipo_pago = %s AND fk_cliente = %s", (doc,fk_tipo,fk_cliente,) )
         
            self.connection.commit()

            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})


    
   