import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from ete3 import Tree, TreeStyle

novo_input_values = []

# inicializa a janela principal
root = tk.Tk()

"""
=========================
Funções janela de estilos
=========================
"""
leaf_name_var = tk.BooleanVar(value=True)
circular_var = tk.BooleanVar()

ts = TreeStyle()


def atualizar_checkbox():
    ts.show_leaf_name = leaf_name_var.get()
    ts.show_branch_length = True
    ts.show_branch_support = True
    ts.mode = "c" if circular_var.get() else "r"


def abrir_janela_estilos():
    estilos_popup = tk.Toplevel(root)
    btn_leaf_name = ttk.Checkbutton(
        estilos_popup,
        variable=leaf_name_var,
        text="Leaf name",
        command=atualizar_checkbox,
    )
    btn_leaf_name.grid(row=0, column=0, padx=5, pady=5)
    btn_circular = ttk.Checkbutton(
        estilos_popup,
        variable=circular_var,
        text="Circular",
        command=atualizar_checkbox,
    )
    btn_circular.grid(row=1, column=0, padx=5, pady=5)


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


def criar_arvore_alternativa():
    janela_comparador = tk.Toplevel(root)

    ancestral = {}
    descendentes = {}

    # ancestral[nome] = {caracteristica: True for caracteristica in caracteristicas}

    def criar_ancestral():
        def salvar_ancestral():
            nome = nome_text.get("1.0", "end-1c")
            caracteristicas = caracteristicas_text.get("1.0", "end-1c").split(',')
            ancestral = {"Nome": f"{nome}"}
            ancestral["AAAA"] = False
            for caracteristica in caracteristicas:
                ancestral[f"{caracteristica}"] = True
            janela_ancestral.destroy()

        janela_ancestral = tk.Toplevel(janela_comparador)

        nome_label = ttk.Label(janela_ancestral, text="Nome:")
        nome_label.grid(row=0, column=0, padx=5, pady=5)

        nome_text = tk.Text(janela_ancestral, height=1)
        nome_text.grid(row=1, column=0, padx=5, pady=5)

        caracteristicas_label = ttk.Label(janela_ancestral, text="Características separadas por vírgula:")
        caracteristicas_label.grid(row=2, column=0, padx=5, pady=5)

        caracteristicas_text = tk.Text(janela_ancestral)
        caracteristicas_text.grid(row=3, rowspan=2, column=0, padx=5, pady=5)

        btn_ok = ttk.Button(janela_ancestral, text="Ok", command=salvar_ancestral)
        btn_ok.grid(row=9, column=0, padx=10, pady=10)

    btn_criar_ancestral = ttk.Button(janela_comparador, text="Criar ancestral", command=criar_ancestral)
    btn_criar_ancestral.pack()


"""
==================
Criação da janela
==================
"""

# Cria a janela principal
root.title("Visualizador de Árvore")

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
btn_criar = tk.Button(root, text="Criar Árvore", command=criar_arvore_Newick)
btn_criar.grid(row=2, column=1, padx=5, pady=5)

btn_salvar = tk.Button(root, text="Salvar Árvore", command=salvar_arvore)
btn_salvar.grid(row=3, column=1, padx=5, pady=5)

btn_converter = tk.Button(
    root, text="Converter para Newick", command=criar_arvore_alternativa
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


root.mainloop()