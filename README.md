# Atithi Restaurant & Bar — website

A static site with no build step. To put it online, upload the whole `website/` folder to any host:
Netlify (drag and drop the folder at app.netlify.com/drop), cPanel `public_html`, GitHub Pages and so on.

## Files
- `index.html` holds all the home page content (hero, experiences, story, menu, Bar Arena, garden, events, gallery, reviews, visit).
- `reservation.html` is the booking page. The form sends the booking to WhatsApp. Times, the closed day (Monday) and the maximum party size are set at the top of `assets/js/reserve.js`. Links can pre-select the seating area, e.g. `reservation.html?area=bar` (or `gazebo`, `pool`).
- `assets/js/site.js` is the shared header and menu behaviour used by both pages. If you change the header or footer in `index.html`, make the same change in `reservation.html`.
- `assets/js/menu-data.js` is the menu. **Change dishes and prices here.** `veg: true` adds the Veg tag. Cocktails and wines are in the same file: `options` sets glass/bottle prices, `img` points to each drink's photo in `assets/img/drinks/` (if there's no photo, the drawn `art` illustration is used instead), and `showcase: true` also shows a cocktail in the Bar Arena section.
- `assets/img/bar-football.jpg` is the Bar Arena photo (bar section, experience card and gallery). `bar-scene.svg` is an unused illustration kept as a spare.
- `assets/css/styles.css` holds the styles. Brand colours are the tokens at the top (`--gold-500`, `--red-600`, `--navy-900` and so on).
- `assets/img/` holds the photos. To swap a photo, replace the file and keep the same name.

## Things to check before launch
1. **Social links**: Instagram and Facebook both point to `atithi.kitwe21`. Update them in `index.html` and `reservation.html` if a handle changes.
2. **Hours**: the site says Tue–Sun 10:00–22:00 and Monday closed. Update it if the bar stays open later.
3. **Reviews**: the two quotes come from Tripadvisor and TikTok. Swap in your favourite Google reviews.
4. **Photos**: the food images are cut from the menu artwork. Real dish photos will look sharper.

## WhatsApp
All buttons go to +260 96 797 0640. If the number changes, update `WA_NUMBER` in `assets/js/main.js`
and the `wa.me/260967970640` links in `index.html`.
