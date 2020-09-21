export default {
    data: function() {
        return {
            mixinData: 'Hello from mixin'
        }
    },
    created: function() {
        console.log('Created hook from mixin')
    }
    // Can put other methods etc here
}