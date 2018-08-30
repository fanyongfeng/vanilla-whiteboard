/**
 * Author Daniel.he
 */
import test from 'ava';
import emittable, { Emitter } from '../src/decorators/emitter';


const handler1 = () => { }
const handler2 = () => { }
const handler3 = () => { }

test('decorator:emittable', t => {
  @emittable()
  class MyClass {  }

});

test('constructor:Emitter', t => {
  let emitter = new Emitter();

  emitter.on("", handler1)
  emitter.on("", handler2)

  emitter.emit("")
});
