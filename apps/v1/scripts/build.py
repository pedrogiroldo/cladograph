import subprocess

def buildCladograph():
    cmd = [ 'pyinstaller', '--onefile', '--noconsole', '--clean', "--icon='icon.ico'", "--add-data 'icon.ico;.'", './src/main.py']
    subprocess.run(cmd)
    
buildCladograph()