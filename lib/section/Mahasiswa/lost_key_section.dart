import 'package:flutter/material.dart';
import '../../components/app_header.dart';
import '../../components/dashboard_card.dart';

class LostKeySection extends StatefulWidget {
  const LostKeySection({super.key});

  @override
  State<LostKeySection> createState() => _LostKeySectionState();
}

class _LostKeySectionState extends State<LostKeySection> {
  static const red = Color(0xFFB7192B);
  static const dark = Color(0xFF292323);
  static const muted = Color(0xFF765F5C);
  static const soft = Color(0xFFF3EFEE);

  int selectedTab = 0;
  String selectedLocation = 'Semua Lokasi';
  String searchText = '';

  final locations = const ['Semua Lokasi', 'Parkiran GKU', 'Parkiran FIT', 'Masjid'];

  final foundItems = const [
    {
      'code': '#FND-204',
      'title': 'Kunci Honda Scoopy (Gantungan Merah Tel-U)',
      'location': 'Parkir Barat Open Library',
      'time': 'Hari ini, 08:30 WIB',
      'description': 'Ditemukan di dekat portal masuk motor, gantungan boneka kecil dan pita merah Telkom University.',
      'status': 'Diamankan di Pos Satpam Gerbang 1',
      'button': 'Klaim / Hubungi Petugas',
      'icon': 'key',
    },
    {
      'code': '#FND-202',
      'title': 'Smart Key / Remote Yamaha Aerox',
      'location': 'Parkiran Gedung Kuliah Umum (GKU)',
      'time': 'Kemarin, 16:15 WIB',
      'description': 'Remote keyless dengan silikon hitam, kondisi mulus aktif, terjatuh di deretan motor matic blok B.',
      'status': 'Dalam Penanganan Satpam',
      'button': 'Detail & Verifikasi',
      'icon': 'remote',
    },
    {
      'code': '#FND-199',
      'title': 'Kunci Motor dengan Gantungan Hitam',
      'location': 'Parkiran FIT',
      'time': 'Senin, 11:20 WIB',
      'description': 'Satu kunci motor dengan gantungan hitam ditemukan di sekitar area parkir gedung FIT.',
      'status': 'Diamankan di Pos Satpam',
      'button': 'Detail & Verifikasi',
      'icon': 'key',
    },
  ];

