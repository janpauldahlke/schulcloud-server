const assert = require('assert');
const app = require('../../../src/app');
const contentService = app.service('contents');
const chai = require('chai');


describe('content service', function () {
	before(function () {

	});

	it('registered the users service', () => {
		assert.ok(contentService);
	});

	it('provides the default resources with an empty query', () => {
		return contentService.find({query: {}}).then(result => {
			chai.expect(result.data).to.have.length.above(4);
		});
	});

	it('provides only a single resource with $limit 1', () => {
		return contentService.find({query: {$limit: 1}})
			.then(result => {
				chai.expect(result.data).to.have.lengthOf(1);
			});
	});

	it('filters subjects correctly', () => {
		const selectedSubjects = ["0", "640"];
		return contentService.find({query: {filter: {subjects: selectedSubjects}}})
			.then(result => {
				result.data.forEach(d => {
					d.attributes.subjects.forEach(
						s => chai.expect(s).to.be.oneOf(selectedSubjects)
					);
					chai.expect(d.attributes.subjects).to.have.length.below(selectedSubjects.length + 1);
				});
			});
	});
});
