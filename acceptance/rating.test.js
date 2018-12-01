import puppeteer from 'puppeteer'

describe('user rates course', () => {
    let browser
    let page

    beforeAll(() => {
        jest.setTimeout(30000)
    })
    test('User logs in, rates testcourse 2 stars', async done => {
        let elem
        browser = await puppeteer.launch()
        page = await browser.newPage()
        await page.goto('http://localhost:8000')
        elem = await page.waitFor('[href="/account/login"]')
        await elem.click()
        await page.type('#usernameid','testUser')
        await page.type('#passwordid','testPassword')
        elem = await page.$('[type="submit"]')
        await elem.click()
        await page.waitFor('#testcourse')
        elem = await page.waitFor('#testcourse .dv-star-rating .dv-star-rating-star:nth-of-type(3)')
        let className = await page.$eval('#testcourse .dv-star-rating .dv-star-rating-star:nth-of-type(3)', e => e.className)
        expect(/full/.test(className)).toBe(true)
        await elem.click()
        elem = await page.waitFor('#testcourse .dv-star-rating .dv-star-rating-star:nth-of-type(2)')
        className = await page.$eval('#testcourse .dv-star-rating .dv-star-rating-star:nth-of-type(2)', e => e.className)
        expect(/empty/.test(className)).toBe(true)
        let content = await page.content()
        expect(content).toMatchSnapshot()
        await browser.close()

        done()
    })

})
