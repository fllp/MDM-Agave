# Agave for MDM

This is a HTML5-theme for the login greeter MDM.  
It features vibrant colors, a reduced, rounded design and a time and date dash.  
It is inspired by [the Numix Project], [MDM-Numix] and [eleMINTary]. Code is based on [Mint-X].

[Mint-X]: https://github.com/linuxmint/mint-mdm-themes/
[MDM-Numix]: http://zagortenay333.deviantart.com/art/MDM-Numix-427299252
[eleMINTary]: http://linuxmint-art.org/content/show.php?content=159006
[the Numix Project]: https://numixproject.org/

![Preview](screen.png) ![Session-Menu](screen2.png)

## Versions

**v1.2** 
Initial public release  
*Tested with MDM 2.0.7*

## Installation

*Caution*: Be sure to choose the file extension `tar.gz`  when downloading a release/tag since MDMs settings only read those.  
Simply open the login screen settings (on Linux Mint under system settings) and import the archive.  
**Manual installation**: Extract the archive to `/usr/share/mdm/html-themes` (requires root privileges)

## ToDo

- [x]  design for shutdown dialogues
- [ ] select background aspect ratio according to screen size
- [ ] design for session/language menu
- [ ] design for error messages
- [ ] support different time formats (DD.MM vs. MM.DD, ect.)

## License

GPLv3

## Known Issues

The highlight effect from the onscreen keyboard is a little glitchy.
