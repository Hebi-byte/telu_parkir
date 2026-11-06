import 'package:flutter/material.dart';
import '../../components/app_header.dart';
import '../../components/dashboard_card.dart';

class LeaderboardSection extends StatelessWidget {
  const LeaderboardSection({super.key});
  static const red = Color(0xFFB7192B);
  static const dark = Color(0xFF292323);
  static const muted = Color(0xFF765F5C);
  static const soft = Color(0xFFF1EDEC);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const AppHeader(),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Row(children: [
              Text('DISIPLIN KAMPUS', style: TextStyle(color: red, fontSize: 10, letterSpacing: 1, fontWeight: FontWeight.w800)),
              Spacer(), Icon(Icons.circle, color: Color(0xFF087A35), size: 9), SizedBox(width: 5),
              Text('Update Harian', style: TextStyle(color: muted, fontSize: 10)),
            ]),
            const SizedBox(height: 6),
            const Text('Leaderboard Pelanggaran', style: TextStyle(fontSize: 23, height: 1.15, fontWeight: FontWeight.w900, color: dark)),
            const SizedBox(height: 5),
            const Text('Peringkat akumulasi poin pelanggaran terverifikasi satpam.', style: TextStyle(fontSize: 12, color: muted)),
            const SizedBox(height: 26),
            _ruleBanner(context), const SizedBox(height: 25), _podium(),
            const SizedBox(height: 24), _myPosition(), const SizedBox(height: 27),
            const Row(children: [
              Expanded(child: Text('Peringkat 4 – 10', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: dark))),
              Text('Urut poin terbanyak', style: TextStyle(fontSize: 10, color: muted)),
            ]),
            const SizedBox(height: 13), ..._rankingRows(), const SizedBox(height: 8), _infoNote(),
          ]),
        ),
      ]),
    );
  }

  Widget _ruleBanner(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
    decoration: BoxDecoration(color: soft, borderRadius: BorderRadius.circular(14)),
    child: Row(children: [
      const Icon(Icons.verified_user_outlined, color: red, size: 17), const SizedBox(width: 8),
      const Expanded(child: Text.rich(TextSpan(style: TextStyle(fontSize: 11, color: muted, height: 1.35), children: [
        TextSpan(text: 'Poin berkurang '), TextSpan(text: '-10', style: TextStyle(fontWeight: FontWeight.w900, color: dark)),
        TextSpan(text: ' tiap bulan tanpa pelanggaran'),
      ]))),
      TextButton(onPressed: () => _showRules(context),
        style: TextButton.styleFrom(backgroundColor: Colors.white, foregroundColor: red, padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 5), minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
        child: const Text('Aturan', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800))),
    ]),
  );

  Widget _podium() => WhiteCard(
    padding: const EdgeInsets.fromLTRB(13, 15, 13, 16),
    child: Column(children: [
      const Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        Icon(Icons.lock_outline, size: 12, color: muted), SizedBox(width: 5),
        Text('Identitas NIM disamarkan sesuai PRD 7.4', style: TextStyle(fontSize: 10, color: muted, fontWeight: FontWeight.w600)),
      ]),
      const SizedBox(height: 12),
      Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
        Expanded(child: _podiumItem(rank: '#2', name: 'Mahasiswa B**', valid: '5 Valid', points: '19', height: 96)),
        Expanded(child: _podiumItem(rank: '#1', name: 'Mahasiswa F***', valid: '8 Valid', points: '28', height: 120, first: true)),
        Expanded(child: _podiumItem(rank: '#3', name: 'Mahasiswa R**', valid: '4 Valid', points: '14', height: 80)),
      ]),
    ]),
  );

  Widget _podiumItem({required String rank, required String name, required String valid, required String points, required double height, bool first = false}) => Column(
    mainAxisAlignment: MainAxisAlignment.end,
    children: [
      CircleAvatar(radius: 22, backgroundColor: soft, child: Text(rank, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: muted))),
      const SizedBox(height: 5),
      Text(name, textAlign: TextAlign.center, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: first ? red : dark)),
      Text(valid, style: const TextStyle(fontSize: 10, color: muted)), const SizedBox(height: 6),
      Container(width: double.infinity, height: height, margin: const EdgeInsets.symmetric(horizontal: 3),
        decoration: BoxDecoration(color: first ? const Color(0xFFFFD8D7) : soft, borderRadius: const BorderRadius.vertical(top: Radius.circular(13))),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          if (first) const Text('TOP #1', style: TextStyle(color: red, fontSize: 10, fontWeight: FontWeight.w900)),
          Text(points, style: TextStyle(fontSize: first ? 31 : 21, height: 1.15, color: first ? const Color(0xFF970019) : dark, fontWeight: FontWeight.w900)),
          const Text('Poin', style: TextStyle(fontSize: 10, color: muted, fontWeight: FontWeight.w600)),
        ]),
      ),
    ],
  );

  Widget _myPosition() => Container(
    width: double.infinity, padding: const EdgeInsets.all(15),
    decoration: BoxDecoration(color: const Color(0xFFECE8E7), borderRadius: BorderRadius.circular(17)),
    child: Column(children: [
      Row(children: [
        const SmallPill('Posisi Anda: #14', background: Color(0xFF99001D), foreground: Colors.white), const SizedBox(width: 8),
        const Expanded(child: Text('Tren: Tetap', style: TextStyle(fontSize: 10, color: muted))),
        const Icon(Icons.verified_outlined, color: Color(0xFF087A35), size: 15), const SizedBox(width: 4),
        const Text('Aktif', style: TextStyle(fontSize: 10, color: Color(0xFF087A35), fontWeight: FontWeight.w800)),
      ]),
      const SizedBox(height: 13),
      Row(children: [
        const CircleAvatar(radius: 21, backgroundColor: Color(0xFFFFD9D8), child: Text('AR', style: TextStyle(color: red, fontWeight: FontWeight.w900))),
        const SizedBox(width: 11),
        const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Alifia R.', style: TextStyle(fontSize: 19, color: dark, fontWeight: FontWeight.w900, height: 1)),
          SizedBox(height: 3), Text('1301213088 • Rekayasa Perangkat Lunak', style: TextStyle(fontSize: 10, color: muted)),
        ])),
        const Text('4', style: TextStyle(fontSize: 35, height: 1, color: Color(0xFF99001D), fontWeight: FontWeight.w900)), const SizedBox(width: 5),
        const Padding(padding: EdgeInsets.only(top: 14), child: Text('Poin\n1 Laporan', style: TextStyle(fontSize: 10, height: 1.5, color: muted, fontWeight: FontWeight.w600))),
      ]),
      const SizedBox(height: 15),
      const Row(children: [
        Expanded(child: Text('Waktu reduksi poin otomatis (-10)', style: TextStyle(fontSize: 10, color: muted, fontWeight: FontWeight.w600))),
        Text('18 Hari Lagi', style: TextStyle(fontSize: 10, color: red, fontWeight: FontWeight.w800)),
      ]),
      const SizedBox(height: 7),
      ClipRRect(borderRadius: BorderRadius.circular(20), child: const LinearProgressIndicator(value: .42, minHeight: 6, backgroundColor: Color(0xFFE2DDDC), color: Color(0xFF99001D))),
    ]),
  );

  List<Widget> _rankingRows() {
    final rows = [
      (4, 'Mahasiswa D***', '3 Lap.', '12', '⚠ Jalur Darurat (+5)'),
      (5, 'Mahasiswa T***', '3 Lap.', '9', '⚠ Parkir Area Terlarang (+3)'),
      (6, 'Mahasiswa K***', '2 Lap.', '8', 'Marka kuning / spion'),
      (7, 'Mahasiswa M***', '2 Lap.', '6', 'Parkir serong luar garis'),
      (8, 'Mahasiswa W***', '1 Lap.', '5', 'Menutupi jalur pejalan'),
    ];
    return rows.map((item) => Padding(padding: const EdgeInsets.only(bottom: 10), child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
      child: Row(children: [
        Container(width: 31, height: 33, decoration: BoxDecoration(color: soft, borderRadius: BorderRadius.circular(9)), alignment: Alignment.center,
          child: Text('${item.$1}', style: const TextStyle(fontSize: 13, color: dark, fontWeight: FontWeight.w800))),
        const SizedBox(width: 11),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [Flexible(child: Text(item.$2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, color: dark, fontWeight: FontWeight.w800))),
            const SizedBox(width: 6), SmallPill(item.$3, background: soft, foreground: muted)]),
          const SizedBox(height: 4), Text(item.$5, style: TextStyle(fontSize: 10, color: item.$1 <= 5 ? red : muted)),
        ])),
        const SizedBox(width: 5),
        Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(item.$4, style: const TextStyle(fontSize: 19, height: 1, color: Color(0xFF99001D), fontWeight: FontWeight.w900)),
          const Text('Poin', style: TextStyle(fontSize: 10, color: muted)),
        ]),
      ]),
    ))).toList();
  }

  Widget _infoNote() => Container(
    padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: soft, borderRadius: BorderRadius.circular(14)),
    child: const Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Icon(Icons.info_outline, color: muted, size: 17), SizedBox(width: 8),
      Expanded(child: Text('Poin pelanggaran mempengaruhi eligibility rekomendasi beasiswa & akses stiker parkir prioritas gedung kuliah bersama.', style: TextStyle(fontSize: 11, height: 1.4, color: muted))),
    ]),
  );

  void _showRules(BuildContext context) {
    showModalBottomSheet(context: context, backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(22))),
      builder: (context) => const Padding(padding: EdgeInsets.fromLTRB(22, 22, 22, 30),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Aturan pengurangan poin', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: dark)),
          SizedBox(height: 12),
          Text('• Setiap pelanggaran yang telah diverifikasi satpam menambah poin ketidakpatuhan.\n• Mahasiswa tanpa pelanggaran selama satu bulan mendapat pengurangan 10 poin.\n• Identitas mahasiswa lain ditampilkan secara anonim.', style: TextStyle(fontSize: 13, height: 1.6, color: muted)),
        ])),
    );
  }
}
