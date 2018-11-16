import {
	START_MARK,
	END_MARK,
	getOffsets,
	getIndicesOf,
} from "../../src/decorator/gutenberg";

jest.setMock( "@wordpress/rich-text", null );

/**
 * Mocks a YoastSEO.js Mark object.
 *
 * @param {string} original The sentence without yoastmark tags.
 * @param {string} marked   The sentence with yoastmark tags.
 *
 * @returns {Object} Mark mock.
 */
function mockMark( original, marked ) {
	return {
		getOriginal: () => original,
		getMarked: () => marked,
	};
}

describe( "getOffsets", () => {
	it( "successfully finds offsets for a single mark at the start of the text", () => {
		const mark = mockMark(
			"A marked text.",
			`${ START_MARK }A marked${ END_MARK } text.`
		);

		const expected = [
			{
				startOffset: 0,
				endOffset: 8,
			},
		];

		expect( getOffsets( mark ) ).toEqual( expected );
	} );

	it( "successfully finds offsets for a single mark at the end of the text", () => {
		const mark = mockMark(
			"A marked text.",
			`A ${ START_MARK }marked text.${ END_MARK }`
		);

		const expected = [
			{
				startOffset: 2,
				endOffset: 14,
			},
		];

		expect( getOffsets( mark ) ).toEqual( expected );
	} );

	it( "successfully finds multiple offsets for multiple marks", () => {
		const mark = mockMark(
			"A marked text.",
			`${ START_MARK }A${ END_MARK } marked ${ START_MARK }text.${ END_MARK }`
		);

		const expected = [
			{
				startOffset: 0,
				endOffset: 1,
			},
			{
				startOffset: 9,
				endOffset: 14,
			},
		];

		expect( getOffsets( mark ) ).toEqual( expected );
	} );

	it( "returns an empty array if the start and end tags are in a incorrect order", () => {
		const mark = mockMark(
			"A marked text.",
			`${ START_MARK }A${ END_MARK } marked ${ END_MARK }text.${ START_MARK }`
		);

		const expected = [];

		expect( getOffsets( mark ) ).toEqual( expected );
	} );
} );

describe( "getIndicesOf", () => {
	it( "finds a single case sensitive occurence", () => {
		const expected = [ 3 ];

		expect( getIndicesOf( "la LA", "LA" ) ).toEqual( expected );
	} );

	it( "finds multiple case insensitive occurences", () => {
		const expected = [ 0, 3 ];

		expect( getIndicesOf( "la LA", "LA", false ) ).toEqual( expected );
	} );
} );