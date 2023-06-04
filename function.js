const fs = require('fs');
const path = require('path');

//Identificar si la ruta existe
const existRoute = (route) => fs.existsSync(route)
  
//Validar si la ruta es absoluta,de lo contrario, se convierte la ruta relativa en absoluta
const routeAbsolute = (route) => {
  if (path.isAbsolute(route)){
    return route
  }else {
  return path.resolve(route);
  }
};

  // Leer directorio y extensión de un archivo
  const readDirectory = (directory) => {
    const filePaths = [];
    if (!fs.statSync(directory).isDirectory()){
      if (path.extname(directory) !=='.md') return filePaths;
      filePaths.push(directory);
      return filePaths;
    }
    const directoryAndContent = fs.readdirSync(directory);
    for (content of directoryAndContent){
      const newRoute = path.join (directory, content);
      const filesMd = readDirectory(newRoute);
      filePaths.push(...filesMd);
    }
    return filePaths;
  }

//Obtener los links dentro del archivo con expresiones regulares 
 const gettingTheLinks = (readDirectory) => {
  // console.log(readDirectory);
  const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;//busca patrones de enlaces de texto
  const linksExtracted = readDirectory.matchAll(linkRegex)
  // console.log(linksExtracted);
  return [...linksExtracted]; //convertir el objeto a un array (Retorna un array con todas las coincidencias encontradas)
};
// Esta funcion retorna propiedades del link
const readAndGetLinks = (filePaths) => {
  return new Promise((resolve, reject) => {
    const files = readDirectory(filePaths);
    const finalObject = [];

    files.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      const links = gettingTheLinks(content);

    for (let i = 0; i < links.length; i++) {
      const element = links[i][0];
      const linkText = element.replace("[", "").replace(")", "");
      const arrayLink = linkText.split("](");
      //Creación del objeto dentro del array anterior
      finalObject.push({
        href: arrayLink[1],
        text: arrayLink[0],
        file: file,
      });
    }
  });
    resolve (finalObject);
  });
};
//Validar los links dentro del array
const validatingTheLinks = (collectedLinks) => {
// console.log(collectedLinks);
  let finalObjectValidated = collectedLinks.map((link) => {
    return fetch(link.href)
    .then(data => {
      // console.log(data);
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: data.status,
        ok: data.statusText,
      }
    })
    .catch(err => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: err.status,
        ok: err.statusText,
      }
    });
})
   return Promise.all(finalObjectValidated);
  };

  // Cli Funciones
  // Total de links 
  const totalLinks = (collectedLinks) => {
    return collectedLinks.length;
  };
    
  //Función de links rotos 
  const brokenLinks = (collectedLinks) => {
    const brokenLinks = collectedLinks.filter((collectedLinks) => collectedLinks.ok === 'Forbidden' || collectedLinks.ok === 'Not Found');
    return brokenLinks.length;
};
  //Función de links únicos
  const uniqLinks = (collectedLinks) => {
    const url = (collectedLinks.map((collectedLinks) => collectedLinks.href));
    const uniqLinks = url.filter((link, index) => url.indexOf(link) === index)
    return uniqLinks.length;
  };

  // Stats
  const getStats = (collectedLinks) => {
    const stats = {
      total: totalLinks(collectedLinks),
      uniq: uniqLinks(collectedLinks),
      broken: brokenLinks(collectedLinks),
    }
    return stats;
  };
  const collectedLinks = [
    {
      href: 'https://github.com/markdown-it/markdown-it',
      text: 'Link de prueba',
      file: './prueba/prueba1.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://github.com/markedjs/marked',
      text: 'Link de prueba',
      file: './prueba/prueba1.md',
      status: 200,
      ok: 'OK' 
    },
    {
      href: 'https://nodejs.ortttg/es/',
      text: 'Link de prueba',
      file: './prueba/prueba3.md',
      status: 0,
      ok: 'fail'
    }
  ]

    module.exports = {
      existRoute,
      routeAbsolute,
      readDirectory,
      gettingTheLinks,
      readAndGetLinks,
      validatingTheLinks,
      totalLinks,
      brokenLinks,
      uniqLinks,
      getStats,
    };