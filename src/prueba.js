app.get('/api/products/name', function (req, res) {
    var name = req.query.name;
    Products.find({name: name}, function (err, products) {
      if (err) {
        res.send(err);
      } else {
        res.json(products);
      }
    });
  });
  