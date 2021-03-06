function __time__() {};
function __loop__() {};

function Game() { 

    var self = this;

    this.is_start         = false;
    this.id_loop          = null;
    this.id_set_animation = null;
    this.is_locked        = false;
    this.fnLoop           = {};
    this.times            = 0;    
    this.is_paused        = false;
    
    __loop__ = this.core.concatenateFn(__loop__, this.loop, this);
    __time__ = function() {
        
        if (self.is_paused) { return; }
        self.time.innerHTML = '<b>Tiempo:</b> ' + self.format_time(++self.times);
    }
}

Game.prototype.format_time = function(times) {

    var minutes = Math.floor(times / 60);
    var seconds = times % 60;
    
    minutes = (minutes > 9 ? '' : '0') + minutes;
    seconds = (seconds > 9 ? '' : '0') + seconds;
    
    return minutes + ':' + seconds;
}

Game.prototype.init = function() {

    this.presentation();
    
    this.time.innerHTML = '<b>Tiempo:</b> 00:00';
    this.points.innerHTML = '<b>Puntos:</b> 0';
    this.levels.innerHTML = '<b>Nivel:</b> 0';
    this.next.innerHTML = '<div style="text-align:center"><b>Pr&oacute;xima figura<b/></div>' +
                           '<div id="next_figure"></div>';
}

Game.prototype.loop = function() {

    if (this.is_paused) { return; }

    for (var name in this.fnLoop) {
    
        this.fnLoop[name]();
    }
}

Game.prototype.collitions = function(bg, player) {
    
    var result = false;
    
    Game.prototype.core.ARRAY.forEach(player.cur_rotation, 
        function(x, y, item) {
        
            if (item) {
                var offset_x = player.position.x + x;
                var offset_y = player.position.y + y;

                if (offset_x < 0 || offset_y < 0 || offset_x >= bg.rows || offset_y >= bg.cols) {
                    result = true;
                    return;
                }
                
                if (bg.table[offset_x][offset_y] != 0) {
                    result = true;
                    return;
                }
            }
        }
    );
    
    return result;
}

Game.prototype.start = function() {
    
    var self   = this;
    var bg     = this.bg     = new Background();
    var player = this.player = new Player();

    bg.draw(this.tetris);
    
    this.draw_next_figure();
	
    player.reset_position(0, (bg.cols/2)-(player.cur_rotation.length/2));
    this.levels.innerHTML = '<b>Nivel:</b> ' + player.level;
    var restart = function() {
    
        self.is_locked = false;
            
        if (player.preview_speed) {
            player.speed = player.preview_speed;
            delete player.preview_speed;
        }
    
        player.next_figure();
        player.reset_position(0, (bg.cols/2)-(player.cur_rotation.length/2));
        player.draw(self.tetris, null);
        
        self.draw_next_figure();
        
        if (player.rows >= 10) {
            player.next_level();
            self.levels.innerHTML = '<b>Nivel:</b> ' + player.level;
        }
    }
    
    
    this.fnLoop['move'] = function() {
    
        if (!self.collitions(bg, player)) {
            
            player.draw(self.tetris);
        }
        else {
            bg.insert_data(player.cur_rotation, player.color_id, player.position);
            
            if (bg.is_gameover) {
            
                self.is_paused = true;
                self.show_gameover();
                self.btn_restart();
                return;
            }
            
            var count = bg.evaluate_line();
            bg.draw(self.tetris);
            delete player.container;
            
            if (count) {
                clearInterval(self.id_loop);
                bg.animate_remove(self.tetris,
                    function() {
                        player.rows += count;
                        player.points += (10 * count);
                        self.points.innerHTML = '<b>Puntos:</b> ' + player.points;
                        
                        self.id_loop = setInterval('__loop__()', 10);
                        restart();
                    }
                ); 
            }
            else { 
                restart(); 
            }
        }
        
        player.next_row();
    };
    
    this.id_loop  = setInterval('__loop__()', 10);
    this.id_time  = setInterval('__time__()', 1000);
    this.is_start = true;
}

Game.prototype.accelerate = function() {

    var self   = this;
    var bg     = this.bg;
    var player = this.player;

    this.is_locked = true;
    this.player.preview_speed = this.player.speed;
    this.player.speed = 1;
}

Game.prototype.pause = function() {

    this.is_paused = true;
    this.btn_resume();
    this.btn_restart();
}

Game.prototype.resume = function() {
    
    this.is_paused = false;
}

Game.prototype.restart = function() {
    
    this.time.innerHTML = '<b>Tiempo:</b> 00:00';
    this.points.innerHTML = '<b>Puntos:</b> 0';
    this.levels.innerHTML = '<b>Nivel:</b> 0';
    
    var player = this.player;
    var bg     = this.bg;
    
    this.is_paused = false;
    this.is_locked = false;
    this.times = 0;
    
    player.restart();
    player.reset_position(0, (bg.cols/2)-(player.cur_rotation.length/2));
    player.draw(self.tetris, null);
    delete player.container;
    
    bg.restart();
    bg.draw(this.tetris);
}
