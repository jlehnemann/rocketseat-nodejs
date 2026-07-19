import http from 'node:http'

//cabeçalhos (requisição/resposta) => são metadados 
//metadados => informações para que back e front saibam lidar com req/res da melhor forma

//aplicação aqui será stateful (ela armazena o estado - salva em memória) - oposto de stateless 
const users = []

const server = http.createServer((req, res) => {

    const { method, url } = req


    if(method === 'GET' && url === '/users') {

        return res.setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {

        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })

        //retorna status HTTP 201 - CREATED
        return res.writeHead(201).end()
    }

    //tentar acessar com rota inexistente, retornará status 404
    return res.writeHead(404).end()
} )

server.listen(3333)
