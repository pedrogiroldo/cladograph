from fpdf import FPDF
from tkinter import filedialog


def generatePDF():
    html = """
    <H1 align="center">html2fpdf</H1>
    <h2>Basic usage</h2>
    <p>You can now easily print text mixing different
    styles : <B>bold</B>, <I>italic</I>, <U>underlined</U>, or
    <B><I><U>all at once</U></I></B>!<BR>You can also insert links
    on text, such as <A HREF="http://www.fpdf.org">www.fpdf.org</A>,
    or on an image: click on the logo.<br>
    <center>
    <A HREF="http://www.fpdf.org"><img src="tutorial/logo.png" width="104" height="71"></A>
    </center>
    <h3>Sample List</h3>
    <ul><li>option 1</li>
    <ol><li>option 2</li></ol>
    <li>option 3</li></ul>

    <table border="0" align="center" width="50%">
    <thead><tr><th width="30%">Header 1</th><th width="70%">header 2</th></tr></thead>
    <tbody>
    <tr><td>cell 1</td><td>cell 2</td></tr>
    <tr><td>cell 2</td><td>cell 3</td></tr>
    </tbody>
    </table>
    """

    pdf = FPDF()
    pdf.add_page()
    pdf.write_html(html)

    # Solicitar ao usuário o local para salvar o arquivo

    filename = filedialog.asksaveasfilename(
        defaultextension=".pdf",
        filetypes=[("All Files", "*.*")],
    )

    pdf.output(filename, "F")


generatePDF()
