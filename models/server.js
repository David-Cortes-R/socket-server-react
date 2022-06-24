
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');



class Server  {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer( this.app );


        // configuraciones del Socket
        this.io = socketio(this.server, { /* configuraciones*/ } );



    }

    middlewares() {
        // Desplegar Directori Publico
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }



    // configurar socket
    configurarSocket() {
        new Sockets( this.io );
    }




    execute() {
        // Inicialaizar Middlewares
        this.middlewares();


        // Inicializar Socket
        this.configurarSocket();


        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Servidor Corriendo en el Puerto', this.port);
        });
    }

}




module.exports = Server;