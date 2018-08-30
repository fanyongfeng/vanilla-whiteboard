/**
 * Author Daniel.he
 */
import test from 'ava';
import{ mixin, deepMixin, mixinProps } from '../src/decorators/mixin';


test('mixin', t => {
  @mixin()
  class MyClass {  }

});

test('deepMixin', t => {
  @deepMixin()
  class MyClass {  }

});


test('mixinProps', t => {
  @deepMixin()
  class MyClass {  }

});