  final lostItems = const [
    {
      'code': '#LST-031',
      'title': 'Kunci Honda Vario 160',
      'location': 'Parkiran Gedung FEB',
      'time': 'Hari ini, 09:10 WIB',
      'description': 'Kunci dengan gantungan karakter kecil. Terakhir terlihat saat parkir di area FEB.',
      'status': 'Laporan kehilangan aktif',
      'button': 'Hubungi Pemilik',
      'icon': 'key',
    },
    {
      'code': '#LST-029',
      'title': 'Remote Yamaha NMAX',
      'location': 'Parkiran GKU',
      'time': 'Kemarin, 14:30 WIB',
      'description': 'Remote hitam dengan gantungan karet. Diperkirakan tertinggal dekat deretan motor.',
      'status': 'Menunggu ditemukan',
      'button': 'Saya Menemukan',
      'icon': 'remote',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final source = selectedTab == 0 ? foundItems : lostItems;
    final visible = source.where((item) {
      final query = searchText.toLowerCase();
      final matchesSearch = query.isEmpty ||
          item['title']!.toLowerCase().contains(query) ||
          item['location']!.toLowerCase().contains(query) ||
          item['description']!.toLowerCase().contains(query);
      final matchesLocation = selectedLocation == 'Semua Lokasi' ||
          item['location']!.toLowerCase().contains(selectedLocation.toLowerCase().replaceAll('parkiran ', '').replaceAll('parkiran', '').trim()) ||
          (selectedLocation == 'Parkiran GKU' && item['location']!.contains('GKU'));
      return matchesSearch && matchesLocation;
    }).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const AppHeader(),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(width: 8, height: 25, decoration: BoxDecoration(color: red, borderRadius: BorderRadius.circular(8))),
                const SizedBox(width: 9),
                const Expanded(child: Text('Kehilangan & Penemuan Kunci',
                  style: TextStyle(fontSize: 20, height: 1.25, fontWeight: FontWeight.w800, color: dark))),
                const SizedBox(width: 7),
                ElevatedButton.icon(
                  onPressed: _createReport,
                  icon: const Icon(Icons.add_circle_outline, size: 17),
                  label: const Text('Buat\\nLaporan', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, height: 1.15, fontWeight: FontWeight.w800)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: red, foregroundColor: Colors.white,
                    elevation: 0, padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 10),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                  ),
                ),
              ]),
              const SizedBox(height: 6),
              const Text('Pusat informasi kehilangan dan penemuan kunci kendaraan di area Telkom University.',
                style: TextStyle(fontSize: 12, height: 1.4, color: muted)),
              const SizedBox(height: 16),
              _tabs(),
              const SizedBox(height: 15),
              _searchField(),
              const SizedBox(height: 12),
              _locationFilters(),
              const SizedBox(height: 17),
              if (visible.isEmpty)
                _emptyState()
              else
                ...visible.map((item) => _itemCard(item)),
              const SizedBox(height: 4),
              _procedureCard(),
            ]),
          ),
        ],
      ),
    );
  }

  Widget _tabs() => Container(
    padding: const EdgeInsets.all(4),
    decoration: BoxDecoration(color: const Color(0xFFEFECEB), borderRadius: BorderRadius.circular(14)),
    child: Row(children: [
      _tabButton('Kunci Ditemukan (${foundItems.length + 5})', 0, Icons.verified),
      _tabButton('Kunci Kehilangan (${lostItems.length + 1})', 1, Icons.search),
    ]),
  );

  Widget _tabButton(String label, int index, IconData icon) {
    final active = selectedTab == index;
    return Expanded(child: GestureDetector(
      onTap: () => setState(() => selectedTab = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
        decoration: BoxDecoration(color: active ? Colors.white : Colors.transparent, borderRadius: BorderRadius.circular(10)),
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(icon, size: 14, color: active ? red : muted),
          const SizedBox(width: 5),
          Flexible(child: Text(label, maxLines: 1, overflow: TextOverflow.ellipsis,
            style: TextStyle(fontSize: 10, color: active ? red : muted, fontWeight: FontWeight.w800))),
        ]),
      ),
    ));
  }

  Widget _searchField() => Container(
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
    child: TextField(
      onChanged: (value) => setState(() => searchText = value),
      decoration: const InputDecoration(
        hintText: 'Cari merek kendaraan, gantungan kunci, lokasi...',
        hintStyle: TextStyle(fontSize: 11, color: Color(0xFF9A8580)),
        prefixIcon: Icon(Icons.search, color: muted, size: 19),
        border: InputBorder.none,
        contentPadding: EdgeInsets.symmetric(vertical: 14),
      ),
      style: const TextStyle(fontSize: 12, color: dark),
    ),
  );

  Widget _locationFilters() => SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    child: Row(children: locations.map((location) {
      final active = selectedLocation == location;
      return Padding(
        padding: const EdgeInsets.only(right: 7),
        child: GestureDetector(
          onTap: () => setState(() => selectedLocation = location),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
            decoration: BoxDecoration(color: active ? const Color(0xFF99001D) : const Color(0xFFEFECEB), borderRadius: BorderRadius.circular(20)),
            child: Text(location, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: active ? Colors.white : muted)),
          ),
        ),
      );
    }).toList()),
  );

  Widget _itemCard(Map<String, String> item) {
    final found = selectedTab == 0;
    return Container(
      margin: const EdgeInsets.only(bottom: 11),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(17), border: Border.all(color: const Color(0xFFF1EAE8))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          _itemImage(item['icon']!, item['code']!),
          const SizedBox(width: 11),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(item['title']!, style: const TextStyle(fontSize: 13, height: 1.35, fontWeight: FontWeight.w800, color: dark)),
            const SizedBox(height: 5),
            Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Icon(Icons.location_on_outlined, color: red, size: 14),
              const SizedBox(width: 3),
              Expanded(child: Text(item['location']!, style: const TextStyle(fontSize: 10, color: muted))),
            ]),
            const SizedBox(height: 5),
            Row(children: [
              const Icon(Icons.access_time, color: muted, size: 13),
              const SizedBox(width: 4),
              Text(item['time']!, style: const TextStyle(fontSize: 10, color: muted)),
            ]),
          ])),
        ]),
        const SizedBox(height: 11),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(color: soft, borderRadius: BorderRadius.circular(10)),
          child: Text(item['description']!, style: const TextStyle(fontSize: 11, height: 1.4, color: muted)),
        ),
        const SizedBox(height: 12),
        SmallPill(item['status']!,
          background: found && item['status']!.contains('Diamankan') ? const Color(0xFF70F28B) : const Color(0xFFFFDAD7),
          foreground: found && item['status']!.contains('Diamankan') ? const Color(0xFF075B2B) : const Color(0xFF7A2525),
          icon: found ? Icons.shield : Icons.pending_actions),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: () => _showItemDetails(item),
            icon: Icon(found && item['status']!.contains('Diamankan') ? Icons.shield_outlined : Icons.open_in_new, size: 16),
            label: Text(item['button']!, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800)),
            style: ElevatedButton.styleFrom(
              backgroundColor: found && item['status']!.contains('Diamankan') ? red : const Color(0xFFECE8E7),
              foregroundColor: found && item['status']!.contains('Diamankan') ? Colors.white : dark,
              elevation: 0, padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(9)),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _itemImage(String kind, String code) => Container(
    width: 80, height: 80,
    decoration: BoxDecoration(color: const Color(0xFFE8DEDA), borderRadius: BorderRadius.circular(10)),
    child: Stack(children: [
      Center(child: Icon(kind == 'remote' ? Icons.settings_remote : Icons.key, size: 35, color: const Color(0xFF80645C))),
      Positioned(left: 4, top: 5, child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
        decoration: BoxDecoration(color: const Color(0xFFE8F8E8), borderRadius: BorderRadius.circular(4)),
        child: Text(code, style: const TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Color(0xFF236B37))),
      )),
    ]),
  );

  Widget _procedureCard() => Container(
    margin: const EdgeInsets.only(top: 5),
    padding: const EdgeInsets.all(13),
    decoration: BoxDecoration(color: const Color(0xFFFFECEB), borderRadius: BorderRadius.circular(14)),
    child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const CircleAvatar(radius: 16, backgroundColor: Color(0xFFFFD7D4),
        child: Icon(Icons.shield, color: red, size: 18)),
      const SizedBox(width: 10),
      const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('Prosedur Pengambilan Kunci', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: red)),
        SizedBox(height: 3),
        Text.rich(TextSpan(style: TextStyle(fontSize: 10, height: 1.4, color: dark), children: [
          TextSpan(text: 'Pengambilan kunci wajib menunjukkan '),
          TextSpan(text: 'STNK asli & kartu mahasiswa (KTM)', style: TextStyle(color: red, fontWeight: FontWeight.w800)),
          TextSpan(text: ' di Pos Satpam terkait untuk verifikasi identitas pemilik.'),
        ])),
      ])),
    ]),
  );

  Widget _emptyState() => Container(
    width: double.infinity, padding: const EdgeInsets.all(24),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(15)),
    child: const Column(children: [
      Icon(Icons.search_off, size: 35, color: muted),
      SizedBox(height: 8),
      Text('Data tidak ditemukan', style: TextStyle(fontWeight: FontWeight.w800, color: dark)),
      SizedBox(height: 4),
      Text('Coba kata kunci atau lokasi lainnya.', style: TextStyle(fontSize: 11, color: muted)),
    ]),
  );

  void _createReport() {
    showModalBottomSheet(
      context: context, isScrollControlled: true, backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(22))),
      builder: (context) => const _CreateLostReportSheet(),
    );
  }

  void _showItemDetails(Map<String, String> item) {
    showModalBottomSheet(
      context: context, backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(22))),
      builder: (context) => Padding(
        padding: const EdgeInsets.fromLTRB(22, 22, 22, 28),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(item['title']!, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: dark)),
          const SizedBox(height: 10),
          Text('Kode laporan: ${item['code']}', style: const TextStyle(fontSize: 12, color: muted)),
          const SizedBox(height: 6),
          Text('Lokasi: ${item['location']}', style: const TextStyle(fontSize: 12, color: muted)),
          const SizedBox(height: 6),
          Text('Waktu: ${item['time']}', style: const TextStyle(fontSize: 12, color: muted)),
          const SizedBox(height: 12),
          Text(item['description']!, style: const TextStyle(fontSize: 13, height: 1.4, color: dark)),
          const SizedBox(height: 15),
          const Text('Untuk klaim atau verifikasi, silakan hubungi petugas keamanan di pos satpam terkait.',
            style: TextStyle(fontSize: 12, color: muted, height: 1.4)),
        ]),
      ),
    );
  }

  void _showRules(BuildContext context) {
    showModalBottomSheet(
      context: context, backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(22))),
      builder: (context) => const Padding(
        padding: EdgeInsets.all(22),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Informasi laporan', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: dark)),
          SizedBox(height: 10),
          Text('Gunakan menu ini untuk melihat kunci yang ditemukan maupun melaporkan kunci kendaraan yang hilang. Pastikan lokasi dan ciri-ciri kunci ditulis dengan jelas.',
            style: TextStyle(fontSize: 13, height: 1.5, color: muted)),
        ]),
      ),
    );
  }
}

