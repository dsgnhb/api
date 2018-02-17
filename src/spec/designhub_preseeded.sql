SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `database_dsgnhb_api`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `discord_donations`
--

CREATE TABLE `discord_donations` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(64) NOT NULL,
  `name` varchar(40) NOT NULL,
  `code` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `discord_donations`
--

INSERT INTO `discord_donations` (`id`, `timestamp`, `ip`, `name`, `code`) VALUES
(9, '2017-09-16 17:06:50', '84.164.60.45', 'RTL', 'XXXX-XXXX-XXXX-XXXX'),
(8, '2017-09-16 11:31:19', '2003:76:6f2d:e5e7:e049:ed8f:a93b:6361', 'flo', 'CODE-CODE-CODE-CODE'),
(10, '2017-09-17 20:38:07', '91.66.10.164', 'perclf ', '1111-1111-1111-1111');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `discord_levels`
--

CREATE TABLE `discord_levels` (
  `id` int(11) NOT NULL,
  `userid` bigint(18) NOT NULL,
  `username` varchar(50) NOT NULL,
  `discriminator` int(5) NOT NULL,
  `avatar` text NOT NULL,
  `xp` int(11) NOT NULL,
  `chests` int(11) NOT NULL,
   `coins` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `discord_levels`
--

INSERT INTO `discord_levels` (`id`, `userid`, `username`, `discriminator`, `avatar`, `xp`, `chests`, `coins`) VALUES
(16, 170828613841715203, 'flo', 3087, 'https://cdn.discordapp.com/avatars/170828613841715203/2cf4a6e6b356f1b0ca5b0fb6a7c2c72b.png', 7240, 224, 400),
(25, 180642647424106496, 'Fin', 7929, 'https://cdn.discordapp.com/avatars/180642647424106496/393b6d7ed9371acde2c6fbd94c62ce22.png', 3573, 5, 7000);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `discord_topdesign`
--

CREATE TABLE `discord_topdesign` (
  `id` int(11) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeshort` int(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `userid` bigint(18) NOT NULL,
  `avatar` text NOT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `discord_topdesign`
--

INSERT INTO `discord_topdesign` (`id`, `timestamp`, `timeshort`, `username`, `userid`, `avatar`, `content`, `image`, `active`) VALUES
(44, '2017-08-02 16:51:24', 20178, 'lukas', 219204249941180431, 'http://i.imgur.com/N2iRPvn.jpg', '#topdesign', 'http://i.imgur.com/G4i0wOk.png', 0),
(99, '2017-09-08 11:24:04', 20179, 'CreepPlays', 229496324444127233, 'https://i.imgur.com/2XskHey.png', '<#337981130886217730>', 'https://i.imgur.com/XiSZsds.png', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `discord_topdesign_likes`
--

CREATE TABLE `discord_topdesign_likes` (
  `id` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  `userid` bigint(18) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `discord_topdesign_likes`
--

INSERT INTO `discord_topdesign_likes` (`id`, `postid`, `userid`, `timestamp`) VALUES
(179, 44, 170828613841715203, '2017-12-24 11:00:00'),
(304, 99, 180642647424106496, '2017-12-24 12:00:00'),
(305, 99, 180642647424106496, '2017-12-24 10:00:00');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `discord_donations`
--
ALTER TABLE `discord_donations`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `discord_levels`
--
ALTER TABLE `discord_levels`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `discord_topdesign`
--
ALTER TABLE `discord_topdesign`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `discord_topdesign_likes`
--
ALTER TABLE `discord_topdesign_likes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `discord_donations`
--
ALTER TABLE `discord_donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `discord_levels`
--
ALTER TABLE `discord_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT für Tabelle `discord_topdesign`
--
ALTER TABLE `discord_topdesign`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT für Tabelle `discord_topdesign_likes`
--
ALTER TABLE `discord_topdesign_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
