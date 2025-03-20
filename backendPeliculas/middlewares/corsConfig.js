import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5000',
  'http://localhost:5173',
  'http://localhost:5000/movies',
]

//CREO QUE NO ES NECESARIO ESTO, YA QUE SE INSTALO CORS DESDE NPM QUE PONE LOS HEADERS NECESARIOS PARA QUE FUNCIONE Y LOS (ORIGENES *)

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})