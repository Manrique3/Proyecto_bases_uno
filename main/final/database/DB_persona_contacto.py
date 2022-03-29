from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
 


class DB_persona_contacto(DB):


    def get (self,item):

        try:

            id = item
            
            self.cursor.execute("SELECT * FROM persona_contacto WHERE peco_codigo = %s", (id,) )
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



      
    def add (self, data):
        
        try:

            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            
            query = 'INSERT INTO persona_contacto ({0}) VALUES ({1}) RETURNING peco_codigo'.format(columns, values)
            
            print(self.cursor.mogrify(query, data))  

            self.cursor.execute(query,data)
            self.connection.commit()
            
            id_creado = self.cursor.fetchone()[0]

            return id_creado

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
    
            query = 'UPDATE persona_contacto SET {0} WHERE peco_codigo = {1}'.format(values,id)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'persona_contacto modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 


    
    def delete (self,id):

        try:

            self.cursor.execute("DELETE FROM persona_contacto WHERE peco_codigo = %s", (id,) )
            print(id)

            self.connection.commit()  
                
            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})





