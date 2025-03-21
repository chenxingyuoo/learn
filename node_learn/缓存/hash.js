/*
 * @Description: 这是***页面
 * @Date: 2022-09-06 11:28:22
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

const crypto = require('crypto')
const util = require('util')
const fs = require('fs')
const assert = require('assert')

function hmac(data, key, algorithm) {
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error('不支持此哈希函数')
  }

  const hmac = crypto.createHmac(algorithm, key)
  hmac.update(data)
  return hmac.digest('hex')
}

// output: 30267bcf2a476abaa9b9a87dd39a1f8d6906d1180451abdcb8145b384b9f76a5
console.log(hmac('root', '7(23y*&745^%I', 'sha256'))

// console.log('crypto.getCiphers();', util.inspect(crypto.getCiphers()))

// 对称加密
function aes() {
  // const secret = crypto.randomBytes(32) // 密钥
  const secret = Buffer.from('I'.repeat(32)) // 密钥
  const content = 'hello world!' // 要加密的明文

  console.log('secret', secret)

  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    secret,
    Buffer.alloc(16, 0)
  )
  cipher.update(content, 'utf8')
  // 加密后的结果：e2a927165757acc609a89c093d8e3af5
  const password = cipher.final('hex')
  console.log(password)

  //解密
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    secret,
    Buffer.alloc(16, 0)
  )
  decipher.update(password, 'hex')
  console.log(decipher.final('utf8')) // 解密后的结果：hello world!
}

aes()

// 非对称加密
function rsa() {
  const privateKey = fs.readFileSync('./privatekey.pem')
  const publicKey = fs.readFileSync('./publickey.pem')

  const content = 'hello world 123!' // 待加密的明文内容

  // 公钥加密
  const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content))
  console.log('公钥加密', encodeData.toString('base64'))

  // 私钥解密
  const decodeData = crypto.privateDecrypt(privateKey, encodeData)
  console.log('私钥解密', decodeData.toString('utf8'))
}

rsa()

//签名和验证算法
function signFn() {
  const privateKey = fs.readFileSync('./privatekey.pem')
  const publicKey = fs.readFileSync('./publickey.pem')

  const data = '传输的数据'

  // 第一步：用私钥对传输的数据，生成对应的签名
  const sign = crypto.createSign('sha256')
  // 添加数据
  sign.update(data, 'utf8')
  sign.end()
  // 根据私钥，生成签名
  const signature = sign.sign(privateKey, 'hex')
  console.log('signature', signature)

  // 第二步：借助公钥验证签名的准确性
  const verify = crypto.createVerify('sha256')
  verify.update(data, 'utf8')
  verify.end()

  const res = verify.verify(publicKey, signature, 'hex')
  console.log('verify res', res)

  assert.ok(res)
}

signFn()
