import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Emptyness extends Plugin {

	static get pluginName() {
		return 'Emptyness';
	}

	init() {
		const editor = this.editor;
		const doc = editor.model.document;

		editor.set( 'isEmpty', !documentHasContent(doc) );

		this.listenTo( doc, 'change:data', () => {
			editor.set( 'isEmpty', !documentHasContent(doc) );
		} );

	}

};

function documentHasContent(doc) {
	return doc.model.hasContent(doc.getRoot());
};
