from ete3 import Tree

#create a random tree
t = Tree()
t.populate(25, random_branches=True)

# prevent using labels and symbols in internal nodes
for n in t.traverse():
    n.img_style["size"] = 0
    n.img_style["vt_line_width"] = 0
t.render("regular.png")

#Convert to ultrametric
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
t.show("ultrametric.png")