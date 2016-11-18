# `<ScrollViewport />` <sub>_for [Preact]_</sub>

[![NPM](https://img.shields.io/npm/v/preact-scroll-viewport.svg)](https://www.npmjs.com/package/preact-scroll-viewport)
[![Travis](https://travis-ci.org/developit/preact-scroll-viewport.svg?branch=master)](https://travis-ci.org/developit/preact-scroll-viewport)

A compositional component that renders its children based on the current viewport.

Useful for those super important business applications where one must show _all_ million rows.

#### [Demo](https://jsfiddle.net/developit/t6qqnwn9/)

<a href="https://jsfiddle.net/developit/t6qqnwn9/">
	<img alt="preview" src="https://i.gyazo.com/38f75b5db9615b0a08304d6cca209e47.gif" width="420">
</a>

---


## Usage Example

Simply wrap a large collection of children in this component, and they will be rendered based on the viewport.
You can define a default row height (`defaultRowHeight`) to use prior to dimensions being available, or a static row height (`rowHeight`) to avoid style recalculation entirely. If `rowHeight` is not provided, the height of the first row will be calculated and extrapolated.

```js
// create 100,000 children:
let children = [];
for (let i=1; i<100000; i++) {
	children.push(<div class="row">{i}</div>);
}

// ...but only render what is in-viewport:
render(
	<ScrollViewport rowHeight={22}>
		{children}
	</ScrollViewport>
);
```


---


## Props

| Prop                  | Type       | Description         |
|-----------------------|------------|---------------------|
| **`rowHeight`**        | _Number_   | Static height of a row (prevents style recalc)
| **`defaultRowHeight`** | _Number_   | Initial height of a row prior to dimensions being available
| **`overscan`**         | _Number_   | Number of extra rows to render above and below visible list. Defaults to 10. \*
| **`sync`**             | _Boolean_  | If `true`, forces synchronous rendering \*\*

_**\* Why overscan?** Rendering normalized blocks of rows reduces the number of DOM interactions by grouping all row renders into a single atomic update._

_**\*\* About synchronous rendering:** It's best to try without `sync` enabled first. If the normal async rendering behavior is fine, leave sync turned off. If you see flickering, enabling sync will ensure every update gets out to the screen without dropping renders, but does so at the expense of actual framerate._


| _Without_ Overscan | _With_ Overscan |
|--------------------|-----------------|
| <img src="https://i.gyazo.com/e192bf1ca835fbe6ad803f7b6270e424.gif" height="150"> | <img src="https://i.gyazo.com/478440d1f06fe543e69fff8b88ce7963.gif" height="150"> |


---

## Simple Example

[**View this example on JSFiddle**](https://jsfiddle.net/developit/t6qqnwn9/)

```js
import ScrollViewport from 'preact-scroll-viewport';

class Demo extends Component {
    // 30px tall rows
    rowHeight = 30;

    render() {
		// Generate 100,000 rows of data
		let rows = [];
		for (let x=1e5; x--; ) rows[x] = `Item #${x+1}`;

        return (
            <ScrollViewport class="list" rowHeight={this.rowHeight}>
				{ rows.map( row => (
					<div class="row">{row}</div>
				)) }
			</ScrollViewport>
        );
    }
}

render(Demo, document.body);
```


---


### License

[MIT]


[Preact]: https://github.com/developit/preact
[MIT]: http://choosealicense.com/licenses/mit/
