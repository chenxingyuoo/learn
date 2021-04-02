import time
# import pdfkit
from flask import Flask
from selenium import webdriver
from PyPDF2 import PdfFileReader, PdfFileWriter
from flask import render_template, request, redirect, make_response


app = Flask(__name__)


# 合并pdf
def merge_pdfs(paths, output):
    pdf_writer = PdfFileWriter()

    for path in paths:
        pdf_reader = PdfFileReader(path)
        for page in range(pdf_reader.getNumPages()):
            # 将每页添加到writer对象
            pdf_writer.addPage(pdf_reader.getPage(page))

    # 写入合并的pdf
    with open(output, 'wb') as out:
        pdf_writer.write(out)


@app.route('/mergePdf', methods=['POST'])
def merge_pdf():

    pdfFiles = request.json['pdfFiles'] or []
    print('pdfFiles', pdfFiles)
    # paths = ['1.pdf', '2.pdf']
    merge_pdfs(pdfFiles, output='merged.pdf')
    return 'xx'


# @app.route('/')
# def hello_world():
#     pdfkit.from_url('https://baidu.com', 'out.pdf')
#
#     return
#     driver = webdriver.Chrome()
#
#     driver.maximize_window()
#
#     driver.get(
#         'https://juejin.im/book/5c526902e51d4543805ef35e/section/5c5269026fb9a049f1549e4a')
#
#     # driver.execute_script('window.open()')
#     # driver.switch_to_window(driver.window_handles[1])
#     # driver.get('https://www.baidu.com')
#
#     driver.find_element_by_css_selector('.login').click()
#     driver.find_element_by_css_selector(
#         'input[name="loginPhoneOrEmail"]').send_keys('15622243679')
#     driver.find_element_by_css_selector(
#         'input[name="loginPassword"]').send_keys('ihaveadream.20')
#     driver.find_element_by_css_selector('.auth-form .btn').click()
#
#     time.sleep(2)
#
#     # str = """
#     #   let urls = []
#     #   let sectionList = document.querySelectorAll('.section')
#     #   sectionList.forEach((item, i) => {
#     #       item.click()
#     #       urls.push(window.location.href)
#     #   })
#     #   console.log(urls)
#     # """
#     # driver.execute_script(str)
#     #
#     # print('str', str)
#
#     sectionList = driver.find_elements_by_css_selector(
#         '.book-directory .section')
#     print('sectionList', sectionList)
#     #
#     urls = []
#     for index in range(len(sectionList)):
#         str = f"""
#         document.querySelectorAll('.section')[{index}].click()
#         """
#         driver.execute_script(str)
#         urls.append(driver.current_url)
#
#     print('urls', urls)
#     driver.execute_script('window.open()')
#     driver.switch_to_window(driver.window_handles[1])
#
#     for index in range(len(urls)):
#         driver.get(urls[index])
#
#     # for i in range(2):
#     return 'Hello World!'


if __name__ == '__main__':
    app.run()
