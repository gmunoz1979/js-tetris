
Background.prototype.clear = function(o) {

    if (o.hasChildNodes()) {
        while (o.childNodes.length >= 1) {
            o.removeChild(o.firstChild);
        }
    }
}

Background.prototype.draw = function(container) {

    this.clear(container);

    Game.prototype.core.ARRAY.forEach(this.table,
        function(x, y, item) {
        
            if (item > 0) {
                var div = document.createElement('div');
                div.className = 'square_' + colors[item] + '_div';
                div.style.top  = (x * 12) + 'px';
                div.style.left = (y * 12) + 'px';
                container.appendChild(div);        
            }
        }
    );
}

Background.prototype.animate_remove = function(container, fn) {

    var self     = this;
    var fn_array = [];
    
    fn_array.push(
        function() {
            self.mark_line(8);
            self.draw(container);
        }
    );
    
    fn_array.push(
        function() {
            self.mark_line(0);
            self.draw(container);
        }
    );
    
    fn_array.push(
        function() {
            self.remove_line();
            self.insert_line();
            self.draw(container);
        }
    );
    
    fn_array.push(
        function() {
            self.complete.shift();
        }
    );

    Game.prototype.core.sequence(fn_array, 200, this.complete.length, fn);
}
