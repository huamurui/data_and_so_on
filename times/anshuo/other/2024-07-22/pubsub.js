
class PubSub{
  constructor(){
    this.events = {};
  }

  on(event, callback){
    if(!this.events[event]){
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data){
    if(this.events[event]){
      this.events[event].forEach(callback => {
        callback(data);
      });
    }
  }
}


function PubSub0(){
  this.events = {};

  function on(event, callback){
    if(!this.events[event]){
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  function emit(event, data){
    if(this.events[event]){
      this.events[event].forEach(callback => {
        callback(data);
      });
    }
  }

  return {
    on,
    emit
  }
}
const { on,emit } = PubSub0();

on('event', data => console.log(data));
emit('event', 'Hello World');