# Binary Tetris - 140byt.es

A simplified variant of the classic tetris game done in less that 140 bytes of JavaScript.

[**Click here to play the DEMO**](http://jsbin.com/egiqul/49)!

### Source

```javascript
    function(a,b,c,d,e){return d+=c,
    e=a|b<<d,d<0|a&b<<d&&(a=e=
    parseInt((a|b<<c).toString(d=32)
    .replace(/v/,""),d),b=new Date%2?1:3),
    [a,b,d,e]}
```

Feel free to [edit](http://jsbin.com/egiqul/49/edit#javascript,live) the source and follow me on Twitter ([@aemkei](http://twitter.com/aemkei)).

### Example Layout

    1.       2.       3.       4.       5.
    
    .....    .....    .....    .....    .....
    .....    .....    .....    .....    .....
    ...##    .....    .....    .....    .....
    .....    ...##    .....    .....    .....
    ##...    ##...    ##.##    ##...    .....
    ###..    ###..    ###..    #####    ##...



### More Information

The main logic to move blocks, detect collision, assign new blocks, remove full lines and render the layout are included. Excluded are keyboard controls and the final rendering.

This version is heavy based on binary numbers and bit shift operators. I had to limit the board size to 5x6 (30 bits), because JavaScript converts numbers to 32-bit integers when using bitwise operators. The two left bits are later uses to add the correct padding when dealing with numbers that start with "0". 


### Basic Concept

The Board      

                      00000         .....
    798               11000   =>    ##... 
                      11110         ####.
 
The Block

    3                 00011  =>     ...##


Checking for Collision

                      00000         .....
    798&3 = 2         00000  =>     .....
                      00010         ...X.

Moving the Block at X Axis

    3 << 1 = 6        00110   =>    ..##.

Moving the Block at Y Axis

                      00011         ...##
    3<<10 = 3072      00000   =>    .....
                      00000         .....

Combining Block and Board

                      00011         ...##
    798|3072 = 3870   11000   =>    ##...
                      11110         ####.



Find full line (using base 32)

                      00011         3
    3999              11100   =>    s
                      11111         v




For more information
--------------------

See the [140byt.es](http://140byt.es) site for a showcase of entries (built itself using 140-byte entries!), and follow [@140bytes](http://twitter.com/140bytes) on Twitter.

To learn about byte-saving hacks for your own code, or to contribute what you've learned, head to [the wiki](https://github.com/jed/140bytes/wiki/Byte-saving-techniques).

140byt.es is brought to you by [Jed Schmidt](http://jed.is), with help from Alex Kloss. It was inspired by work from [Thomas Fuchs](http://mir.aculo.us) and [Dustin Diaz](http://www.dustindiaz.com/).
