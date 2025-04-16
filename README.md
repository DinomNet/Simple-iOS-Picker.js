# Dinom Simple iOS Picker.js

Lightweight, modern JavaScript library that enhances `<select>` elements with a sleek, iOS-style dropdown menu. This is a standalone solution designed for vanilla JavaScript projects.

## Features
- Transforms `<select>` elements into iOS-inspired pickers with smooth animations.
- Preserves your `<select>` CSS styles and form integration.
- Automatically supports `<select>` elements added dynamically via JavaScript.
- Matches OS dark/light mode, with optional manual override.
- Uses a single overlay for optimal performance (~0.1MB, ~0.05ms open).
- Cleans up dynamically removed `<select>`s to prevent memory leaks.
- Compact footprint: ~0.5KB minified CSS, ~0.015MB static memory.

## Installation

Add the `ios-picker.min.js` file to your project directly from a CDN:
`<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/DinomNet/Simple-iOS-Picker.js@main/dist/ios-picker.min.js"></script>`

or download the `ios-picker.min.js` file and include it directly:
`<script src="path/to/ios-picker.min.js"></script>`

## Usage
Add the `picker` class to any `<select>` element:

```html
<select class="picker">
  <option value="1">Option 1</option>
  <option value="2" selected>Option 2</option>
</select>
```

The library captures clicks, blocks the default browser dropdown, and displays an iOS-style picker. Selections update the `<select>` value, trigger `change` events, and work with forms.

### Dynamic `<select>`s
Create `<select>` elements programmatically:

```javascript
const select=document.createElement('select');
select.className='picker';
select.innerHTML='<option value="1">New Option</option>';
document.body.appendChild(select);
```

The library detects and initializes them automatically.


### Light/Dark Mode
The picker adapts to the OS color scheme (`prefers-color-scheme`) by default. Override with a `data-theme` attribute on the `<script>` tag:

```html
<script src="ios-picker.js" data-theme="light"></script> <!-- Forces light mode -->
<script src="ios-picker.js" data-theme="dark"></script> <!-- Forces dark mode -->
```

## Customization
- **`<select>` Styling**: Customize `select.picker` with CSS (e.g., `border`, `padding`). Your styles are fully preserved.
- **Picker Appearance**: Edit the CSS in `ios-picker.js` or overwrite it with your own style.
- **Cancel Text**: Change `cancel.textContent='Cancel'` in the source to modify the label.
- **Behavior**: Alter `showPicker` or `hidePicker` functions for custom animations or interactions.


## License

This project is licensed under the MIT License. See below for details:

```
MIT License

Copyright (c) 2025, github.com/Chefaroon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Contributing
Fork, make changes, and submit a pull request. Bug reports and feature requests are welcome via issues.