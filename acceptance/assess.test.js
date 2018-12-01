import puppeteer from 'puppeteer'

describe('testUser takes assessment', () => {
    let browser
    let page

    beforeAll(() => {
        jest.setTimeout(99000)
    })

    test('User logs in, selects Test Course, proceeds to assessment, takes assessment, passess with 100%, match snapshot', async done => {
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
        elem = await page.waitFor('[href="/courses"]')
        await elem.click()
        elem = await page.waitFor('#testcourse button')
        await elem.click()
        elem = await page.waitFor('[href^="/course/"]')
        await elem.click()
        elem = await page.waitFor('.page-content button')
        let text = await page.$eval('.page-content button', (e) => e.innerHTML)
        expect(text).toEqual('Go to Assessment')
        await elem.click()
        elem = await page.waitFor('.start-assess button')
        text = await page.$eval('.start-assess button', (e) => e.innerHTML)
        expect(text).toEqual('Start Assessment')
        await elem.click()
        elem = await page.waitFor('#answer4')
        await elem.click()
        let className = await page.$eval('#answer4', e => e.className)
        expect(/active/.test(className)).toBe(true)
        await elem.click()
        elem = await page.waitFor('.question-answer-submit button')
        await elem.click()
        expect(page.url()).toEqual('http://localhost:8000/course/5bf5b9d51c9d440000c6f2c7/assess')
        elem = await page.waitFor('.score')
        text = await page.$eval('.score', e => e.innerHTML)
        expect(text).toEqual('100%')
        let content = await page.content()
        expect(content).toMatchSnapshot()
        await browser.close()

        done()
    })
})
