
const endereco = '2ABCD54E'

const bitsMp = converterMemoria("4 GB")
const bitsCache = converterMemoria("2 MB")
const bitsOffset = converterMemoria("1 KB")
const numeroLinhas = numeroDeLinhas(bitsCache, bitsOffset)
const bitsTag = tagDireto(bitsMp, numeroLinhas, bitsOffset)
console.log(bitsMp)
console.log(numeroLinhas)
console.log(bitsOffset)
console.log(bitsTag)

const endereco_binario = hexToBinary(endereco)

const tag_binario = endereco_binario.slice(0,endereco_binario.length-(numeroLinhas + bitsOffset))
const linhas_binario = endereco_binario.slice(bitsTag-1,endereco_binario.length-bitsOffset)
const offset_binario = endereco_binario.slice(endereco_binario.length-bitsOffset)
const cache_binario = endereco_binario.slice(bitsTag-2,)

const tag_hexa = binaryToHex(tag_binario)
const linhas_hexa = binaryToHex(linhas_binario)
const offset_hexa = binaryToHex(offset_binario)
const cache_hexa = binaryToHex(cache_binario)

console.log(tag_hexa)
console.log(linhas_hexa)
console.log(offset_hexa)
console.log(cache_hexa)





function numeroDeLinhas(bitsCache, bitsLinha) {
  return bitsCache - bitsLinha;
}



function converterMemoria(texto) {

  const mp = texto;
  const separado = mp.split(" ")


  let tamanho = separado[0];
  let prefixo = separado[1];
  let count = 0;

  for (let i = 0; i < 10; i++) {
      if (tamanho / 2 >= 1) {
          count++;
      }
      tamanho = tamanho / 2
  }

  if (prefixo.toUpperCase() == "GB" ) {
      count += 30;
  } else if (prefixo.toUpperCase() == "MB" ) {
      count += 20;
  } else if (prefixo.toUpperCase() == "KB" ) {
      count += 10;
  } else if (prefixo.toUpperCase() == "BYTES" ) {
    count += 0;
  } 
  return count;
}


function tagDireto(mp, linhas, offset) {
  const tag = mp-(linhas+offset)
  return tag
}



function hexToBinary(hex) {
  hex = hex.replace(/^0x/, '');

  let decimal = parseInt(hex, 16);

  let binary = decimal.toString(2);

  return binary;
}

function binaryToHex(binary) {
  binary = binary.replace(/^0b/, '');

  let decimal = parseInt(binary, 2);

  let hex = decimal.toString(16).toUpperCase();

  return hex;
}