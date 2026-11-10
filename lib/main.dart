import 'package:flutter/material.dart';

import 'components/bottom_nav.dart';
import 'section/Mahasiswa/dashboard_mahasiswa_section.dart';
import 'section/Mahasiswa/leaderboard_section.dart';
import 'section/Mahasiswa/lost_key_section.dart';
import 'section/Mahasiswa/profile_section.dart';
import 'section/Mahasiswa/report_section.dart';

void main() {
  runApp(const TelUParkirApp());
}

class TelUParkirApp extends StatelessWidget {
  const TelUParkirApp({super.key});

  @override
  Widget build(BuildContext context) {
    const maroon = Color(0xFFB7192B);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tel-U Parkir',
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFFAF8F7),
        colorScheme: ColorScheme.fromSeed(
          seedColor: maroon,
          primary: maroon,
          surface: const Color(0xFFFAF8F7),
        ),
        fontFamily: 'Roboto',
      ),
      home: const MainNavigation(),
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int selectedIndex = 0;

  final List<String> titles = const [
    'Dashboard',
    'Leaderboard',
    'Report',
    'Kehilangan',
    'Profile',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: IndexedStack(
          index: selectedIndex,
          children: [
            DashboardSection(
              onNavigate: (index) => setState(() => selectedIndex = index),
            ),
            const LeaderboardSection(),
            const ReportSection(),
            const LostKeySection(),
            const ProfileSection(),
          ],
        ),
      ),
      bottomNavigationBar: AppBottomNav(
        selectedIndex: selectedIndex,
        onTap: (index) => setState(() => selectedIndex = index),
      ),
    );
  }
}

class SimplePage extends StatelessWidget {
  final String title;
  final IconData icon;

  const SimplePage({super.key, required this.title, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 54, color: const Color(0xFFB7192B)),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 6),
          const Text(
            'Halaman ini dapat dikembangkan selanjutnya.',
            style: TextStyle(color: Color(0xFF766866)),
          ),
        ],
      ),
    );
  }
}
