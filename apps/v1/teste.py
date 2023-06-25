from ete3 import Tree

def create_phylogenetic_tree():
    # Criar a árvore filogenética a partir do formato Newick
    t = Tree('(a,b,c,d);')

    # Converter a árvore para o formato ultramétrico
    most_distant_leaf, tree_length = t.get_farthest_leaf()
    current_dist = 0
    for postorder, node in t.iter_prepostorder():
        if postorder:
            current_dist -= node.dist
        else:
            if node.is_leaf():
                node.dist += tree_length - (current_dist + node.dist)
            elif node.up: # node is internal
                current_dist += node.dist

    # Renderizar a árvore no formato ultramétrico
    t.show()


create_phylogenetic_tree()
