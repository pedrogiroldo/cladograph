import tkinter as tk
import sys
from tkinter import ttk, filedialog
from ete3 import Tree, TreeStyle, NodeStyle

if getattr(sys, 'frozen', False):
    import pyi_splash

# def resource_path(relative_path):
#     """ Get absolute path to resource, works for dev and for PyInstaller """
#     try:
#         # PyInstaller creates a temp folder and stores path in _MEIPASS
#         base_path = sys._MEIPASS
#     except Exception:
#         base_path = os.path.abspath(".")

#     return os.path.join(base_path, relative_path)


# inicializa a janela principal
root = tk.Tk()

"""
=========================
Funções janela de estilos
=========================
"""
leaf_name_var = tk.BooleanVar(value=True)
circular_var = tk.BooleanVar()
semi_circular_var = tk.BooleanVar()


ts = TreeStyle()
# Configurações de estilo padrões

ns = NodeStyle()
ns["hz_line_width"] = 1
ns["vt_line_width"] = 1


def atualizar_estilos():
    ts.show_leaf_name = leaf_name_var.get()
    # ts.mode = "c" if circular_var.get() else "r"
    if semi_circular_var.get():
        ts.mode = "c"
        ts.arc_start = -180
        ts.arc_span = 180
    elif circular_var.get():
        ts.mode = "c"
        ts.rotation = 0
        ts.arc_start = 0
        ts.arc_span = 360
    else:
        ts.mode = "r"
        ts.rotation = 0
        ts.arc_start = 0
        ts.arc_span = 0


def abrir_janela_estilos():
    def fechar_janela():
        atualizar_estilos()

    popup_estilos.destroy()

    popup_estilos = tk.Toplevel(root)
    popup_estilos.title("Configrações de estilo")
    # popup_estilos.geometry("250x250")

    popup_estilos_frame = ttk.Frame(popup_estilos, width=500, height=500)
    popup_estilos_frame.pack()

    btn_leaf_name = ttk.Checkbutton(
        popup_estilos_frame,
        variable=leaf_name_var,
        text="Leaf name",
    )
    btn_leaf_name.grid(row=0, column=0, padx=0, pady=10, sticky="w")

    btn_circular = ttk.Checkbutton(
        popup_estilos_frame,
        variable=circular_var,
        text="Circular",
    )
    btn_circular.grid(row=2, column=0, padx=0, pady=10, sticky="w")

    btn_semi_circular = ttk.Checkbutton(
        popup_estilos_frame, variable=semi_circular_var, text="Semi Circular"
    )
    btn_semi_circular.grid(row=3, column=0, padx=0, pady=10, sticky="w")

    btn_salvar = tk.Button(popup_estilos_frame, text="Salvar", command=fechar_janela)
    btn_salvar.grid(row=100, column=0, padx=0, pady=5)


"""
==================================================
Executa as funções principais (donwload e mostrar)
==================================================
"""


def criar_arvore_Newick():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()

    formatoNewick = int(box_Newick.get())

    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return

    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada, format=formatoNewick)

        for node in t.traverse():
            node.set_style(ns)

        # Exiba a árvore
        t.show(tree_style=ts)

        status_label.config(text="")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")


def salvar_arvore():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()
    formatoNewick = int(box_Newick.get())

    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return

    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada, format=formatoNewick)

        for node in t.traverse():
            node.set_style(ns)

        # Solicitar ao usuário o local para salvar o arquivo
        filename = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[("PNG Image", "*.png"), ("All Files", "*.*")],
        )

        if filename:
            # Salvar o cladograma no local escolhido pelo usuário
            t.render(filename, w=4000, units="px", tree_style=ts)
            status_label.config(text="Árvore salva com sucesso!")
        else:
            status_label.config(text="Erro: nenhum local selecionado")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")


