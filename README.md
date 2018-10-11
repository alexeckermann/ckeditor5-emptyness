Emptyness — _How empty is **your** CKEditor 5 instance?_
===================================================

Why does something so simple exist? With great simplicity comes great possibilities.

Well... maybe _one_ possibility. The purpose of this plugin was to have an observable way to know if an editor instance has content or not.

Specifically, how can an application know when an editor is empty so it can show a placeholder — like an input element.

## Documentation

Simply build your editor with this plugin and you will get access to a `isEmpty` observable attribute (care of `Observable`) on your editor instance. Additionaly, the plugin will add a `ck-editor__is-empty` class name on the editor element when is is empty.

The origin use case was for the application to observe the attribute and know when the editor enters or exits an empty state. From there the application applies an attribute to the editors HTML element so that a CSS based placeholder can be applied — using CSS's `::before` rules to inject _phantom_ content without disturbing CKEditor's actual content.

### Placeholder Example

```js
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import Emptyness from 'ckeditor5-emptyness/src/emptyness';
// .. all your other imports here

export default class MyEditor extends BalloonEditorBase { }

MyEditor.build = {
	// ... all your other configs here

	plugins: [
		// ... all your other plugins here
		Emptyness
	]

};
```

```css
.ck-editor__is-empty.ck-content.ck-editor__editable::before {
	content: 'The editor is empty';
	position: absolute;
	display: block;
	
	margin: var(--ck-spacing-large) 0;
	
	color: #aaa;
}
```

The empty class will be applied to the editable view for the editor, this may be different to a container element that particular editors may create and use.

## Changelog

### v0.2.1 - 11 October 2018

- Fix [alexeckermann/ckeditor5-emptyness#5](https://github.com/alexeckermann/ckeditor5-emptyness/issues/5): The plugin tested against a editor which performs differently to the non-test editor. This lead to an incorrect asumption about what view to use for the empty CSS class. As a result the plugin will now detect if it is integrating with an editor it supports, logs error and warning messages if needed. This also simplifies the CSS targeting to just the content editable element.
- Updated dependencies to target CK5 v11.1 compatible dependencies.

### v0.2.0 - 4 July 2018

- Updating event listener to use `change:data` event on the editors document.
- No more `data-empty`! The plugin now extends the editors template with a bound CSS class name.
- Plugin now depends on CKEditor 5 core and engine `^10.1.0`.
- We now have tests!
- Updated README.

### v0.1.0

- Initial _rough_ version.
- No tests.

## Testing

### Required setup

1. Setup the CKEditor [development environment](https://docs.ckeditor.com/ckeditor5/latest/framework/guides/contributing/development-environment.html).
2. Add a dependency to the CKEditor project development environment:
	1. `cd ckeditor` enter into the CKEditor project as created in step 1
	2. Open and edit `mgit.json`
	3. Add `"ckeditor5-emptyness": "alexeckermann/ckeditor5-emptyness` to the dependencies list
3. `mgit update`
4. `lerna bootstrap --scope=ckeditor5-emptyness`

### Running tests

1. `cd ckeditor` enter into the CKEditor project
2. `npm run test -- --files=emptyness`

It is important to note that tests are run from within the CKEditor project and not solely on this project.

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
