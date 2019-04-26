// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

//todos los productos
app.get('/api/products', (req, res) => {
  return db.Product.findAll({ limit: 20 })
    //.then((products) => console.log(products))
    .then((products) => res.send(products))
    .catch((err) => {
      console.log('There was an error querying products', JSON.stringify(err))
      return res.send(err)
    });
});

//compras recientes de un usuario
app.get('/api/user/shops/:userId', (req, res) => {
    const userId = req.params.userId
    return sequelize.query('select p.name, p.sku from transactions as t inner join (select * from users where userid == :uId ) as u on t.id = u.id inner join (select * from products) as p on p.sku = t.sku', {replacements: {uId: userid}, type: sequelize.QueryTypes.SELECT})
    .then((products) => res.send(products))
    .catch((err) => {
      console.log('There was an error querying products', JSON.stringify(err))
      return res.send(err)
    });
});

//productos propuestos dado un un producto
app.get('/api/product/suggestions/:sku', (req, res) => {
    //cons userId = req.params.userId
    const sku = req.params.sku
    return sequelize.query('select tab.name, tab.sku from (select p.sku, p.name, count(*) as cuant from transactions as t inner join (select * from users as us inner join (select userId from users as u inner join (select * from transactions) as t on u.id = t.id where sku == :skuP ) as ui on ui.userId = us.userId ) as u on t.id = u.id inner join (select * from products) as p on p.sku = t.sku  order by cuant desc) as tab', {replacements: {skuP: sku}, type: sequelize.QueryTypes.SELECT})
    .then((products) => res.send(products))
    .catch((err) => {
      console.log('There was an error querying products', JSON.stringify(err))
      return res.send(err)
    });
});
    
app.get('/api/product/detail:sku', (req ,res) => {
    const sku = (req.params.sku)
    return db.Product.findOne({'_sku': sku})
    .then((product) => res.send(product))
    .catch((err) => {
        console.log('***Error queryng product', JSON.stringify(err))
        res.status(400).send(err)
    })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
