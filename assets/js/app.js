var submitButtom = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input');
var content = document.querySelector('#app main');

submitButtom.addEventListener('click', run)

function run(event) {
  event.preventDefault()

  var zipCode = zipCodeField.value

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '');
  zipCode = zipCode.replace('-', '');
  zipCode = zipCode.trim();

  axios.
    get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
      content.innerHTML = ''
      createLine(response.data.logradouro)
      createLine(response.data.localidade + ' - ' + response.data.uf);
      createLine(response.data.bairro);
    })
    .catch(function (error) {
      content.innerHTML = ''
      createLine('Ops, algo deu errado!')
    })
}

function createLine(text) {
  var line = document.createElement('p');
  var text = document.createTextNode(text);

  line.appendChild(text);
  content.appendChild(line);
}