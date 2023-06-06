
const { routeAbsolute, existRoute, readAndGetLinks, validatingTheLinks, getStats } = require("./function.js");

// Función mdLinks
const mdLinks = (path, optionsObj) => {
  return new Promise((resolve, reject) => {
        if (existRoute(path)) {
          const absolutePath = (routeAbsolute(path))

          readAndGetLinks(absolutePath)
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
  mdLinks,
};









