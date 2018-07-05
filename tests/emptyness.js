import Emptyness from '../src/emptyness';

import ModelText from '@ckeditor/ckeditor5-engine/src/model/text';
import ModelRange from '@ckeditor/ckeditor5-engine/src/model/range';

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { setData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';

testUtils.createSinonSandbox();

describe( 'Emptyness', () => {
	let editor, editorElement;
	
	const insertContent = () => {
		
		editor.model.change( writer => {
			writer.setSelection( ModelRange.createIn( editor.model.document.getRoot().getChild( 0 ) ) );
			editor.model.insertContent( new ModelText( 'test' ), editor.model.document.selection );
		} );
		
	};
	
	const removeAllContent = () => {
		
		editor.model.change( writer => {
			writer.setSelection( ModelRange.createIn( editor.model.document.getRoot().getChild( 0 ) ) );
			editor.model.deleteContent( editor.model.document.selection );
		} );
		
	};
	
	beforeEach( () => {
		editorElement = document.createElement( 'div' );
		document.body.appendChild( editorElement );
		
		return ClassicTestEditor
			.create( editorElement, {
				plugins: [ Emptyness, Paragraph ]
			} )
			.then( newEditor => {
				editor = newEditor;
			} );
	} );
	
	afterEach( () => {
		editorElement.remove();

		return editor.destroy();
	} );

	it( 'should be loaded', () => {
		expect( editor.plugins.get( Emptyness ) ).to.be.instanceOf( Emptyness );
	} );
	
	describe( 'init()', () => {
		
		it( 'should set the isEmpty property', () => {
			expect( editor.isEmpty ).to.be.true;
		} );
		
	} );
	
	describe( 'isEmpty lifecycle', () => {
		
		it( 'should be false when content is inserted', () => {
			const setSpy = testUtils.sinon.spy( editor, 'set' );
			
			insertContent();
			
			sinon.assert.calledWithExactly( setSpy, 'isEmpty', false );
		} );
		
		it( 'should be true when all content is emptied', () => {
			setData( editor.model, '<paragraph>test{}</paragraph>' );
			
			const setSpy = testUtils.sinon.spy( editor, 'set' );
			
			removeAllContent();
			
			sinon.assert.calledWithExactly( setSpy, 'isEmpty', true );
		} );
		
	} );
	
	describe( 'view class lifecycle', () => {
		
		it( 'should not have the empty class content is inserted', () => {
			expect( editor.ui.view.element.classList.contains('ck-editor__is-empty') ).to.be.true;
			
			insertContent();
			
			expect( editor.ui.view.element.classList.contains('ck-editor__is-empty') ).to.be.false;
		} );
		
		it( 'should add the empty class when all content is emptied', () => {
			setData( editor.model, '<paragraph>test{}</paragraph>' );
			
			expect( editor.ui.view.element.classList.contains('ck-editor__is-empty') ).to.be.false;
			
			removeAllContent();
			
			expect( editor.ui.view.element.classList.contains('ck-editor__is-empty') ).to.be.true;
		} );
		
	} );

} );