Vue.component('test-js-inline-svg', {
    render ( h ) {
        return (
            <div class="test-js-inline-svg">
                test-js-inline-svg
                <i domPropsInnerHTML={ require("./close.raw.svg") }></i>
            </div>
        )
    }
})
