const gallerySets = [
     [
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
     ],
     [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
     ],
];

const names = [
     ['Alya', 'Rafi', 'Elegant Bloom'],
     ['Nadia', 'Fariz', 'Midnight Luxe'],
     ['Rina', 'Dimas', 'Nature Joy'],
     ['Saskia', 'Arga', 'Rose Gold'],
     ['Rhea', 'Ilham', 'Ocean Whisper'],
     ['Amira', 'Zidan', 'Retro Romance'],
     ['Fira', 'Dava', 'Sunset Vintage'],
     ['Nadya', 'Putra', 'Botanical Minimal'],
     ['Elisa', 'Reza', 'City Light'],
     ['Chika', 'Danang', 'Golden Hour'],
     ['Clara', 'Nathan', 'Velvet Garden'],
     ['Elena', 'Kenzo', 'Snow Mist'],
     ['Sarah', 'Dewa', 'Sunlit Terrace'],
     ['Gadis', 'Arman', 'Forest Whisper'],
     ['Nadia', 'Ilham', 'Cloud Romance'],
];

const palettes = [
     ['#4d97c8', '#1e5d8c', '#ffffff', '#edf7fd'],
     ['#5c86c1', '#294d82', '#ffffff', '#eef3fb'],
     ['#4aa3b5', '#1f6d7d', '#ffffff', '#eaf8fa'],
     ['#6c9bd0', '#356ba5', '#ffffff', '#eef5ff'],
     ['#39a1c0', '#1d6d86', '#ffffff', '#e9f8fc'],
     ['#668ec2', '#345685', '#ffffff', '#eef4fc'],
     ['#4d9fd5', '#1e6799', '#ffffff', '#edf7ff'],
     ['#65a8c8', '#2e718f', '#ffffff', '#edf8fc'],
     ['#7194c5', '#395f96', '#ffffff', '#f0f5fd'],
     ['#4d8fbe', '#245b83', '#ffffff', '#eef7fc'],
     ['#6d93c7', '#3f5e91', '#ffffff', '#f1f5fc'],
     ['#7ca6d3', '#4d709e', '#ffffff', '#f0f7fd'],
     ['#4d9cc4', '#286a87', '#ffffff', '#ebf8fb'],
     ['#6da4c3', '#3b718f', '#ffffff', '#eff8fc'],
     ['#7897cb', '#4d6799', '#ffffff', '#f2f5fc'],
];

export const templates = names.map(([firstName, secondName, title], index) => {
     const [primary, strong, background, backgroundAlt] = palettes[index];
     return {
          id: index + 1,
          title,
          couple: `${firstName} & ${secondName}`,
          firstName,
          secondName,
          date: `${18 + (index % 8)} ${['November', 'Desember', 'Januari', 'Februari'][index % 4]} 2026`,
          venue: ['Grand Garden Hall, Bandung', 'Hotel Grand Meridian', 'Villa Cempaka', 'The Ivory Hall'][index % 4],
          description: 'Dengan penuh syukur, kami mengundang keluarga dan sahabat untuk hadir dalam hari bahagia kami.',
          quote: 'Kehadiran dan doa restu Anda menjadi kebahagiaan yang berarti bagi kami.',
          primary,
          strong,
          background,
          backgroundAlt,
          heroImage: gallerySets[index % gallerySets.length][0],
          gallery: gallerySets[index % gallerySets.length],
          music: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(index % 11) + 1}.mp3`,
          agenda: [
               { time: '08.00', title: 'Akad Nikah', description: 'Prosesi ijab kabul dimulai' },
               { time: '10.00', title: 'Foto Bersama', description: 'Rangkaian foto keluarga dan sahabat' },
               { time: '11.00', title: 'Resepsi', description: 'Makan siang dan hiburan bersama' },
          ],
     };
});

export function getTemplate(id) {
     return templates.find((template) => template.id === Number(id)) || templates[0];
}
