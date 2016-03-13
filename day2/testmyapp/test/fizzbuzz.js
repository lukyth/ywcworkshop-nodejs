/* global it, describe */
'use strict'

const expect = require('chai').expect
const fizzbuzz = require('../fizzbuzz')

describe('Fizzbuzz', () => {
  it('should return `fizz` when num divide by 3 is 0', () => {
    expect(fizzbuzz(3)).eql('fizz')
  })

  it('should return `buzz` when num divide by 5 is 0', () => {
    expect(fizzbuzz(5)).eql('buzz')
  })
})
