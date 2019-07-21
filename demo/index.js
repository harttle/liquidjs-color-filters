const Liquid = require('liquidjs')
const { liquidColorFilters } = require('..')

const liquid = new Liquid()
liquid.plugin(liquidColorFilters)

liquid.parseAndRender('{{ "rgba(122, 181, 92, 0.5)" | color_to_hsl }}')
.then(html => console.log(html)) // hsla(100, 38%, 54%, 0.5)
