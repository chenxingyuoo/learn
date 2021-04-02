/**
 * Created on 2017/10/26.
 */

'use strict';


let wrapEl = document.querySelector('#wrap');
let htmlText = wrapEl.outerHTML;
let wxmlText = htmlText
  .replace(/<div\s/g, '<view ')
  .replace(/<\/div>/g, '<\/view>')
  .replace(/<img\s/, '<image ');

debugger;
