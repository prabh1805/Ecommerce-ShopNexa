// Run with: mongosh mongodb://localhost:27017/ecommerce seed-products.js
const db = db.getSiblingDB("ecommerce");

// Delete all old seeded products for this seller
const seller = db.users.findOne({ email: "seller@example.com" });
if (!seller) { print("❌ Seller not found"); quit(1); }
const deleted = db.products.deleteMany({ sellerId: seller.email });
print("🗑️  Deleted " + deleted.deletedCount + " old products");

const products = [
  // ─── ELECTRONICS (17) ───
  { name: "Wireless Bluetooth Headphones", category: "electronics", price: 2499, quantity: 120, description: "Premium over-ear wireless headphones with active noise cancellation and 30-hour battery life.", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
  { name: "Smartphone Stand Holder", category: "electronics", price: 499, quantity: 300, description: "Adjustable aluminum phone stand compatible with all smartphones and tablets.", imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop" },
  { name: "USB-C Hub 7-in-1 Adapter", category: "electronics", price: 1899, quantity: 85, description: "Multi-port USB-C hub with HDMI, USB 3.0, SD card reader and PD charging.", imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop" },
  { name: "Portable Power Bank 20000mAh", category: "electronics", price: 1299, quantity: 200, description: "Slim portable charger with dual USB output and fast charging support.", imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop" },
  { name: "Mechanical Gaming Keyboard", category: "electronics", price: 3999, quantity: 60, description: "RGB backlit mechanical keyboard with blue switches and anti-ghosting.", imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop" },
  { name: "Wireless Optical Mouse", category: "electronics", price: 799, quantity: 250, description: "Ergonomic wireless mouse with adjustable DPI and silent click buttons.", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop" },
  { name: "Noise Cancelling Earbuds", category: "electronics", price: 4999, quantity: 90, description: "True wireless earbuds with hybrid ANC, transparency mode and IPX5 water resistance.", imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop" },
  { name: "Fast Wireless Charger Pad", category: "electronics", price: 999, quantity: 180, description: "15W Qi wireless charging pad compatible with iPhone and Samsung devices.", imageUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=400&h=400&fit=crop" },
  { name: "Laptop Cooling Pad", category: "electronics", price: 1499, quantity: 75, description: "Dual fan laptop cooler with adjustable height and blue LED lighting.", imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop" },
  { name: "Bluetooth Portable Speaker", category: "electronics", price: 2999, quantity: 110, description: "Waterproof portable speaker with 360° sound and 12-hour playtime.", imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop" },
  { name: "Webcam 1080p Full HD", category: "electronics", price: 1799, quantity: 95, description: "Full HD webcam with built-in microphone and auto light correction.", imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop" },
  { name: "USB Flash Drive 128GB", category: "electronics", price: 599, quantity: 400, description: "High-speed USB 3.0 flash drive with metal casing and keychain loop.", imageUrl: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=400&h=400&fit=crop" },
  { name: "Smart LED Desk Lamp", category: "electronics", price: 1999, quantity: 65, description: "Touch-controlled LED desk lamp with adjustable brightness and color temperature.", imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },
  { name: "Digital Kitchen Scale", category: "electronics", price: 699, quantity: 150, description: "Precision digital scale with LCD display, measures up to 5kg in grams and ounces.", imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop" },
  { name: "4K HDMI Cable 2 Meter", category: "electronics", price: 399, quantity: 500, description: "High-speed HDMI 2.0 cable supporting 4K@60Hz with gold-plated connectors.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { name: "Smartwatch Fitness Band", category: "electronics", price: 3499, quantity: 80, description: "Fitness tracker with heart rate monitor, SpO2, sleep tracking and 7-day battery.", imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop" },
  { name: "Ring Light 10 Inch", category: "electronics", price: 1299, quantity: 70, description: "LED ring light with tripod stand, 3 color modes and 10 brightness levels.", imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop" },

  // ─── FASHION (17) ───
  { name: "Classic Cotton T-Shirt", category: "fashion", price: 499, quantity: 500, description: "Soft 100% cotton crew neck t-shirt available in multiple colors.", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { name: "Slim Fit Denim Jeans", category: "fashion", price: 1799, quantity: 200, description: "Stretchable slim fit jeans with classic 5-pocket design.", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
  { name: "Leather Belt Brown", category: "fashion", price: 699, quantity: 300, description: "Genuine leather belt with brushed metal buckle, fits waist 28-42.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop" },
  { name: "Aviator Sunglasses", category: "fashion", price: 1299, quantity: 180, description: "UV400 polarized aviator sunglasses with metal frame.", imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop" },
  { name: "Canvas Sneakers White", category: "fashion", price: 1499, quantity: 150, description: "Lightweight canvas sneakers with rubber sole, perfect for casual wear.", imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop" },
  { name: "Wool Blend Scarf", category: "fashion", price: 899, quantity: 120, description: "Warm wool blend scarf with fringe detail, ideal for winter.", imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop" },
  { name: "Formal Dress Shirt", category: "fashion", price: 1299, quantity: 160, description: "Wrinkle-free cotton blend formal shirt with button-down collar.", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop" },
  { name: "Running Shoes Lightweight", category: "fashion", price: 2999, quantity: 100, description: "Breathable mesh running shoes with cushioned sole and arch support.", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { name: "Crossbody Sling Bag", category: "fashion", price: 999, quantity: 140, description: "Compact crossbody bag with adjustable strap and multiple compartments.", imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop" },
  { name: "Baseball Cap", category: "fashion", price: 399, quantity: 350, description: "Adjustable cotton baseball cap with embroidered logo.", imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=400&fit=crop" },
  { name: "Hooded Sweatshirt", category: "fashion", price: 1599, quantity: 130, description: "Fleece-lined pullover hoodie with kangaroo pocket.", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { name: "Denim Jacket", category: "fashion", price: 2499, quantity: 80, description: "Classic denim jacket with button closure and chest pockets.", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop" },
  { name: "Leather Wallet", category: "fashion", price: 799, quantity: 250, description: "Bi-fold genuine leather wallet with RFID blocking and coin pocket.", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop" },
  { name: "Polo T-Shirt", category: "fashion", price: 899, quantity: 220, description: "Classic fit polo shirt with ribbed collar and two-button placket.", imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop" },
  { name: "Ankle Boots", category: "fashion", price: 3499, quantity: 60, description: "Suede ankle boots with side zip and block heel.", imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop" },
  { name: "Track Pants", category: "fashion", price: 999, quantity: 200, description: "Comfortable track pants with elastic waistband and side pockets.", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop" },
  { name: "Tote Bag Canvas", category: "fashion", price: 599, quantity: 180, description: "Spacious canvas tote bag with inner zip pocket, great for daily use.", imageUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400&h=400&fit=crop" },

  // ─── HOME (17) ───
  { name: "Stainless Steel Water Bottle", category: "home", price: 599, quantity: 300, description: "Double-wall insulated water bottle, keeps drinks cold 24h or hot 12h.", imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop" },
  { name: "Bamboo Cutting Board", category: "home", price: 799, quantity: 150, description: "Eco-friendly bamboo cutting board with juice groove and handle.", imageUrl: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=400&h=400&fit=crop" },
  { name: "Non-Stick Frying Pan", category: "home", price: 1299, quantity: 100, description: "28cm non-stick frying pan with heat-resistant handle, induction compatible.", imageUrl: "https://images.unsplash.com/photo-1585442231018-1e3b451b7a2c?w=400&h=400&fit=crop" },
  { name: "Cotton Bed Sheet Set", category: "home", price: 1999, quantity: 80, description: "300 thread count cotton bed sheet set with 2 pillow covers, queen size.", imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop" },
  { name: "Memory Foam Pillow", category: "home", price: 1499, quantity: 120, description: "Contour memory foam pillow for neck support with breathable cover.", imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop" },
  { name: "Scented Candle Vanilla", category: "home", price: 499, quantity: 200, description: "Hand-poured soy wax candle with vanilla fragrance, 40-hour burn time.", imageUrl: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=400&h=400&fit=crop" },
  { name: "Glass Food Container Set", category: "home", price: 1199, quantity: 90, description: "Set of 5 borosilicate glass containers with snap-lock lids, microwave safe.", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop" },
  { name: "Ceramic Coffee Mug", category: "home", price: 349, quantity: 400, description: "Handcrafted ceramic mug with matte finish, 350ml capacity.", imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop" },
  { name: "Kitchen Knife Set", category: "home", price: 2499, quantity: 50, description: "5-piece stainless steel knife set with wooden block.", imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop" },
  { name: "Throw Blanket Soft", category: "home", price: 1299, quantity: 110, description: "Ultra-soft microfiber throw blanket, 150x200cm, machine washable.", imageUrl: "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=400&h=400&fit=crop" },
  { name: "Ceramic Plant Pot", category: "home", price: 449, quantity: 180, description: "Minimalist ceramic planter with drainage hole and bamboo saucer.", imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop" },
  { name: "Wall Clock Modern", category: "home", price: 899, quantity: 70, description: "Silent sweep wall clock with minimalist design, 30cm diameter.", imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop" },
  { name: "Photo Frame Set", category: "home", price: 699, quantity: 130, description: "Set of 3 wooden photo frames in different sizes with wall mount.", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop" },
  { name: "Bathroom Towel Set", category: "home", price: 999, quantity: 160, description: "Set of 4 premium cotton towels — 2 bath towels and 2 hand towels.", imageUrl: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=400&h=400&fit=crop" },
  { name: "Wine Glass Set", category: "home", price: 1199, quantity: 85, description: "Set of 4 crystal wine glasses, 450ml, dishwasher safe.", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=400&fit=crop" },
  { name: "Spice Rack Organizer", category: "home", price: 799, quantity: 95, description: "Rotating spice rack with 16 glass jars and stainless steel lids.", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop" },
  { name: "Table Lamp Minimalist", category: "home", price: 1599, quantity: 55, description: "Modern table lamp with fabric shade and wooden base, E27 socket.", imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop" },

  // ─── BEAUTY (17) ───
  { name: "Vitamin C Face Serum", category: "beauty", price: 799, quantity: 200, description: "Brightening face serum with 20% Vitamin C, hyaluronic acid and Vitamin E.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
  { name: "Moisturizing Lip Balm", category: "beauty", price: 199, quantity: 500, description: "Natural beeswax lip balm with shea butter and coconut oil.", imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop" },
  { name: "Sunscreen SPF 50", category: "beauty", price: 599, quantity: 250, description: "Lightweight broad-spectrum sunscreen with PA+++ protection, non-greasy.", imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { name: "Hair Argan Oil", category: "beauty", price: 699, quantity: 180, description: "Pure Moroccan argan oil for hair, reduces frizz and adds shine.", imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
  { name: "Charcoal Face Mask", category: "beauty", price: 449, quantity: 220, description: "Activated charcoal peel-off mask for deep pore cleansing.", imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" },
  { name: "Aloe Vera Gel", category: "beauty", price: 299, quantity: 350, description: "99% pure aloe vera gel for skin and hair, no added fragrance.", imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400&h=400&fit=crop" },
  { name: "Retinol Night Cream", category: "beauty", price: 999, quantity: 130, description: "Anti-aging night cream with retinol and peptides for wrinkle reduction.", imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop" },
  { name: "Jade Face Roller", category: "beauty", price: 599, quantity: 160, description: "Natural jade stone face roller for lymphatic drainage and depuffing.", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  { name: "Makeup Brush Set 12pc", category: "beauty", price: 1299, quantity: 100, description: "Professional 12-piece makeup brush set with synthetic bristles and pouch.", imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop" },
  { name: "Nail Polish Set", category: "beauty", price: 499, quantity: 200, description: "Set of 6 quick-dry nail polishes in trending colors, chip-resistant.", imageUrl: "https://images.unsplash.com/photo-1631730486784-5e5354c1f542?w=400&h=400&fit=crop" },
  { name: "Perfume Eau de Toilette", category: "beauty", price: 2499, quantity: 70, description: "Long-lasting floral fragrance with notes of jasmine, rose and sandalwood.", imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop" },
  { name: "Body Lotion Shea Butter", category: "beauty", price: 449, quantity: 280, description: "Deeply moisturizing body lotion with shea butter and Vitamin E.", imageUrl: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=400&h=400&fit=crop" },
  { name: "Hair Straightener", category: "beauty", price: 1999, quantity: 60, description: "Ceramic plate hair straightener with adjustable temperature up to 230°C.", imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop" },
  { name: "Facial Cleanser Foam", category: "beauty", price: 399, quantity: 300, description: "Gentle foaming cleanser for all skin types, removes makeup and impurities.", imageUrl: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop" },
  { name: "Bath Bomb Set", category: "beauty", price: 599, quantity: 150, description: "Set of 6 handmade bath bombs with essential oils and dried flowers.", imageUrl: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&h=400&fit=crop" },
  { name: "Mascara Waterproof", category: "beauty", price: 549, quantity: 240, description: "Volumizing waterproof mascara with curved brush for lash definition.", imageUrl: "https://images.unsplash.com/photo-1590393802688-ab3fd16f2431?w=400&h=400&fit=crop" },
  { name: "Hand Cream Rose", category: "beauty", price: 349, quantity: 320, description: "Nourishing hand cream with rose extract and glycerin, fast absorbing.", imageUrl: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop" },

  // ─── SPORTS (16) ───
  { name: "Yoga Mat Non-Slip", category: "sports", price: 999, quantity: 150, description: "6mm thick TPE yoga mat with alignment lines and carrying strap.", imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop" },
  { name: "Resistance Bands Set", category: "sports", price: 699, quantity: 200, description: "Set of 5 latex resistance bands with different tension levels and bag.", imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop" },
  { name: "Jump Rope Speed", category: "sports", price: 399, quantity: 250, description: "Adjustable speed jump rope with ball bearings and foam handles.", imageUrl: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=400&fit=crop" },
  { name: "Dumbbell Set 5kg Pair", category: "sports", price: 1499, quantity: 80, description: "Neoprene coated dumbbell pair, non-slip grip, ideal for home workouts.", imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop" },
  { name: "Sports Water Bottle", category: "sports", price: 349, quantity: 400, description: "BPA-free sports bottle with flip-top lid and measurement markings, 750ml.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=400&h=400&fit=crop" },
  { name: "Gym Gloves", category: "sports", price: 499, quantity: 180, description: "Padded gym gloves with wrist support and breathable mesh back.", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop" },
  { name: "Foam Roller", category: "sports", price: 799, quantity: 120, description: "High-density foam roller for muscle recovery and deep tissue massage.", imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=400&fit=crop" },
  { name: "Football Size 5", category: "sports", price: 999, quantity: 100, description: "Match quality football with hand-stitched panels and butyl bladder.", imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop" },
  { name: "Basketball Indoor", category: "sports", price: 1299, quantity: 75, description: "Official size 7 basketball with composite leather for indoor courts.", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop" },
  { name: "Swimming Goggles", category: "sports", price: 599, quantity: 160, description: "Anti-fog UV protection swim goggles with adjustable silicone strap.", imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop" },
  { name: "Kettlebell 10kg", category: "sports", price: 1799, quantity: 50, description: "Cast iron kettlebell with vinyl coating and wide handle grip.", imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=400&fit=crop" },
  { name: "Gym Bag Duffle", category: "sports", price: 1299, quantity: 90, description: "Large duffle bag with shoe compartment, wet pocket and shoulder strap.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop" },
  { name: "Protein Shaker Bottle", category: "sports", price: 299, quantity: 350, description: "700ml shaker bottle with mixing ball and leak-proof lid.", imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=400&fit=crop" },
  { name: "Tennis Balls Pack of 3", category: "sports", price: 399, quantity: 200, description: "Pressurized tennis balls for all court surfaces, ITF approved.", imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop" },
  { name: "Cycling Gloves", category: "sports", price: 599, quantity: 130, description: "Padded half-finger cycling gloves with anti-slip grip and pull tabs.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { name: "Ab Wheel Roller", category: "sports", price: 499, quantity: 140, description: "Dual wheel ab roller with knee pad for core strengthening exercises.", imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop" },

  // ─── GROCERY (16) ───
  { name: "Organic Honey 500g", category: "grocery", price: 449, quantity: 200, description: "Raw unprocessed organic honey sourced from wildflower farms.", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop" },
  { name: "Basmati Rice 5kg", category: "grocery", price: 599, quantity: 150, description: "Premium aged basmati rice with long grains and aromatic fragrance.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" },
  { name: "Extra Virgin Olive Oil 500ml", category: "grocery", price: 799, quantity: 120, description: "Cold-pressed extra virgin olive oil from Mediterranean olives.", imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop" },
  { name: "Green Tea Bags 100pk", category: "grocery", price: 349, quantity: 300, description: "Natural green tea bags with antioxidants, no artificial flavors.", imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop" },
  { name: "Dark Chocolate 70% Cocoa", category: "grocery", price: 299, quantity: 250, description: "Premium dark chocolate bar made with single-origin cocoa beans.", imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop" },
  { name: "Rolled Oats 1kg", category: "grocery", price: 249, quantity: 280, description: "Whole grain rolled oats, high in fiber, perfect for breakfast.", imageUrl: "https://images.unsplash.com/photo-1614961233913-a5113e3ff04e?w=400&h=400&fit=crop" },
  { name: "Peanut Butter Crunchy 400g", category: "grocery", price: 349, quantity: 220, description: "All-natural crunchy peanut butter with no added sugar or palm oil.", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop" },
  { name: "Quinoa Grain 500g", category: "grocery", price: 499, quantity: 140, description: "Organic white quinoa, complete protein source, gluten-free.", imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=400&fit=crop" },
  { name: "Almond Milk 1L", category: "grocery", price: 299, quantity: 180, description: "Unsweetened almond milk, dairy-free, fortified with calcium and Vitamin D.", imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop" },
  { name: "Mixed Nuts 500g", category: "grocery", price: 699, quantity: 160, description: "Premium mix of almonds, cashews, walnuts and pistachios, lightly salted.", imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=400&fit=crop" },
  { name: "Instant Coffee 200g", category: "grocery", price: 399, quantity: 250, description: "Smooth instant coffee made from 100% Arabica beans.", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop" },
  { name: "Coconut Oil Virgin 500ml", category: "grocery", price: 449, quantity: 170, description: "Cold-pressed virgin coconut oil for cooking, skin and hair care.", imageUrl: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=400&h=400&fit=crop" },
  { name: "Maple Syrup Pure 250ml", category: "grocery", price: 599, quantity: 90, description: "100% pure Canadian maple syrup, Grade A amber rich taste.", imageUrl: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=400&fit=crop" },
  { name: "Whole Wheat Pasta 500g", category: "grocery", price: 199, quantity: 300, description: "Italian whole wheat penne pasta, high in fiber and protein.", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
  { name: "Chia Seeds 250g", category: "grocery", price: 349, quantity: 200, description: "Organic chia seeds rich in omega-3, fiber and protein.", imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop" },
  { name: "Whey Protein 1kg Chocolate", category: "grocery", price: 1999, quantity: 80, description: "Whey protein isolate with 25g protein per serving, chocolate flavor.", imageUrl: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400&h=400&fit=crop" },
];

// Add sellerId to all products
products.forEach(p => { p.sellerId = seller.email; });

print("📦 Inserting " + products.length + " products...");
const result = db.products.insertMany(products);
print("✅ Inserted " + Object.keys(result.insertedIds).length + " products!");

// Print breakdown
const cats = {};
products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
for (const [cat, count] of Object.entries(cats)) {
  print("   " + cat + ": " + count);
}
