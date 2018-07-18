import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';

import Template from '@ckeditor/ckeditor5-ui/src/template';
import Emptyness from '../../src/emptyness';

BalloonEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Essentials, Paragraph, Bold, Emptyness ],
		toolbar: [ 'bold' ]
	} )
	.then( editor => {
		window.editor = editor;
	} );