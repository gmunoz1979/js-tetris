function Background() {

    this.table = this.new_table();
    this.rows  = this.table.length;
    this.cols  = this.table[0].length;
    
    this.complete = [];
}

Background.prototype.restart = function() {
    
    this.table = this.new_table();
}

Background.prototype.new_table = function() {

    return [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  2
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  3
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  4
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  5
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  6
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  7
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  8
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //  9
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 10
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 11
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 12
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 13
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 17
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 18
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 19
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 20
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 21
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 22
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 23
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 24
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 25
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 26
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 27
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 28
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 29
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 30
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // 31
    ];
}

Background.prototype.insert_data = function(data, color, offset) {

    offset = offset || { x:0, y: 0 };
          
    Game.prototype.core.ARRAY.forEach(data, 
        function(x, y, item) {
        
            if (item) {
               this.table[offset.x+x-1][offset.y+y] = color;
            }
        }
        ,
        { scope: this }
    );
}

Background.prototype.evaluate_line = function() {

    Game.prototype.core.ARRAY.forEach(this.table, 
        function(x, item) {
            var is_complete = true;
            
            for (var y=0, len=item.length; y<len; y++) {
                if (item[y] == 0) {
                    is_complete = false;
                    break;
                }                
            }
            
            if (is_complete) {
                this.complete.push(x);
            }
        }
        ,
        { scope: this, isMatrix: false }
    );
    
    return this.complete.length;
}

Background.prototype.mark_line = function(mark) {
   
    var t = this.table;
    var c = this.complete;
    
    if (c.length == 0) {
        return;
    }
    
    for (var y=0, len=t[c[0]].length; y<len; y++) {
        t[c[0]][y] = mark;
    }
}

Background.prototype.remove_line = function() {
   
    var t = this.table;
    var c = this.complete;
    
    if (c.length == 0) {
        return;
    }
    
    this.table.splice(c[0], 1);
}

Background.prototype.insert_line = function() {
   
    var t = this.table;
    
    t.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
}
