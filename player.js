function Player(x, y) {

    this.figures_id = [this.get_id()];
    this.points = 0;
    this.level  = 1;
    this.speed  = 0.02;    
    this.next_figure(x, y);
    this.rows   = 0;
    this.lock_rotate = false;
}

Player.prototype.get_id = function() {

    return Math.floor(Math.random() * 7);
}

Player.prototype.next_id = function() {
    
    var ids = this.figures_id;
    
    return ids[ids.length-1];
}

Player.prototype.next_figure = function(x, y) {

    this.figures_id.push(this.get_id());

    x = Game.prototype.core.has_value(x) ? x : 0;
    y = Game.prototype.core.has_value(y) ? y : 0;

    this.id           = this.figures_id.shift();
    this.figure       = figures[this.id];
    this.rotation     = 0;
    this.color_id     = this.id+1;
    this.cur_rotation = this.figure.rotations[this.rotation];
    
    this.position     = { x: Math.floor(x), y: Math.floor(y), raw_x: Math.floor(x) };
    
    this.preview = {
        position     : this.position,
        figure       : this.figure,
        rotation     : this.rotation,
        cur_rotation : this.cur_rotation
    };
}

Player.prototype.reset_position = function(x, y) {
    
    x = Game.prototype.core.has_value(x) ? x : 0;
    y = Game.prototype.core.has_value(y) ? y : 0;
    
    this.position.x = Math.floor(x);
    this.position.y = Math.floor(y);
}

Player.prototype.move = function(dir, collitions, params) {

    if (!dir) { return; }
    
    var preview = this.position.y;
    
    this.position.y += dir;
    
    if (collitions.apply(collitions, params)) { this.position.y = preview; }
}

Player.prototype.next_row = function() {

    this.position.raw_x += this.speed;
    this.position.x = Math.floor(this.position.raw_x);
}

Player.prototype.rotate = function(dir, collitions, params) {

    if (this.lock_rotate) { return; }
    this.lock_rotate = true;

    this.preview.rotation = this.rotation;
    var preview_rotation     = this.rotation;
    var preview_cur_rotation = this.cur_rotation;

    dir = dir || 1;

    var rotations = this.figure.rotations;
    
    this.rotation += dir;
    if (this.rotation >= rotations.length) {
        this.rotation = 0;
    }
    if (this.rotation < 0) {
        this.rotation = rotations.length-1;
    }

    this.cur_rotation = rotations[this.rotation];
    
    if (collitions.apply(collitions, params)) {
        if (this.position.y < 0) { 
            this.position.y = 0;
            return;
        }
        
        var limit   = params[0].rows
          , position = this.position.x + this.cur_rotation.length;
          
        if (position > limit) {
            this.rotation = preview_rotation;
            this.cur_rotation = preview_cur_rotation;
            return;
        }
        
        var tmp = this.cur_rotation[0].length;
        while (tmp > 0 && collitions.apply(collitions, params)) {
            this.position.y--;
            tmp--;
        }
        
        return;
    }
}

Player.prototype.next_level = function() {
    this.rows = 0;
    this.level++;
    this.speed += 0.01;
}

Player.prototype.restart = function() {

    this.next_figure();
    
    this.points = 0;
    this.level  = 1;
    this.speed  = 0.02;
    this.rows   = 0;
    this.lock_rotate = false;
}

Player.prototype.unlock_rotate = function() {
    this.lock_rotate = false;
}
