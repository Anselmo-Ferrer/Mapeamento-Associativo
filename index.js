const enviar = document.getElementById('send')
const apagar = document.getElementById('trash')


const endereco_result = document.getElementById('endereco_result');
const bits_mp_result = document.getElementById('bits_mp_result');
const bits_cache_result = document.getElementById('bits_cache_result');
const bits_linha_result = document.getElementById('bits_linha_result');
const bits_tag_result = document.getElementById('bits_tag_result');
const bits_conjunto_result = document.getElementById('bits_conjunto_result');
const endereco_binario_result = document.getElementById('endereco_binario_result');
const tag_binario_result = document.getElementById('tag_binario_result');
const conjunto_binario_result = document.getElementById('conjunto_binario_result');
const offset_binario_result = document.getElementById('offset_binario_result');
const tag_hexa_result = document.getElementById('tag_hexa_result');
const conjunto_hexa_result = document.getElementById('conjunto_hexa_result');
const offset_hexa_result = document.getElementById('offset_hexa_result');


enviar.addEventListener('click', () => {
  const endereco_memoria = document.getElementById('endereco_memoria').value;
  endereco_result.textContent = endereco_memoria;

  const input_mp = document.getElementById('input_mp').value;
  const input_cache = document.getElementById('input_cache').value;
  const input_linha = document.getElementById('input_linha').value;
  const input_conjunto = document.getElementById('input_conjunto').value;

  const select_memoria = document.getElementById('select_memoria').value
  const select_cache = document.getElementById('select_cache').value
  const select_linha = document.getElementById('select_linha').value
  const select_conjunto = document.getElementById('select_conjunto').value

  const com_conjunto = document.getElementById('select_conjunto').value
  
  if (com_conjunto.toUpperCase() == "SIM") {
    const bitsMp = (converterMemoria(input_mp, select_memoria))
    const bitsCache = (converterMemoria(input_cache, select_cache))
    const bitsLinha = (converterMemoria(input_linha, select_linha))
    const elevadoConjunto = (converterMemoria(input_conjunto, select_conjunto))
    const bitsConjunto = bitsConjuntoFunc(bitsCache, elevadoConjunto, bitsLinha)
    const bitsTag = tagComConjunto(bitsMp, bitsLinha, bitsConjunto)

    bits_mp_result.textContent = bitsMp
    bits_cache_result.textContent = bitsCache
    bits_linha_result.textContent = bitsLinha
    bits_conjunto_result.textContent = bitsConjunto
    bits_tag_result.textContent = bitsTag

    const endereco_binario = hexToBinary(endereco_memoria)
    const tag_binario = endereco_binario.slice(0,endereco_binario.length-(bitsConjunto + bitsLinha))
    const conjunto_binario = endereco_binario.slice(bitsTag-1,endereco_binario.length-bitsLinha)
    const offset_binario = endereco_binario.slice(endereco_binario.length-bitsLinha)

    endereco_binario_result.textContent = endereco_binario
    tag_binario_result.textContent = tag_binario
    conjunto_binario_result.textContent = conjunto_binario
    offset_binario_result.textContent = offset_binario

    const tag_hexa = binaryToHex(tag_binario)
    const conjunto_hexa = binaryToHex(conjunto_binario)
    const offset_hexa = binaryToHex(offset_binario)

    tag_hexa_result.textContent = tag_hexa
    conjunto_hexa_result.textContent = conjunto_hexa
    offset_hexa_result.textContent = offset_hexa
  }

  else if (com_conjunto.toUpperCase() == "NAO") {
    const bitsMp = (converterMemoria(input_mp, select_memoria))
    const bitsCache = (converterMemoria(input_cache, select_cache))
    const bitsLinha = (converterMemoria(input_linha, select_linha))
    const bitsTag = tagSemConjunto(bitsMp, bitsLinha)

    bits_mp_result.textContent = bitsMp
    bits_cache_result.textContent = bitsCache
    bits_linha_result.textContent = bitsLinha
    bits_tag_result.textContent = bitsTag

    const endereco_binario = hexToBinary(endereco_memoria)
    const tag_binario = endereco_binario.slice(endereco_binario.length-bitsLinha)
    const offset_binario = endereco_binario.slice(0,endereco_binario.length-bitsLinha)

    endereco_binario_result.textContent = endereco_binario
    tag_binario_result.textContent = tag_binario
    offset_binario_result.textContent = offset_binario

    const tag_hexa = binaryToHex(tag_binario)
    const offset_hexa = binaryToHex(offset_binario)

    tag_hexa_result.textContent = tag_hexa
    offset_hexa_result.textContent = offset_hexa
    
  }

})


apagar.addEventListener('click', () => {
  // Limpar todos os inputs
  document.getElementById('endereco_memoria').value = '';
  document.getElementById('input_mp').value = '';
  document.getElementById('input_cache').value = '';
  document.getElementById('input_linha').value = '';
  document.getElementById('input_conjunto').value = '';

  document.getElementById('select_memoria').value = '';
  document.getElementById('select_cache').value = '';
  document.getElementById('select_linha').value = '';
  document.getElementById('select_conjunto').value = '';

  // Limpar todos os spans de resultado
  endereco_result.textContent = '';
  bits_mp_result.textContent = '';
  bits_cache_result.textContent = '';
  bits_linha_result.textContent = '';
  bits_tag_result.textContent = '';
  bits_conjunto_result.textContent = '';
  endereco_binario_result.textContent = '';
  tag_binario_result.textContent = '';
  conjunto_binario_result.textContent = '';
  offset_binario_result.textContent = '';
  tag_hexa_result.textContent = '';
  conjunto_hexa_result.textContent = '';
  offset_hexa_result.textContent = '';
});




















function converterMemoria(numero, prefix) {

  let tamanho = numero;
  let prefixo = prefix;
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

function bitsConjuntoFunc(bitsCache, bitsVias, bitsLinha) {
  const tamanhoCache = bitsVias + bitsLinha;
  const bitsConjuntos = bitsCache - tamanhoCache;
  return bitsConjuntos;
}

function tagComConjunto(mp, linha, conjunto) {
  const tag = mp-(linha+conjunto)
  return tag
}

function tagSemConjunto(mp, linha) {
  const tag = mp-linha
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

// darkmode

const dark = document.getElementById('dark');

dark.addEventListener('change', () => {
    document.body.classList.toggle('light-mode-variables')

})