# view playground 1

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

Component basics

There are a few root-specific options like el.

Note: A component’s data option is a function so that each instance can maintain an independent copy of the returned data object, if it was an object they are all the

You can also register a component globally though not ideal
https://vueschool.io/lessons/global-vs-local-components

LISTENING TO CHILD COMPONENT EVENTS: $emit
https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events
As we develop our <blog-post> component, some features may require communicating back up to the parent. For example, we may decide to include an accessibility feature to enlarge the text of blog posts, while leaving the rest of the page its default size:

In the parent, we can support this feature by adding a postFontSize data property:
```
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
```
Which can be used in the template to control the font size of all blog posts:
```
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
```
Now let’s add a button to enlarge the text right before the content of every post:
```
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```
The problem is, this button doesn’t do anything:
```
<button>
  Enlarge text
</button>
```
When we click on the button, we need to communicate to the parent that it should enlarge the text of all posts. Fortunately, Vue instances provide a custom events system to solve this problem. The parent can choose to listen to any event on the child component instance with v-on, just as we would with a native DOM event:
```
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```
Then the child component can emit an event on itself by calling the built-in $emit method, passing the name of the event:
```
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```
Thanks to the v-on:enlarge-text="postFontSize += 0.1" listener, the parent will receive the event and update postFontSize value.
https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events

^^^^ This can basically be done in the same way as passing a function with bind, like in react, however emit is best practise for Vue and also you will be able to see the event firing in the vue chrome extension.  There are also some other advantages like this.$root.on


Using v-model on components
https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components

Custom events can also be used to create custom inputs that work with v-model. Remember that:
```
<input v-model="searchText">
```
does the same thing as:
```
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
When used on a component, v-model instead does this:
```
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```
For this to actually work though, the <input> inside the component must:

Bind the value attribute to a value prop
On input, emit its own custom input event with the new value
Here’s that in action:
```
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
Now v-model should work perfectly with this component:
```
<custom-input v-model="searchText"></custom-input>
```

Dynamic Components
https://vuejs.org/v2/guide/components.html#Dynamic-Components

DOM Template parsing
https://vuejs.org/v2/guide/components.html#DOM-Template-Parsing-Caveats

Some HTML elements, such as <ul>, <ol>, <table> and <select> have restrictions on what elements can appear inside them, and some elements such as <li>, <tr>, and <option> can only appear inside certain other elements.

This will lead to issues when using components with elements that have such restrictions. For example:
```
<table>
  <blog-post-row></blog-post-row>
</table>
```
The custom component <blog-post-row> will be hoisted out as invalid content, causing errors in the eventual rendered output. Fortunately, the is special attribute offers a workaround:
```
<table>
  <tr is="blog-post-row"></tr>
</table>
```


Props
You  can list props as either array
```
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
Or as an object which contains the value and type, better to be specific I'd say and specific the type.
```
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

Like React do not mutate props that have been passed down IN the child component.

Prop Validations
```
Vue.component('my-component', {
  props: {
    // Basic type check (`null` and `undefined` values will pass any type validation)
    propA: Number,
    // Multiple possible types
    propB: [String, Number],
    // Required string
    propC: {
      type: String,
      required: true
    },
    // Number with a default value
    propD: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propE: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return { message: 'hello' }
      }
    },
    // Custom validator function
    propF: {
      validator: function (value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

Type Checks can be
String
Number
Boolean
Array
Object
Date
Function
Symbol

Non Prop Attributes
https://vuejs.org/v2/guide/components-props.html#Non-Prop-Attributes

--- 

Replacing / merging with existing attributes
passing a attribute from component WILL replace any the root template has set, ASIDE from styles and classes, these are merged. i.e.

parent component
```
<component1 type="text" class="test2 />
```

component1
```
<div type="number" class="test1></div> <--- root of component1
```
Here type would be text, and class would be 'test2 test1'

Disabling attribute inheritance
https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance

Custom Events
Event names MUST be lower / kebab case, camelcase will not work
https://vuejs.org/v2/guide/components-custom-events.html#Event-Names


Customizing Component v-model
By default, v-model on a component uses value as the prop and input as the event, but some input types such as checkboxes and radio buttons may want to use the value attribute for a different purpose. Using the model option can avoid a conflict in such cases:
```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
Now when using v-model on this component:
```
<base-checkbox v-model="lovingVue"></base-checkbox>
```
the value of lovingVue will be passed to the checked prop. The lovingVue property will then be updated when 
```
<base-checkbox> emits a change event with a new value.
```

Note that you still have to declare the checked prop in the component’s props option.

Binding Native Events to Components
There may be times when you want to listen directly to a native event on the root element of a component. In these cases, you can use the .native modifier for v-on:
```
<base-input v-on:focus.native="onFocus"></base-input>
```
This can be useful sometimes, but it’s not a good idea when you’re trying to listen on a very specific element, like an <input>. For example, the <base-input> component above might refactor so that the root element is actually a <label> element:
```
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```
In that case, the .native listener in the parent would silently break. There would be no errors, but the onFocus handler wouldn’t be called when we expected it to.

