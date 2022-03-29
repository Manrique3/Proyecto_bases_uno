from agatereports.basic_report import BasicReport
from database.DB_reporte import DB_reporte
from datetime import datetime
import datetime
import pandas
import os



class Reporte():
    def asistencia(self,fecha,tienda):
        
        db = DB_reporte()
        Datos = db.report(fecha,tienda) 
        

        path = os.getcwd() + r'\reportes\descargas\Asistencia.xlsx'      
        pandas.DataFrame(Datos).to_excel( path ) 

        return 1   

    def ingreso(self,fecha1,fecha2):

        db=DB_reporte()
        Datos = db.ingreso(fecha1,fecha2)
        

        path = os.getcwd() + r'\reportes\temp\datos_ingresos.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Ingresos.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Ingresos.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_ingresos.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Ingresos.pdf'  

        return 1
   
    def frecuentes(self):

        db=DB_reporte()
        Datos = db.frecuentes()
        

        path = os.getcwd() + r'\reportes\temp\datos_Frecuentes.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Frecuentes.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Frecuentes.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_frecuentes.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Frecuentes.pdf'  

        return 1
   
    def Mes(self):

        db=DB_reporte()
        Datos = db.Mes()
        

        path = os.getcwd() + r'\reportes\temp\datos_Mes.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Mes.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Mes.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_Mes.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Mes.pdf'  

        return 1 

    def Productos(self):

        db = DB_reporte()
        Datos = db.productos()
        

        path = os.getcwd() + r'\reportes\temp\datos_productos.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Producto.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Producto.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_productos.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Producto.pdf'  

        return 1  

    def horarios(self,tienda,fecha1,fecha2):

        db = DB_reporte()
        Datos = db.horarios(tienda,fecha1,fecha2)
        
        
        path = os.getcwd() + r'\reportes\temp\datos_horarios.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Horarios.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Horarios.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_Horarios.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Horarios.pdf'  

        return 1      

    def facturas(self,factu):

        db = DB_reporte()
        Datos = db.facturas(factu)
        
        
        path = os.getcwd() + r'\reportes\temp\datos_facturas.csv'      
        pandas.DataFrame(Datos).to_csv( path ,index = False) 


        jrxml_filename = './reportes/jrxml/Facturas.jrxml'  # input jrxml filename
        output_filename = './reportes/descargas/Facturas.pdf'    # output pdf filename
        
        data_config = {'adapter': 'csv', 'filename': './reportes/temp/datos_facturas.csv'}

        pdf_page = BasicReport(jrxml_filename=jrxml_filename, output_filename=output_filename, data_config=data_config)
        pdf_page.generate_report()
        rutapdf = os.getcwd() + r'\reportes\descargas\Facturas.pdf'  

        return 1             


#if (__name__ == '__main__'):
#    Reporte().facturas(4)   

    {'ti_nombre': 'UCABmart - Barrancas', 'nom_cliente': 'FABIANO LEONARDO, JONES GODINEZ', 'cant_compras': 3, 'max': 238500000},
   
    
   
