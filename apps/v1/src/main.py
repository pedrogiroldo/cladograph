import tkinter as tk
import sys
import os
from tkinter import ttk, filedialog
from ete3 import Tree, TreeStyle, NodeStyle
from modules import generatePDF


if getattr(sys, "frozen", False):
    import pyi_splash

    def resource_path(relative_path):
        """Get absolute path to resource, works for dev and for PyInstaller"""
        try:
            # PyInstaller creates a temp folder and stores path in _MEIPASS
            base_path = sys._MEIPASS
        except Exception:
            base_path = os.path.abspath(".")

        return os.path.join(base_path, relative_path)


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
forcar_topologia_var = tk.BooleanVar(value=True)
mostrar_escala_var = tk.BooleanVar(value=True)
mostrar_comprimento_ramos_var = tk.BooleanVar()


ts = TreeStyle()
# Configurações de estilo padrões

ns = NodeStyle()
ns["hz_line_width"] = 1
ns["vt_line_width"] = 1
ts.force_topology = forcar_topologia_var.get()


def atualizar_estilos():
    ts.show_leaf_name = leaf_name_var.get()
    ts.force_topology = forcar_topologia_var.get()
    ts.show_scale = mostrar_escala_var.get()
    ts.show_branch_length = mostrar_comprimento_ramos_var.get()
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
        if (
            semi_circular_var.get() != circular_var.get()
            or semi_circular_var.get() == False
            and circular_var.get() == False
        ):
            atualizar_estilos()
            popup_estilos.destroy()
        elif semi_circular_var.get() == circular_var.get():
            label_erro.config(text="Escolha entre circular e semi circular")
            label_erro.grid(row=200, column=0)

    popup_estilos = tk.Toplevel(root)
    if getattr(sys, "frozen", False):
        icon_path = resource_path("icon.ico")
        popup_estilos.iconbitmap(icon_path)
    popup_estilos.title("Configrações de estilo")

    popup_estilos_frame = ttk.Frame(popup_estilos, padding=20)
    popup_estilos_frame.grid(row=0, column=0)

    style = ttk.Style()
    style.configure("TCheckbutton", font=("Arial", 13))

    grid_style_estilos = {"padx": 10, "pady": 7, "stick": "w"}

    btn_leaf_name = ttk.Checkbutton(
        popup_estilos_frame,
        variable=leaf_name_var,
        text="Mostrar nome da folha",
    )
    btn_leaf_name.grid(row=0, column=0, **grid_style_estilos)

    btn_circular = ttk.Checkbutton(
        popup_estilos_frame,
        variable=circular_var,
        text="Circular",
        style="TCheckbutton",
    )
    btn_circular.grid(row=2, column=0, **grid_style_estilos)

    btn_semi_circular = ttk.Checkbutton(
        popup_estilos_frame,
        variable=semi_circular_var,
        text="Semi Circular",
        style="TCheckbutton",
    )
    btn_semi_circular.grid(row=3, column=0, **grid_style_estilos)

    btn_forcar_topologia = ttk.Checkbutton(
        popup_estilos_frame,
        variable=forcar_topologia_var,
        text="Forçar topologia",
        style="TCheckbutton",
    )
    btn_forcar_topologia.grid(row=4, column=0, **grid_style_estilos)

    btn_mostrar_escala = ttk.Checkbutton(
        popup_estilos_frame, variable=mostrar_escala_var, text="Mostrar escala"
    )
    btn_mostrar_escala.grid(row=5, column=0, **grid_style_estilos)

    btn_mostrar_comprimento_ramos = ttk.Checkbutton(
        popup_estilos_frame,
        variable=mostrar_comprimento_ramos_var,
        text="Mostrar o comprimento dos ramos",
        style="TCheckbutton",
    )
    btn_mostrar_comprimento_ramos.grid(row=5, column=0, **grid_style_estilos)

    btn_salvar = tk.Button(popup_estilos_frame, text="Salvar", command=fechar_janela)
    btn_salvar.grid(row=100, column=0, padx=15, pady=5)

    label_erro = ttk.Label(popup_estilos_frame, text="", foreground="red")


