import 'package:flutter/material.dart';

import '../../components/app_header.dart';
import '../../components/dashboard_card.dart';

class ReportSection extends StatefulWidget {
  const ReportSection({super.key});

  @override
  State<ReportSection> createState() => _ReportSectionState();
}

class _ReportSectionState extends State<ReportSection> {
  static const red = Color(0xFFB7192B);
  static const inkColor = Color(0xFF292323);
  static const mutedColor = Color(0xFF765F5C);
  static const field = Color(0xFFF4F0EF);

  final plateController = TextEditingController(text: 'D 5482 UBW');
  final noteController = TextEditingController(
    text: 'Motor parkir tepat di depan pintu keluar tangga darurat lantai 1 Tokong Nanas.',
  );
  String violation = 'Menghalangi akses jalan';
  String location = 'Parkiran Motor GKU / Tokong Nanas';

  @override
  void dispose() {
    plateController.dispose();
    noteController.dispose();
    super.dispose();
  }

  void _message(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const AppHeader(),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(
                      Icons.warning_amber_rounded,
                      color: red,
                      size: 25,
                    ),
                    const SizedBox(width: 9),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            'Lapor Parkir',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w900,
                              color: inkColor,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Bantu jaga ketertiban parkir Tel-U. Laporan tervalidasi akan segera ditindaklanjuti.',
                            style: TextStyle(
                              fontSize: 12,
                              height: 1.45,
                              color: mutedColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                _formCard(),
                const SizedBox(height: 12),
                const Row(
                  children: [
                    Icon(
                      Icons.verified_user_outlined,
                      size: 16,
                      color: Color(0xFF188A4B),
                    ),
                    SizedBox(width: 6),
                    Text(
                      'Identitas pelapor terenkripsi dan dirahasiakan.',
                      style: TextStyle(fontSize: 10, color: mutedColor),
                    ),
                  ],
                ),
                const SizedBox(height: 13),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: _submit,
                    icon: const Icon(Icons.send_rounded, size: 18),
                    label: const Text(
                      'Kirim Laporan',
                      style: TextStyle(fontWeight: FontWeight.w800),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: red,
                      foregroundColor: Colors.white,
                      elevation: 2,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(13),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 27),
                SectionHeading(
                  title: 'Riwayat Laporan',
                  trailing: 'Lihat Semua ›',
                  onTrailingTap: () =>
                      _message('Semua riwayat laporan dibuka.'),
                ),
                const SizedBox(height: 10),
                _historyCard(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _formCard() {
    return WhiteCard(
      padding: EdgeInsets.zero,
      child: Column(
        children: [
          _section(
            label: 'Plat Nomor Kendaraan',
            icon: Icons.directions_car_outlined,
            trailing: const Text(
              'Wajib',
              style: TextStyle(
                fontSize: 10,
                color: red,
                fontWeight: FontWeight.w700,
              ),
            ),
            child: Column(
              children: [
                TextField(
                  controller: plateController,
                  textCapitalization: TextCapitalization.characters,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(
                      Icons.two_wheeler_rounded,
                      color: mutedColor,
                      size: 19,
                    ),
                    suffixIcon: Padding(
                      padding: const EdgeInsets.all(9),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 7,
                          vertical: 5,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFE6E0DE),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          'RI / BDG',
                          style: TextStyle(
                            fontSize: 9,
                            color: mutedColor,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ),
                    filled: true,
                    fillColor: field,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide.none,
                    ),
                    contentPadding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 8),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Row(
                    children: [
                      Icon(
                        Icons.check_circle,
                        color: Color(0xFF24A45C),
                        size: 15,
                      ),
                      SizedBox(width: 5),
                      Text(
                        'Format plat otomatis terverifikasi',
                        style: TextStyle(fontSize: 10, color: mutedColor),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          _section(
            label: 'Jenis Pelanggaran',
            icon: Icons.warning_amber_rounded,
            trailing: TextButton.icon(
              onPressed: () =>
                  _message('Karma bertambah sesuai laporan yang tervalidasi.'),
              icon: const Icon(Icons.add_circle_outline, size: 14),
              label: const Text(
                'Karma',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800),
              ),
              style: TextButton.styleFrom(
                foregroundColor: red,
                padding: EdgeInsets.zero,
                minimumSize: Size.zero,
              ),
            ),
            child: Column(
              children: [
                _violationRow('Parkir tidak sesuai marka', '+1 Poin'),
                _violationRow('Menghalangi akses jalan', '+4 Poin'),
                _violationRow('Parkir di area terlarang', '+7 Poin'),
              ],
            ),
          ),
          _section(
            label: 'Lokasi Kejadian',
            icon: Icons.location_on_outlined,
            child: DropdownButtonFormField<String>(
              value: location,
              items: const [
                DropdownMenuItem(
                  value: 'Parkiran Motor GKU / Tokong Nanas',
                  child: Text('Parkiran Motor GKU / Tokong Nanas'),
                ),
                DropdownMenuItem(
                  value: 'Parkiran FIT',
                  child: Text('Parkiran FIT'),
                ),
                DropdownMenuItem(
                  value: 'GKU Gate 1',
                  child: Text('GKU Gate 1'),
                ),
              ],
              onChanged: (value) =>
                  setState(() => location = value ?? location),
              decoration: InputDecoration(
                filled: true,
                fillColor: field,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 11,
                ),
              ),
              style: const TextStyle(fontSize: 11, color: inkColor),
              icon: const Icon(
                Icons.keyboard_arrow_down_rounded,
                color: mutedColor,
              ),
            ),
          ),
          _section(
            label: 'Bukti Foto',
            icon: Icons.camera_alt_outlined,
            trailing: const SmallPill(
              '✓ 1 Terlampir',
              background: Color(0xFFE1F8E8),
              foreground: Color(0xFF188A4B),
            ),
            child: _photoPreview(),
          ),
          _section(
            label: 'Catatan Tambahan',
            icon: Icons.notes_rounded,
            trailing: const Text(
              'Opsional',
              style: TextStyle(fontSize: 10, color: mutedColor),
            ),
            child: TextField(
              controller: noteController,
              maxLines: 3,
              decoration: InputDecoration(
                filled: true,
                fillColor: field,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.all(12),
              ),
              style: const TextStyle(
                fontSize: 12,
                height: 1.35,
                color: inkColor,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _section({
    required String label,
    required IconData icon,
    required Widget child,
    Widget? trailing,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0xFFF0E9E7))),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: red, size: 17),
              const SizedBox(width: 7),
              Expanded(
                child: Text(
                  label,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: inkColor,
                  ),
                ),
              ),
              if (trailing != null) trailing,
            ],
          ),
          const SizedBox(height: 10),
          child,
        ],
      ),
    );
  }

  Widget _violationRow(String title, String points) {
    final active = violation == title;
    return GestureDetector(
      onTap: () => setState(() => violation = title),
      child: Container(
        margin: const EdgeInsets.only(bottom: 4),
        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 9),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFF7F2F1) : Colors.transparent,
          borderRadius: BorderRadius.circular(9),
        ),
        child: Row(
          children: [
            Icon(
              active ? Icons.radio_button_checked : Icons.radio_button_off,
              color: active ? red : const Color(0xFFB5A6A3),
              size: 17,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: 11,
                  color: active ? red : mutedColor,
                  fontWeight: active ? FontWeight.w800 : FontWeight.w500,
                ),
              ),
            ),
            if (active)
              SmallPill(
                points,
                background: const Color(0xFFFFD9DC),
                foreground: red,
              )
            else
              Text(
                points,
                style: const TextStyle(fontSize: 10, color: mutedColor),
              ),
          ],
        ),
      ),
    );
  }

  Widget _photoPreview() {
    return Container(
      height: 175,
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(10)),
      child: Stack(
        children: [
          Positioned.fill(child: CustomPaint(painter: _ParkingPainter())),
          const Positioned(
            top: 10,
            left: 11,
            child: Text(
              '28 Mar, 09:42 WIB',
              style: TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 10,
            child: SmallPill(
              '⌖ GKU Gate 1',
              background: Colors.black54,
              foreground: Colors.white,
            ),
          ),
          Positioned(
            bottom: 10,
            right: 10,
            child: OutlinedButton.icon(
              onPressed: () => _message('Pemilih foto demo dibuka.'),
              icon: const Icon(Icons.camera_alt_outlined, size: 14),
              label: const Text(
                'Ganti',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800),
              ),
              style: OutlinedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: red,
                side: BorderSide.none,
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 7),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _historyCard() {
    return WhiteCard(
      padding: const EdgeInsets.all(11),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: const Color(0xFF8C3E3E),
              borderRadius: BorderRadius.circular(9),
            ),
            child: const Icon(Icons.two_wheeler, color: Colors.white, size: 28),
          ),
          const SizedBox(width: 10),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'D 3319 ZB  •  Jalur Pedestrian',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: inkColor,
                  ),
                ),
                SizedBox(height: 5),
                Text(
                  'Hari ini, 08:15 WIB',
                  style: TextStyle(fontSize: 10, color: mutedColor),
                ),
              ],
            ),
          ),
          const SmallPill(
            '● Menunggu',
            background: Color(0xFFFFE0E2),
            foreground: red,
          ),
        ],
      ),
    );
  }

  void _submit() {
    if (plateController.text.trim().isEmpty) {
      _message('Plat nomor wajib diisi.');
      return;
    }
    _message('Laporan berhasil disiapkan untuk dikirim.');
  }
}

