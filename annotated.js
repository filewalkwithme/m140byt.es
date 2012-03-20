function (
  
  a,  // current board
  b,  // current block
  c,  // current position
  d,  // new block offset for position
  
  e   // placeholder: the layout to return
){
  
  return 
  
    d += c,                     // add offset to position
                                
    e = a | b << d,             // render layout based on board and moved block
                                
    d < 0  |  a & b<<d          // check if block touches bottom line 
                                // or if block collide with board ...
                                
    && (                           // ... if so ...
                                
      a = e =                       // assign new board and layout
        parseInt(                   // convert back from base 32 
                                    
          ( a | b << c )            // get board based on last position
            .toString(              // convert board to base 32 (2^5)
              d = 32                // reset block position to top (32)
            )         
            .replace(/v/, ""),      // remove filled line ("v" = 11111)
                                    
          d                         // base 32 (2^5) for parseInt
        ),                          
                                    
      b = new Date % 2 ?            // generate new block for next round
        1 :                         // single "#" (1 => 1)
        3                           // double "##" (3 => 111)
    ),
    
    [                           // the final return 
      a,                        // new board
      b,                        // new block
      d,                        // new position
      e                         // final layout to render
    ]
}