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

function tag(mp, linha) {
  const tag = mp-linha
  return tag
}

function hexToBinary(hex) {
  hex = hex.replace(/^0x/, '');

  let decimal = parseInt(hex, 16);

  let binary = decimal.toString(2);

  return binary;
}

const mp = converterMemoria("16 GB")
const cache = converterMemoria("4 MB")
const linha = converterMemoria("2 KB")
const bitsTag = tag(mp, linha);
console.log(`bits MP: ${mp}`);
console.log(`bits cache: ${cache}`);
console.log(`bits linha/offset: ${linha}`);
console.log(`bits tag: ${bitsTag}`);

let hexNumber = "5AC8D948";
let binaryNumber = hexToBinary(hexNumber);

console.log(`Hexadecimal: ${hexNumber}`);
console.log(`Binário: ${binaryNumber}`);

let offset = binaryNumber.slice(binaryNumber.length-linha)
console.log(`offset: ${offset}`);
let tagg = binaryNumber.slice(0,binaryNumber.length-linha)
console.log(`tag: ${tagg}`);

function binaryToHex(binary) {
  binary = binary.replace(/^0b/, '');

  let decimal = parseInt(binary, 2);

  let hex = decimal.toString(16).toUpperCase();

  return hex;
}

let hexadecimalTag = binaryToHex(tagg)
console.log(`Hexadecimal tag: ${hexadecimalTag}`);
let hexadecimalOffset = binaryToHex(offset)
console.log(`Hexadecimal offset: ${hexadecimalOffset}`);