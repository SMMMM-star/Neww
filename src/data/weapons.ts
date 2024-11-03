export const weapons = [
  // Assault Rifles
  {
    id: 'ak47',
    name: 'AK-47',
    type: 'Assault Rifle',
    caliber: '7.62×39mm',
    image: 'https://firearmcentral.fandom.com/wiki/File:AK-47.png',
    stockThreshold: 1000,
    monthlyProduction: 500
  },
  {
    id: 'm16',
    name: 'M16A4',
    type: 'Assault Rifle',
    caliber: '5.56×45mm NATO',
    image: 'https://www.armorally.com/wp-content/uploads/2023/03/fn-m16.jpg',
    stockThreshold: 800,
    monthlyProduction: 450
  },
  {
    id: 'm4',
    name: 'M4 Carbine',
    type: 'Assault Rifle',
    caliber: '5.56×45mm NATO',
    image: 'https://www.military.com/sites/default/files/media/equipment/weapons/m4-carbine/2014/02/m4-carbine-details-03.jpg',
    stockThreshold: 1200,
    monthlyProduction: 600
  },
  {
    id: 'insas',
    name: 'INSAS',
    type: 'Assault Rifle',
    caliber: '5.56×45mm NATO',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/INSAS_rifle.jpg',
    stockThreshold: 1500,
    monthlyProduction: 800
  },
  // Submachine Guns
  {
    id: 'mp5',
    name: 'MP5',
    type: 'Submachine Gun',
    caliber: '9×19mm Parabellum',
    image: 'https://www.heckler-koch.com/en/products/military/submachine-guns/mp5/mp5/overview.html',
    stockThreshold: 600,
    monthlyProduction: 300
  },
  {
    id: 'uzi',
    name: 'Uzi',
    type: 'Submachine Gun',
    caliber: '9×19mm Parabellum',
    image: 'https://modernfirearms.net/en/submachine-guns/israel-submachine-guns/uzi-eng/',
    stockThreshold: 500,
    monthlyProduction: 250
  },
  // Sniper Rifles
  {
    id: 'dragunov',
    name: 'Dragunov SVD',
    type: 'Sniper Rifle',
    caliber: '7.62×54mmR',
    image: 'https://modernfirearms.net/en/sniper-rifles/russia-sniper-rifles/dragunov-svd-eng/',
    stockThreshold: 200,
    monthlyProduction: 100
  },
  {
    id: 'barrett',
    name: 'Barrett M82',
    type: 'Sniper Rifle',
    caliber: '.50 BMG',
    image: 'https://barrett.net/products/firearms/model-82a1/',
    stockThreshold: 150,
    monthlyProduction: 75
  }
];

export const ammunition = [
  // Rifle Ammunition
  {
    id: '556nato',
    name: '5.56×45mm NATO',
    type: 'Rifle Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/556-nato-ammo.png',
    compatibleWeapons: ['m16', 'm4', 'insas'],
    stockThreshold: 100000,
    monthlyProduction: 50000
  },
  {
    id: '762x39',
    name: '7.62×39mm',
    type: 'Rifle Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/762x39-ammo.png',
    compatibleWeapons: ['ak47'],
    stockThreshold: 80000,
    monthlyProduction: 40000
  },
  {
    id: '762x54r',
    name: '7.62×54mmR',
    type: 'Rifle Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/762x54r-ammo.png',
    compatibleWeapons: ['dragunov'],
    stockThreshold: 50000,
    monthlyProduction: 25000
  },
  {
    id: '50bmg',
    name: '.50 BMG',
    type: 'Rifle Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/50bmg-ammo.png',
    compatibleWeapons: ['barrett'],
    stockThreshold: 20000,
    monthlyProduction: 10000
  },
  // Pistol Ammunition
  {
    id: '9mm',
    name: '9×19mm Parabellum',
    type: 'Pistol Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/9mm-ammo.png',
    compatibleWeapons: ['mp5', 'uzi', '9mm'],
    stockThreshold: 150000,
    monthlyProduction: 75000
  },
  {
    id: '45acp',
    name: '.45 ACP',
    type: 'Pistol Ammunition',
    image: 'https://www.ammoforsale.com/ammo-images/45acp-ammo.png',
    compatibleWeapons: ['1911'],
    stockThreshold: 100000,
    monthlyProduction: 50000
  }
];