const info = (respo) => {
  console.log('INFO : ', respo.url);
}

const error = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('PAGE Not found :error');
  response.end(); 
}

module.exports = { info, error };
