const {Plugin} = require('{{{ runtimePath }}}');

const plugin = new Plugin({ validKeys: [{{#validKeys}}'{{{ . }}}',{{/validKeys}}] });

{{#plugins}}
import * as Plugin_{{{ index }}} from '{{{ path }}}'
{{/plugins}}

{{#plugins}}
plugin.register({
  apply:Plugin_{{{ index }}},
  path:'{{{ path }}}'
});
{{/plugins}}

export { plugin }
