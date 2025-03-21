const onload = window.onload 
window.onload = () => { 
  onload()
  document.querySelector('#main').addEventListener('click',(e) => { 
    e.target.innerHTML = 'world'
   })
 };