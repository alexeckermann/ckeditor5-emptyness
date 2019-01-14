import Emptyness from '../src/emptyness';

import ModelText from '@ckeditor/ckeditor5-engine/src/model/text';
import ModelRange from '@ckeditor/ckeditor5-engine/src/model/range';

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import IncompatibleTestEditor from './_utils/incompatibletesteditor';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import List from '@ckeditor/ckeditor5-list/src/list';

import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';

import { setData as setModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';

import log from '@ckeditor/ckeditor5-utils/src/log';

testUtils.createSinonSandbox();

describe( 'Emptyness', () => {
	let editor, editorElement;
	let model;

	const insertContent = () => {

		setModelData( model, '<paragraph>test{}</paragraph>' );

	};

	const removeAllContent = () => {

		const modelRoot = model.document.getRoot();

		model.change( writer => {
			writer.remove( writer.createRangeIn( modelRoot ) );
		} );

	};

	describe( 'with a compliant editor view structure', () => {

		beforeEach( () => {
			editorElement = document.createElement( 'div' );
			document.body.appendChild( editorElement );

			return ClassicTestEditor
				.create( editorElement, {
					plugins: [ Emptyness, Paragraph, List ]
				} )
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
				} );
		} );

		afterEach( () => {
			editorElement.remove();
			editor.destroy();
			editor = null;
			model = null;
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
			let setSpy;

			beforeEach( () => {
				setSpy = testUtils.sinon.spy( editor, 'set' );
			});

			it( 'should be false when content is inserted', () => {
				insertContent();
				sinon.assert.calledWithExactly( setSpy, 'isEmpty', false );
			} );

			it( 'should be true when all content is emptied', () => {
				insertContent();
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
				insertContent();

				let element = editor.ui.view.editable.editableElement;

				expect( element.classList.contains('ck-editor__is-empty') ).to.be.false;
				removeAllContent();
				expect( element.classList.contains('ck-editor__is-empty') ).to.be.true;
			} );

		} );

		describe( 'visually present block with no content', () => {

			it( 'should not be empty', () => {
				
				setModelData( model, '<listItem listType="bulleted" listIndent="0">[]</listItem>' );
				expect( editor.isEmpty ).to.be.false;

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
					model = editor.model;
				} );
		} );

		afterEach( () => {
			editorElement.remove();
			editor.destroy();
			editor = null;
			model = null;
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
					model = editor.model;
				} );
		} );

		afterEach( () => {
			editorElement.remove();
			editor.destroy();
			editor = null;
			model = null;
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