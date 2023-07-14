import subprocess
import platform

if platform.system() == "Linux":
    subprocess.check_call(["pyinstaller", "--onefile","--icon", "icon.ico", "CladoGraph.py"])
else:
     subprocess.check_call(["pyinstaller", "--onefile", "--icon", "icon.ico", "-w", "CladoGraph.py"])

#  pyinstaller --onefile --noconsole --clean --icon='icon.ico' --add-data 'icon.ico;.' MD2HTML.py



'''
ATUALIZADO:
pyinstaller --noconfirm --onefile --windowed --icon "D:/Pedro Giroldo/Documentos/codes/CladoGraph/icon.ico" --splash "D:/Pedro Giroldo/Documentos/codes/CladoGraph/splash_cladograph.jpg" --add-data "D:/Pedro Giroldo/Documentos/codes/CladoGraph/icon.ico;."  "D:/Pedro Giroldo/Documentos/codes/CladoGraph/CladoGraph.py"
'''