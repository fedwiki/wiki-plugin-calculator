###
 * Federated Wiki : Calculator Plugin
 *
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-calculator/blob/master/LICENSE.txt
###

window.plugins.calculator =
  emit: (div, item) ->
    item.data = (field for field of wiki.getData())
    text = calculate(item).join "\n"
    pre = $('<pre style="font-size: 16px;"/>').text text
    div.append pre
  bind: (div, item) ->
    div.on 'dblclick', () -> wiki.textEditor div, item

calculate = (item) ->
  sum = 0
  for line in item.text.split "\n"
    col = line.split /\s+/
    col[0] = col[0].replace /^[A-Z]+$/, (x) ->
      [item.data[x], sum] = [sum, 0] unless item.data[x]? && x != 'SUM'
      item.data[x].toFixed 2
    col[0] = col[0].replace /^\-?[0-9\.]+$/, (x) ->
      sum = sum + switch col[1]
        when 'CR', 'DB' then x/-1
        when '*' then x*col[2]
        when '/' then x/col[2]
        else x/1
      (x/1).toFixed 2
    sum = 0 if line.match /^\s*$/
    col.join ' '
