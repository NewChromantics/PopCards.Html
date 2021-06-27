Installlation
---------------
This works for nice simple installation to any page, thanks to github's `*` cors.
`<script src="https://newchromantics.github.io/PopCards.Html/PopCards.js" type=module></script>`

No transpiling/compiling needed.

Usage
---------------
See /index.html for an example of usage

`<card-element card="WhateverYouLike"></card-element>` makes a basic card. You're unlikely to use this directly

`<card-river cards="hk,da,s2,s3,s4"></card-river>` creates a card-management element. 
`.cards` member(array)/attribute(string) dictates the child `card-elements` inside. Update the selection of cards by just changing this array.

Card values (strings) can be whatever you like. I use `h`earts, `d`iamonds, `s`pades, `c`lubs as a prefix, and `a k q j x 9 8 7 6 5 4 3 2 1` as a suffix, which can all be easily manipulated, parsed by css.
