import tkinter as tk
from ete3 import Tree

def criar_arvore_Newick():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()
    
    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return
    
    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada)
        
        # Exiba a árvore
        t.show()
        
        status_label.config(text="")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")

def salvar_arvore():
    # Obtenha a entrada do usuário
    entrada = entrada_text.get("1.0", tk.END).strip()
    
    # Verifique se a entrada está vazia
    if not entrada:
        status_label.config(text="Erro: insira uma árvore válida")
        return
    
    try:
        # Crie a árvore a partir da entrada do usuário
        t = Tree(entrada)
        
        # Salve o cladograma em um arquivo
        t.render("cladograma.png", w=4000, units="px")
        
        status_label.config(text="Árvore salva com sucesso!")
    except Exception as e:
        status_label.config(text=f"Erro: {str(e)}")

def criar_arvore_alternativa():
    print("teste")

# Cria a janela principal
root = tk.Tk()
root.title("Visualizador de Árvore")

# Cria o campo de entrada de texto
entrada_label = tk.Label(root, text="Insira a árvore no formato Newick:")
entrada_label.pack()

entrada_text = tk.Text(root, height=5)
entrada_text.pack()

# Cria os botões
btn_criar = tk.Button(root, text="Criar Árvore", command=criar_arvore_Newick)
btn_salvar = tk.Button(root, text="Salvar Árvore", command=salvar_arvore)

btn_criar.pack()
btn_salvar.pack()

# Cria a etiqueta de status
status_label = tk.Label(root, text="")
status_label.pack()

root.mainloop()
