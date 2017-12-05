import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Emptyness extends Plugin {

	static get pluginName() {
		return 'Emptyness';
	}

	init() {
		const editor = this.editor;
		const data = editor.data;

		const view = editor.ui.view;
		const bind = view.bindTemplate;

		editor.set( 'isEmpty', !dataControllerRootHasContent(data) );

		editor.document.on( 'change', () => {
			editor.set( 'isEmpty', !dataControllerRootHasContent(data) );
			return true;
		} );

	}

};

function dataControllerRootHasContent(data) {
	return data.hasContent(data.model.getRoot());
};
