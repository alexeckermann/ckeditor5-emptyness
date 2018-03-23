import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Emptyness extends Plugin {

	static get pluginName() {
		return 'Emptyness';
	}

	init() {
		const editor = this.editor;
		const model = editor.data.model;

		const view = editor.ui.view;
		const bind = view.bindTemplate;

		editor.set( 'isEmpty', !modelHasContent(model) );

		model.on( 'applyOperation', () => {
			editor.set( 'isEmpty', !modelHasContent(model) );
			return true;
		} );

	}

};

function dataControllerRootHasContent(data) {
	return data.hasContent(data.model.getRoot());
};

function modelHasContent(model) {
	return model.hasContent(model.document.getRoot());
};
