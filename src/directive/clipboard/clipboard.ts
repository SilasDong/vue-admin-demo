const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el: any, binding: any) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', (e: any) => {
        const callback = el._v_clipboard_success
        if (callback) {
          callback(e)
        }
      })
      clipboard.on('error', (e: any) => {
        const callback = el._v_clipboard_error
        if (callback) {
          callback(e)
        }
      })
      el._v_clipboard = clipboard
    }
  },
  update(el: any, binding: any) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = () => binding.value
      el._v_clipboard.action = () => binding.arg === 'cut' ? 'cut' : 'copy'
    }
  },
  unbind(el: any, binding: any) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  }
}