class _CreateLostReportSheet extends StatefulWidget {
  const _CreateLostReportSheet();

  @override
  State<_CreateLostReportSheet> createState() => _CreateLostReportSheetState();
}

class _CreateLostReportSheetState extends State<_CreateLostReportSheet> {
  final titleController = TextEditingController();
  final locationController = TextEditingController();
  final detailController = TextEditingController();

  @override
  void dispose() {
    titleController.dispose();
    locationController.dispose();
    detailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const red = Color(0xFFB7192B);
    return Padding(
      padding: EdgeInsets.fromLTRB(20, 22, 20, MediaQuery.of(context).viewInsets.bottom + 24),
      child: SingleChildScrollView(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
        const Text('Buat Laporan Kehilangan', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w900)),
        const SizedBox(height: 15),
        _field(titleController, 'Nama / jenis kunci', 'Contoh: Kunci Honda Vario 160'),
        const SizedBox(height: 10),
        _field(locationController, 'Lokasi terakhir terlihat', 'Contoh: Parkiran GKU'),
        const SizedBox(height: 10),
        _field(detailController, 'Ciri-ciri dan keterangan', 'Warna, gantungan, waktu kehilangan...', maxLines: 3),
        const SizedBox(height: 15),
        SizedBox(width: double.infinity, child: ElevatedButton(
          onPressed: () {
            if (titleController.text.trim().isEmpty || locationController.text.trim().isEmpty) {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Isi jenis kunci dan lokasi terlebih dahulu.')));
              return;
            }
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Form laporan demo berhasil dikirim.')));
          },
          style: ElevatedButton.styleFrom(backgroundColor: red, foregroundColor: Colors.white, padding: const EdgeInsets.symmetric(vertical: 13)),
          child: const Text('Kirim Laporan'),
        )),
      ])),
    );
  }

  Widget _field(TextEditingController controller, String label, String hint, {int maxLines = 1}) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
      const SizedBox(height: 6),
      TextField(controller: controller, maxLines: maxLines,
        decoration: InputDecoration(hintText: hint, hintStyle: const TextStyle(fontSize: 12),
          filled: true, fillColor: const Color(0xFFF5F1F0), border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none)),
      ),
    ],
  );
}
