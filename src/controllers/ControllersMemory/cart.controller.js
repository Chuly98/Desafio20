import cartServicio from "../../Services/cart.servicio.js";

export const CreateCart = async (req, res) => {
  try {
    const savedCart = await cartServicio.createCart();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito." });
  }
};

export const GetCartById = async (req, res) => {
  try {
    const cart = await cartServicio.getCartById(req.params.cid);
    if (!cart) {
      res.status(404).json({ error: "Carrito no encontrado." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito." });
  }
};

export const AddProductToCart = async (req, res) => {
  try {
    const result = await cartServicio.addProductToCart(
      req.params.cid,
      req.params.pid,
      req.body.quantity || 1
    );
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito." });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartServicio.updateCart(cid, req.body);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el carrito." });
  }
};

export const DeleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartServicio.deleteProductFromCart(cid, pid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar un producto del carrito." });
  }
};

export const ViewCart = async (req, res) => {
  try {
    const cartId = req.params.cid; 
    const cartData = await cartServicio.getViewCartData(cartId);

    if (!cartData) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }
    res.render('cart', cartData);
  } catch (error) {
    res.status(500).render('error', { error: 'Error al colocar los productos en el carrito.' });
  }
};

export const ClearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartServicio.clearCart(cid);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito.' });
  }
};

export const GetProductsInCart = async (req, res) => {
  try {
    const result = await cartServicio.getProductsInCart(req.params.cid);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al colocar los productos en el carrito.' });
  }
};

export const PurchaseCart = async (req, res) => {
  try {
    const result = await cartServicio.purchaseCart(req.params.cid, req.user.email);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: "error al comprar" });
  }
};