export function strip(html = '') {
  if (typeof window === 'undefined')
    return html.replace(/<(?:.|\n)*?>/gm, '')
  let tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}