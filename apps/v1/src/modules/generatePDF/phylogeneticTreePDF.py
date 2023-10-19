from fpdf import FPDF
from tkinter import filedialog

threeSpaces = """
<pre>



</pre>
"""


def generateCaracterísticasTable(dados_comparativos, ancestral, descendentes):
    # Excluir as características "Sin", "Ples" e "Apo" dos dados comparativos
    dados_comparativos = [
        caracteristica
        for caracteristica in dados_comparativos
        if caracteristica not in ["Sin", "Ples", "Apo"]
    ]

    # Dividir os descendentes em grupos de 3
    grupos_descendentes = [
        list(descendentes.keys())[i : i + 6] for i in range(0, len(descendentes), 6)
    ]

    tabelas_html = []  # Lista para armazenar as tabelas HTML

    for grupo in grupos_descendentes:
        # Iniciar a string HTML com a tabela
        tabela_html = "<table border='2' align='center'><tr><th>Características</th><th>Ances.</th>"

        # Adicionar os nomes dos descendentes como cabeçalhos de coluna
        for nome in grupo:
            tabela_html += "<th>{}</th>".format(nome)
        tabela_html += "</tr>"

        # Adicionar as características como linhas de dados
        for caracteristica in dados_comparativos:
            tabela_html += "<tr><td>{}</td>".format(caracteristica)
            # Adicionar "Sim" ou "Não" para o ancestral
            valor_ancestral = ancestral.get(caracteristica, False)
            tabela_html += "<td>{}</td>".format("X" if valor_ancestral else "")
            # Adicionar "Sim" ou "Não" para cada descendente no grupo
            for nome in grupo:
                valor_descendente = descendentes[nome].get(caracteristica, False)
                tabela_html += "<td>{}</td>".format("X" if valor_descendente else "")
            tabela_html += "</tr>"

        # Fechar a tabela HTML
        tabela_html += "</table>"

        # Adicionar a tabela à lista de tabelas
        tabelas_html.append(tabela_html)

    return "".join(tabelas_html)


def generateSinPlesApoTable(descendentes):
    htmlTable = "<table border='2' align='center'><tr><th>Descendentes</th><th>Sinapomorfias</th><th>Plesiomorfias</th><th>Apomorfias</th>"
    for descendente, dados_descendente in descendentes.items():
        htmlTable += f"<tr><td>{dados_descendente['nome']}</td><td>{dados_descendente['Sin']}</td><td>{dados_descendente['Ples']}</td><td>{dados_descendente['Apo']}</td>"

    htmlTable += "</table>"
    return htmlTable


def generatePDF(dados_comparativos, ancestral, descendentes):
    html = f"""
<img src="_internal/src/modules/generatePDF/assets/logo_cladograph_pdf.png" width=250 />
{threeSpaces}
<center>
<img src="_internal/src/modules/generatePDF/assets/cacheTree.png" width=500 />
</center>
{threeSpaces}
{
    generateSinPlesApoTable(descendentes=descendentes)
}
{threeSpaces}
{
    generateCaracterísticasTable(
    dados_comparativos=dados_comparativos,
    ancestral=ancestral, 
    descendentes=descendentes
    )
    }

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


# ancestral = {
#     "nome": "ancestral",
#     "a": True,
#     "b": False,
#     "c": False,
#     "d": False,
#     "e": False,
#     "f": False,
#     "g": False,
#     "h": False,
#     "i": False,
#     "j": False,
#     "k": False,
#     "l": False,
#     "m": False,
#     "n": False,
# }

# descendentes = {
#     "1": {
#         "nome": "1",
#         "a": True,
#         "b": True,
#         "c": False,
#         "d": False,
#         "e": True,
#         "f": True,
#         "g": False,
#         "h": True,
#         "i": True,
#         "j": True,
#         "k": False,
#         "l": False,
#         "m": True,
#         "n": True,
#         "Sin": 0,
#         "Ples": 0,
#         "Apo": 0,
#     },
#     "2": {
#         "nome": "2",
#         "a": True,
#         "b": True,
#         "c": True,
#         "d": False,
#         "e": False,
#         "f": True,
#         "g": True,
#         "h": True,
#         "i": False,
#         "j": True,
#         "k": True,
#         "l": False,
#         "m": False,
#         "n": False,
#         "Sin": 0,
#         "Ples": 0,
#         "Apo": 0,
#     },
#     "3": {
#         "nome": "3",
#         "a": False,
#         "b": True,
#         "c": True,
#         "d": False,
#         "e": True,
#         "f": True,
#         "g": False,
#         "h": True,
#         "i": True,
#         "j": False,
#         "k": False,
#         "l": True,
#         "m": True,
#         "n": False,
#         "Sin": 2,
#         "Ples": 0,
#         "Apo": 0,
#     },
#     "4": {
#         "nome": "4",
#         "a": False,
#         "b": False,
#         "c": False,
#         "d": True,
#         "e": True,
#         "f": False,
#         "g": True,
#         "h": False,
#         "i": False,
#         "j": True,
#         "k": True,
#         "l": True,
#         "m": True,
#         "n": False,
#         "Sin": 0,
#         "Ples": 0,
#         "Apo": 0,
#     },
#     "5": {
#         "nome": "5",
#         "a": False,
#         "b": True,
#         "c": True,
#         "d": True,
#         "e": True,
#         "f": True,
#         "g": False,
#         "h": True,
#         "i": True,
#         "j": False,
#         "k": True,
#         "l": True,
#         "m": True,
#         "n": False,
#         "Sin": 0,
#         "Ples": 0,
#         "Apo": 0,
#     },
# }

# dados_comparativos = [
#     "a",
#     "b",
#     "c",
#     "d",
#     "e",
#     "f",
#     "g",
#     "h",
#     "i",
#     "j",
#     "k",
#     "l",
#     "m",
#     "n",
# ]


# generatePDF(
#     dados_comparativos=dados_comparativos,
#     ancestral=ancestral,
#     descendentes=descendentes,
# )
