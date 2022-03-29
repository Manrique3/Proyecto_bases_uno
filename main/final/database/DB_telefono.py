from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
 


class DB_telefono(DB):


    def get (self,item):

        try:

            id = item
            
            self.cursor.execute("SELECT * FROM telefono WHERE te_codigo = %s", (id,) )
            resp = self.cursor.fetchone()
            
            columnas = self.cursor.description
           
            resp = self.querydictdecimal(resp,columnas)

            data = resp[0]

            for atributo in data:
                if (data[atributo] == None):
                    data[atributo] = ''

            return data 

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})



    def getall (self,tipo,fk_obj):  
    
        try:

            query = 'SELECT * FROM telefono WHERE {0} = {1}'.format(tipo,fk_obj)
            
            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
            resp = self.cursor.fetchall()

            columnas = self.cursor.description

            data = self.querydictdecimal(resp,columnas)

            return data 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})
    

      
    def add (self, data):
        
        try:

            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            
            query = 'INSERT INTO telefono ({0}) VALUES ({1})'.format(columns, values)
            
            print(self.cursor.mogrify(query, data))  

            self.cursor.execute(query,data)
            self.connection.commit()

            return jsonify({'mensaje':'Telefono creado satisfactoriamente'}) 

        except Exception:
            return None
            
            

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
    
            query = 'UPDATE telefono SET {0} WHERE te_codigo = {1}'.format(values,id)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'Telefono modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 


    
    def delete (self,id):

        try:

            self.cursor.execute("DELETE FROM telefono WHERE te_codigo = %s", (id,) )
            print(id)

            self.connection.commit()  
                
            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})





