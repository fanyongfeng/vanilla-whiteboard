# NOTE：

只针对自己写的代码做单元测试，不包括从别处复制过来的代码


# Assertions of ava:

* .pass([message])
 * .fail([message])
 * .truthy(value, [message])
 * .falsy(value, [message])
 * .true(value, [message])
 * .false(value, [message])
 * .is(value, expected, [message])
 * .not(value, expected, [message])
 * .deepEqual(value, expected, [message])
 * .notDeepEqual(value, expected, [message])
 * .throws(fn, [expected, [message]])

```
      test('throws', t => {
        const error = t.throws(() => {
          fn();
        }, TypeError);

        t.is(error.message, '🦄');
      });
```
 * .throwsAsync(thrower, [expected, [message]])
 ```
      test('throws', async t => {
        await t.throwsAsync(async () => {
          throw new TypeError('🦄');
        }, {instanceOf: TypeError, message: '🦄'});
      });
      const promise = Promise.reject(new TypeError('🦄'));

      test('rejects', async t => {
        const error = await t.throwsAsync(promise);
        t.is(error.message, '🦄');
      });
```
 * .notThrows(fn, [message])
 * .notThrowsAsync(nonThrower, [message])
 * .regex(contents, regex, [message])
 * .notRegex(contents, regex, [message])
 * .snapshot(expected, [message])
 * .snapshot(expected, [options], [message])
