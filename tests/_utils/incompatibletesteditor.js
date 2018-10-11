import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import EditorUI from '@ckeditor/ckeditor5-core/src/editor/editorui';
import IncompatibleTestEditorUIVIew from './incompatibletesteditoruiview';

export default class IncompatibleTestEditor extends ClassicTestEditor {
	/**
	 * @inheritDoc
	 */
	constructor( element, config ) {
		super( element, config );

		if ( config._test.missingEditable === true ) {
			// Intentially remove the editable property to trip up the plugin.
			this.ui = new EditorUI( this, new IncompatibleTestEditorUIVIew( this.locale ) );
			this.ui.view.editable = null;
		}
		
		if ( config._test.renderView === true ) {
			// Render the editable view so that its template can not be extended
			this.ui.view.editable.render();
		}
		

	}

}