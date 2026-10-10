/*
 * Atithi menu — transcribed from "Atithi Restaurant's Golden Menu".
 * To update prices or dishes, edit this file only. Prices are in Kwacha.
 * veg: true marks vegetarian dishes.
 * options: [{ label, price }] gives one Add button per size (e.g. glass / bottle).
 * art: { glass, color, color2, garnish } draws the drink illustration
 *   glass: martini | coupe | highball | hurricane
 *   garnish: lime | lemon | orange | cherry | mint | strawberry | pineapple
 * showcase: true also shows the drink in the Bar Arena section.
 */
window.ATITHI_MENU = [
  {
    id: "soups",
    label: "Soups & Salads",
    groups: [
      {
        title: "Veg Soup",
        items: [
          { name: "Tomato Soup", desc: "Tomato soup flavoured with garlic", price: 60, veg: true },
          { name: "Manchow Soup", desc: "Spicy, hot Chinese soup of chopped mixed vegetables, served with fried noodles", price: 65, veg: true },
          { name: "Hot & Sour Soup", desc: "Spicy and sour soya-based Chinese broth with julienne mixed vegetables", price: 60, veg: true },
          { name: "Sweet Corn Soup", desc: "Rich and delicious Chinese soup made with sweet corn", price: 65, veg: true },
          { name: "Cream of Mushroom Soup", desc: "Creamy soup of fresh seasonal mushroom, tempered with garlic and cinnamon", price: 65, veg: true },
          { name: "Lemon Coriander Soup", desc: "Aromatic and healthy, with a hint of lemon and coriander", price: 60, veg: true },
          { name: "Veg Noodles Soup", desc: "Lightly spiced, mild soup with mixed veggies and noodles", price: 65, veg: true }
        ]
      },
      {
        title: "Non-Veg Soup",
        items: [
          { name: "Chicken Manchow Soup", desc: "Spicy, hot Chinese soup of chopped mixed vegetables and chicken cubes", price: 75 },
          { name: "Chicken Hot & Sour Soup", desc: "Spicy and sour soya-based broth with julienne vegetables and chicken cubes", price: 70 },
          { name: "Chicken Sweet Corn Soup", desc: "Rich Chinese soup of sweet corn and chicken cubes", price: 75 },
          { name: "Chicken Noodles Soup", desc: "Lightly spiced, mild soup with vegetables, noodles and chicken cubes", price: 75 }
        ]
      },
      {
        title: "Salads",
        items: [
          { name: "Green Salad", price: 70, veg: true },
          { name: "Greek Salad", price: 75, veg: true },
          { name: "Coleslaw Salad", price: 70, veg: true },
          { name: "Chicken Salad", price: 75 },
          { name: "Chicken Tikka Salad", price: 75 }
        ]
      }
    ]
  },
  {
    id: "zambian",
    label: "Zambian Specials",
    note: "Authentic Zambian flavours",
    groups: [
      {
        title: "Zambian Special",
        items: [
          { name: "T-Bone Steak", desc: "Grilled tender beef T-bone, served with nshima or rice, our special tomato sauce and traditional vegetables", price: 175, featured: true },
          { name: "Rump Steak", desc: "Grilled tender beef rump, served with nshima, our special tomato sauce and traditional vegetables", price: 175 },
          { name: "Zambezi Bream Fish", desc: "Fried or grilled bream, served with nshima, rice or fries and our special tomato sauce", price: 170, featured: true }
        ]
      }
    ]
  },
  {
    id: "tandoor",
    label: "Tandoor & Starters",
    note: "Spice meets tradition",
    groups: [
      {
        title: "From the Tandoor",
        items: [
          { name: "Tandoori Chicken", desc: "Chicken marinated in yoghurt and spices, cooked in the tandoor", price: 170, featured: true },
          { name: "Lasooni Chicken Tikka", desc: "Chicken cubes in yoghurt, garlic and spices, from the tandoor", price: 150 },
          { name: "Amritsari Chicken Tikka", desc: "Chicken cubes in yoghurt and special spices, from the tandoor", price: 150 },
          { name: "Chicken Malai Tikka", desc: "Chicken in a creamy cashew-nut paste and spices, from the tandoor", price: 150 },
          { name: "Hariyali Chicken Tikka", desc: "Chicken cubes in yoghurt, mint and spice, from the tandoor", price: 150 },
          { name: "Saffron Chicken Tikka", desc: "Chicken cubes rich in saffron flavour, from the tandoor", price: 170 },
          { name: "Chicken Seekh Kabab", desc: "Minced chicken with Indian spices, from the tandoor", price: 160 },
          { name: "Reshmi Kabab", desc: "Marinated chicken fillet layered with egg white, from the tandoor", price: 165 },
          { name: "Kalmi Kabab", desc: "Marinated chicken thigh, from the tandoor", price: 170 },
          { name: "Mutton / Lamb Seekh Kabab", desc: "Minced mutton or lamb with Indian spices, from the tandoor", price: 180 },
          { name: "Mutton / Lamb Boti Kabab", desc: "Mutton or lamb marinated with Indian spices, from the tandoor", price: 180 },
          { name: "Tandoori Prawn", desc: "Prawns in a special spice marinade, from the tandoor", price: 250 },
          { name: "Amritsari Fish Tikka", desc: "Marinated fish cubes, from the tandoor", price: 200 }
        ]
      },
      {
        title: "Starters",
        items: [
          { name: "Chicken Cheese Ball", desc: "Minced chicken balls with cheese and Indian spices, crumbed and fried, with chilli tomato sauce", price: 160 },
          { name: "Chicken Lollipop", desc: "Chicken wings marinated, battered and deep fried", price: 160, featured: true },
          { name: "Chicken Spring Roll", price: 130 },
          { name: "Crispy Fish Fingers", price: 200 },
          { name: "Chicken Samosa", price: 110 },
          { name: "Beef Samosa", price: 115 }
        ]
      },
      {
        title: "Platters",
        items: [
          { name: "Non-Veg Tandoori Platter", desc: "Tandoori chicken with a mix of chicken tikka", price: 350 },
          { name: "Non-Veg Special Platter", desc: "Chicken tikka, chicken seekh kabab, mutton seekh kabab and fish tikka", price: 400, featured: true }
        ]
      }
    ]
  },
  {
    id: "sizzlers",
    label: "Sizzlers",
    note: "Sizzlin' goodness",
    groups: [
      {
        title: "Sizzlers",
        items: [
          { name: "Vegetable Sizzler", desc: "Deep-fried mixed vegetable patties with rice or fries, special sauce and mixed vegetables", price: 180, veg: true },
          { name: "Paneer Shashlik Sizzler", desc: "Grilled cottage cheese skewers, chef's special sauce, buttered rice, potato wedges and sautéed vegetables", price: 210, veg: true },
          { name: "Chinese Sizzler", desc: "Veg fried rice, chilli paneer, hakka noodles, Manchurian and hot garlic sauce", price: 215, veg: true },
          { name: "Sizzling Chilli Paneer", desc: "Batons of cottage cheese fried with onion, capsicum and green chillies in hot sauce", price: 210, veg: true },
          { name: "Chicken Sizzler", desc: "With rice or fries, special sauce and mixed vegetables", price: 220, featured: true },
          { name: "Beef Sizzler", desc: "Beef steak with rice or fries, special sauce and mixed vegetables", price: 230 }
        ]
      }
    ]
  },
  {
    id: "chinese",
    label: "Indo-Chinese",
    groups: [
      {
        title: "Rice & Noodles",
        items: [
          { name: "Veg Fried Rice", price: 70, veg: true },
          { name: "Chicken Fried Rice", price: 90 },
          { name: "Beef Fried Rice", price: 95 },
          { name: "Veg Hakka Noodles", price: 70, veg: true },
          { name: "Chicken Hakka Noodles", price: 90 },
          { name: "Beef Hakka Noodles", price: 95 }
        ]
      },
      {
        title: "Chilli Specials",
        items: [
          { name: "Chilli Paneer", price: 100, veg: true },
          { name: "Chilli Chicken", price: 110 },
          { name: "Chilli Beef", price: 120 }
        ]
      }
    ]
  },
  {
    id: "mains",
    label: "Main Course",
    note: "Rich flavours, great company",
    groups: [
      {
        title: "Vegetarian",
        items: [
          { name: "Paneer Butter Masala", price: 95, veg: true, featured: true },
          { name: "Veg Korma", price: 90, veg: true },
          { name: "Dal Tadka", price: 70, veg: true },
          { name: "Mixed Vegetable Curry", price: 80, veg: true },
          { name: "Palak Paneer", price: 90, veg: true },
          { name: "Aloo Gobi", price: 70, veg: true }
        ]
      },
      {
        title: "Non-Vegetarian",
        items: [
          { name: "Chicken Curry", price: 90 },
          { name: "Chicken Masala", price: 95 },
          { name: "Butter Chicken", price: 110, featured: true },
          { name: "Chicken Korma", price: 100 },
          { name: "Mutton Curry", price: 120 },
          { name: "Mutton Masala", price: 130 },
          { name: "Beef Curry", price: 120 },
          { name: "Fish Curry", price: 110 }
        ]
      }
    ]
  },
  {
    id: "breads",
    label: "Breads & Rice",
    groups: [
      {
        title: "Breads",
        items: [
          { name: "Naan", price: 25, veg: true },
          { name: "Garlic Naan", price: 35, veg: true },
          { name: "Cheese Naan", price: 45, veg: true },
          { name: "Roti", price: 15, veg: true },
          { name: "Paratha", price: 20, veg: true }
        ]
      },
      {
        title: "Rice",
        items: [
          { name: "Plain Rice", price: 40, veg: true },
          { name: "Jeera Rice", price: 50, veg: true },
          { name: "Veg Pulao", price: 60, veg: true },
          { name: "Chicken Pulao", price: 80 }
        ]
      }
    ]
  },
  {
    id: "cocktails",
    label: "Cocktails",
    note: "Shaken, stirred & served with love",
    layout: "cards",
    footnote: "Alcohol is served to guests aged 18 and over. Please drink responsibly.",
    groups: [
      {
        title: "Signature Cocktails",
        items: [
          { name: "Berry Cosmopolitan", img: "assets/img/drinks/berry-cosmopolitan.jpg", desc: "Smirnoff vodka, Monin cassis, lime, cranberry", price: 70, art: { glass: "martini", color: "#c0205a", color2: "#5e0b2a", garnish: "lime" } },
          { name: "Cosmopolitan", img: "assets/img/drinks/cosmopolitan.jpg", desc: "Smirnoff vodka, Monin triple sec, lime, cranberry", price: 70, art: { glass: "martini", color: "#ff7096", color2: "#c2264f", garnish: "lime" } },
          { name: "Strawberry Daiquiri", img: "assets/img/drinks/strawberry-daiquiri.jpg", desc: "Bacardi light rum, strawberry purée, frozen strawberries, cranberry juice", price: 80, showcase: true, art: { glass: "hurricane", color: "#ff4d63", color2: "#a8102a", garnish: "strawberry" } },
          { name: "Classic Margarita", img: "assets/img/drinks/classic-margarita.jpg", desc: "Tequila silver, Monin triple sec, lime", price: 85, art: { glass: "coupe", color: "#eef5a6", color2: "#b8cf45", garnish: "lime", rim: true } },
          { name: "Tequila Tease", img: "assets/img/drinks/tequila-tease.jpg", desc: "Tequila silver, red berries purée, lime, ginger ale", price: 85, art: { glass: "highball", color: "#ffbf6b", color2: "#d3264a", garnish: "lime" } },
          { name: "Atithi Beach Party", img: "assets/img/drinks/atithi-beach-party.jpg", desc: "Vodka, Bacardi light, triple sec, cranberry, lemon", price: 85, art: { glass: "hurricane", color: "#ff9a76", color2: "#e0354f", garnish: "orange" } },
          { name: "Publican's Punch", img: "assets/img/drinks/publicans-punch.jpg", desc: "Smirnoff vodka, Gilbey's gin, Southern Comfort, banana liqueur, orange juice, grenadine", price: 85, art: { glass: "highball", color: "#ffc247", color2: "#d9262f", garnish: "cherry" } },
          { name: "Bacardi Mojito", img: "assets/img/drinks/bacardi-mojito.jpg", desc: "Bacardi light rum, muddled lime, mint leaves, soda water", price: 85, showcase: true, art: { glass: "highball", color: "#eef9df", color2: "#9fd27a", garnish: "mint" } },
          { name: "Blue Citrus Circus", img: "assets/img/drinks/blue-citrus-circus.jpg", desc: "Smirnoff vodka, Archer's peach, Monin blue, lemonade", price: 85, showcase: true, art: { glass: "highball", color: "#6fd6ff", color2: "#1569c7", garnish: "lemon" } },
          { name: "Pina Colada", img: "assets/img/drinks/pina-colada.jpg", desc: "Bacardi light rum, Monin piña colada, lime, fresh pineapple", price: 90, showcase: true, art: { glass: "hurricane", color: "#fff7dc", color2: "#f0cf72", garnish: "pineapple" } }
        ]
      }
    ]
  },
  {
    id: "wines",
    label: "Wines",
    note: "By the glass or the bottle",
    layout: "cards",
    footnote: "Alcohol is served to guests aged 18 and over. Please drink responsibly.",
    groups: [
      {
        title: "Wines",
        items: [
          { name: "Overmeer", img: "assets/img/drinks/overmeer.jpg", options: [{ label: "Glass", price: 40 }, { label: "Bottle", price: 120 }] },
          { name: "Cellar Cask", img: "assets/img/drinks/cellar-cask.jpg", options: [{ label: "Glass", price: 40 }, { label: "Bottle", price: 120 }] },
          { name: "Four Cousins Sweet Rosé", img: "assets/img/drinks/four-cousins-sweet-rose.jpg", options: [{ label: "Glass", price: 70 }, { label: "Bottle", price: 175 }] },
          { name: "Four Cousins Sweet Red", img: "assets/img/drinks/four-cousins-sweet-red.jpg", options: [{ label: "Glass", price: 70 }, { label: "Bottle", price: 175 }] },
          { name: "Rupert & Rothschild", img: "assets/img/drinks/rupert-rothschild.jpg", options: [{ label: "Glass", price: 70 }] },
          { name: "Nederburg Baronne", img: "assets/img/drinks/nederburg-baronne.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Shiraz", img: "assets/img/drinks/nederburg-shiraz.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Cabernet Sauvignon", img: "assets/img/drinks/nederburg-cabernet-sauvignon.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Pinotage", img: "assets/img/drinks/nederburg-pinotage.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Merlot", img: "assets/img/drinks/nederburg-merlot.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Lyric", img: "assets/img/drinks/nederburg-lyric.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] },
          { name: "Nederburg Blanc", img: "assets/img/drinks/nederburg-blanc.jpg", options: [{ label: "Glass", price: 85 }, { label: "Bottle", price: 220 }] }
        ]
      }
    ]
  },
  {
    id: "desserts",
    label: "Desserts & Beverages",
    groups: [
      {
        title: "Desserts",
        items: [
          { name: "Gulab Jamun", price: 40, veg: true },
          { name: "Ice Cream", desc: "Vanilla or chocolate", price: 45, veg: true },
          { name: "Fruit Salad", price: 45, veg: true },
          { name: "Chocolate Brownie", price: 55, veg: true },
          { name: "Kulfi", price: 50, veg: true }
        ]
      },
      {
        title: "Beverages",
        items: [
          { name: "Fresh Juice", price: 35 },
          { name: "Soft Drinks", price: 20 },
          { name: "Mineral Water", price: 15 },
          { name: "Tea / Coffee", price: 20 }
        ]
      }
    ]
  }
];
