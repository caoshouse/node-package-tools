"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
<h2>{{name}} ver. {{version}}</h2>  
<strong>author:</strong> {{author.name}}  
<p>{{{description}}}</p>

{{#homepage}}
<h3>Home page</h3>
<a href="{{homepage}}">{{homepage}}</a>
{{/homepage}}

{{#repository}}
<h3>Repository</h3>
<a href="{{repository.url}}">{{repository.url}}</a>
{{/repository}}

{{#docs}}
<h3>Documentation</h3>
<a href="{{docs}}">{{docs}}</a>
{{/docs}}

{{#install}}
<h3>Installation</h3>
<pre><code>{{install}}</pre></code>
{{/install}}

{{#examples.length}}
<h3>Examples</h3>
{{#examples}}
<pre><code>{{{.}}}</code></pre>
{{/examples}}
{{/examples.length}}

{{#dependencies.length}}
<h3>Dependencies</h3>
<ul>
{{#dependencies}}
<li><a href="https://www.npmjs.com/package/{{name}}">{{name}}: {{version}}</a> {{{description}}} {{#author}}(by <a href="{{url}}">{{name}}</a>){{/author}}</li>
{{/dependencies}}
</ul>
{{/dependencies.length}}

{{#devDependencies.length}}
<h3>devDependencies</h3>
<ul>
{{#devDependencies}}
<li><a href="https://www.npmjs.com/package/{{name}}">{{name}}: {{version}}</a> {{{description}}} {{#author}}(by <a href="{{url}}">{{name}}</a>){{/author}}</li>
{{/devDependencies}}
</ul>
{{/devDependencies.length}}

{{#todo.length}}
<h3>Todo</h3>
<ul>
{{#todo}}<li>{{{.}}}</li>{{/todo}}
</ul>
{{/todo.length}}

{{#contributors.length}}
<h3>Contributors</h3>
<ul>
{{#contributors}}
<li>{{#url}}<a href="{{url}}">{{name}}</a>{{/url}}{{^url}}{{name}}{{/url}}</li>
{{/contributors}}
</ul>
{{/contributors.length}}
`;
