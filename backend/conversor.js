const fetch = require('node-fetch');
var currencies = [];

function convertListData(list) {
    let results = list.results.slice(0, 4);

    let items = results.map(x => {
        var obj = {
            "id": x.id,
            "title": x.title,
            "price": {
                "currency": x.currency_id,
                "amount": x.price,
                "decimals": 2
            },
            "picture": x.thumbnail,
            "condition": x.condition,
            "free_shipping": x.shipping.free_shipping,
            "location": x.seller_address.state.name
        }
        return obj;
    });

    let data = {
        "author": {
            "name": "Rodrigo",
            "lastname": "Papadopulo"
        },
        "categories": [results[0].category_id],
        items: items
    }


    return data
}

function setCategorias(data, categorias) {
    let breadcrumbCategoria = categorias.path_from_root.map(x => x.name);
    data.categories = breadcrumbCategoria;

    return data;
}

function convertDataPublicacion(data) {
    let publicacion = {
        "author": {
            "name": "Rodrigo",
            "lastname": "Papadopulo"
        },
        "categories": data.category_id,
        "item": {
            "id": data.id,
            "title": data.title,
            "price": {
                "currency": data.currency_id,
                "amount": data.price,
                "decimals": 2
            },
            "picture": data.pictures[0].url,
            "condition": data.condition,
            "free_shipping": data.shipping.free_shipping,
            "sold_quantity": data.sold_quantity
        }
    };

    return publicacion;
}

function setDescripcion(publicacion, dataDescripcion) {
    publicacion.item.description = dataDescripcion.plain_text;
    return publicacion;
}

module.exports = { convertListData, setCategorias, convertDataPublicacion, setDescripcion }