"""
==================================================
Executa as funções principais (donwload e mostrar)
==================================================
"""


def criar_arvore_Newick():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()

    formatoNewick = None

    if box_Newick.get():
        formatoNewick = int(box_Newick.get())

    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return

    """
    Para mostrar o erro caso não tenha nenhum newick no input, 
    porem se o valor for 0, ele retorna falso e o erro aparece,
    por isso antes temos q verificar antes se é 0
    """

    if formatoNewick != 0:
        if not formatoNewick:
            status_label.config(text="Erro: insira um tipo de Newick")
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
            filetypes=[("JPEG Image", "*.jpeg"), ("All Files", "*.*")],
        )

        if filename:
            # Salvar o cladograma no local escolhido pelo usuário
            t.render(filename, w=4000, units="px", tree_style=ts)
            status_label.config(text="Árvore salva com sucesso!")
        else:
            status_label.config(text="Erro: nenhum local selecionado")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")


"""
formato ancestral
{
    'nome': nome do ancestral,
    'característica_1': boolean característica 1,
    'característica_2': boolean característica 2,
    'característica_3': boolean característica 3,
    ...
}

"""
ancestral = {
    # "nome": "ancestral",
    # "a": True,
    # "b": False,
    # "c": False,
    # "d": False,
    # "e": False,
    # "f": False,
    # "g": False,
    # "h": False,
    # "i": False,
    # "j": False,
    # "k": False,
    # "l": False,
    # "m": False,
    # "n": False,
}
"""
formato descendente
{
    'descendente_1': {
        'nome': 'descendente_1',
        'característica_1': boolean característica 1,
        'característica_2': boolean característica 2,
        'característica_3': boolean característica 3,
        ...
        'Sin': 0
        'Ples': 0
        'Apo': 0
    },
    'descendente_2': {
        'nome': 'descendente_2',
        'característica_1': boolean característica 1,
        'característica_2': boolean característica 2,
        'característica_3': boolean característica 3,
        ...
        'Sin': 0
        'Ples': 0
        'Apo': 0
    },
    ...
}

"""
descendentes = {
    # "1": {
    #     "nome": "1",
    #     "a": True,
    #     "b": True,
    #     "c": False,
    #     "d": False,
    #     "e": True,
    #     "f": True,
    #     "g": False,
    #     "h": True,
    #     "i": True,
    #     "j": True,
    #     "k": False,
    #     "l": False,
    #     "m": True,
    #     "n": True,
    #     "Sin": 0,
    #     "Ples": 0,
    #     "Apo": 0,
    # },
    # "2": {
    #     "nome": "2",
    #     "a": True,
    #     "b": True,
    #     "c": True,
    #     "d": False,
    #     "e": False,
    #     "f": True,
    #     "g": True,
    #     "h": True,
    #     "i": False,
    #     "j": True,
    #     "k": True,
    #     "l": False,
    #     "m": False,
    #     "n": False,
    #     "Sin": 0,
    #     "Ples": 0,
    #     "Apo": 0,
    # },
    # "3": {
    #     "nome": "3",
    #     "a": False,
    #     "b": True,
    #     "c": True,
    #     "d": False,
    #     "e": True,
    #     "f": True,
    #     "g": False,
    #     "h": True,
    #     "i": True,
    #     "j": False,
    #     "k": False,
    #     "l": True,
    #     "m": True,
    #     "n": False,
    #     "Sin": 0,
    #     "Ples": 0,
    #     "Apo": 0,
    # },
    # "4": {
    #     "nome": "4",
    #     "a": False,
    #     "b": False,
    #     "c": False,
    #     "d": True,
    #     "e": True,
    #     "f": False,
    #     "g": True,
    #     "h": False,
    #     "i": False,
    #     "j": True,
    #     "k": True,
    #     "l": True,
    #     "m": True,
    #     "n": False,
    #     "Sin": 0,
    #     "Ples": 0,
    #     "Apo": 0,
    # },
    # "5": {
    #     "nome": "5",
    #     "a": False,
    #     "b": True,
    #     "c": True,
    #     "d": True,
    #     "e": True,
    #     "f": True,
    #     "g": False,
    #     "h": True,
    #     "i": True,
    #     "j": False,
    #     "k": True,
    #     "l": True,
    #     "m": True,
    #     "n": False,
    #     "Sin": 0,
    #     "Ples": 0,
    #     "Apo": 0,
    # },
}
"""
formato dados comparativos

['característica_1','característica_2','característica_3']
"""
dados_comparativos = [
    # "a",
    # "b",
    # "c",
    # "d",
    # "e",
    # "f",
    # "g",
    # "h",
    # "i",
    # "j",
    # "k",
    # "l",
    # "m",
    # "n",
]


