'use strict'

const evens = [2, 4, 6, 8, 10, 12, 14]
const odds = evens.map((v) => v + 1)
const index = evens.map((v, i) => v + i)
const pair = evens.map((v) => ({even: v, odd: v + 1}))

console.log(odds, index, pair)
