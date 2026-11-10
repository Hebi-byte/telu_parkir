import 'package:flutter/material.dart';

import '../../components/app_header.dart';
import '../../components/dashboard_card.dart';

class ProfileSection extends StatefulWidget {
  const ProfileSection({super.key});

  @override
  State<ProfileSection> createState() => _ProfileSectionState();
}

class _ProfileSectionState extends State<ProfileSection> {
  static const red = Color(0xFFB7192B);
  static const inkColor = Color(0xFF292323);
  static const mutedColor = Color(0xFF765F5C);
  bool notificationsEnabled = true;

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
                const Text(
                  'Profile',
                  style: TextStyle(
                    fontSize: 23,
                    fontWeight: FontWeight.w900,
                    color: inkColor,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Kelola akun, kendaraan, dan preferensi kamu.',
                  style: TextStyle(fontSize: 12, color: mutedColor),
                ),
                const SizedBox(height: 18),
                _profileCard(),
                const SizedBox(height: 18),
                _statusCard(),
                const SizedBox(height: 24),
                SectionHeading(
                  title: 'Kendaraan Saya (1 Terdaftar)',
                  trailing: '+ Tambah',
                  onTrailingTap: () =>
                      _message('Form tambah kendaraan dibuka.'),
                ),
                const SizedBox(height: 10),
                _vehicleCard(),
                const SizedBox(height: 18),
                _logCard(),
                const SizedBox(height: 25),
                const Text(
                  'PREFERENSI & LAYANAN',
                  style: TextStyle(
                    fontSize: 11,
                    letterSpacing: .4,
                    color: mutedColor,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 9),
                _preferencesCard(),
                const SizedBox(height: 18),
                SizedBox(
                  width: double.infinity,
                  child: TextButton.icon(
                    onPressed: () =>
                        _message('Konfirmasi keluar akun diperlukan.'),
                    icon: const Icon(Icons.logout_rounded, size: 17),
                    label: const Text(
                      'Keluar dari Akun Tel-U',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    style: TextButton.styleFrom(
                      backgroundColor: const Color(0xFFFFE6E7),
                      foregroundColor: red,
                      padding: const EdgeInsets.symmetric(vertical: 13),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(11),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Center(
                  child: Text(
                    'Tel-U Parkir Mobile v2.4.1 • Unit Logistik & Keamanan Telkom University',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 9,
                      height: 1.4,
                      color: mutedColor,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _profileCard() {
    return WhiteCard(
      child: Column(
        children: [
          Row(
            children: [
              Stack(
                children: [
                  const CircleAvatar(
                    radius: 34,
                    backgroundColor: Color(0xFFE2C3B9),
                    child: Text(
                      'AR',
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: red,
                        fontSize: 17,
                      ),
                    ),
                  ),
                  Positioned(
                    right: 0,
                    bottom: 0,
                    child: Container(
                      width: 18,
                      height: 18,
                      decoration: BoxDecoration(
                        color: const Color(0xFF25A35C),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 2),
                      ),
                      child: const Icon(
                        Icons.check,
                        color: Colors.white,
                        size: 11,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 13),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Alifia Rahma',
                      style: TextStyle(
                        fontSize: 19,
                        fontWeight: FontWeight.w900,
                        color: inkColor,
                      ),
                    ),
                    SizedBox(height: 5),
                    SmallPill(
                      'Mahasiswa Aktif',
                      background: red,
                      foreground: Colors.white,
                    ),
                    SizedBox(height: 7),
                    Text(
                      'NIM: 1301213045',
                      style: TextStyle(fontSize: 11, color: mutedColor),
                    ),
                    SizedBox(height: 3),
                    Text(
                      'S1 Informatika • Fakultas Informatika',
                      style: TextStyle(fontSize: 10, color: mutedColor),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          InkWell(
            onTap: () => _message('Email berhasil disalin.'),
            borderRadius: BorderRadius.circular(9),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 12),
              decoration: BoxDecoration(
                color: const Color(0xFFF4F0EF),
                borderRadius: BorderRadius.circular(9),
              ),
              child: const Row(
                children: [
                  Icon(Icons.mail_outline, color: red, size: 17),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'alifiarahma@student.telkomuniversity.ac.id',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(fontSize: 10, color: inkColor),
                    ),
                  ),
                  Icon(Icons.copy_outlined, color: mutedColor, size: 15),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _statusCard() {
    return WhiteCard(
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.warning_amber_rounded, color: red, size: 19),
              const SizedBox(width: 7),
              const Expanded(
                child: Text(
                  'Status Pelanggaran',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: inkColor,
                  ),
                ),
              ),
              const SmallPill(
                '⚠ Peringatan Ringan',
                background: Color(0xFFFFE2E3),
                foreground: red,
              ),
            ],
          ),
          const SizedBox(height: 19),
          Row(
            children: [
              const Text(
                '4',
                style: TextStyle(
                  fontSize: 39,
                  height: 1,
                  color: red,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(width: 19),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(99),
                  child: const LinearProgressIndicator(
                    value: .25,
                    minHeight: 8,
                    color: red,
                    backgroundColor: Color(0xFFEAE4E2),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 17),
          Container(
            padding: const EdgeInsets.all(11),
            decoration: BoxDecoration(
              color: const Color(0xFFE0F8E8),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Row(
              children: [
                CircleAvatar(
                  radius: 15,
                  backgroundColor: Color(0xFF28A45D),
                  child: Icon(
                    Icons.arrow_upward,
                    color: Colors.white,
                    size: 16,
                  ),
                ),
                SizedBox(width: 9),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Reward Disiplin Parkir',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF087A35),
                        ),
                      ),
                      SizedBox(height: 3),
                      Text(
                        '18 hari lagi menuju bonus pengurangan -10 poin.',
                        style: TextStyle(
                          fontSize: 10,
                          color: Color(0xFF43845A),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _vehicleCard() {
    return WhiteCard(
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.two_wheeler_rounded, color: red, size: 25),
              const SizedBox(width: 10),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Honda Vario 160 CBS',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                        color: inkColor,
                      ),
                    ),
                    SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          'Warna: Matte Black',
                          style: TextStyle(fontSize: 10, color: mutedColor),
                        ),
                        SizedBox(width: 8),
                        SmallPill(
                          '✓ Terverifikasi',
                          background: Color(0xFFE0F8E8),
                          foreground: Color(0xFF188A4B),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 13),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 11),
            decoration: BoxDecoration(
              color: const Color(0xFFF4F0EF),
              borderRadius: BorderRadius.circular(9),
            ),
            child: Row(
              children: [
                const Icon(Icons.badge_outlined, color: mutedColor, size: 17),
                const SizedBox(width: 8),
                const Text(
                  'D',
                  style: TextStyle(color: red, fontWeight: FontWeight.w800),
                ),
                const SizedBox(width: 8),
                const Text(
                  '4521 TLU',
                  style: TextStyle(
                    fontSize: 16,
                    letterSpacing: 1,
                    fontWeight: FontWeight.w900,
                    color: inkColor,
                  ),
                ),
                const Spacer(),
                const SmallPill(
                  'RODA DUA',
                  background: Color(0xFFE7E0DE),
                  foreground: mutedColor,
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: TextButton.icon(
              onPressed: () => _message('Mode edit kendaraan dibuka.'),
              icon: const Icon(Icons.edit_outlined, size: 15),
              label: const Text(
                'Edit',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800),
              ),
              style: TextButton.styleFrom(
                backgroundColor: const Color(0xFFF4F0EF),
                foregroundColor: red,
                padding: const EdgeInsets.symmetric(vertical: 9),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _logCard() {
    return WhiteCard(
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.history_rounded, color: red, size: 20),
              const SizedBox(width: 7),
              const Expanded(
                child: Text(
                  'Riwayat & Mutasi Poin',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: inkColor,
                  ),
                ),
              ),
              TextButton(
                onPressed: () => _message('Semua log poin dibuka.'),
                style: TextButton.styleFrom(
                  foregroundColor: red,
                  padding: EdgeInsets.zero,
                  minimumSize: Size.zero,
                ),
                child: const Text(
                  'Semua Log',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800),
                ),
              ),
            ],
          ),
          const SizedBox(height: 13),
          _logRow(
            '+4',
            'Menghalangi Akses GKU',
            '#RPT-8821 • Saptu Budi',
            '24 Mar 2025',
            false,
          ),
          _logRow(
            '-10',
            'Bonus Disiplin Bulanan',
            'Sistem Otomatis • Saldo: 0 Poin',
            '01 Feb 2025',
            true,
          ),
          _logRow(
            '+3',
            'Parkir di Luar Marka',
            '#RPT-7410 • Zona Parkir FIT',
            '15 Jan 2025',
            false,
          ),
        ],
      ),
    );
  }

  Widget _logRow(
    String point,
    String title,
    String subtitle,
    String date,
    bool green,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 7),
      padding: const EdgeInsets.all(9),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F3F2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Container(
            width: 34,
            height: 34,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: green ? const Color(0xFFDFF8E8) : const Color(0xFFFFE0E2),
              shape: BoxShape.circle,
            ),
            child: Text(
              point,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: green ? const Color(0xFF188A4B) : red,
              ),
            ),
          ),
          const SizedBox(width: 9),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: green ? const Color(0xFF188A4B) : inkColor,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 9, color: mutedColor),
                ),
              ],
            ),
          ),
          Text(date, style: const TextStyle(fontSize: 9, color: mutedColor)),
        ],
      ),
    );
  }

  Widget _preferencesCard() {
    return WhiteCard(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Column(
        children: [
          _preferenceRow(
            Icons.notifications_none_rounded,
            'Notifikasi Pelanggaran & Kehilangan',
            'Push notif & pembaruan status',
            trailing: Switch(
              value: notificationsEnabled,
              onChanged: (value) =>
                  setState(() => notificationsEnabled = value),
              activeColor: red,
              materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
          ),
          _preferenceRow(
            Icons.gavel_rounded,
            'Ajukan Keberatan Pelanggaran',
            'Banding bukti foto',
            onTap: () => _message('Halaman keberatan dibuka.'),
          ),
          _preferenceRow(
            Icons.menu_book_outlined,
            'Bantuan & Aturan Parkir Kampus',
            'Panduan zonasi, jam operasional, SOP',
            onTap: () => _message('Panduan parkir dibuka.'),
          ),
        ],
      ),
    );
  }

  Widget _preferenceRow(
    IconData icon,
    String title,
    String subtitle, {
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          children: [
            Container(
              width: 30,
              height: 30,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: const Color(0xFFF3EFEE),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(icon, color: mutedColor, size: 17),
            ),
            const SizedBox(width: 9),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: inkColor,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    subtitle,
                    style: const TextStyle(fontSize: 9, color: mutedColor),
                  ),
                ],
              ),
            ),
            trailing ??
                const Icon(
                  Icons.chevron_right_rounded,
                  color: mutedColor,
                  size: 19,
                ),
          ],
        ),
      ),
    );
  }
}
