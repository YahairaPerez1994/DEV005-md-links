// const path = require('path');
const { existRoute, routeAbsolute, readAndGetLinks } = require('../function.js');
const { mdLinks } = require('../index.js');
const fs = require("fs");
// const path = require("path");
// jest.mock("fs");

//Función mdLinks
describe('mdLinks', () => {
 it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería devolver una promesa', () => {
    expect(mdLinks('mdLinks.md')).toBeInstanceOf(Promise);
   });

   it('Deberia devolver las estadisticas de total, unique y broken', done => {
    const path = 'C:/Users/YAHAIRA/Desktop/DEV005-md-links/prueba';
    mdLinks(path, {validate: true, stats: true}).then((res) => {
      expect(res).toEqual( 'Total: 8 Uniq: 7 Broken: 1');
      
    });
    done()
   });

  it('Debería devolver true si la ruta existe', () => {
    const path = 'C:/Users/YAHAIRA/Desktop/DEV005-md-links/prueba';
    const result = existRoute(path);
    expect(result).toEqual(true);
  });

  it('Debería devolver false si la ruta no existe', () => {
    const path = 'ruta/noExiste';
    const result = existRoute(path);
    expect(result).toEqual(false);
  });

  //Ruta absoluta
  describe('Ruta absoluta', () => {
    it('Debería ser una función', () => {
       expect(typeof routeAbsolute).toBe('function');
     });
  it('Permite convertir una ruta absoluta cuando es relativa', () => {
    const relativeRoute = './prueba';
   expect(routeAbsolute(relativeRoute)).toEqual('C:\\Users\\YAHAIRA\\Desktop\\DEV005-md-links\\prueba');
  });

  //Retorna links de archivos .md
  describe('Retorna links de archivos .md', () => {
    it('Deberia ser una funcion', () => {
    expect(typeof readAndGetLinks).toBe('function');
  });

    it('Deberia extraer los archivos .md', () => {
      const links = readAndGetLinks(routeAbsolute('C:/Users/YAHAIRA/Desktop/DEV005-md-links/prueba/prueba1.md'));
      expect(links).toBeDefined();
  });
    });
      });
        });



