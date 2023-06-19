import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from ete3 import Tree

novo_input_values = []


def criar_arvore_Newick():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()

    tipoNewick = int(box_Newick.get())
    
    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return

    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada, format=tipoNewick)

        # Exiba a árvore
        t.show()

        status_label.config(text="")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")


def salvar_arvore():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()
    tipoNewick = int(box_Newick.get())

    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return

    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada, format=tipoNewick)

        # Solicitar ao usuário o local para salvar o arquivo
        filename = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[("PNG Image", "*.png"), ("All Files", "*.*")]
        )

        if filename:
            # Salvar o cladograma no local escolhido pelo usuário
            t.render(filename, w=4000, units="px")
            status_label.config(text="Árvore salva com sucesso!")
        else:
            status_label.config(text="Erro: nenhum local selecionado")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")


def criar_arvore_alternativa():
    global novo_input_values
    popup = tk.Tk()
    popup.title("Conversor Newick")

    def criar_label():
        global novo_input_values
        nova_label = tk.Label(popup, text="Novo animal")
        nova_label.pack()
        novo_input = tk.Text(popup, height=1)
        novo_input.pack()

    def obter_valor():
        global novo_input_values
        valor = novo_input.get("1.0", tk.END).strip()
        novo_input_values.append(valor)
        popup.destroy()

    criar_label()
    botao = tk.Button(popup, text="Criar Label", command=criar_label)
    botao.pack()
    botao_confirmar = tk.Button(popup, text="Confirmar", command=obter_valor)
    botao_confirmar.pack()

    popup.mainloop()

    # Use os valores digitados pelos usuários (novo_input_values) como desejar
    for valor in novo_input_values:
        print(valor)


# Cria a janela principal
root = tk.Tk()
root.title("Visualizador de Árvore")

# Cria o campo de entrada de texto
entrada_label = tk.Label(root, text="Insira a árvore no formato Newick:")
entrada_label.grid(row=0, column=0, padx=5, pady=5)

entrada_text = tk.Text(root, height=5)
entrada_text.grid(row=1, column=0, padx=5, pady=5)

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

# Cria a etiqueta de status
status_label = tk.Label(root, text="")
status_label.grid(row=6, column=0, padx=5, pady=5)

# Deixa um pouco responsivo:)
root.columnconfigure(0, weight=1)
root.columnconfigure(1, weight=1)
root.rowconfigure(1, weight=1)




root.mainloop()
