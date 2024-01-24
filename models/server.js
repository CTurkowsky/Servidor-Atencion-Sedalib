const express = require('express')

const cors = require('cors')
const db = require('../database/config')

// const { dbConection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 8080
    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'
    this.atencionesPath = '/api/atenciones'
    this.dbConnection()

    // Middlewares
    this.middlewares()
    // Rutas de mi aplicacion
    this.routes()
  }

  async dbConnection () {
    try {
      await db.authenticate()
      console.log('Base de datos online')
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error)
      process.exit(1) // Termina el proceso con un código de error
    }
  }

  middlewares () {
    // Cors
    this.app.use(cors())
    // Lectura y parseo del body
    this.app.use(express.json())
    // Directorio
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
    this.app.use(this.atencionesPath, require('../routes/atenciones'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
