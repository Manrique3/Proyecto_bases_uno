from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
from pprint import pprint


class DB_carrito(DB):

    
    def get (self,item):

        try:

            id = item
            '''
            self.cursor.execute("SELECT * FROM carrito WHERE ca_id = %s", (id,))
            resp = self.cursor.fetchone()
            
            columnas = self.cursor.description
           
            resp = self.querydictdecimal(resp,columnas)

            data = resp[0]

            '''

            query = 'SELECT * FROM carrito_producto cp, producto p WHERE p.pr_id = cp.fk_producto AND cp.fk_carrito = {0}'.format(id)

            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
        
            resp = self.cursor.fetchall()
            columnas = self.cursor.description
        
            
            data2 = self.querydictdecimal(resp,columnas)

            #data['productos'] = data2
            

            return data2

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'})



  
    
    def add (self, data):
        
        try:
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO carrito ({0}) VALUES ({1}) RETURNING ca_id'.format(columns, values)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()
            
            id_creado = self.cursor.fetchone()[0]

            return id_creado

        except Exception:
            print(Exception)
            return jsonify({'error':'Error: Hubo un problema con el servidor'})

    
    def update (self, id, data):

        try:

            datamod = dict(data)
            dataol = self.get(id)
            
            for atributo in data:
                if (data[atributo] == dataol[atributo]):
                    datamod.pop(atributo)
                    
            
            if (not datamod): return ({'invalido':'Ningun dato fue actualizado'}) 
            
            for key in datamod.keys():
                if (datamod[key] == '' or datamod[key] == ' '): datamod[key] = None

            keys = datamod.keys()
            values = ','.join(['{} = %({})s'.format(k, k) for k in keys])
    
            query = 'UPDATE carrito SET {0} WHERE ca_id = {1}'.format(values,id)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'carrito modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 


    def delete (self,id):

        try:
            
            self.cursor.execute("DELETE FROM carrito WHERE ca_id = %s", (id,) )
            print('Sale del execute')
            self.connection.commit()                     

            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})


 



    