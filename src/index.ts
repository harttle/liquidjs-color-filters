import Liquid from 'liquidjs'
import Color from 'color'

export function liquidColorFilters (this: Liquid) {
  this.registerFilter('color_to_rgb', (str) => {
    try {
      return Color(str).rgb().string()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_to_hsl', (str) => {
    try {
      return Color(str).hsl().round().string()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_to_hex', (str) => {
    try {
      return Color(str).hex().toLowerCase()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_extract', (str, field) => {
    if (!['red', 'green', 'blue', 'alpha'].includes(field)) return str
    try {
      return Color(str)[field]()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_brightness', (str) => {
    try {
      return brightness(str).toFixed(2)
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_modify', (str, field, val) => {
    if (!['red', 'green', 'blue', 'alpha'].includes(field)) return str
    try {
      return Color(str)[field](val)
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_lighten', (str, val) => {
    try {
      return Color(str).lighten(Number(val) / 100).round().rgb()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_darken', (str, val) => {
    try {
      return Color(str).darken(val / 100).round().rgb()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_saturate', (str, val) => {
    try {
      return Color(str).saturate(val / 100).rgb()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_desaturate', (str, val) => {
    try {
      return Color(str).desaturate(val / 100).rgb()
    } catch (err) {
      return str
    }
  })
  this.registerFilter('color_mix', (color1, color2, ratio) => {
    try {
      const c1 = new Color(color1)
      const c2 = new Color(color2)
      const [r1, g1, b1] = c1.rgb().array()
      const [r2, g2, b2] = c2.rgb().array()
      return Color
        .rgb([mix(r1, r2, ratio), mix(g1, g2, ratio), mix(b1, b2, ratio)])
        .alpha(mix(c1.alpha(), c2.alpha(), ratio))
    } catch (err) {
      console.log(err)
      return color1
    }
  })
  this.registerFilter('color_contrast', (color1, color2) => {
    try {
      return Color(color1).contrast(Color(color2)).toFixed(1)
    } catch (err) {
      return 0
    }
  })
  this.registerFilter('color_difference', (color1, color2) => {
    try {
      const [r1, g1, b1] = Color(color1).rgb().array()
      const [r2, g2, b2] = Color(color2).rgb().array()
      const difference = diff(r1, r2) + diff(g1, g2) + diff(b1, b2)
      return difference
    } catch (err) {
      return 0
    }
  })
  this.registerFilter('brightness_difference', (color1, color2) => {
    try {
      const diff = Math.abs(brightness(color1) - brightness(color2))
      return Math.round(diff)
    } catch (err) {
      return 0
    }
  })
}

function mix (a: number, b: number, r: number) {
  return (a * r + b * (100 - r)) / 100
}

function diff (v1: number, v2: number) {
  return Math.max(v1, v2) - Math.min(v1, v2)
}

function brightness (colorStr: string) {
  const [r, g, b] = Color(colorStr).rgb().array()
  return (r * 299 + g * 587 + b * 114) / 1000
}
