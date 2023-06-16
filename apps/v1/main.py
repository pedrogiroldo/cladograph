import subprocess

subprocess.check_call(["pip", "install", "-r", "requirements.txt"])

import tkinter as tk
from ete3 import Tree

t = Tree("minha_arvore.nw")


def exibir_arvore():
    t.show()


def salvar_arvore():
    t.render("cladograma.png", w=4000, units="px")


root = tk.Tk()
root.title("Visualizador de Árvore")

btn_exibir = tk.Button(root, text="Exibir Árvore", command=exibir_arvore)
btn_salvar = tk.Button(root, text="Salvar Árvore", command=salvar_arvore)
btn_exibir.pack()
btn_salvar.pack()

root.mainloop()
