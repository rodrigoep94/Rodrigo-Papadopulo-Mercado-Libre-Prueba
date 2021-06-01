const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const rp = require('request-promise-native');
const conversor = require("./conversor")
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
    let query = req.query.q;
    let url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + query;

    const options = {
        uri: url,
        json: true
    };

    rp(options)
        .then(parsedBody => {
            let data = conversor.convertListData(parsedBody);
            let urlCategorias = 'https://api.mercadolibre.com/categories/' + data.categories[0];
            options.uri = urlCategorias;

            rp(options)
                .then(catData => {
                    res.send(conversor.setCategorias(data, catData));
                });
        })
        .catch(err => {
            res.send(err);
        });
})

app.get('/api/items/:id', (req, res) => {
    let id = req.params.id;
    let url = 'https://api.mercadolibre.com/items/' + id;
    let urlDescription = 'https://api.mercadolibre.com/items/' + id + '/description';

    const options = {
        uri: url,
        json: true
    }

    rp(options)
        .then(data => {
            options.uri = urlDescription;
            let publicacion = conversor.convertDataPublicacion(data);
            rp(options)
                .then(descData => {
                    let urlCategorias = 'https://api.mercadolibre.com/categories/' + publicacion.categories;
                    options.uri = urlCategorias;
                    publicacion = conversor.setDescripcion(publicacion, descData);
                    rp(options)
                        .then(catData => {
                            res.send(conversor.setCategorias(publicacion, catData));
                        })
                });
        })
        .catch(err => {
            res.send(err);
        })
})

app.listen(3001, () => console.log("Servidor listo ..."))