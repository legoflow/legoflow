<!-- {{@require('./zhihu.raw.svg')}} -->

<div>
    {{@content}}
</div>

<ul>
    {{each list}}
        <li>{{$value.name | test }}</li>
    {{/each}}
</ul>
