// com conjunto

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

function tag(mp, linha, conjunto) {
  const tag = mp-(linha+conjunto)
  return tag
}

function bitsConjunto(bitsCache, bitsVias, bitsLinha) {
  const tamanhoCache = bitsVias + bitsLinha;
  const bitsConjuntos = bitsCache - tamanhoCache;
  return bitsConjuntos;
}


function hexToBinary(hex) {
  hex = hex.replace(/^0x/, '');

  let decimal = parseInt(hex, 16);

  let binary = decimal.toString(2);

  return binary;
}


const mp = converterMemoria("32 GB")
const cache = converterMemoria("8 MB")
const linha = converterMemoria("1 KB")
const elevadoVias = converterMemoria("64 BYTES")

const conjuntoBits = bitsConjunto(cache, elevadoVias, linha)
console.log(`bits conjunto: ${conjuntoBits}`)

const bitsTag = tag(mp, linha, conjuntoBits);
console.log(`bits MP: ${mp}`);
console.log(`bits cache: ${cache}`);
console.log(`bits linha/offset: ${linha}`);
console.log(`bits tag: ${bitsTag}`);
console.log(`elevado vias: ${elevadoVias}`);

let hexNumber = "1D45CAB7E";
let endereco_binario = hexToBinary(hexNumber);

console.log(`Hexadecimal: ${hexNumber}`);
console.log(`Binário: ${endereco_binario}`);

function binaryToHex(binary) {
  binary = binary.replace(/^0b/, '');

  let decimal = parseInt(binary, 2);

  let hex = decimal.toString(16).toUpperCase();

  return hex;
}


let tagg = endereco_binario.slice(0,endereco_binario.length-(conjuntoBits + linha))
console.log(`tag: ${tagg}`);
let conjuntoo = endereco_binario.slice(endereco_binario.length - (conjuntoBits + linha),endereco_binario.length-linha)
console.log(`conjunto: ${conjuntoo}`);
let offset = endereco_binario.slice(endereco_binario.length-linha)
console.log(`offset: ${offset}`);



let hexadecimalTag = binaryToHex(tagg)
console.log(`Hexadecimal tag: ${hexadecimalTag}`);
let hexadecimalConjunto = binaryToHex(conjuntoo)
console.log(`Hexadecimal conjunto: ${hexadecimalConjunto}`);
let hexadecimalOffset = binaryToHex(offset)
console.log(`Hexadecimal offset: ${hexadecimalOffset}`);