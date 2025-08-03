import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-1016968933693485-032422-f162109eead5a9d0889962053645b730-2348676633",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Ruta para crear preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { products, back_urls, auto_return } = req.body;

    // Validar que hay productos
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    // Crear items para MercadoPago
    const items = products.map(producto => ({
      title: producto.titulo,
      quantity: Number(producto.quantity),
      unit_price: Number(producto.price),
      currency_id: "ARS",
    }));

    // Configurar preferencia
    const body = {
      items,
      back_urls: {
        success: back_urls?.success || "https://guillemartinez.netlify.app/",
        failure: back_urls?.failure || "https://guillemartinez.netlify.app/",
        pending: back_urls?.pending || "https://guillemartinez.netlify.app/",
      },
      auto_return: auto_return || "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de e-commerce funcionando");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
