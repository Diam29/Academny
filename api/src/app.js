// const express = require('express')
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
// const morgan = require('morgan')
// const routes = require('./routes/index.js')
// // nuevo 
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const { StaticRouter } = require('react-router-dom');
// const fetch = require('node-fetch');
// const fs = require('fs');
// const path = require('path');

// require('./db.js')

// const app = express()

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(cookieParser());
// app.use(morgan('dev'));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://academiaonlineglobal.com'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// app.use('/', routes);

// app.use('/', (req, res) => {
//     res.cookie('myCookie', 'cookieValue', {
//         sameSite: 'None',
//         secure: true,
//     });
//     res.send('Hello World!');
// });

// // Error catching endware.
// app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//     const status = err.status || 500;
//     const message = err.message || err;
//     console.error(err);
//     res.status(status).send(message);
// });

// // Manejo de SSR
// app.get('*', async (req, res) => {
//     try {
//         // URL del frontend en Vercel
//         const reactAppUrl = 'https://academiaonlineglobal.com/';

//         // Realiza una solicitud HTTP para obtener el contenido del HTML
//         const response = await fetch(reactAppUrl);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch HTML from ${reactAppUrl}, status: ${response.status}`);
//         }

//         const reactAppCode = await response.text();

//         const context = {};
//         const appHtml = ReactDOMServer.renderToString(
//             <StaticRouter location={req.url} context={context}>
//                 {/* Tu aplicación de React */}
//                 <div id="root" dangerouslySetInnerHTML={{ __html: appHtml }} />
//             </StaticRouter>
//         );

//         // Aquí puedes usar el HTML renderizado y enviarlo al frontend
//         res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="utf-8">
//           <title>SSR Example</title>
//         </head>
//         <body>
//           <div id="root">${appHtml}</div>
//           <!-- Otros scripts, estilos, etc. pueden ir aquí -->
//         </body>
//         </html>
//       `);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// module.exports = app;


const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
// const React = require('react');
import React from 'react'
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const fetch = require('node-fetch');
import App from './src/App.jsx'

// Añadido fs y path para trabajar con archivos y rutas
const fs = require('fs');
const path = require('path');

// Asegúrate de requerir el archivo de configuración de la base de datos
require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Configuración CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://academiaonlineglobal.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

// Server-Side Rendering (SSR)
// app.get('/', (req, res) => {
//     const indexFile = path.resolve('https://academiaonlineglobal.com/')
//     const html = renderToString({< App />})
// })
app.get('/', async (req, res) => {
    // const html = ReactDOMServer.renderToString(
    //     <StaticRouter location={req.url} context={{}}>
    //         <App />
    //     </StaticRouter>
    // )
    // res.send('html', html)
    try {
        const reactAppUrl = 'https://academiaonlineglobal.com/'
        const response = await fetch(reactAppUrl)

        if (!response.ok) {
            throw new Error(`Failed ${reactAppUrl}`)
        }
        const reactAppCode = await response.text()

        const context = {}
        const appHtml = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                {eval(reactAppCode)}
            </StaticRouter>
        )
        res.send(`<div id="root">${appHtml}</div>`)
    } catch (error) {
        console.error(error)
        res.status(500).send('internal error', error.message)
    }
})

module.exports = app;
