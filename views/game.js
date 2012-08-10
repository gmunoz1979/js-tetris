Game.prototype.render = function() {

    var game   = this.game   = document.createElement('div');
    var time   = this.time   = document.createElement('div');
    var info   = this.info   = document.createElement('div');
    var points = this.points = document.createElement('div');
    var levels = this.levels = document.createElement('div');
    var title  = this.title  = document.createElement('div');
    var tetris = this.tetris = document.createElement('div');
    var msg    = this.msg    = document.createElement('div');
      
    game.id   = 'game';
    points.id = 'points';
    levels.id = 'levels';
    time.id   = 'time';
    info.id   = 'info';
    title.id  = 'title';
    tetris.id = 'tetris';
    msg.id    = 'message';
    
    msg.innerHTML = 'Presione <b>Start</b> para empezar Juego.';

    info.appendChild(points);
    info.appendChild(levels);
    
    game.appendChild(time);
    game.appendChild(title);
    game.appendChild(info);
    game.appendChild(tetris);
    game.appendChild(msg);
    
    document.body.appendChild(game);
}

Game.prototype.btn_start = function() {

    var self = this;
    var btn  = document.createElement('div');
    
    btn.onclick = function() { 
        self.tetris.removeChild(btn);
        self.start();
        self.msg.innerHTML = 'Presione <b>Esc</b> para pausar Juego.'
        delete btn;
    };
      
    btn.className = 'button-start-div';
    btn.innerHTML = 'START';
 
    this.tetris.appendChild(btn);
}

Game.prototype.btn_resume = function() {

    var self = this;
    var btn  = document.createElement('div');
    
    self.msg.innerHTML = 'Presione <b>Continuar</b> para volver al Juego.'
    
    btn.onclick = function() { 
    
        var btn_restart = document.getElementById('btn-restart');
    
        self.tetris.removeChild(btn_restart);
        self.tetris.removeChild(btn);
        self.resume();
        self.msg.innerHTML = 'Presione <b>Esc</b> para pausar Juego.'
        delete btn_restart;
        delete btn;
    };
      
    btn.id = 'btn-resume';
    btn.className = 'button-start-div';
    btn.innerHTML = 'CONTINUAR';
 
    this.tetris.appendChild(btn);
}

Game.prototype.btn_restart = function() {

    var self = this;
    var btn  = document.createElement('div');
    
    btn.onclick = function() { 
        
        var btn_resume = document.getElementById('btn-resume');
    
        self.tetris.removeChild(btn_resume);
        self.tetris.removeChild(btn);
        self.restart();
        delete btn_resume;
        delete btn;
    };
      
    btn.id = 'btn-restart';
    btn.className = 'button-restart-div';
    btn.innerHTML = 'REINICIAR';
 
    this.tetris.appendChild(btn);
}

Game.prototype.presentation = function() {

    var tetris = [
        [[1,1,1],
         [0,1,0],
         [0,1,0],
         [0,1,0],
         [0,1,0]],
        [[1,1,1],
         [1,0,0],
         [1,1,1],
         [1,0,0],
         [1,1,1]],
        [[1,1,1],
         [0,1,0],
         [0,1,0],
         [0,1,0],
         [0,1,0]],
        [[1,1,1],
         [1,0,1],
         [1,1,0],
         [1,1,1],
         [1,0,1]],
        [[1],
         [1],
         [1],
         [1],
         [1]],
        [[1,1,1],
         [1,0,0],
         [1,1,1],
         [0,0,1],
         [1,1,1]]
    ];
    
    var left = 0;
    
    this.core.ARRAY.forEach(tetris,
        function(i, item) {
        
            var container = this.core.draw(item, colors[i+1]);

            container.style.left = left + 'px';
            left += item[0].length * 12;
            this.title.appendChild(container);
        }
        ,
        { scope: this, isMatrix: false }
    );
    
    this.btn_start();
}