ancestral = {}
descendentes = {}
dados_comparativos = []
def criar_arvore_alternativa():
    janela_comparador = tk.Toplevel(root)



    def criar_dados():
        def salvar_dados_comparativos():
            global dados_comparativos
            dados_comparativos = (
                input_dados.get("1.0", tk.END).replace("\n", "").split(",")
            )
            janela_dados_comparativos.destroy()

        janela_dados_comparativos = tk.Toplevel(janela_comparador)

        label_criar_dados = ttk.Label(
            janela_dados_comparativos, text="Insira as características"
        )
        label_criar_dados.grid(row=0, column=0, padx=5, pady=5)

        input_dados = tk.Text(janela_dados_comparativos, height=5)
        input_dados.grid(row=1, column=0, padx=5, pady=5)

        label_instrucao_dados = ttk.Label(
            janela_dados_comparativos,
            text='As características têm que estar separadas por vírgulas sem espaços. Ex.: "carac1,carac2,carac3"',
        )
        label_instrucao_dados.grid(row=2, column=0, padx=10, pady=10)

        btn_salvar_dados_comparativos = ttk.Button(
            janela_dados_comparativos, text="Salvar", command=salvar_dados_comparativos
        )
        btn_salvar_dados_comparativos.grid(row=3, column=0, padx=5, pady=5)

    def criar_ancestral():
        def salvar_ancestral():
            ancestral["nome"] = nome_text.get("1.0", tk.END).replace("\n", "")

            for dado, var in dados_comparativos_nome_var.items():
                valor = var.get()
                ancestral[dado] = valor

            janela_ancestral.destroy()

        janela_ancestral = tk.Toplevel(janela_comparador)

        global dados_comparativos

        nome_label = ttk.Label(janela_ancestral, text="Nome:")
        nome_label.pack()

        nome_text = tk.Text(janela_ancestral, height=1)
        nome_text.pack()

        dados_comparativos_nome_var = {}

        for dado in dados_comparativos:
            dados_comparativos_nome_var[dado] = tk.BooleanVar(value=False)

        for dado in dados_comparativos:
            Checkbutton = ttk.Checkbutton(
                janela_ancestral, text=dado, variable=dados_comparativos_nome_var[dado]
            )
            Checkbutton.pack()

        btn_salvar_ancestral = ttk.Button(
            janela_ancestral, text="Salvar", command=salvar_ancestral
        )
        btn_salvar_ancestral.pack()


    def adicionar_descendente():
        def salvar_descendente():
            nome_descendente = nome_text.get("1.0", tk.END).replace("\n", "")

            descendentes[nome_descendente] = {"nome": nome_descendente}

            for dado, var in dados_comparativos_nome_var.items():
                valor = var.get()
                descendentes[nome_descendente][dado] = valor
            else:
                print(descendentes[nome_descendente])

            janela_descendente.destroy()

        janela_descendente = tk.Toplevel(janela_comparador)

        global dados_comparativos

        nome_label = ttk.Label(janela_descendente, text="Nome:")
        nome_label.pack()

        nome_text = tk.Text(janela_descendente, height=1)
        nome_text.pack()

        dados_comparativos_nome_var = {}

        for dado in dados_comparativos:
            dados_comparativos_nome_var[dado] = tk.BooleanVar(value=False)

        for dado in dados_comparativos:
            Checkbutton = ttk.Checkbutton(
                janela_descendente, text=dado, variable=dados_comparativos_nome_var[dado]
            )
            Checkbutton.pack()

        btn_salvar_descendente = ttk.Button(
            janela_descendente, text="Salvar", command=salvar_descendente
        )
        btn_salvar_descendente.pack()

    btn_criar_dados = ttk.Button(
        janela_comparador, text="Adicionar dados", command=criar_dados
    )
    btn_criar_dados.pack()

    btn_criar_ancestral = ttk.Button(
        janela_comparador, text="Criar ancestral", command=criar_ancestral
    )
    btn_criar_ancestral.pack()

    btn_adicionar_descendente = ttk.Button(
        janela_comparador, text="Adicionar descendente", command=adicionar_descendente
    )
    btn_adicionar_descendente.pack()


    # recursos dev

    def testar():
        global ancestral
        global descendentes
        global dados_comparativos
        print(ancestral)
        print(descendentes)
        print(dados_comparativos)
    btn_dev = ttk.Button(janela_comparador, text='dev', command=testar)
    btn_dev.pack()


"""
==================
Criação da janela
==================
"""

root.title("Visualizador de Árvore")
# icon_path = resource_path('icon.ico')
# root.iconbitmap(icon_path)


# Cria o campo de entrada de texto
entrada_label = tk.Label(root, text="Insira a árvore no formato Newick:")
entrada_label.grid(row=0, column=0, padx=5, pady=5)

entrada_text = tk.Text(root, height=5)
entrada_text.grid(row=1, rowspan=6, column=0, padx=5, pady=5)

# Cria o seletor de versão do newick
box_Newick = ttk.Combobox(
    root, width=5, state="readonly", values=(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100)
)
box_Newick.grid(row=1, column=1, padx=5, pady=5)

# Cria os botões
btn_criar = tk.Button(root, text="Vizualizar Árvore", command=criar_arvore_Newick)
btn_criar.grid(row=2, column=1, padx=5, pady=5)

btn_salvar = tk.Button(root, text="Baixar Árvore", command=salvar_arvore)
btn_salvar.grid(row=3, column=1, padx=5, pady=5)

btn_converter = tk.Button(
    root, text="Comparador de caract.", command=criar_arvore_alternativa
)
btn_converter.grid(row=5, column=1, padx=5, pady=5)

btn_estilos = tk.Button(root, text="Configurar estilos", command=abrir_janela_estilos)
btn_estilos.grid(row=6, column=1, padx=5, pady=5)

# Cria a etiqueta de status
status_label = tk.Label(root, text="")
status_label.grid(row=7, column=0, padx=5, pady=5)

# Deixa um pouco responsivo :)
root.columnconfigure(0, weight=1)
root.columnconfigure(1, weight=1)
root.rowconfigure(1, weight=1)

if getattr(sys, 'frozen', False):
    pyi_splash.close()

root.mainloop()
