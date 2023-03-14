from PyPDF2 import PdfReader

reader = PdfReader('uploads/saved_file.pdf')

for i in range(len(reader.pages)):
    page = reader.pages[i]
    text = page.extract_text()
    print(text)
