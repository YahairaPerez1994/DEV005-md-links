
const { routeAbsolute, existRoute, readAndGetLinks, validatingTheLinks, getStats } = require("./function.js");

// Función mdLinks
const mdLinks = (path, optionsObj) => {
  return new Promise((resolve, reject) => {
        if (existRoute(path)) {
          const absolutePath = (routeAbsolute(path))

          readAndGetLinks(absolutePath)
          // .then((links) => {
          //   return links
          // })
          .then((result) => {
            if (optionsObj.validate && optionsObj.stats) {
              validatingTheLinks(result).then((res)=>{
                const { total, uniq, broken } = getStats(res);
                const statsS = `Total: ${total} Uniq: ${uniq} Broken: ${broken}`;
                resolve(statsS);
              })
            }else if (optionsObj.stats){
              const { total, uniq } = getStats(result);
              const statsS = `Total: ${total} Uniq: ${uniq}`;
              resolve(statsS);
            }else if (optionsObj.validate){
              validatingTheLinks(result).then((res)=>{
                resolve(res);
              }) 
            }else{
              resolve(result);
            
            }
           
           
           })
          .catch((error) => {
            reject(error);
          });
        }});
      };
module.exports = {
  mdLinks
};












//Función mdLinks
// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     if (!existRoute(path)) {
//       return reject("La ruta no existe");
//     }

//     if (!routeAbsolute(path)) {
//       return reject(
//         "La ruta es relativa, debe convertirse en una ruta absoluta"
//       );
//     }

//     if (!readDirectory(path)) {
//       return reject("El archivo no es .md");
//     }
//     return readAndGetLinks(path).then((finalObject) => {
//       if (options && options.validate) {
//         return validatingTheLinks(finalObject).then((response) => {
//           resolve(response);
//         });
//       } else {
//         resolve(finalObject);
//       }
      
//     });
//   }); 
// }


//  const newPath = routeAbsolute(path)
//  const filemd = readDirectory(newPath)
//  const links = readAndGetLinks(filemd)

//  console.log(links);
//   if (options.validate) {
//      resolve(gettingTheLinks(links));
//  } else {
//      resolve(links);
//  }
// });
// }
// module.exports = {
//   mdLinks,
// };





//  const route = getAbsoluteRoute(path);
//  const mdFilesRoutes = findMdFilesRoutes(route);
//  const links = extractLinks(mdFilesRoutes);
//  // console.log(links);
//  if (options.validate) {
//      resolve(validatingLinks(links));
//  } else {
//      resolve(links);
//  }
// });

 

