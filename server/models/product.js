const ShopSchema = new mongoose.Schema({
  ItemName: String,
  ItemQuantity: Number,
  ItemTag: String,
  ItemDetail: String,
  ItemPrice: Number,
  Image: String,
  Link: String,
});
export default ProductModel = new mongoose.model("Product", ProductSchema);
