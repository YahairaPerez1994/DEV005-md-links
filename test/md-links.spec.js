const { mdLinks } = require('../index.js');

describe('mdLinks', () => {

 it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería devolver una promesa', () => {
    const path = 'prueba/prueba.md'
    expect(mdLinks(path)).toBeInstanceOf(Promise);
  });

  it('Debería rechazar la promesa si la ruta no existe', () => {
    return mdLinks('ruta/no/existente.md')
      .catch((error) => {
      expect(error).toBe('La ruta no existe');
  });
});
});
