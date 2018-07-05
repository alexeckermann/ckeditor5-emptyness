import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Template from '@ckeditor/ckeditor5-ui/src/template';
import Emptyness from '../../src/emptyness';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Essentials, Paragraph, Emptyness ],
		toolbar: [ ]
	} )
	.then( editor => {
		window.editor = editor;
	} );