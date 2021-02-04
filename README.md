# liquidjs-color-filters

[![npm](https://img.shields.io/npm/v/liquidjs-color-filters.svg)](https://www.npmjs.org/package/liquidjs-color-filters)
[![npm](https://img.shields.io/npm/dm/liquidjs-color-filters.svg)](https://www.npmjs.org/package/liquidjs-color-filters)
[![Build Status](https://travis-ci.org/harttle/liquidjs-color-filters.svg?branch=master)](https://travis-ci.org/harttle/liquidjs-color-filters)
[![Coveralls](https://img.shields.io/coveralls/harttle/liquidjs-color-filters.svg)](https://coveralls.io/github/harttle/liquidjs-color-filters?branch=master)
[![GitHub issues](https://img.shields.io/github/issues-closed/harttle/liquidjs-color-filters.svg)](https://github.com/harttle/liquidjs-color-filters/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/harttle/liquidjs-color-filters.svg)](https://github.com/harttle/liquidjs-color-filters/graphs/contributors)
[![David](https://img.shields.io/david/harttle/liquidjs-color-filters.svg)](https://david-dm.org/harttle/liquidjs-color-filters)
[![David Dev](https://img.shields.io/david/dev/harttle/liquidjs-color-filters.svg)](https://david-dm.org/harttle/liquidjs-color-filters?type=dev)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/harttle/liquidjs-color-filters/blob/master/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://github.com/harttle/liquidjs-color-filters)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/harttle/liquidjs-color-filters)

[liquidjs](https://github.com/harttle/liquidjs) plugin for color filters, compatible with [shopify color filters](https://help.shopify.com/en/themes/liquid/filters/color-filters)

## Usage

```bash
npm i liquidjs-color-filters
```

```javascript
import Liquid from 'liquidjs'
import { liquidColorFilters } from 'liquidjs-color-filters'

const liquid = new Liquid()
liquid.plugin(liquidColorFilters)

liquid.parseAndRender('{{ "rgba(122, 181, 92, 0.5)" | color_to_hsl }}')
.then(html => console.log(html)) // hsla(100, 38%, 54%, 0.5)
```

## Difference with Shopify Liquid

We're trying to be compatible but there's still few differences:

### Floor and Ceil

There could be at most 1 difference in each component value after color conversion.

### Result format

`color_lighten`, `color_modify`, `color_mix` always return rgb/rgba format,
while shopify will try to maintain the same format as the input.

### Algorithm

The algorithms for `color_lighten`, `color_darken`, `color_saturate`, `color_desaturate` are not standarized by W3C, so the result is slightly different with the corresponding Shipify version.

