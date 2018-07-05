import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Template from '@ckeditor/ckeditor5-ui/src/template';

export default class Emptyness extends Plugin {

	static get pluginName() {
		return 'Emptyness';
	}

	init() {
		const editor = this.editor;
		const doc = editor.model.document;
		const view = editor.ui.view;

		editor.set( 'isEmpty', !documentHasContent(doc) );

		this.listenTo( doc, 'change:data', () => {
			editor.set( 'isEmpty', !documentHasContent(doc) );
		} );
		
		const bind = Template.bind( editor, editor );
		
		view.extendTemplate( { 
			attributes: {
				class: [
					bind.if( 'isEmpty', 'ck-editor__is-empty' )
				]
			}
		} );

	}

};

function documentHasContent(doc) {
	return doc.model.hasContent(doc.getRoot());
};
