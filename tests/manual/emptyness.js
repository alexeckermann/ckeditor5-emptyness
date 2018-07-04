import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Emptyness from '../../src/emptyness';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Paragraph, Emptyness ],
		toolbar: [ ]
	} )
	.then( editor => {
		window.editor = editor;
		
		editor.on( 'change:isEmpty', () => {

			if ( editor.isEmpty ) {
				element.setAttribute( 'data-empty', true );
			} else {
				element.removeAttribute( 'data-empty' );
			}

		} );
		
	} );