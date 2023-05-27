import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import * as cherrio from 'cheerio'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Injectable()
export class CompanyService {
  url =
    'https://www.wanted.co.kr/wdlist/518?country=kr&job_sort=company.response_rate_order&years=0&years=3&selected=873&selected=669&locations=seoul.gangnam-gu'

  wait = (ms) => new Promise((res) => setTimeout(res, ms))
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company'
  }

  async findAll() {
    const browser = await puppeteer.launch({
      headless: false,
    })

    const page = await browser.newPage()
    await page.setViewport({
      width: 1200,
      height: 600,
    })

    await page.goto(this.url)

    const lastHeight = await page.evaluate('document.body.scrollHeight')

    // while (true) {
    //   await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    //   await this.wait(500) // sleep a bit
    //   const newHeight = await page.evaluate('document.body.scrollHeight')
    //   if (newHeight === lastHeight) {
    //     break
    //   }
    //   lastHeight = newHeight
    // }

    const content = await page.content()
    const list = await page.$('#__next ul[data-cy="job-list"]')

    const ele = await list.$$('li > div > a')

    for (const e of ele) {
      const a = await page.evaluate((e) => {
        return e.getAttribute('href')
      }, e)
      console.log(a)
    }

    return `This action returns all company`
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}
