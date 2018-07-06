import BoxedEditorUIView from '@ckeditor/ckeditor5-ui/src/editorui/boxed/boxededitoruiview';
import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview';

export default class IncompatibleTestEditorUIView extends BoxedEditorUIView {
	
	render() {
		
		this.editable = new InlineEditableUIView( this.locale );
		
		super.render();
		
	}
	
	

}