# Toc

Toc is a block for Table of Contents for ContentArchitect editor. Toc creates a table of contents based on the titles in the editor body. It does this automatically. It takes into account hierarchy.

## Installation

### 1st method
If you are using node you can install it:

```npm i -S @contentarchitect/toc``` or ```yarn add @contentarchitect/toc``` after this:

```js
import Toc from '@contentarchitect/toc'

ContentArchitect.Blocks.register(Toc)
```

### 2nd method
In your web page:

```html
<script src="https://unpkg.com/@contentarchitect/toc"></script>
<script>
	ContentArchitect.Blocks.register(Toc)
</script>
```

### Properties

- No need JS for on the viewing side (Editor side rendering)
- Automatic detection of headers changes
- Style customization with class options