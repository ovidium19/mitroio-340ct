import puppeteer from 'puppeteer'

describe('testUser navigates to page 1 of GitFlow', () => {
    let browser
    let page

    beforeAll(() => {
        jest.setTimeout(30000)
    })
    test('User logs in, goes to /courses, selects Git Flow, Views content, selects Page 1', async done => {
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
        await page.waitFor('#gittheorybeginner')
        elem = await page.waitFor('[href="/courses"]')
        await elem.click()
        elem = await page.waitFor('#gittheorybeginner button')
        await elem.click()
        elem = await page.waitFor('[href^="/course/"]')
        await elem.click()
        elem = await page.waitFor('.go-to-page[dataindex="0"]')
        await elem.click()
        elem = await page.waitFor('.page-content button')
        let text = await page.$eval('.page-content button', (e) => e.innerHTML)
        expect(text).toEqual('Go to Git Basic Commands')
        let content = await page.content()
        expect(content).toMatchSnapshot()
        await browser.close()

        done()
    })

})
