import 'package:cryptolink/screens/cryptos/cryptos.dart';
import 'package:cryptolink/utils/constants.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  //int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("CryptoLink"),
        backgroundColor: kPrimaryColor,
      ),
      body: const CryptosScreen(),
      // IndexedStack(
      //   index: _selectedIndex,
      //   children: [
      //     Container(
      //       color: kPrimaryColor,
      //       child: const Center(
      //         child: Text("Homepage"),
      //       ),
      //     ),
      //     const CryptosScreen(),
      //     Container(
      //       color: kPrimaryColor,
      //       child: const Center(
      //         child: Text("Articles"),
      //       ),
      //     ),
      //     Container(
      //       color: kPrimaryColor,
      //       child: const Center(
      //         child: Text("Forum"),
      //       ),
      //     ),
      //     Container(
      //       color: kPrimaryColor,
      //       child: const Center(
      //         child: Text("Dashboard"),
      //       ),
      //     ),
      //   ],
      // ),
      // bottomNavigationBar: BottomNavigationBar(
      //   unselectedItemColor: Colors.grey[500],
      //   items: const <BottomNavigationBarItem>[
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.home),
      //       label: 'Accueil',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.show_chart),
      //       label: 'Cyptos',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.text_snippet),
      //       label: 'Articles',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.forum),
      //       label: 'Forum',
      //     ),
      //     BottomNavigationBarItem(
      //       icon: Icon(Icons.person),
      //       label: 'Dashboard',
      //     ),
      //   ],
      //   currentIndex: _selectedIndex,
      //   selectedItemColor: kPrimaryColor,
      //   onTap: (index) {
      //     setState(() {
      //       _selectedIndex = index;
      //     });
      //   },
      // ),
    );
  }
}
