from fpdf import FPDF

pdf = FPDF("P", "mm", "A4")


def generatePDF():
    # Generate the first page
    pdf.add_page()
    # set the font of first page
    pdf.set_font("times", "", 16)
    # addt test text
    pdf.cell(40, 10, "teste")

    # save
    pdf.output("test.pdf")


generatePDF()
