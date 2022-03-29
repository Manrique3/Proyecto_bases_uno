from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
from datetime import datetime, time
import datetime


class DB_generic(DB):

    def getall (self,tabla):  
    
        try:
           
            query = 'SELECT * FROM {0}'.format(tabla)

            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
            
            resp = self.cursor.fetchall()
            
            columnas = self.cursor.description
            data = self.querydictdecimal(resp,columnas)

            return data 

        except Exception:
            return None
      

    def getwhere (self,tabla,atributo,valor):  
    
        try:
           
            query = 'SELECT * FROM {0} WHERE {1} = {2}'.format(tabla,atributo,valor)

            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
        
            resp = self.cursor.fetchall()
            columnas = self.cursor.description
            
            data = self.querydictdecimal(resp,columnas)

            return data 

        except Exception:
            return None


    def add (self,table, data):
        
        try:

            for key in data.keys():
                if (data[key] == '' or data[key] == ' '): data[key] = None
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO {0} ({1}) VALUES ({2})'.format(table,columns, values)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()
            
            return ({'mensaje':'creado satisfactoriamente'}) 

        except Exception:
            print(Exception)
            return ({'error':'Error: Hubo un problema con el servidor'})


    def add_return (self,table,data,ret):
        
        try:

            for key in data.keys():
                if (data[key] == '' or data[key] == ' '): data[key] = None
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO {0} ({1}) VALUES ({2}) RETURNING {3}'.format(table,columns,values,ret)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()
            
            id_creado = self.cursor.fetchone()[0]

            return id_creado

        except Exception:
            print(Exception)
            return ({'error':'Error: Hubo un problema con el servidor'})


    def select (self,query):  
    
        try:
           
            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
        
            resp = self.cursor.fetchall()
            columnas = self.cursor.description
                    
            data = self.querydictdecimal(resp,columnas)
            #print(data)
            return data 

        except Exception:
            return None


    def update (self, tabla, atributo, valor, data):

        try:

            datamod = dict(data)
            dataol = self.getwhere(tabla,atributo,valor)

            for entidad in dataol:
                for atrib in entidad:
                    if type(entidad[atrib]) == datetime.time:
                        entidad[atrib] = str(entidad[atrib])

            dataol = dataol[0]
            
            print(dataol)
            print(datamod)
            
            for atrib2 in data:
                if (data[atrib2] == dataol[atrib2]):
                    datamod.pop(atrib2)
                    
            
            if (not datamod): return ({'invalido':'Ningun dato fue actualizado'}) 
            
            for key in datamod.keys():
                if (datamod[key] == '' or datamod[key] == ' '): datamod[key] = None

            keys = datamod.keys()
            values = ','.join(['{} = %({})s'.format(k, k) for k in keys])
    
            query = 'UPDATE {0} SET {1} WHERE {2} = {3}'.format(tabla,values,atributo,valor)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'Modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 

    def equery (self,query):  
    
        try:
           
            print(self.cursor.mogrify(query))  
            self.cursor.execute(query)
            self.connection.commit()
                
            return 1 

        except Exception:
            return None


    def delete (self,table, data):
        
        try:

            keys = data.keys()
            values = ' AND '.join(['{} = %({})s'.format(k, k) for k in keys])
    
            query = 'DELETE FROM {0} WHERE {1}'.format(table,values)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()

            return jsonify({'mensaje':'Eliminado satisfactoriamente'}) 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})

   
