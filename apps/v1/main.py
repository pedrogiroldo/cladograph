import subprocess

subprocess.check_call(['pip', 'install', '-r', 'requirements.txt'])

from ete3 import Tree

t = Tree
print('a')