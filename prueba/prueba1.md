* Usando un *módulo* como [markdown-it](https://github.com/markdown-it/markdown-it),
   que nos devuelve un arreglo de *tokens* que podemos recorrer para identificar
   los links.
* Siguiendo otro camino completamente, podríamos usar
   [expresiones regulares (`RegExp`)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).
* También podríamos usar una combinación de varios *módulos* (podría ser válido
   transformar el markdown a HTML usando algo como [marked](https://github.com/markedjs/marked)
   y de ahí extraer los link con una librería de DOM como [JSDOM](https://github.com/jsdom/jsdom)
   o [Cheerio](https://github.com/cheeriojs/cheerio) entre otras).
* Usando un *custom renderer* de [marked](https://github.com/markedjs/marked)
   (`new marked.Renderer()`).