class _ParkingPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;
    paint.color = const Color(0xFF9D918A);
    canvas.drawRect(Offset.zero & size, paint);
    paint.color = const Color(0xFFD9D0C6);
    canvas.drawRect(
      Rect.fromLTWH(
        size.width * .08,
        size.height * .18,
        size.width * .48,
        size.height * .62,
      ),
      paint,
    );
    paint.color = const Color(0xFF776A64);
    canvas.drawRect(
      Rect.fromLTWH(
        size.width * .68,
        size.height * .16,
        size.width * .2,
        size.height * .64,
      ),
      paint,
    );
    paint.color = const Color(0xFF4A403C);
    canvas.drawOval(
      Rect.fromLTWH(
        size.width * .39,
        size.height * .35,
        size.width * .22,
        size.height * .38,
      ),
      paint,
    );
    paint.color = const Color(0xFF282322);
    canvas.drawCircle(
      Offset(size.width * .46, size.height * .7),
      size.height * .07,
      paint,
    );
    canvas.drawCircle(
      Offset(size.width * .56, size.height * .7),
      size.height * .07,
      paint,
    );
    paint.color = const Color(0xFFB7192B);
    canvas.drawRect(
      Rect.fromLTWH(
        size.width * .47,
        size.height * .38,
        size.width * .08,
        size.height * .2,
      ),
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
