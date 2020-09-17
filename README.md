# view playground 1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### Notes

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example:

```
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

At this point, the template is no longer simple and declarative. You have to look at it for a second before realizing that it displays message in reverse. The problem is made worse when you want to include the reversed message in your template more than once.

That’s why for any complex logic, you should use a computed property.

Basic Example
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```
A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as message has not changed, multiple access to the reversedMessage computed property will immediately return the previously computed result without having to run the function again.

This also means the following computed property will never update, because Date.now() is not a reactive dependency:

```
computed: {
  now: function () {
    return Date.now()
  }
}
```

In comparison, a method invocation will always run the function whenever a re-render happens.

Computed Setter
Computed properties are by default getter-only, but you can also provide a setter when you need it:

// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
Now when you run vm.fullName = 'John Doe', the setter will be invoked and vm.firstName and vm.lastName will be updated accordingly.

---

Good example of watch at the bottom which sets debounce in the created and watches for data change  - https://vuejs.org/v2/guide/computed.html

----
Classes
A common need for data binding is manipulating an element’s class list and its inline styles. Since they are both attributes, we can use v-bind to handle them: we only need to calculate a final string with our expressions. However, meddling with string concatenation is annoying and error-prone. For this reason, Vue provides special enhancements when v-bind is used with class and style. In addition to strings, the expressions can also evaluate to objects or arrays.

You can add class objects to data or computed as, The bound object doesn’t have to be inline:
```
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
This will render the same result. We can also bind to a computed property that returns an object. This is a common and powerful pattern:

```
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

You can pass an array to v-bind:class to apply a list of classes:
```
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

and use expressions here too, which can also be done as ternary statements
```
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```
Controlling Reusable Elements with key
https://vuejs.org/v2/guide/conditional.html#Controlling-Reusable-Elements-with-key

Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.

NOTE - Using v-if and v-for together is NOT recommended. See the style guide for further information. - https://vuejs.org/v2/style-guide/#Avoid-v-if-with-v-for-essential - This refers to on exactly the same element not nested.


Mutation:
Some info about mutation
https://vuejs.org/v2/guide/list.html#Mutation-Methods


Reactivity / change detection caveats
https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats


Displaying Filtered/Sorted Results
Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a computed property that returns the filtered or sorted array.

For example:
```
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

In situations where computed properties are not feasible (e.g. inside nested v-for loops), you can use a method:
```
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

You can also define custom key modifier aliases via the global config.keyCodes object:
https://vuejs.org/v2/api/#keyCodes


Form Input Bindings
You can use the v-model directive to create two-way data bindings on form input, textarea, and select elements. It automatically picks the correct way to update the element based on the input type.

v-model will IGNORE the initial value, checked, or selected attributes found on any form elements. It will always treat the Vue instance data as the source of truth. You should declare the initial value on the JavaScript side, inside the data option of your component.

v-model internally uses different properties and emits different events for different input elements:

text and textarea elements use value property and input event;
checkboxes and radiobuttons use checked property and change event;
select fields use value as a prop and change as an event.


Value Bindings:
https://vuejs.org/v2/guide/forms.html#Value-Bindings

For radio, checkbox and select options, the v-model binding values are usually static strings (or booleans for checkboxes):
```
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle">

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

But sometimes, we may want to bind the value to a dynamic property on the Vue instance. We can use v-bind to achieve that. In addition, using v-bind allows us to bind the input value to non-string values.

Checkbox
```
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```
// when checked:
```
vm.toggle === 'yes'
```
// when unchecked:
```
vm.toggle === 'no'
```
!!The true-value and false-value attributes don’t affect the input’s value attribute, because browsers don’t include unchecked boxes in form submissions. To guarantee that one of two values is submitted in a form (i.e. “yes” or “no”), use radio inputs instead.!!

Radio
```
<input type="radio" v-model="pick" v-bind:value="a">
```
// when checked:
```
vm.pick === vm.a
```

Select Options
```
<select v-model="selected">
  <!-- inline object literal -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
// when selected:
```
typeof vm.selected // => 'object'
vm.selected.number // => 123
```