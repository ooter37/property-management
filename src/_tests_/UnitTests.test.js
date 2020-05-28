import {describe} from 'riteway'
import render from 'riteway/render-component'
import React from 'react'

describe('Display address component', async assert => {
    const address = '820 E Belmont Ave'
    const $ = render(<div>{address}</div>)

    assert({
        given: 'An address',
        should: 'Render the address in a div',
        actual: $('.address')
            .html()
            .trim(),
        expected: `${address}`
    })
})