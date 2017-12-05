Emptyness — _How empty is **your** CKEditor 5 instance?_
===================================================

Why does something so simple exist? With great simplicity comes great possibilities.

...

Well maybe _one_ possibility. The purpose of this plugin was to have an observable way to know if an editor instance has content or not.

Specifically, how can an application know when an editor is empty so it can show a placeholder — like an input element.

## Documentation

Simply build your editor with this plugin and you will get access to a `isEmpty` observable attribute (care of `ObservableMixin`) on your editor instance.

The origin use case was for the application to observe the attribute and know when the editor enters or exits an empty state. From there the application applies an attribute to the editors HTML element so that a CSS based placeholder can be applied — using CSS's `::before` rules to inject 'phantom' content without disturbing CKEditor's actual content, and no messy invisible HTML elements.

### General Example

```
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import EmptynessPlugin from '@alexeckermann/ckeditor5-emptyness/src/emptyness';
// .. all your other imports here

export default class MyEditor extends BalloonEditorBase { }

MyEditor.build = {
	// ... all your other configs here

	plugins: [
		// ... all your other plugins here
		EmptynessPlugin
	]

};
```

```
const element = document.querySelector('#editor');

MyEditor.create( element ).then( editor => {

	editor.on( 'change:isEmpty', () => {
		console.log( 'is you empty or is you aint?', editor.isEmpty ? 'is empty' : 'aint empty' );
	} );

} );
```

### Placeholder Example

```
const element = document.querySelector('#editor');

MyEditor.create( element ).then( editor => {

	editor.on( 'change:isEmpty', () => {

		if ( editor.isEmpty ) {
			element.addAttribute( 'data-empty', true );
		} else {
			element.removeAttribute( 'data-empty' );
		}

	} );

} );
```

```
#editor[data-empty]::before {
	content: 'Untitled';
	position: absolute;
	display: block;
	color: #aaa;
	font-weight: bold;
}
```

**_Why can't we use CSS classes to use as a target for CSS?_**

The HTML element used for CKEditor instances is a managed view. Throughout use of the editor, the elements class list will change and can remove classes added outside of CKEditors management. In initial testing of this plugin we found no obvious way to extend the CKEditor's view `Template` for a editor view to enable CSS class based functionality. This could be resolved in future given advice from CKEditor maintainers.

## Testing

TODO _Sorry..._

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
