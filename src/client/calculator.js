/*
 * Federated Wiki : Calculator Plugin
 *
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-calculator/blob/master/LICENSE.txt
 */

window.plugins.calculator = {
  emit: (div, item) => {
    item.data = Object.keys(wiki.getData())
    const text = calculate(item).join('\n')
    const pre = $('<pre style="font-size: 16px;"/>').text(text)
    div.append(pre)
  },
  bind: (div, item) => {
    div.on('dblclick', () => wiki.textEditor(div, item))
  },
}

function calculate(item) {
  let sum = 0
  return item.text.split('\n').map(function (line) {
    let col = line.split(/\s+/)

    col[0] = col[0].replace(/^[A-Z]+$/, function (x) {
      if (!(item.data[x] != null && x !== 'SUM')) {
        ;[item.data[x], sum] = [sum, 0]
      }
      return item.data[x].toFixed(2)
    })

    col[0] = col[0].replace(/^-?[0-9.]+$/, function (x) {
      switch (col[1]) {
        case 'CR':
        case 'DB':
          sum += x / -1
          break
        case '*':
          sum += x * col[2]
          break
        case '/':
          sum += x / col[2]
          break
        default:
          sum += x / 1
      }
      return (x / 1).toFixed(2)
    })

    if (line.match(/^\s*$/)) {
      sum = 0
    }

    return col.join(' ')
  })
}
