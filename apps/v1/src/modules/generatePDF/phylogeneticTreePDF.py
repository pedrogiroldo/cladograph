from fpdf import FPDF
from tkinter import filedialog

threeSpaces = """
<pre>



</pre>
"""


def generatePDF():
    html = f"""
<img src="src/modules/generatePDF/assets/logo_cladograph_pdf.png" width=250 />
{threeSpaces}
<center>
<img src="src/modules/generatePDF/assets/cacheTree.png" width=500 />
</center>

    """
    pdf = FPDF()
    pdf.add_page()
    pdf.write_html(html)

    # Solicitar ao usuário o local para salvar o arquivo

    filename = filedialog.asksaveasfilename(
        defaultextension=".pdf",
        filetypes=[("All Files", "*.*")],
    )

    pdf.output(filename)
