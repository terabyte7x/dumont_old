const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        name: 'Dumont',
        version: '1.0.0 - Alpha',
        description: 'Sistema inteligênte de gerenciamento de escolas de aviação.',
        autor: 'Felipe Duque',
        company: '{duque.dev}'
        
    })
})

app.listen(3333);