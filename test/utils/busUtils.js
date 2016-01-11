'use strict';
/* global describe, it, before; */
const Assert = require('assert');

const base = '../../src';
const BusUtils = require(`${base}/utils/busUtils`);
const Config = require(`${base}/config`);

var streets;

describe('BusUtils', () => {
	
	before( () => {
        // streets = [A,B,C,B,A,D | E,F,E,A]
		streets = [
            {
                location: 'A',
                returning: false  
            },
            {
                location: 'B',
                returning: false  
            },
            {
                location: 'C',
                returning: false  
            },
            {
                location: 'B',
                returning: false  
            },
            {
                location: 'A',
                returning: false  
            },
            {
                location: 'D',
                returning: false  
            },
            {
                location: 'E',
                returning: true  
            },
            {
                location: 'F',
                returning: true  
            },
            {
                location: 'E',
                returning: true  
            },
            {
                location: 'A',
                returning: true  
            }
        ];
	});
	
	it('should identify when a street has one match in the itinerary', function(done) {
		var matches = BusUtils.streetInItinerary('A', streets);
		Assert.notEqual(matches, undefined);
		Assert.notEqual(matches, null);
		Assert(matches instanceof Array);
        Assert.equal(matches.length, 3);
        for (var match of matches) {
            Assert.equal(streets[match].location, 'A');
        }
        done();
	});
    
	it('should identify when a street has many matches in the itinerary', function(done) {
		var matches = BusUtils.streetInItinerary('B', streets);
		Assert.notEqual(matches, undefined);
		Assert.notEqual(matches, null);
		Assert(matches instanceof Array);
        Assert.equal(matches.length, 2);
        for (var match of matches) {
            Assert.equal(streets[match].location, 'B');
        }
        done();
	});
	
	it('should identify when a street is not part of the itinerary', function(done) {
		var matches = BusUtils.streetInItinerary('X', streets);
		Assert.notEqual(matches, undefined);
		Assert.notEqual(matches, null);
		Assert(matches instanceof Array);
        Assert.equal(matches.length, 0);
        done();
	});
    
	it('should identify the state as going from a list of 1 match', function(done) {
		var matches = [2];
        var state = BusUtils.identifyStateFromMatches(matches, streets);
		Assert.notEqual(state, undefined);
		Assert.notEqual(state, null);
        Assert.deepStrictEqual(state, 1, "Identified the wrong direction");
        done();
	});
    
	it('should identify the state as going from a list of matches in the same direction', function(done) {
		var matches = [1,3];
        var state = BusUtils.identifyStateFromMatches(matches, streets);
		Assert.notEqual(state, undefined);
		Assert.notEqual(state, null);
        Assert.deepStrictEqual(state, 1, "Identified the wrong direction");
        done();
	});
    
	it('should identify the state as returning from a list of matches in the same direction', function(done) {
		var matches = [6,8];
        var state = BusUtils.identifyStateFromMatches(matches, streets);
		Assert.notEqual(state, undefined);
		Assert.notEqual(state, null);
        Assert.deepStrictEqual(state, -1, "Identified the wrong direction");
        done();
	});
});