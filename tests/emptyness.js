import Emptyness from '../src/emptyness';

import ModelText from '@ckeditor/ckeditor5-engine/src/model/text';
import ModelRange from '@ckeditor/ckeditor5-engine/src/model/range';

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import IncompatibleTestEditor from './_utils/incompatibletesteditor';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { setData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import log from '@ckeditor/ckeditor5-utils/src/log';

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
	
	describe( 'with a compliant editor view structure', () => {
		
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
				let element = editor.ui.view.editable.editableElement;
			
				expect( element.classList.contains('ck-editor__is-empty') ).to.be.true;
			
				insertContent();
			
				expect( element.classList.contains('ck-editor__is-empty') ).to.be.false;
			} );
		
			it( 'should add the empty class when all content is emptied', () => {
				setData( editor.model, '<paragraph>test{}</paragraph>' );
			
				let element = editor.ui.view.editable.editableElement;
			
				expect( element.classList.contains('ck-editor__is-empty') ).to.be.false;
			
				removeAllContent();
			
				expect( element.classList.contains('ck-editor__is-empty') ).to.be.true;
			} );
		
		} );
		
	} );
	
	describe( 'with an incompatible editor', () => {
		
		let errorSpy;
		
		beforeEach( () => {
			editorElement = document.createElement( 'div' );
			document.body.appendChild( editorElement );
			
			errorSpy = testUtils.sinon.stub( log, 'error' );
		
			return IncompatibleTestEditor
				.create( editorElement, {
					plugins: [ Emptyness, Paragraph ],
					_test: { missingEditable: true }
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
		
			it( 'should not set the isEmpty property', () => {
				expect( editor.isEmpty ).to.be.undefined;
			} );
			
			it( 'should log an error', () => {
				sinon.assert.calledOnce( errorSpy );
				sinon.assert.calledWithMatch( errorSpy, /^emptyness-view-not-found/ );
			} );
		
		} );
		
	} );
	
	describe( 'with an editor view that is rendered', () => {
		
		let warnSpy;
		
		beforeEach( () => {
			editorElement = document.createElement( 'div' );
			document.body.appendChild( editorElement );
			
			warnSpy = testUtils.sinon.stub( log, 'warn' );
		
			return IncompatibleTestEditor
				.create( editorElement, {
					plugins: [ Emptyness, Paragraph ],
					_test: { renderView: true }
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
				expect( editor.isEmpty ).not.to.be.undefined;
			} );
			
			it( 'should log a warning', () => {
				sinon.assert.calledOnce( warnSpy );
				sinon.assert.calledWithMatch( warnSpy, /^emptyness-view-is-rendered/ );
			} );
		
		} );
		
	} );
	

} );