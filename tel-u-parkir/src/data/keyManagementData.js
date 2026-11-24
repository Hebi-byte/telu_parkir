const storageKey = 'tel-u-parkir.key-management';

const foundKeys = [
  {
    id: 'FND-204',
    status: 'found',
    keyName: 'Kunci Honda Scoopy',
    description: 'Gantungan merah Tel-U',
    location: 'Parkiran GKU',
    dateLabel: 'Hari ini',
    timeLabel: '08:30 WIB',
    storagePost: 'Pos Satpam Gerbang 1',
    applicant: {
      name: 'Nadia Putri',
      nim: '1301213080',
      vehicle: 'Honda Scoopy',
      plate: 'D 3921 TLU',
    },
    handlingHistory: [{ action: 'Kunci diamankan', by: 'Budi Santoso', time: 'Hari ini, 08:35 WIB' }],
  },
  {
    id: 'FND-203',
    status: 'found',
    keyName: 'Kunci Yamaha NMAX',
    description: 'Gantungan kulit hitam dengan label kecil.',
    location: 'Parkiran FIT',
    dateLabel: 'Hari ini',
    timeLabel: '08:05 WIB',
    storagePost: 'Pos Satpam FIT',
    handlingHistory: [{ action: 'Kunci diamankan', by: 'Budi Santoso', time: 'Hari ini, 08:10 WIB' }],
  },
  {
    id: 'FND-202',
    status: 'found',
    keyName: 'Kunci Honda Vario',
    description: 'Gantungan karakter warna biru.',
    location: 'Parkiran GKU',
    dateLabel: 'Kemarin',
    timeLabel: '16:20 WIB',
    storagePost: 'Pos Satpam Gerbang 1',
    handlingHistory: [],
  },
  {
    id: 'FND-201',
    status: 'found',
    keyName: 'Kunci Yamaha Aerox',
    description: 'Sarung remote hitam dengan gantungan metal.',
    location: 'Parkiran FIT',
    dateLabel: 'Kemarin',
    timeLabel: '15:45 WIB',
    storagePost: 'Pos Satpam FIT',
    handlingHistory: [],
  },
  {
    id: 'FND-200',
    status: 'found',
    keyName: 'Kunci Honda Beat',
    description: 'Gantungan kain merah marun.',
    location: 'Parkiran GKU',
    dateLabel: 'Kemarin',
    timeLabel: '14:30 WIB',
    storagePost: 'Pos Satpam Gerbang 1',
    handlingHistory: [],
  },
  {
    id: 'FND-199',
    status: 'found',
    keyName: 'Kunci Suzuki Nex',
    description: 'Satu anak kunci dengan gantungan plastik putih.',
    location: 'Parkiran FIT',
    dateLabel: '20 Mar 2025',
    timeLabel: '12:15 WIB',
    storagePost: 'Pos Satpam FIT',
    handlingHistory: [],
  },
  {
    id: 'FND-197',
    status: 'found',
    keyName: 'Kunci Yamaha Fazzio',
    description: 'Gantungan boneka kecil warna krem.',
    location: 'Parkiran GKU',
    dateLabel: '19 Mar 2025',
    timeLabel: '10:25 WIB',
    storagePost: 'Pos Satpam Gerbang 1',
    handlingHistory: [],
  },
  {
    id: 'FND-196',
    status: 'found',
    keyName: 'Kunci Honda PCX',
    description: 'Remote keyless dengan gantungan biru.',
    location: 'Parkiran FIT',
    dateLabel: '19 Mar 2025',
    timeLabel: '09:40 WIB',
    storagePost: 'Pos Satpam FIT',
    handlingHistory: [],
  },
];