def criar_arvore_a_partir_da_comparacao():
    janela_comparador = tk.Toplevel(root)

    janela_comparador.resizable(False, False)

    if getattr(sys, "frozen", False):
        icon_path = resource_path("icon.ico")
        janela_comparador.iconbitmap(icon_path)

    grid_style_comparador = {"padx": "5", "pady": "3"}

    style = ttk.Style()
    style.configure("Button.TButton", font=("Arial", 13), width=20)
    style.configure("Label.TLabel", font=("Arial", 13))

    def criar_dados():
        def salvar_dados_comparativos():
            global dados_comparativos
            dados_comparativos = (
                input_dados.get("1.0", tk.END).replace("\n", "").split(",")
            )
            dados_criados = (
                input_dados.get("1.0", tk.END).replace("\n", "").replace(",", ", ")
            )
            label_dados_criados.config(text=dados_criados)

            janela_dados_comparativos.destroy()

        janela_dados_comparativos = tk.Toplevel(janela_comparador)
        if getattr(sys, "frozen", False):
            icon_path = resource_path("icon.ico")
            janela_dados_comparativos.iconbitmap(icon_path)

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
            janela_dados_comparativos,
            text="Salvar",
            command=salvar_dados_comparativos,
            style="TButton",
        )
        btn_salvar_dados_comparativos.grid(row=3, column=0, padx=5, pady=5)

    def criar_ancestral():
        def salvar_ancestral():
            ancestral["nome"] = nome_text.get("1.0", tk.END).replace("\n", "")

            for dado, var in dados_comparativos_nome_var.items():
                valor = var.get()
                ancestral[dado] = valor

            label_ancestral_criado.config(text=f"Ancestral: {ancestral['nome']}")

            janela_ancestral.destroy()

        janela_ancestral = tk.Toplevel(janela_comparador)
        if getattr(sys, "frozen", False):
            icon_path = resource_path("icon.ico")
            janela_ancestral.iconbitmap(icon_path)

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

            descendentes[nome_descendente]["Sin"] = 0
            descendentes[nome_descendente]["Ples"] = 0
            descendentes[nome_descendente]["Apo"] = 0

            label_descendentes_criados.config(text=f"Descendentes: {len(descendentes)}")
            janela_descendente.destroy()

        janela_descendente = tk.Toplevel(janela_comparador)
        if getattr(sys, "frozen", False):
            icon_path = resource_path("icon.ico")
            janela_descendente.iconbitmap(icon_path)

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
                janela_descendente,
                text=dado,
                variable=dados_comparativos_nome_var[dado],
            )
            Checkbutton.pack()

        btn_salvar_descendente = ttk.Button(
            janela_descendente, text="Salvar", command=salvar_descendente
        )
        btn_salvar_descendente.pack()

    def gerar_newick():
        # formato dos dados_comparativos_sin_apo
        """
        {
            'característica_1': 0,
            'característica_2': 0,
            'característica_3': 0,
        }
        """
        dados_comparativos_sin_apo = {}

        newick = "("

        for dado in dados_comparativos:
            dados_comparativos_sin_apo[dado] = 0

        for descendente, dado in descendentes.items():
            for caracteristica in dados_comparativos:
                if (
                    ancestral[caracteristica]
                    == descendentes[descendente][caracteristica]
                ):
                    pass
                else:
                    dados_comparativos_sin_apo[caracteristica] += 1

        for descendente, dado in descendentes.items():
            for caracteristica in dados_comparativos:
                if (
                    ancestral[caracteristica]
                    == descendentes[descendente][caracteristica]
                ):
                    descendentes[descendente]["Ples"] += 1
                elif dados_comparativos_sin_apo[caracteristica] > 1:
                    descendentes[descendente]["Sin"] += 1
                elif descendentes[descendente][caracteristica] == True:
                    descendentes[descendente]["Apo"] += 1

        descendentes_ordenados = sorted(
            descendentes.items(),
            key=lambda descendente: (
                descendente[1]["Sin"],
                -descendente[1]["Ples"],
                descendente[1]["Apo"],
            ),
        )

        for descendente, dados in descendentes_ordenados:
            newick += f"{descendente},("
        else:
            newick = newick[:-2]
            for descendente, dados in descendentes_ordenados:
                newick += ")"
            else:
                newick = newick[:-1]

        newick += ");"

        cacheTree = Tree(newick, format=0)
        for node in cacheTree.traverse():
            node.set_style(ns)

        cacheTree.render(
            "_internal/src/modules/generatePDF/assets/cacheTree.png",
            w=4000,
            units="px",
            tree_style=ts,
        )

        def vizualizar_arvore():
            t = Tree(newick, format=0)

            for node in t.traverse():
                node.set_style(ns)

            t.show(tree_style=ts)

        def salvar_arvore():
            t = Tree(newick, format=0)

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

        btn_gerar_newick.grid_forget()

        frame_vizualizar_salvar = ttk.Frame(janela_comparador)
        frame_vizualizar_salvar.grid(row=3, column=0, **grid_style_comparador)

        btn_visualizar_arvore_gerada = ttk.Button(
            frame_vizualizar_salvar, text="Visualizar", command=vizualizar_arvore
        )
        btn_visualizar_arvore_gerada.grid(row=0, column=0)

        btn_salvar_arvore_gerada = ttk.Button(
            frame_vizualizar_salvar, text="Salvar", command=salvar_arvore
        )
        btn_salvar_arvore_gerada.grid(row=0, column=1)

        newick_gerado = tk.Text(frame_comparador, height=1, width=15)
        newick_gerado.insert("1.0", f"{newick}")
        newick_gerado.grid(row=3, column=0, **grid_style_comparador)

        def copiar_newick():
            janela_comparador.clipboard_clear()
            janela_comparador.clipboard_append(newick)

        btn_copiar_newick = ttk.Button(
            frame_comparador, text="Copiar newick", command=copiar_newick
        )
        btn_copiar_newick.grid(row=4, column=0, **grid_style_comparador)

        def gerar_pdf_relatorio():
            generatePDF.phylogeneticTreePDF.generatePDF(
                descendentes=descendentes,
                ancestral=ancestral,
                dados_comparativos=dados_comparativos,
            )

        btn_gerar_pdf = ttk.Button(
            frame_comparador, text="Gerar PDF", command=gerar_pdf_relatorio
        )
        btn_gerar_pdf.grid(row=5, column=0, **grid_style_comparador)

    btn_criar_dados = ttk.Button(
        janela_comparador,
        text="Adicionar dados",
        command=criar_dados,
        style="Button.TButton",
    )
    btn_criar_dados.grid(row=0, column=0, **grid_style_comparador)

    btn_criar_ancestral = ttk.Button(
        janela_comparador,
        text="Criar ancestral",
        command=criar_ancestral,
        style="Button.TButton",
    )
    btn_criar_ancestral.grid(row=1, column=0, **grid_style_comparador)

    btn_adicionar_descendente = ttk.Button(
        janela_comparador,
        text="Adicionar descendente",
        command=adicionar_descendente,
        style="Button.TButton",
    )
    btn_adicionar_descendente.grid(row=2, column=0, **grid_style_comparador)

    btn_gerar_newick = ttk.Button(
        janela_comparador,
        text="Gerar árvore",
        command=gerar_newick,
        style="Button.TButton",
    )
    btn_gerar_newick.grid(row=3, column=0, **grid_style_comparador)

    frame_comparador = ttk.Frame(janela_comparador, relief="solid", borderwidth=5)
    frame_comparador.grid(
        row=0, rowspan=300, column=1, sticky="ns", **grid_style_comparador
    )

    label_dados_criados = ttk.Label(frame_comparador, text="", style="Label.TLabel")
    label_dados_criados.grid(row=0, column=0, **grid_style_comparador)

    label_ancestral_criado = ttk.Label(
        frame_comparador, text="Ancestral:", style="Label.TLabel"
    )
    label_ancestral_criado.grid(row=1, column=0, **grid_style_comparador)

    label_descendentes_criados = ttk.Label(
        frame_comparador, text="Descesndentes:", style="Label.TLabel"
    )
    label_descendentes_criados.grid(row=2, column=0, **grid_style_comparador)

    if ancestral:
        label_ancestral_criado.config(text=f"Ancestral: {ancestral['nome']}")
    if descendentes:
        label_descendentes_criados.config(text=f"Descendentes: {len(descendentes)}")
    if dados_comparativos:
        label_dados_criados.config(
            label_dados_criados.config(
                text=f"{dados_comparativos}".replace("\n", "")
                .replace(",", ", ")
                .replace("'", "")
                .replace("[", "")
                .replace("]", "")
            )
        )

    # recursos dev

    # def testar():
    #     global ancestral
    #     global descendentes
    #     global dados_comparativos
    #     print(ancestral)
    #     print(descendentes)
    #     print(dados_comparativos)
    # btn_dev = ttk.Button(janela_comparador, text='dev', command=testar, style='Button.TButton')
    # btn_dev.grid(row=200, column=0, **grid_style_comparador)


