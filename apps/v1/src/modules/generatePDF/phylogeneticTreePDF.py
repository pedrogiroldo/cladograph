from fpdf import FPDF
from tkinter import filedialog

pdf = FPDF("P", "mm", "A4")


def generatePDF():
    # Generate the first page
    pdf.add_page()
    # set the font of first page
    pdf.set_font("times", "", 16)
    # addt test text
    pdf.cell(40, 10, "teste")

    # Solicitar ao usuário o local para salvar o arquivo

    filename = filedialog.asksaveasfilename(
        defaultextension=".pdf",
        filetypes=[("All Files", "*.*")],
    )

    if filename:
        # Salvar o cladograma no local escolhido pelo usuário
        pdf.output(filename)
