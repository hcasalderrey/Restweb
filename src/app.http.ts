import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res)=>{
    console.log(req.url)


    //res.writeHead(200, {
    //    'Content-Type': 'text/html'
    //})
    //res.write('<h1>Hola Mundo !</h1>')
    //res.end();


    //const data = {name: 'John Doe', age:30, city:'New York'}

    //res.writeHead(200, {'Content-Type' : 'application/json'})
    //res.end(JSON.stringify(data))

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(htmlFile)
        return

    }
    
        if(req.url?.endsWith('.css')){ 
            res.writeHead(200, {'Content-Type' : 'text/css'})
        }
        else if(req.url?.endsWith('.js')){
            res.writeHead(200, {'Content-Type' : 'application/javascript'})                
        }
        const responseContent =  fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(responseContent)
 
})

server.listen(8081, ()=>{
    console.log("Servidor corriendo en el puerto 8081")
})