from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal
from pprint import pprint


class DB_cliente(DB):

    
    def get (self,item):

        try:
           
            try:     
                int(item)
                query = "SELECT * FROM cliente WHERE cl_id = {0} OR cl_cedula = {0}".format(item)
            except:  
                query = "SELECT * FROM cliente WHERE cl_rif = '{0}'".format(item)    
            
           
            
            print(self.cursor.mogrify(query)) 
            self.cursor.execute(query)
            resp = self.cursor.fetchone()

            if resp is None:    
                return ({'invalido':'Este cliente no existe'}) 


            columnas = self.cursor.description
            resp = self.querydictdecimal(resp,columnas)

            data = resp[0]

            for atributo in data:
                if (data[atributo] == None):
                    data[atributo] = ''

            return data 

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor o el cliente no existe'})


    def getall (self, tipo):  
    
        try:

            self.cursor.execute("SELECT * FROM cliente WHERE cl_tipo = %s " , (tipo,) ) 
            resp = self.cursor.fetchall()

            self.connection.commit()

            columnas = self.cursor.description

            data = self.querydictdecimal(resp,columnas)

            

            return data 

        except Exception:
            return pprint({'error':'Error: Hubo un problema con el servidor'})
      
    
    def add (self, data):
        
        try:

            for key in data.keys():
                if (data[key] == '' or data[key] == ' '): data[key] = None
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO cliente ({0}) VALUES ({1}) RETURNING cl_id'.format(columns, values)
            
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
    
            query = 'UPDATE cliente SET {0} WHERE cl_id = {1}'.format(values,id)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'Cliente modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 


    def delete (self,id):

        try:

            self.cursor.execute("DELETE FROM cliente WHERE cl_id = %s", (id,) )
         
            self.connection.commit()  

                   

            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})


 
    def verif(self,atributo,valor):
        
        try:
        
            self.cursor.execute ("SELECT * FROM cliente WHERE {0} = '{1}'".format (atributo,valor))
           

            obj = self.cursor.fetchone()  

            if obj is None:    
                return None
            else:
                return 1

        
        except Exception:
            return 2


    def getafiliacion (self, n_tienda):

        try:
            
            self.cursor.execute("SELECT COUNT(fk_tienda) FROM cliente WHERE fk_tienda = %s", (n_tienda,)
            )
            
            numero = self.cursor.fetchone()[0]

            return (numero + 1)

        
        except Exception:
            return 0



    