"""
==================
Criação da janela
==================
"""

root.title("CladoGraph")


# Cria o campo de entrada de texto
entrada_label = tk.Label(
    root,
    text="Insira a árvore no formato Newick ou use o comparador de características:",
)
entrada_label.grid(row=0, column=0, padx=5, pady=5)

entrada_text = tk.Text(root, height=5)
entrada_text.grid(row=1, rowspan=6, column=0, padx=5, pady=5)

# Cria o seletor de versão do newick
box_Newick = ttk.Combobox(
    root, width=10, state="readonly", values=(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100)
)
box_Newick.grid(row=1, column=1, padx=5, pady=5)

# Cria os botões
btn_criar = tk.Button(
    root, text="Vizualizar Árvore", command=criar_arvore_Newick, width=20
)
btn_criar.grid(row=2, column=1, padx=5, pady=5)

btn_salvar = tk.Button(root, text="Baixar Árvore", command=salvar_arvore, width=20)
btn_salvar.grid(row=3, column=1, padx=5, pady=5)

btn_converter = tk.Button(
    root,
    text="Comparador de caract.",
    command=criar_arvore_a_partir_da_comparacao,
    width=20,
)
btn_converter.grid(row=5, column=1, padx=5, pady=5)

btn_estilos = tk.Button(
    root, text="Configurar estilos", command=abrir_janela_estilos, width=20
)
btn_estilos.grid(row=6, column=1, padx=5, pady=5)

# Cria a etiqueta de status
status_label = tk.Label(root, text="")
status_label.grid(row=7, column=0, padx=5, pady=5)

# Deixa um pouco responsivo :)
root.columnconfigure(0, weight=1)
root.columnconfigure(1, weight=1)
root.rowconfigure(1, weight=1)

if getattr(sys, "frozen", False):
    pyi_splash.close()
    icon_path = resource_path("icon.ico")
    root.iconbitmap(icon_path)

root.mainloop()
