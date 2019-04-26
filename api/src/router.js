const addressesRoutes = require('./routes/addressesRoutes');
const parcelsRoutes = require('./routes/parcelsRoutes');
const shipmentsRoutes = require('./routes/shipmentsRoutes');

exports.addresses = addressesRoutes.router;
exports.parcels = parcelsRoutes.router;
exports.shipments = shipmentsRoutes.router;