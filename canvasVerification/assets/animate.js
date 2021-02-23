export default { 
    getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,null)[attr];
        }
    },
    animate(obj,json,callback){
        clearInterval(obj.timer)
        let isStop = true;
        obj.timer = setInterval(function(){
            for(var attr in json){
                let now = 0;
                if(attr == 'opacity'){
                    now = parseInt(getStyle(obj,attr)*100)
                }else{
                    now = parseInt(getStyle(obj,attr))
                }
                let speed = (json[attr] - now)/10;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                let current = now + speed;
                if(attr == 'opacity'){
                    obj.style[attr] = current/100;
                }else{
                    obj.style[attr] = current+"px";
                }
                if(json[attr] != current ){
                    isStop = false;
                }else{
                    isStop = true
                }            
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        },30);
    }
}
