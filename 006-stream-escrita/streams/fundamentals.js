//Streams

// process.stdin
//    .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHunderStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        

        setTimeout(() => {
            if (i > 100) {
            this.push(null)
        }
        else {

            const buf = Buffer.from(String(i))
            this.push(buf)
        }
        }, 1000)


    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        
        const transformed = Number(chunk.toString() * -1)
        
        //primeiro parâmetro se der erro, segundo se der certo
        //Buffer serve pra transicionar dados entre Streams
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {

    //chunk: pedaço que lemos na stream de leitura e é enviado
    //encoding: é como a informação está codificada
    //callback: função que a stream de escirta precisa chamar quando ela terminou de fazer o que precisava fazer
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHunderStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

//Stream Duplex: permite ler e escrever