import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Emptyness from '../src/emptyness';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Paragraph, Emptyness ],
		toolbar: [ 'paragraph' ]
	} )
	.then( editor => {
		window.editor = editor;

		const destroyButton = document.getElementById( 'destroy-editor-button' );
		destroyButton.addEventListener( 'click', () => editor.destroy() );
	} );