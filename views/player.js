Player.prototype.clear = function(o) {

    if (o.hasChildNodes()) {
        while (o.childNodes.length >= 1) {
            o.removeChild(o.firstChild);
        }
    }
}

Player.prototype.draw = function(container, offset) {
    
    offset = offset || this.position;
    
    var c = this.container;
    
    if (!this.container) {
    
        c = this.container = document.createElement('div');
        c.style.position = 'relative';
        
        container.appendChild(c);
    }
    
    if (this.rotation != this.preview.rotation) {
        this.clear(c);        
    }
    
    if (!c.hasChildNodes()) {
        
        Game.prototype.core.ARRAY.forEach(this.cur_rotation,
            function(x, y, item) {
            
                if (item) {
                    var div = document.createElement('div');
                    div.className = 'square_' + this.figure.color + '_div';
                    div.style.top  = (x * 12) + 'px';
                    div.style.left = (y * 12) + 'px';
                    this.container.appendChild(div);
                }
            }
            , { scope: this }
        );
    }
    
    c.style.top  = (offset.x * 12) + 'px';
    c.style.left = (offset.y * 12) + 'px';
}
