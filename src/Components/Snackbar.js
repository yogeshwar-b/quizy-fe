export function notify(message) {
  var bar = document.getElementById('snackbar')
  bar.innerHTML = message
  bar.classList.add('show')
  setTimeout(() => {
    bar.classList.remove('show')
  }, 2800)
}