To solve this problem, Vue provides a $listeners property containing an object of listeners being used on the component. For example:
```
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```
Using the $listeners property, you can forward all event listeners on the component to a specific child element with v-on="$listeners". For elements like <input>, that you also want to work with v-model, it’s often useful to create a new computed property for listeners, like inputListeners below:
```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```
Now the <base-input> component is a fully transparent wrapper, meaning it can be used exactly like a normal <input> element: all the same attributes and listeners will work, without the .native modifier.


.sync Modifier
In some cases, we may need “two-way binding” for a prop. Unfortunately, true two-way binding can create maintenance issues, because child components can mutate the parent without the source of that mutation being obvious in both the parent and the child.

That’s why instead, we recommend emitting events in the pattern of update:myPropName. For example, in a hypothetical component with a title prop, we could communicate the intent of assigning a new value with:

this.$emit('update:title', newTitle)
Then the parent can listen to that event and update a local data property, if it wants to. For example:
```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```
For convenience, we offer a shorthand for this pattern with the .sync modifier:
```
<text-document v-bind:title.sync="doc.title"></text-document>
```
Note that v-bind with the .sync modifier does not work with expressions (e.g. v-bind:title.sync=”doc.title + ‘!’” is invalid). Instead, you must only provide the name of the property you want to bind, similar to v-model.

The .sync modifier can also be used with v-bind when using an object to set multiple props at once:
```
<text-document v-bind.sync="doc"></text-document>
```
This passes each property in the doc object (e.g. title) as an individual prop, then adds v-on update listeners for each one.

Using v-bind.sync with a literal object, such as in v-bind.sync=”{ title: doc.title }”, will not work, because there are too many edge cases to consider in parsing a complex expression like this.



Scoped Slots
Sometimes, it’s useful for slot content to have access to data only available in the child component. For example, imagine a <current-user> component with the following template:
```
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```
We might want to replace this fallback content to display the user’s first name, instead of last, like this:
```
<current-user>
  {{ user.firstName }}
</current-user>
```
That won’t work, however, because only the <current-user> component has access to the user and the content we’re providing is rendered in the parent.

To make user available to the slot content in the parent, we can bind user as an attribute to the <slot> element:
```
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```
Attributes bound to a <slot> element are called slot props. Now, in the parent scope, we can use v-slot with a value to define a name for the slot props we’ve been provided:
```
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
In this example, we’ve chosen to name the object containing all our slot props slotProps, but you can use any name you like.


Abbreviated Syntax for Lone Default Slots
Really dont understand why this is a thing, as passing data up is bad practise even says so in the docs data goes down events go up?
In cases like above, when only the default slot is provided content, the component’s tags can be used as the slot’s template. This allows us to use v-slot directly on the component:
```
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```
This can be shortened even further. Just as non-specified content is assumed to be for the default slot, v-slot without an argument is assumed to refer to the default slot:
```
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```
Note that the abbreviated syntax for default slot cannot be mixed with named slots, as it would lead to scope ambiguity:
```
<!-- INVALID, will result in warning -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```
Whenever there are multiple slots, use the full <template> based syntax for all slots:
```
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

Destructuring Slot Props
Internally, scoped slots work by wrapping your slot content in a function passed a single argument:
```
function (slotProps) {
  // ... slot content ...
}
```
That means the value of v-slot can actually accept any valid JavaScript expression that can appear in the argument position of a function definition. So in supported environments (single-file components or modern browsers), you can also use ES2015 destructuring to pull out specific slot props, like so:
```
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```
This can make the template much cleaner, especially when the slot provides many props. It also opens other possibilities, such as renaming props, e.g. user to person:
```
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```
You can even define fallbacks, to be used in case a slot prop is undefined:
```
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

Named Slots Shorthand
Similar to v-on and v-bind, v-slot also has a shorthand, replacing everything before the argument (v-slot:) with the special symbol #. For example, v-slot:header can be rewritten as #header:
```
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
However, just as with other directives, the shorthand is only available when an argument is provided. That means the following syntax is invalid:
```
<!-- This will trigger a warning -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```
Instead, you must always specify the name of the slot if you wish to use the shorthand:
```
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

Slots Other Examples
Slot props allow us to turn slots into reusable templates that can render different content based on input props. This is most useful when you are designing a reusable component that encapsulates data logic while allowing the consuming parent component to customize part of its layout.

For example, we are implementing a <todo-list> component that contains the layout and filtering logic for a list:
```
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
Instead of hard-coding the content for each todo, we can let the parent component take control by making every todo a slot, then binding todo as a slot prop:
```
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    <!--
    We have a slot for each todo, passing it the
    `todo` object as a slot prop.
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- Fallback content -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```
Now when we use the <todo-list> component, we can optionally define an alternative <template> for todo items, but with access to data from the child:
```
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
```
However, even this barely scratches the surface of what scoped slots are capable of. For real-life, powerful examples of scoped slot usage, we recommend browsing libraries such as Vue Virtual Scroller, Vue Promised, and Portal Vue.Alots

