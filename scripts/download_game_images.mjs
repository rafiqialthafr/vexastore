import fs from 'fs';
import path from 'path';

const gamesDir = path.join(process.cwd(), 'public', 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

// Map slug to high-resolution official artwork URLs
const GAME_IMAGE_URLS = {
  // Base Games
  'mobile-legends': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d9/88/76/d9887647-00fd-09c8-8a61-c6c31a1bfe2a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'free-fire': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ef/16/6b/ef166bba-1d69-85f5-ed84-6b7c6e73b55c/AppIcon-1788350393-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'valorant': 'https://static.wikia.nocookie.net/valorant/images/3/3a/Closed_Beta_Promo.jpg',
  'genshin-impact': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5c/e2/13/5ce21317-a08a-24ac-cc5f-2b25a4d71fa6/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
  'pubg-mobile': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/98/24/6d9824dd-f75f-9bd6-221e-33324fedecb2/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'roblox': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/64/ff/27/64ff277d-2576-c0c9-2aae-dfd792464411/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg',
  'steam-wallet': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg',
  'point-blank': 'https://cdn.unipin.com/images/icon_product_pages/1784702458-icon-1760002045-icon-MLBB%20200%20x%20200_11zon.png', // will override with PB
  'fc-mobile': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/41/d1/84/41d18457-ec03-6812-f0a7-8a83686c6009/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'efootball-mobile': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f2/98/c4/f298c428-1e55-a238-3c3c-a2c59b50523a/PesMobile-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'honor-of-kings': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ba/a1/4f/baa14fb9-493b-d323-99f3-82b9f5ac75c0/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg',
  'call-of-duty-mobile': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ac/6e/89/ac6e89d5-edca-7dea-3eaa-fe971293b3bc/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
  'google-play-code': 'https://play.google.com/intl/en_us/about/static/images/play_logo_amber.png',

  // Extra Titles
  'honkai-star-rail': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fd/65/dc/fd65dc18-c4b6-7b64-8266-a423f3f113e0/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'zenless-zone-zero': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/43/64/6a/43646a64-9712-9da1-4c8a-14f95be9e413/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'wuthering-waves': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/cd/8a/a7/cd8aa70c-a4e4-e303-37e3-5d7e735f0834/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'solo-leveling-arise': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/75/28/93/752893bc-afc9-7797-8b45-160f9fd4f25c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'eggy-party': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/73/87/24/73872499-c7da-80e9-df1d-785510e46db2/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'brawl-stars': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/27/98/dd/2798dd4e-f772-d93b-0a82-588d3fb55302/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
  'clash-of-clans': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/0a/6d/e30a6d11-7bed-dcf6-0659-ee8c7b27c400/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'clash-royale': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e1/dd/c2/e1ddc25b-e234-42ac-7748-1c663d309cf9/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'ragnarok-origin': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c5/ca/8e/c5ca8e64-9420-9390-4c75-cdbdb4e484d4/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'ragnarok-m-eternal-love': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/21/00/48/21004879-2749-7dc1-462a-43032a41b535/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'arena-of-valor-aov-': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/64/1c/f5/641cf589-1ea0-5863-d67a-a3d137ba92fc/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/512x512bb.jpg',
  'higgs-domino-island': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/dc/7f/69/dc7f6981-f664-5756-b74f-0375a44fb6b5/AppIcon_xc10-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
  'league-of-legends-wild-rift': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/70/e1/e9/70e1e94a-6d1e-2dd1-3375-75b43d8f71a5/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'apex-legends-mobile': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900.jpg',
  'metal-slug-awakening': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/df/35/ccdf359b-9bdc-a283-bd05-25daccb66e3d/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'goddess-of-victory-nikke': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f2/6f/89/f26f8907-8ad5-6a22-8ebc-4061737734c7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'black-clover-m': 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/33/c4/4c/33c44cd0-02ba-7711-2eb2-f79a957803d1/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'identity-v': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9b/f0/3b/9bf03bac-78e6-694a-abd6-1e3248958d16/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'undawn': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/65/7f/09/657f0947-cbe2-fae8-2bd9-5a844848cead/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'lifeafter': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/35/17/ee/3517ee50-dcd7-7852-7545-ba4054905920/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg',
  'dragon-raja': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/16/f0/d616f039-6615-ac79-a8dd-fed5fac3698a/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'sausage-man': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/04/03/f0/0403f0f2-fc1a-4b6c-0b59-f51169dc11c6/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'mobile-legends-adventure': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/08/bd/3c/08bd3c6b-0e70-23a4-088e-8b05c1f2644b/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
  'lord-mobile': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/da/cf/ec/dacfec37-c2d2-a59c-30ad-b4d2835ea3a1/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'state-of-survival': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d8/3b/c0/d83bc0e2-5d0c-d7c8-c639-c1f2946db997/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
  'league-of-legends-pc': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900.jpg', // or LoL art
  'apex-legends-pc': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900.jpg',
  'overwatch-2': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2357570/library_600x900.jpg',
  'black-desert-online': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582660/library_600x900.jpg',
  'rainbow-six-siege': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg',
  'tarisland': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a6/84/11/a6841164-6306-a591-fd3a-e125f232bfe7/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg',
  'playstation-network-card-psn-': 'https://gmedia.playstation.com/is/image/SIEPDC/gift-cards-digital-card-keyart-01-en-20oct22?$facebook$',
  'nintendo-eshop-card': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Nintendo_eShop_logo.svg/512px-Nintendo_eShop_logo.svg.png',
  'xbox-game-pass-gift-card': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/X_Box_Logo_3.0.svg/512px-X_Box_Logo_3.0.svg.png',
  'unipin-voucher': 'https://cdn.unipin.com/images/unipin-dark-og.png',
  'razer-gold-idr': 'https://media.gold.razer.com/goldweb/site/images/fbshare-1200x630.png',
  'discord-nitro-gift': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f9/3f/31/f93f310e-890e-e076-7184-a4fa123e4f90/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg',
  'spotify-premium-voucher': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8b/f2/6a/8bf26ab9-3ced-cb5c-a2b3-19f65e7f5cc6/AppIcon-0-0-1x_U007epad-0-1-0-0-85-220.png/512x512bb.jpg',
  'vidio-premier-platinum': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/db/6b/d6/db6bd6d4-f732-984d-341f-7d743cd89533/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg'
};

async function downloadAll() {
  console.log('Starting download of official game artworks...');
  for (const [slug, url] of Object.entries(GAME_IMAGE_URLS)) {
    const ext = url.includes('.png') ? 'png' : 'jpg';
    const filePath = path.join(gamesDir, `${slug}.${ext}`);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        console.log(`[SUCCESS] Downloaded ${slug} (${buffer.length} bytes)`);
      } else {
        console.error(`[FAIL] ${slug} -> HTTP ${res.status}`);
      }
    } catch (e) {
      console.error(`[ERROR] ${slug}:`, e.message);
    }
  }
}

downloadAll();
