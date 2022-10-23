const inputFile = document.getElementById('txtFile');
const container = document.getElementById('container');
const inputFileName = document.getElementById('txtFileName');

inputFile.addEventListener('change', e => {
    let txtFile = e.target.files[0];
    let reader = new FileReader();

    reader.onload = evt => {
        let textoArchivo = evt.target.result;
        arrayTextoArchivo = textoArchivo.split(/\r\n|\n/);
        
        //Me vuelo las primeras 2 líneas del txt.
        arrayTextoArchivo = arrayTextoArchivo.splice(2);

        //Me vuelo las líneas que tienen '-->'
        let txtFileCleaned = arrayTextoArchivo.filter(item => !item.includes('-->'));

        //Agrego un tab al inicio de cada línea
        txtFileCleaned = txtFileCleaned.map(item => {
          return "&nbsp;&nbsp;&nbsp;&nbsp;" + item;
        });

        //Me vuelo los <i/> <b/> <em/> etc...
        container.innerHTML = txtFileCleaned.join('<br>');

        //Descargo el nuevo txt
        downloadArchivo(inputFileName.value, container.outerText);
    };

    reader.readAsText(txtFile);
});

function downloadArchivo(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename || "archivoTexto");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
