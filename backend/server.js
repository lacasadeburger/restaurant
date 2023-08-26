const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NYAhRCTQdBdq2KheKW5xUqYeqjRfcgajJiP889K1nRu5t0g79WVtwHKJm1HLSvI8LMjb4hd0TYZCMmny6zizFdO00SVyXjznJ');
const cors = require('cors');
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//api/payment
app.post('/', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'EUR',
      source: token.id,
      description: 'Pago de prueba'
    });

    res.status(200).json({
      message: 'Pago procesado exitosamente',
      chargeId: charge.id,
      created: charge.created,
      amount: charge.amount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el pago' });
  }
});

app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));