Keep Alive with 'is'
https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components

Async Components
In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it’s needed. To make that easier, Vue allows you to define your component as a factory function that asynchronously resolves your component definition. Vue will only trigger the factory function when the component needs to be rendered and will cache the result for future re-renders.
See link for more info
https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components

Handling edge cases / unusual situations
https://vuejs.org/v2/guide/components-edge-cases.html

TRANSITIONS
Lots of details on vue transitions here.
https://vuejs.org/v2/guide/transitions.html
https://vuejs.org/v2/guide/transitioning-state.html

Mixins
https://vuejs.org/v2/guide/mixins.html#Basics
Mixins are a flexible way to distribute reusable functionalities for Vue components.
A mixin object can contain ANY COMPONENT OPTIONS. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.
```
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// define a component that uses this mixin
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

When a mixin and the component itself contain overlapping options, they will be “merged” using appropriate strategies.
the COMPONENT takes priority i.e.
```
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

Hook functions with the same name are merged into an array so that all of them will be called. Mixin hooks will be called before the component’s own hooks.
```
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```

Options that expect object values, for example methods, components and directives, will be merged into the same object. The component’s options will take priority when there are conflicting keys in these objects:
```
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

You can create global mixins whihc will apply to every component, but this is probably not a good idea..

You can set custom option merge stratigies
https://vuejs.org/v2/guide/mixins.html#Custom-Option-Merge-Strategies

Custom Directives
https://vuejs.org/v2/guide/custom-directive.html
We can create custom directives read above for more info on this when needed. Not sure we will need these right now, but seem quite useful.
i.e. we could have something like
Locally (You can also register globally)
```
directives: {
  matt: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
}
```
```
<input v-matt>
```

Render functions * JSX
(Don't think we really need to go indepth with this right now)
https://vuejs.org/v2/guide/render-function.html


Plugins
https://vuejs.org/v2/guide/plugins.html
Plugins usually add global-level functionality to Vue

Use plugins by calling the Vue.use() global method. This has to be done before you start your app by calling new Vue():
```
// calls `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  //... options
})
```

You can optionally pass in some options:
```
Vue.use(MyPlugin, { someOption: true })
```
Vue.use automatically prevents you from using the same plugin more than once, so calling it multiple times on the same plugin will install the plugin only once.

Some plugins provided by Vue.js official plugins such as vue-router automatically calls Vue.use() if Vue is available as a global variable. However in a module environment such as CommonJS, you always need to call Vue.use() explicitly:
```
// When using CommonJS via Browserify or Webpack
var Vue = require('vue')
var VueRouter = require('vue-router')

// Don't forget to call this
Vue.use(VueRouter)
```

Writing a plugin (Prob wont need this yet)
https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin

Filters - PRIMARILY MEANT FOR TEXT TRANSFORMATIONS
Vue.js allows you to define filters that can be used to apply common text formatting. Filters are usable in two places: mustache interpolations and v-bind expressions (the latter supported in 2.1.0+). Filters should be appended to the end of the JavaScript expression, denoted by the “pipe” symbol:
```
<!-- in mustaches -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```
You can define local filters in a component’s options:
```
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
or define a filter globally before creating the Vue instance:
```
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

When the global filter has the same name as the local filter, the local filter will be preferred.

The filter’s function always receives the expression’s value (the result of the former chain) as its first argument.

Filters can be chained:
```
{{ message | filterA | filterB }}
```
In this case, filterA, defined with a single argument, will receive the value of message, and then the filterB function will be called with the result of filterA passed into filterB‘s single argument.

Filters are JavaScript functions, therefore they can take arguments:
```
{{ message | filterA('arg1', arg2) }}
```
Here filterA is defined as a function taking three arguments. The value of message will be passed into the first argument. The plain string 'arg1' will be passed into the filterA as its second argument, and the value of expression arg2 will be evaluated and passed in as the third argument.

Vue JS filter vs Computed
Vue Filters differ from computed properties in two ways.
Computed properties are dependent on specific properties whereas filters can be reused on different values.
Computed properties can be used on all properties while filters are primarily meant for text transformations.

What About Separation of Concerns?
One important thing to note is that separation of concerns is not equal to separation of file types. In modern UI development, we have found that instead of dividing the codebase into three huge layers that interweave with one another, it makes much more sense to divide them into loosely-coupled components and compose them. Inside a component, its template, logic and styles are inherently coupled, and collocating them actually makes the component more cohesive and maintainable.

Even if you don’t like the idea of Single-File Components, you can still leverage its hot-reloading and pre-compilation features by separating your JavaScript and CSS into separate files:
```
<!-- my-component.vue -->
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```
// @ is an alias to /src
import '@/components/comp1'
