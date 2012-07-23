__sequence__ = function() {}

Game.prototype.core = {}

Game.prototype.core.draw = function(form, color, container, offset) {

    offset = Game.prototype.core.apply(offset, { x: 0, y:0 });

    container = container || document.createElement('div');
    container.style.position = 'relative';
    
    Game.prototype.core.ARRAY.forEach(form,
        function(x, y, item) {
        
            if (item) {
                var div = document.createElement('div');
                div.className = 'square_' + color + '_div';
                div.style.top  = ((offset.x + x) * 12) + 'px';
                div.style.left = ((offset.y + y) * 12) + 'px';
                container.appendChild(div);        
            }
        }
    );
    
    return container;
}

Game.prototype.core.is_array = function(o) {

	return o && o.length;
};

Game.prototype.core.has_value = function(o) {

    return o !== undefined && o !== null;
};

Game.prototype.core.apply = function(object, defaults) {

    object = object || {};
    
    for (var name in defaults) {
		
		if (!Game.prototype.core.has_value(object[name]) && Game.prototype.core.has_value(defaults[name])) {
			object[name] = defaults[name];
		}
	}
	
	return object;
}

Game.prototype.core.clone = function(o) {

	var n = {};
	
	for(var name in o) {
		
		if (isArray(o[name])) {
			n[name] = [];
			
			for (var i=0, len=o[name].length; i<len; i++) {
				
				n[name].push(o[name][i]);
			}
			
			continue;
		}

		if (typeof o[name] === 'object') {
			n[name] = clone(o[name]);
		}
		
		n[name] = o[name];
	}
	
	return n;
};

Game.prototype.core.concatenateFn = function(oriFn, newFn, scope) {
    
    scope = scope || newFn;   
         
    var fn = function() {
    
        if (oriFn) { oriFn(); }
        
        if (newFn) { newFn.call(scope); }
    }
    
    return fn;             
}

Game.prototype.core.ARRAY = {
    forEach: function(a, fn, options) {
    
        options = Game.prototype.core.apply(options, { scope: fn, isMatrix: true });
    
        if (this.isArray(a)) {
            var isMatrix = this.isMatrix(a);
        
            for (var x=0, lenx=a.length; x<lenx; x++) {
                if (!isMatrix || !options.isMatrix) {
                    fn.apply(options.scope, [x, a[x]]);
                    continue;
                }
                
                for (var y=0, leny=a[x].length; y<leny; y++) {
                    fn.apply(options.scope, [x, y, a[x][y]]);
                }
            }
        }
        
    }
    ,
    isArray: function(o) {
        return typeof o === 'object' &&
                Game.prototype.core.has_value(o.length);
    }
    ,
    isMatrix: function(o) {
    
        return this.isArray(o) && o.length != 0 &&
                this.isArray(o[0]);
    }
};

Game.prototype.core.sequence = function(fn_array, interval, repeat, fn_end) {

    var self = this;
    var seq  = 0;
    repeat--;

    __sequence__ = function() {
    
        if (fn_array.length > seq) {
            fn_array[seq++]();
            return;
        }
    
        if (repeat > 0) {
            repeat--;
            seq = 0;
            return;
        }
        
        fn_end();
        clearInterval(self.id_sequence);
    }
    
    this.id_sequence = setInterval('__sequence__()', interval);
};