const lostKeys = [
  {
    id: 'LST-087',
    status: 'lost',
    keyName: 'Smart Key Yamaha Aerox',
    description: 'Remote hitam dengan gantungan karet berbentuk helm.',
    location: 'Parkiran GKU',
    dateLabel: 'Hari ini',
    timeLabel: '09:10 WIB',
    owner: 'Raka Aditya',
    nim: '1301213094',
    vehicle: 'Yamaha Aerox',
    plate: 'D 6721 VCA',
    handlingHistory: [],
  },
  {
    id: 'LST-086',
    status: 'lost',
    keyName: 'Kunci Honda Beat',
    description: 'Gantungan kunci kain warna biru.',
    location: 'Parkiran FIT',
    dateLabel: 'Hari ini',
    timeLabel: '08:20 WIB',
    owner: 'Dinda Lestari',
    nim: '1301213008',
    vehicle: 'Honda Beat',
    plate: 'D 4208 FIT',
    handlingHistory: [],
  },
  {
    id: 'LST-085',
    status: 'lost',
    keyName: 'Kunci Yamaha NMAX',
    description: 'Remote keyless dengan gantungan kulit cokelat.',
    location: 'Parkiran GKU',
    dateLabel: 'Kemarin',
    timeLabel: '15:30 WIB',
    owner: 'Rizal Firmansyah',
    nim: '1301213015',
    vehicle: 'Yamaha NMAX',
    plate: 'D 5015 TLU',
    handlingHistory: [],
  },
];

const returnedKeys = [
  {
    id: 'FND-198',
    status: 'returned',
    keyName: 'Kunci Honda Vario',
    description: 'Remote hitam dengan gantungan metal.',
    location: 'Pos Satpam Utama',
    dateLabel: 'Hari ini',
    timeLabel: '08:10 WIB',
    owner: 'Sinta Maharani',
    nim: '1301213012',
    vehicle: 'Honda Vario',
    plate: 'D 4412 ABC',
    recipientName: 'Sinta Maharani',
    returnLocation: 'Pos Satpam Utama',
    returnedDate: 'Hari ini',
    returnedTime: '08:10 WIB',
    handledBy: 'Budi Santoso',
    identityVerified: true,
    receiptSaved: true,
    handlingHistory: [{ action: 'Kunci diserahkan kepada pemilik', by: 'Budi Santoso', time: 'Hari ini, 08:10 WIB' }],
  },
  ...Array.from({ length: 11 }, (_, index) => {
    const number = 195 - index;
    const ownerNames = [
      'Fajar Pratama', 'Bagas Saputra', 'Rizky Ramadhan', 'Dimas Arya',
      'Aulia Putri', 'Rendra Aditya', 'Siti Nabila', 'Farhan Maulana',
      'Nanda Pratama', 'Dewa Saputra', 'Putri Amelia',
    ];
    const vehicles = ['Honda Scoopy', 'Yamaha NMAX', 'Honda Beat', 'Honda Vario'];
    const locations = ['Pos Satpam Gerbang 1', 'Pos Satpam FIT', 'Pos Satpam Utama'];
    return {
      id: `FND-${number}`,
      status: 'returned',
      keyName: `Kunci ${vehicles[index % vehicles.length]}`,
      description: 'Kunci telah dicocokkan dengan keterangan pemilik.',
      location: locations[index % locations.length],
      dateLabel: '19 Mar 2025',
      timeLabel: `${String(15 - Math.floor(index / 4)).padStart(2, '0')}:${String(20 - ((index % 4) * 5)).padStart(2, '0')} WIB`,
      owner: ownerNames[index],
      nim: `13012130${String(20 + index).padStart(2, '0')}`,
      vehicle: vehicles[index % vehicles.length],
      plate: `D ${String(4200 + index * 13)} TLU`,
      recipientName: ownerNames[index],
      returnLocation: locations[index % locations.length],
      returnedDate: '19 Mar 2025',
      returnedTime: `${String(15 - Math.floor(index / 4)).padStart(2, '0')}:${String(20 - ((index % 4) * 5)).padStart(2, '0')} WIB`,
      handledBy: 'Petugas Satpam',
      identityVerified: true,
      receiptSaved: true,
      handlingHistory: [{ action: 'Kunci diserahkan kepada pemilik', by: 'Petugas Satpam', time: '19 Mar 2025' }],
    };
  }),
];

export const initialKeyItems = [...foundKeys, ...lostKeys, ...returnedKeys];

export function loadKeyItems() {
  const savedItems = window.localStorage.getItem(storageKey);
  if (!savedItems) return initialKeyItems;

  const parsedItems = JSON.parse(savedItems);
  if (!Array.isArray(parsedItems)) {
    throw new Error('Data pengelolaan kunci tersimpan tidak valid.');
  }
  return parsedItems;
}

export function saveKeyItems(items) {
  window.localStorage.setItem(storageKey, JSON.stringify(items));
}
