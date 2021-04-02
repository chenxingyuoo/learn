import {
  Ctx,
  Get,
  Controller,
} from 'routing-controllers'
import { Context } from 'koa'
// import cons from 'consolidate'
import path from 'path'

@Controller()
export default class {
  @Get('/')
  async router(@Ctx() ctx: Context) {
    return "hello";
  }
}