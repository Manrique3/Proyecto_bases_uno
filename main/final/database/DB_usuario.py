from database.DB import DB
from flask import Flask, render_template, json, request, jsonify
import psycopg2 
from psycopg2.sql import SQL, Composable, Identifier, Literal
from psycopg2 import Error
from psycopg2 import sql
import decimal




class DB_usuario(DB):

    def get2(self,tipo, valor):

        try:
            query = "SELECT * FROM usuario WHERE {0} = '{1}'".format(tipo, valor)
            
            print(self.cursor.mogrify(query)) 
            self.cursor.execute(query)
            resp = self.cursor.fetchone()

            print(resp)

            if resp:

                columnas = self.cursor.description
                resp = self.querydictdecimal(resp,columnas)
                data = resp[0]
                
                for atributo in data:
                    if (data[atributo] == None):
                        data[atributo] = ''

                return data 
            
            else:
                return resp

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})

    def add (self, data):
        
        try:
                     
            keys = data.keys()
            columns = ','.join(keys)
            values = ','.join(['%({})s'.format(k) for k in keys])

            query = 'INSERT INTO usuario ({0}) VALUES ({1}) RETURNING us_codigo'.format(columns, values)
            
            print(self.cursor.mogrify(query, data)) 
            self.cursor.execute(query,data)
            self.connection.commit()
            
            id_creado = self.cursor.fetchone()[0]

            return id_creado

        except Exception:
            print(Exception)
            return jsonify({'error':'Error: Hubo un problema con el servidor'})

    def update2 (self, id_cl_em ,tipo , data):

        try:

            datamod = dict(data)
            dataol = self.get2(id_cl_em,tipo)
            

            for atributo in data:
                if (data[atributo] == dataol[atributo]):
                    datamod.pop(atributo)
                    
            
            if (not datamod): return ({'invalido':'Ningun dato fue actualizado'}) 
            
            for key in datamod.keys():
                if (datamod[key] == '' or datamod[key] == ' '): datamod[key] = None

            keys = datamod.keys()
            values = ','.join(['{} = %({})s'.format(k, k) for k in keys])
    
            query = 'UPDATE usuario SET {0} WHERE {1} = {2}'.format(values,tipo,id_cl_em)

            print(self.cursor.mogrify(query,datamod)) 
            self.cursor.execute(query,datamod)
            self.connection.commit()
            
            return ({'mensaje':'Usuario modificado satisfactoriamente'}) 
            

        except Exception:
            return ({'error':'Error: Hubo un problema con el servidor'}) 

    def delete(self, id_cl_em,tipo):

        try:
            query = 'DELETE FROM usuario WHERE {0} = {1}'.format(tipo, id_cl_em)
            
            print(self.cursor.mogrify(query)) 
            self.cursor.execute(query)
            self.connection.commit()            

            return jsonify({'mensaje':'eliminado satisfactoriamente'}) 

        except Exception:
            return jsonify({'error':'Error: Hubo un problema con el servidor'})

    def verif(self,atributo,valor):
        
        try:
            
            if type(valor) == str:
                self.cursor.execute ("SELECT * FROM usuario WHERE {0} = '{1}'".format (atributo,valor))
            else:
                self.cursor.execute ("SELECT * FROM usuario WHERE {0} = '{1}'".format (atributo,valor))
                
            obj = self.cursor.fetchone()  

            if obj is None:    
                return None
            else:
                return 1

        
        except Exception:
            return 2
    

   