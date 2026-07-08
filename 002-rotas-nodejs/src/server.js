import http from 'node:http'

const server = http.createServer((req, res) => {

    const { method, url } = req


    if(method === 'GET' && url === '/users') {

        return res.end('Listagem de usuários')
    }

    if (method === 'POST' && url === '/users') {
        return res.end("Criação de usuários")
    }

    return res.end("Rota de retorno para rotas diferentes de POST e END")
} )

server.listen(3333)
